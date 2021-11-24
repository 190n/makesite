#!/usr/bin/env node

import runCompile from './compile.js';

const subcommand = process.argv[2];
switch (subcommand) {
	case 'compile':
		runCompile(process.argv.slice(3));
		break;
	case 'render':
		break;
	default:
		console.error(`makesite: unknown subcommand '${subcommand}'
run with no arguments or '-h' for a list`);
}
