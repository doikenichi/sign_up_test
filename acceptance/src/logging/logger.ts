import winston from "winston";
import type { LoggingConfig } from "../config/types.js";

// winston was picked as a logging library for Node.js

/**
 * Creates a logger instance based on the provided configuration.
 * @param config The logging configuration.
 * @param attachmentFilePath Optional per-test log file for Playwright attachments.
 * @returns The created logger instance.
 */
export function createLogger(
	config: LoggingConfig,
	attachmentFilePath?: string,
): winston.Logger {
	const transport =
		config.output === "file"
			? new winston.transports.File({
					filename: config.filePath,
				})
			: new winston.transports.Console();
	const transports = [transport];

	if (attachmentFilePath) {
		transports.push(
			new winston.transports.File({ filename: attachmentFilePath }),
		);
	}

	return winston.createLogger({
		level: config.level,
		format: winston.format.combine(
			winston.format.errors({ stack: true }),
			winston.format.timestamp(),
			winston.format.json(),
		),
		transports,
	});
}
