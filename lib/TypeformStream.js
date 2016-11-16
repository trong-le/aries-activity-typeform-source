import { logger } from 'aries-data';
import { Readable } from 'stream';
import rp from 'request-promise';

const baseURI = 'https://api.typeform.com/v1/form';
const BATCH_SIZE = 100;

@logger()
export default class TypeformStream extends Readable {
    constructor(config) {
        super();
        this.config = config;
        this.batch = 0;
    }

    /*
     * Gets the next chunk of data from the Typeform API
     */
    async getChunk({ uid, apiKey, completed, since, until, offset, limit, token, order_by }) {
        const options = {
            uri: `${baseURI}/${uid}`,
            qs: {
                key: apiKey,
                completed,
                since,
                until,
                offset: this.batch,
                limit: BATCH_SIZE,
                token,
                order_by
            },
            json: true
        }
        const data = await rp(options);

        // Typeform sends questions data no matter what. Ends when there are no responses left in payload
        if (!data || data.responses.length === 0) return null;
        this.batch += BATCH_SIZE;
        return JSON.stringify(data);
    }

    /*
     * Required implementation for a Readable Stream
     * Get the next chunk of data and push it into the buffer
     */
    _read() {
        this.getChunk(this.config)
            .then(::this.push)
            .catch(this.emit.bind(this, 'error'))
    }
}
