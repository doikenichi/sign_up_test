import { mergeTests } from "@playwright/test";
import { test as apiRequestFixture } from "@seontechnologies/playwright-utils/api-request/fixtures";
import { expect, test as sharedTest } from "../test-fixture.js";

export type { TestFixtures } from "../test-fixture.js";

export const test = mergeTests(sharedTest, apiRequestFixture);
export { expect };
