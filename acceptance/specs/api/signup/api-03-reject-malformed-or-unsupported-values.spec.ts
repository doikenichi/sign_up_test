import type { TestInfo } from "@playwright/test";
import type { Logger } from "winston";
import { expectSafeApiRejection } from "../../../src/assertions/api/expect-safe-api-rejection.js";
import { test } from "../../../src/fixtures/api/test-fixture.js";
import {
	attachApiTraffic,
	logApiFailure,
	logApiRequest,
	logApiResponse,
} from "../../../src/logging/api-traffic.js";
import {
	api03InvalidCases,
	createInvalidPayload,
	type SignUpPayload,
} from "../../../src/test-data/api/invalid-sign-up-payloads.js";

test.describe("API-03: Reject malformed or unsupported values", () => {
	for (const testCase of api03InvalidCases) {
		test(
			`API-03: rejects ${testCase.name}`,
			{
				tag: ["@security", "@SEC-07", "@SEC-09"],
			},
			async ({ apiRequest, logger }, testInfo) => {
				const payload = createInvalidPayload(testCase);
				const password =
					typeof payload.password === "string"
						? payload.password
						: "password-not-present";

				await submitInvalidPayload(
					() =>
						apiRequest({
							method: "POST",
							path: "/accounts",
							body: payload,
							uiMode: true,
							retryConfig: { maxRetries: 0 },
						}),
					payload,
					password,
					logger,
					testInfo,
					testCase.reflectedValue ? [testCase.reflectedValue] : [],
				);
			},
		);
	}
});

async function submitInvalidPayload(
	sendRequest: () => Promise<{
		status: number;
		body: unknown;
	}>,
	payload: SignUpPayload,
	password: string,
	logger: Logger,
	testInfo: TestInfo,
	reflectedValues: string[] = [],
): Promise<void> {
	const startedAt = Date.now();
	let responseStatus: number | undefined;
	let responseBody: unknown;
	let requestError: unknown;

	try {
		logApiRequest(logger, payload, password);

		const response = await sendRequest();
		responseStatus = response.status;
		responseBody = response.body;

		logApiResponse(logger, responseStatus, responseBody, password);
		await expectSafeApiRejection(
			{
				status: () => responseStatus as number,
				text: async () =>
					typeof responseBody === "string"
						? responseBody
						: (JSON.stringify(responseBody) ?? ""),
			},
			reflectedValues,
		);
	} catch (error) {
		requestError = error;
		logApiFailure(logger, error, password);
		throw error;
	} finally {
		await attachApiTraffic(testInfo, {
			requestBody: payload,
			responseStatus,
			responseBody,
			elapsedMs: Date.now() - startedAt,
			requestError,
			password,
		});
	}
}
