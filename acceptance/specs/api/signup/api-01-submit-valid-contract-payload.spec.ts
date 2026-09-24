import { expectAccountResponseContainsNoSecrets } from "../../../src/assertions/api/expect-account-response-to-exclude-secrets.js";
import { expect, test } from "../../../src/fixtures/api/test-fixture.js";
import {
	attachApiTraffic,
	logApiFailure,
	logApiRequest,
	logApiResponse,
} from "../../../src/logging/api-traffic.js";
import { createDup01ValidFields } from "../../../src/test-data/sign-up-form/dup-01-valid-fields.js";

test.describe("Account-creation API contract", () => {
	test(
		"API-01: submits a valid contract payload without returning secrets",
		{
			tag: ["@security"],
		},
		async ({ apiRequest, logger }, testInfo) => {
			// Arrange: use the API values observed in the successful SUNNY-02 request.
			const data = createDup01ValidFields();
			const payload = {
				firstName: data.firstName,
				lastName: data.lastName,
				phone: `+1${data.phoneNumber}`,
				region: "ON",
				email: data.email,
				password: data.password,
				leadDistributeConsentAgreement: true,
			};

			const startedAt = Date.now();
			let responseStatus: number | undefined;
			let responseBody: unknown;
			let requestError: unknown;

			try {
				logApiRequest(logger, payload, data.password);

				// The account contract is JSON-only. apiRequest@4.4.1 parses JSON responses
				// but does not expose response headers to the test.
				const response = await apiRequest({
					method: "POST",
					path: "/accounts",
					body: payload,
					uiMode: true,
					retryConfig: { maxRetries: 0 },
				});
				responseStatus = response.status;
				responseBody = response.body;

				logApiResponse(logger, responseStatus, responseBody, data.password);

				expect(responseStatus).toBe(201);

				const account = getAccountObject(responseBody);
				expect(account).toMatchObject({
					firstName: payload.firstName,
					lastName: payload.lastName,
					email: payload.email,
					phone: payload.phone,
					region: payload.region,
				});
				expectAccountResponseContainsNoSecrets(responseBody, data.password);
			} catch (error) {
				requestError = error;
				logApiFailure(logger, error, data.password);
				throw error;
			} finally {
				await attachApiTraffic(testInfo, {
					requestBody: payload,
					responseStatus,
					responseBody,
					elapsedMs: Date.now() - startedAt,
					requestError,
					password: data.password,
				});
			}
		},
	);
});

function getAccountObject(responseBody: unknown): Record<string, unknown> {
	if (!isRecord(responseBody)) {
		throw new Error("API-01 response must be a JSON object");
	}

	const account =
		"account" in responseBody ? responseBody.account : responseBody;
	if (!isRecord(account)) {
		throw new Error("API-01 response must contain an account object");
	}

	return account;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
