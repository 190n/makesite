import getopt, { GetoptStatus } from './getopt.js';

const COMPILE_OPTIONS = 'ho:';

export default function runCompile(argv: string[]) {
	let infile: string | undefined;
	for (const result of getopt(argv, COMPILE_OPTIONS)) {
		switch (result.status) {
			case GetoptStatus.OK:
				const { opt, optarg } = result;
				switch (opt) {
					case 'h':
						console.log('compile help');
						process.exit(1);
						break;
					case 'o':
						break;
					default:
						console.log('compile help');
						process.exit(1);
						break;
				}
				break;
			case GetoptStatus.NoArgument:
				console.error(result.error);
				process.exit(1);
				break;
			case GetoptStatus.Unrecognized:
				if (infile === undefined) {
					infile = result.arg;
				} else {
					console.log(`error: input file already specified ('${infile}')`);
					process.exit(1);
				}
				break;
		}
	}
}
