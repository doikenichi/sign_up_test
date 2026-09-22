import { defineConfig, devices } from "@playwright/test";
import { loadEnvironment } from "./src/config/environment.js";

// load .env file passed by
const environment = loadEnvironment();

// https://playwright.dev/docs/emulation
const projects = [
	// chromium as default browser for desktop
	{
		name: "chromium-en",
		use: {
			...devices["Desktop Chrome"],
			locale: "en-CA",
			baseURL: environment.baseURL,
		},
	},
	{
		name: "chromium-fr",
		use: {
			...devices["Desktop Chrome"],
			locale: "fr-CA",
			baseURL: environment.baseURL,
		},
	},
	// picked one mobile and common model - using safari to mix browser model
	// mobile model has no deeper reasoning
	{
		name: "mobile-en",
		use: {
			...devices["iPhone 16 Pro"],
			locale: "en-CA",
			baseURL: environment.baseURL,
		},
	},
	{
		name: "mobile-fr",
		use: {
			...devices["iPhone 16 Pro"],
			locale: "fr-CA",
			baseURL: environment.baseURL,
		},
	},
];

const selectedProject = process.env.TEST_PROJECT;

if (
	selectedProject &&
	!projects.some((project) => project.name === selectedProject)
) {
	throw new Error(`Unknown TEST_PROJECT: ${selectedProject}`);
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: "./specs",
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: "html",
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: "on-first-retry",
	},

	/* Configure projects for major browsers */
	projects: selectedProject
		? projects.filter((project) => project.name === selectedProject)
		: projects,
});
