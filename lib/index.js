import { singleS3StreamOutput, Activity } from 'aries-data';
import rp from 'request-promise';

const baseURI = 'https://api.typeform.com/v1/form';

export default class TypeFormSource extends Activity {
    static props = {
        name: require('../package.json').name, 
        version: require('../package.json').version
    };

    @singleS3StreamOutput('json')
    async onTask(activityTask, config) {
        const data = await this.getTypeformData(config);
        return data;
    }

    async getTypeformData({ uid, apiKey, completed, since, until, offset, limit, token, order_by }) {
        const arr = [];
        const options = {
            uri: `${baseURI}/${uid}`,
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
        arr.push(response.questions);
        arr.push(response.responses);
        arr.push(response.stats);
        return arr;
    }
};