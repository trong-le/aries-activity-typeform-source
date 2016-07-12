import { singleS3StreamOutput, Activity } from 'aries-data';
import rp from 'request-promise';

const baseURI = 'https://api.typeform.com/v1/form/';

export default class TypeFormSource extends Activity {
    static props = {
        name: require('../package.json').name, 
        version: require('../package.json').version
    };

    @singleS3StreamOutput('json')
    async onTask(activityTask, config) {
        const data = await this.getTypeformData(config);
        const questionAnswersArray = this.getResponses(data.responses, data.questions);
        return [ ...questionAnswersArray ];
    }

    async getTypeformData({ uid, apiKey, completed, since, until, offset, limit, token, order_by }) {
        const options = {
            uri: `${baseURI}${uid}`,
            qs: {
                key: apiKey,
                completed,
                since,
                until,
                offset,
                limit,
                token,
                order_by
            },
            json: true
        }

        const response = await rp(options);
        return response;
    }

    getResponses(responseArray, questionArray) {
        let answers = [];
        for (let response of responseArray) {
            let obj = {};
            let i = 1;
            for (let question of questionArray) {

                // Get question string and replace unusable characters for redshift columns
                let questionString = this.replaceQuestionString(question.question);

                // If object contains question, make another key/value pair with new answer
                if (response.answers[question.id]) {
                    if (obj[questionString]) {
                        obj[questionString + `_${i}`] = response.answers[question.id];
                        i++;
                    } else {
                        obj[questionString] = response.answers[question.id];
                        i = 1;
                    }
                }
            }

            // Assign timestamp
            Object.assign(obj, { timestamp: new Date() });
            answers.push(obj);
        }
        return answers;
    }

    replaceQuestionString(questionString) {
        questionString = questionString.replace(/'s/g, ' is');
        questionString = questionString.replace(/ /g, '_');
        questionString = questionString.replace(/\?/g, '');
        return questionString;
    }

};
