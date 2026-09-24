import { expectAccountResponseContainsNoSecrets } from "../../../src/assertions/api/expect-account-response-to-exclude-secrets.js";
import { expect, test } from "../../../src/fixtures/api/test-fixture.js";
import { createDup01ValidFields } from "../../../src/test-data/sign-up-form/dup-01-valid-fields.js";

test.describe("Account-creation API contract", () => {
	test("API-01: submits a valid contract payload without returning secrets", {
		tag: ["@security"],
	}, async ({ request }) => {
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

		// Act
		const response = await request.post("/api/accounts", { data: payload });

		// Assert
		expect(response.status()).toBe(201);
		expect(response.headers()["content-type"]).toContain("application/json");

		const responseBody: unknown = await response.json();
		const account = getAccountObject(responseBody);
		expect(account).toMatchObject({
			firstName: payload.firstName,
			lastName: payload.lastName,
			email: payload.email,
			phone: payload.phone,
			region: payload.region,
		});
		expectAccountResponseContainsNoSecrets(responseBody, data.password);
	});
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
