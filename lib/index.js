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
        const questionAnswersArray = this.getResponses(data);
        return questionAnswersArray;
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

    getResponses({ responses, questions }) {
        const answers = responses.map(({ answers }) => { return answers });
        const sanitizedQuestions = questions.map(({ question, id }) => { return { id, question: this.replaceQuestionString(question) } });
        const mappedAnswers = answers.map((answer) => { return this.mapAnswerWithQuestions(answer, sanitizedQuestions) });

        return mappedAnswers;
    }

    mapAnswerWithQuestions(answer, questions) {
        const newAnswer = Object.keys(answer).reduce((previous, key) => {
            // key is the question id
            const question = questions.find((question) => { return question.id === key });
            const value = answer[key];
            return { ...previous, [question.question]: value };
        }, {});

        return { ...newAnswer, timestamp: new Date() };
    }

    replaceQuestionString(questionString) {
        return questionString.replace(/'s/g, ' is')
        .replace(/ /g, '_')
        .replace(/\?/g, '')
        .toLowerCase();
    }
};

