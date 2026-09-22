import { test as base } from "@playwright/test";
import type { Logger } from "winston";
import { loadEnvironment } from "../config/environment.js";
import { createLogger } from "../logging/logger.js";

// That is a sensible choice because a logger is infrastructure, not a per-test browser resource. Creating it once per worker avoids unnecessary object churn.
export type WorkerFixtures = {
	logger: Logger;
};

// biome-ignore lint/complexity/noBannedTypes: Playwright uses this generic slot for no additional test fixtures.
export const test = base.extend<{}, WorkerFixtures>({
	logger: [
		async ({ browserName }, use) => {
			const environment = loadEnvironment();
			const logger = createLogger(environment.logging);

			logger.debug("Logger fixture initialized", { browserName });
			await use(logger);
			logger.close();
		},
		{ scope: "worker" },
	],
});

export { expect } from "@playwright/test";
