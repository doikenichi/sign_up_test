import { defineConfig, devices } from "@playwright/test";
import { loadEnvironment } from "./src/config/environment.js";

// load .env file passed by
const environment = loadEnvironment();

// https://playwright.dev/docs/emulation
const projects = [
	// chromium as default browser for desktop
	{
		name: "chromium-en",
		testIgnore: "**/api/**/*.spec.ts",
		use: {
			...devices["Desktop Chrome"],
			locale: "en-CA",
			baseURL: environment.baseURL,
		},
	},
	{
		name: "chromium-fr",
		testIgnore: "**/api/**/*.spec.ts",
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
		testIgnore: "**/api/**/*.spec.ts",
		use: {
			...devices["iPhone 16 Pro"],
			locale: "en-CA",
			baseURL: environment.baseURL,
		},
	},
	{
		name: "mobile-fr",
		testIgnore: "**/api/**/*.spec.ts",
		use: {
			...devices["iPhone 16 Pro"],
			locale: "fr-CA",
			baseURL: environment.baseURL,
		},
	},
	{
		name: "api",
		testMatch: "**/api/**/*.spec.ts",
		use: {
			baseURL: environment.apiBaseURL,
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
	// reporter: "html",
	reporter: [
		["list", { printFailuresInline: true }],
		["json", { outputFile: "test-results/results.json" }],
	],
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Keep a trace for failed tests so their actions are available in the UI. */
		trace: "retain-on-failure",
		/* Take screenshots on failure */
		screenshot: "only-on-failure",
	},

	/* Configure projects for major browsers */
	projects: selectedProject
		? projects.filter((project) => project.name === selectedProject)
		: projects,
});
