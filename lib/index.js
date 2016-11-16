import { singleS3StreamOutput, Activity } from 'aries-data';
import rp from 'request-promise';
import TypeformStream from './TypeformStream';

export default class TypeFormSource extends Activity {
    static props = {
        name: require('../package.json').name,
        version: require('../package.json').version
    };

    @singleS3StreamOutput()
    async onTask(activityTask, config) {
        const stream = new TypeformStream(config);
        stream.on('error', ::this.log.error);
        return stream;
    }
}
