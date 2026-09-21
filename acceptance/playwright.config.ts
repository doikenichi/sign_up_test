import {defineConfig, devices} from "@playwright/test";
import {loadEnvironment} from "./src/config/environment.js";

// load .env file passed by
const environment = loadEnvironment();

const projects = [
    {
        name: "chromium-en",
        use: {...devices["Desktop Chrome"], locale: "en-CA"},
    },
    {
        name: "chromium-fr",
        use: {...devices["Desktop Chrome"], locale: "fr-CA"},
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
        /* Base URL to use in actions like `await page.goto('')`. */
        // baseURL: 'http://localhost:3000',
        baseURL: environment.baseURL,

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: "on-first-retry",
    },

    /* Configure projects for major browsers */
    projects: selectedProject
        ? projects.filter((project) => project.name === selectedProject)
        : projects,
    // projects: [
    // {
    //   name: "chromium-en",
    //   use: { ...devices["Desktop Chrome"] },
    // },
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
    // ],

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://localhost:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});
