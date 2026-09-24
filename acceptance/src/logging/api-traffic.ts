import type { TestInfo } from "@playwright/test";
import type { Logger } from "winston";

const API_METHOD = "POST";
const API_PATH = "/api/accounts";

type ApiTrafficDetails = {
	requestBody: unknown;
	responseStatus?: number;
	responseBody: unknown;
	elapsedMs: number;
	requestError?: unknown;
	password: string;
};

/** Logs the account request after removing sensitive values.
 * @param logger Winston logger used to write the request entry.
 * @param requestBody Payload sent to the account API.
 * @param password Password to redact from the payload.
 * @returns Nothing; writes a sanitized request entry to the log.
 */
export function logApiRequest(
	logger: Logger,
	requestBody: unknown,
	password: string,
): void {
	logger.info("Submitting sanitized account API request", {
		request: sanitizeApiValue(requestBody, password),
		method: API_METHOD,
		path: API_PATH,
	});
}

/** Logs the account response after removing sensitive values.
 * @param logger Winston logger used to write the response entry.
 * @param responseStatus HTTP status returned by the account API.
 * @param responseBody Parsed response from the account API.
 * @param password Password to redact from the response.
 * @returns Nothing; writes a sanitized response entry to the log.
 */
export function logApiResponse(
	logger: Logger,
	responseStatus: number,
	responseBody: unknown,
	password: string,
): void {
	logger.info("Received sanitized account API response", {
		response: {
			status: responseStatus,
			body: sanitizeApiValue(responseBody, password),
		},
	});
}

/** Logs a sanitized error from the account request or its assertions.
 * @param logger Winston logger used to write the error entry.
 * @param error Request or assertion error to log.
 * @param password Password to redact from the error.
 * @returns Nothing; writes a sanitized error entry to the log.
 */
export function logApiFailure(
	logger: Logger,
	error: unknown,
	password: string,
): void {
	logger.error("Account API request or assertion failed", {
		error: sanitizeApiValue(error, password),
	});
}

/** Attaches a sanitized request and response summary to the test result.
 * @param testInfo Playwright test context that receives the attachment.
 * @param details Request, response, timing, and error data for the summary.
 * @returns A promise that resolves when `api-traffic.json` is attached.
 */
export async function attachApiTraffic(
	testInfo: TestInfo,
	details: ApiTrafficDetails,
): Promise<void> {
	await testInfo.attach("api-traffic.json", {
		body: JSON.stringify({
			request: {
				method: API_METHOD,
				path: API_PATH,
				body: sanitizeApiValue(details.requestBody, details.password),
			},
			response: {
				status: details.responseStatus ?? null,
				body: sanitizeApiValue(details.responseBody, details.password),
			},
			elapsedMs: details.elapsedMs,
			error: details.requestError
				? sanitizeApiValue(details.requestError, details.password)
				: null,
		}),
		contentType: "application/json",
	});
}

/** Redacts passwords, sensitive fields, and bearer tokens from values.
 * @param value Value to sanitize.
 * @param password Password string to remove wherever it appears.
 * @returns A copy of the value with sensitive data replaced by `[redacted]`.
 */
function sanitizeApiValue(value: unknown, password: string): unknown {
	if (value === null || value === undefined) return value;
	if (typeof value === "string") {
		return value
			.split(password)
			.join("[redacted]")
			.replace(/Bearer\s+[^\s]+/gi, "Bearer [redacted]");
	}
	if (typeof value !== "object") return value;
	if (Array.isArray(value)) {
		return value.map((item) => sanitizeApiValue(item, password));
	}

	return Object.fromEntries(
		Object.entries(value).map(([key, item]) => [
			key,
			/password|authorization|cookie|token|secret/i.test(key)
				? "[redacted]"
				: sanitizeApiValue(item, password),
		]),
	);
}
