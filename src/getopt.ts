export enum GetoptStatus { OK, NoArgument, Unrecognized };

export type GetoptResult = {
	status: GetoptStatus.OK,
	opt: string,
	optarg?: string,
} | {
	status: GetoptStatus.NoArgument,
	error: string,
} | {
	status: GetoptStatus.Unrecognized,
	error: string,
	arg: string,
};

// C moment
export default function* getopt(argv: string[], options: string): Iterable<GetoptResult> {
	for (let i = 0; i < argv.length; i++) {
		const arg = argv[i];
		if (arg[0] == '-') {
			// loop through options
			for (let j = 1; j < arg.length; j++) {
				const char = arg[j];
				// char is an option; check if it is one we know of
				const matchedOption = options.indexOf(char);
				if (matchedOption >= 0) {
					// found!
					// check if we expect an argument
					if (options[matchedOption + 1] == ':') {
						// check if there's an argument and no more flags in this argument
						if (i + 1 < argv.length && j == arg.length - 1) {
							// don't attempt to parse optarg
							const optarg = argv[++i];
							yield { status: GetoptStatus.OK, opt: char, optarg };
						} else {
							yield {
								status: GetoptStatus.NoArgument,
								error: `error: option requires an argument: '-${char}'`
							};
						}
					} else {
						// no arg needed
						yield { status: GetoptStatus.OK, opt: char };
					}
				} else {
					// unknown
					yield {
						status: GetoptStatus.Unrecognized,
						error: `error: unrecognized option: '-${char}`,
						arg: `-${char}`,
					};
				}
			}
		} else {
			// not an option; may be a filename or something
			yield {
				status: GetoptStatus.Unrecognized,
				error: `error: unrecognized option: '${arg}'`,
				arg,
			};
		}
	}
}
