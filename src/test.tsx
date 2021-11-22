console.time('whole file');

import { evaluateSync } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime.js';
import ReactDOMServer from 'react-dom/server.js';

console.log(ReactDOMServer.renderToStaticMarkup(evaluateSync('# Hello, MDX', { ...runtime }).default({})));

console.timeEnd('whole file');
