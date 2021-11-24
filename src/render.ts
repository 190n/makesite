console.time('whole file');

import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime.js';
import ReactDOMServer from 'react-dom/server.js';
import fs from 'fs';

(async () => {
	console.log(ReactDOMServer.renderToStaticMarkup((await evaluate(fs.readFileSync(process.argv[2]), {
		...runtime,
		useDynamicImport: true,
		baseUrl: `file://${process.cwd()}/`,
	})).default({})));
})();

console.timeEnd('whole file');
