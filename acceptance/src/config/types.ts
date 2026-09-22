export type LogLevel =
	| "error"
	| "warn"
	| "info"
	| "http"
	| "verbose"
	| "debug"
	| "silly";

export type LoggingConfig =
	| Readonly<{
			output: "console";
			level: LogLevel;
	  }>
	| Readonly<{
			output: "file";
			level: LogLevel;
			filePath: string;
	  }>;

export type TestEnvironment = Readonly<{
	baseURL: string;
	projectName?: string;
	logging: LoggingConfig;
}>;
