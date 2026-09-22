import winston from "winston";
import type { LoggingConfig } from "../config/types.js";

// winston was picked as a logging library for Node.js

// Lazy singleton used to avoid creating multiple logger instances
// and properly load the configuration
let instance: winston.Logger | undefined;

/**
 * Creates a logger instance based on the provided configuration.
 * @param config The logging configuration.
 * @returns The created logger instance.
 */
export function createLogger(config: LoggingConfig): winston.Logger {
	if (instance) {
		return instance;
	}

	const transport =
		config.output === "file"
			? new winston.transports.File({
					filename: config.filePath,
				})
			: new winston.transports.Console();

	instance = winston.createLogger({
		level: config.level,
		format: winston.format.combine(
			winston.format.errors({ stack: true }),
			winston.format.timestamp(),
			winston.format.json(),
		),
		transports: [transport],
	});

	return instance;
}
