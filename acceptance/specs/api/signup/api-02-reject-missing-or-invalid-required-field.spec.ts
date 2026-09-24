import { expectSafeApiRejection } from "../../../src/assertions/api/expect-safe-api-rejection.js";
import { test } from "../../../src/fixtures/api/test-fixture.js";
import {
	api02InvalidCases,
	createInvalidPayload,
} from "../../../src/test-data/api/invalid-sign-up-payloads.js";

test.describe("API-02: Reject missing or invalid required fields", () => {
	test("API-02: rejects an empty payload", {
		tag: ["@security", "@SEC-08"],
	}, async ({ request }) => {
		const response = await request.post("/api/accounts", { data: {} });
		await expectSafeApiRejection(response);
	});

	for (const testCase of api02InvalidCases) {
		test(`API-02: rejects ${testCase.name}`, {
			tag: ["@security", ...(testCase.tags ?? [])],
		}, async ({ request }) => {
			const response = await request.post("/api/accounts", {
				data: createInvalidPayload(testCase),
			});
			await expectSafeApiRejection(response);
		});
	}
});
