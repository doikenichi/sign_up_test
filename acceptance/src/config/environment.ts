import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import type { LoggingConfig, LogLevel, TestEnvironment } from "./types.js";

// Resolve relative ENV_FILE paths from acceptance/, regardless of cwd.
const acceptanceRoot = fileURLToPath(new URL("../../", import.meta.url));
let environment: TestEnvironment | undefined;

/**
 * Loads the environment variables from the .env file and returns a TestEnvironment object.
 */
export function loadEnvironment(): TestEnvironment {
	// use loaded configuration instead of loading it again
	if (environment) {
		return environment;
	}

	const envFile = process.env.ENV_FILE?.trim();

	// CI can inject variables directly without supplying a file.
	if (envFile) {
		const result = dotenv.config({
			path: resolve(acceptanceRoot, envFile),
			override: true,
		});

		if (result.error) {
			throw new Error(`Could not load ENV_FILE "${envFile}"`, {
				cause: result.error,
			});
		}
	}

	const baseURL = parseBaseURL(
		process.env.UI_BASE_URL?.trim() ?? "",
		"UI_BASE_URL",
	);

	const apiBaseURL = parseBaseURL(
		process.env.API_BASE_URL?.trim() ?? "",
		"API_BASE_URL",
	);

	const projectName = process.env.TEST_PROJECT?.trim() || undefined;

	environment = Object.freeze({
		baseURL,
		apiBaseURL,
		projectName,
		logging: loadLoggingConfig(),
	});

	return environment;
}

/**
 * Parses the LOG_LEVEL environment variable and returns a LogLevel value.
 * @param value The value of the LOG_LEVEL environment variable.
 * @returns A LogLevel value.
 * @throws An error if the LOG_LEVEL value is invalid.
 */
function parseLogLevel(value: string): LogLevel {
	switch (value) {
		case "error":
		case "warn":
		case "info":
		case "http":
		case "verbose":
		case "debug":
		case "silly":
			return value;
		default:
			throw new Error(
				`Invalid LOG_LEVEL "${value}". Expected error, warn, info, http, verbose, debug, or silly.`,
			);
	}
}

/**
 * Parses the BASE_URL environment variable and returns a URL.
 * @param value The value of the BASE_URL environment variable.
 * @param variableName The name of the environment variable.
 * @returns A URL.
 * @throws An error if the BASE_URL value is invalid.
 */
function parseBaseURL(value: string, variableName: string): string {
	let parsedURL: URL;

	try {
		parsedURL = new URL(value);
	} catch {
		throw new Error(`${variableName} must be an absolute HTTP or HTTPS URL`);
	}

	if (!["http:", "https:"].includes(parsedURL.protocol)) {
		throw new Error(`${variableName} must use HTTP or HTTPS`);
	}

	if (!parsedURL.pathname.endsWith("/")) {
		parsedURL.pathname += "/";
	}

	return parsedURL.toString();
}

/**
 * Uses the loaded environment variables to configure logging and return Logger Configuration.
 */
function loadLoggingConfig(): LoggingConfig {
	// default log level is info
	const level = parseLogLevel(process.env.LOG_LEVEL?.trim() ?? "info");

	// default log output is console
	const output = process.env.LOG_OUTPUT?.trim() ?? "console";

	if (output === "console") {
		return Object.freeze({ output, level });
	}

	if (output === "file") {
		const file = process.env.LOG_FILE?.trim();

		if (!file) {
			throw new Error("LOG_FILE is required when LOG_OUTPUT is file");
		}

		return Object.freeze({
			output,
			level,
			filePath: resolve(acceptanceRoot, file),
		});
	}

	throw new Error(`Invalid LOG_OUTPUT "${output}". Expected console or file.`);
}
