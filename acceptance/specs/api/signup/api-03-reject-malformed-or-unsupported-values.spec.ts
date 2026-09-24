import { expectSafeApiRejection } from "../../../src/assertions/api/expect-safe-api-rejection.js";
import { test } from "../../../src/fixtures/api/test-fixture.js";
import {
	api03InvalidCases,
	createInvalidPayload,
} from "../../../src/test-data/api/invalid-sign-up-payloads.js";

test.describe("API-03: Reject malformed or unsupported values", () => {
	for (const testCase of api03InvalidCases) {
		test(`API-03: rejects ${testCase.name}`, {
			tag: ["@security", "@SEC-07", "@SEC-09"],
		}, async ({ request }) => {
			const response = await request.post("/api/accounts", {
				data: createInvalidPayload(testCase),
			});
			await expectSafeApiRejection(
				response,
				testCase.reflectedValue ? [testCase.reflectedValue] : [],
			);
		});
	}
});
