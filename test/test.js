import test from 'blue-tape';
import TypeFormSource from '../lib/index.js';
import { config } from './test.config';
import fs from 'fs';


// example - make sure configuration is the same
test('proper configuration', t => {
	const activity = new TypeFormSource();
	t.equal(TypeFormSource.props.name, require('../package.json').name);
	t.equal(TypeFormSource.props.version, require('../package.json').version);
	t.end();
});

test('oauth onTaskCopy', async (t) => {
	const source = new TypeFormSource();
	const data = await source.onTaskCopy(config);
});
