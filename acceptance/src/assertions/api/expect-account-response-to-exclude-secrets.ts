import { expect } from "@playwright/test";

/**
 * Checks an account-creation response for credential and populated account-secret disclosure.
 * A sibling `token` response object is allowed for the signup authentication flow.
 */
export function expectAccountResponseContainsNoSecrets(
	responseBody: unknown,
	submittedPassword: string,
): void {
	const account = getAccountObject(responseBody);
	expect(containsAccountSecret(account)).toBe(false);
	expect(JSON.stringify(responseBody).includes(submittedPassword)).toBe(false);
}

function getAccountObject(responseBody: unknown): Record<string, unknown> {
	if (!isRecord(responseBody)) {
		throw new Error("Account-creation response must be a JSON object");
	}

	const account =
		"account" in responseBody ? responseBody.account : responseBody;
	if (!isRecord(account)) {
		throw new Error("Account-creation response must contain an account object");
	}

	return account;
}

function containsAccountSecret(value: unknown): boolean {
	if (Array.isArray(value)) {
		return value.some(containsAccountSecret);
	}

	if (!isRecord(value)) {
		return false;
	}

	return Object.entries(value).some(([key, nestedValue]) => {
		if (/password|confirmation|token|secret|authorization|cookie/i.test(key)) {
			return true;
		}

		if (/^sin$/i.test(key)) {
			return isPopulated(nestedValue);
		}

		return containsAccountSecret(nestedValue);
	});
}

function isPopulated(value: unknown): boolean {
	if (typeof value === "string") {
		return value.trim().length > 0;
	}

	return value !== null && value !== undefined;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
