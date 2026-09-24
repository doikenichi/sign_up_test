import { test as base, mergeTests } from "@playwright/test";
import {
	type InterceptNetworkCallFn,
	interceptNetworkCall,
} from "@seontechnologies/playwright-utils/intercept-network-call";
import { test as pageObjectFixture } from "./page-object-fixture.js";

const interceptNetworkCallFixture = base.extend<{
	interceptNetworkCall: InterceptNetworkCallFn;
}>({
	interceptNetworkCall: async ({ page }, use) => {
		// Keep the fixture API typed like the package fixture, but call the direct helper so every option, including `timeout`, reaches
		// Playwright's page.waitForRequest API:
		// https://playwright.dev/docs/api/class-page#page-wait-for-request
		//
		// The installed package fixture omits `timeout` while forwarding its options. See package v4.4.1:
		// node_modules/@seontechnologies/playwright-test-helpers/dist/cjs/intercept-network-call/intercept-network-call-fixture.js
		// and the observer it calls:
		// node_modules/@seontechnologies/playwright-test-helpers/dist/cjs/intercept-network-call/core/observe-network-call.js
		await use((options) => interceptNetworkCall({ ...options, page }));
	},
});

// Merge the fixtures
const test = mergeTests(pageObjectFixture, interceptNetworkCallFixture);

const expect = base.expect;

export { expect, test };
