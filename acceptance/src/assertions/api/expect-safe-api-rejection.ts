import { expect } from "@playwright/test";

const sensitiveErrorDetails = [
	/stack\s*trace/i,
	/\bat\s+[\w$.<>]+\s*\([^\n)]*\)/,
	/\b(?:exception|traceback|internal server error)\b/i,
	/\b(?:password|secret|authorization|cookie)\s*[:=]/i,
];

export async function expectSafeApiRejection(
	response: { status(): number; text(): Promise<string> },
	reflectedValues: string[] = [],
): Promise<void> {
	expect(response.status()).toBeGreaterThanOrEqual(400);
	expect(response.status()).toBeLessThan(500);

	const body = await response.text();
	for (const pattern of sensitiveErrorDetails) {
		expect(body).not.toMatch(pattern);
	}
	for (const value of reflectedValues) {
		expect(body).not.toContain(value);
	}
}
