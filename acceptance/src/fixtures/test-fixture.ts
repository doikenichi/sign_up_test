import { readFile } from "node:fs/promises";
import { test as base } from "@playwright/test";
import type { Logger } from "winston";
import { loadEnvironment } from "../config/environment.js";
import { createLogger } from "../logging/logger.js";

export type TestFixtures = {
	logger: Logger;
};

export const test = base.extend<TestFixtures>({
	logger: async ({ browserName }, use, testInfo) => {
		const environment = loadEnvironment();
		const testLogPath = testInfo.outputPath("test.log");
		const logger = createLogger(environment.logging, testLogPath);

		logger.debug("Logger fixture initialized", { browserName });
		await use(logger);
		await closeLogger(logger);
		await testInfo.attach("test.log", {
			body: await readFile(testLogPath),
			contentType: "text/plain",
		});
	},
});

export { expect } from "@playwright/test";

function closeLogger(logger: Logger): Promise<void> {
	return new Promise((resolve, reject) => {
		logger.once("finish", resolve);
		logger.once("error", reject);
		logger.end();
	});
}
