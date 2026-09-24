import type { Request, TestInfo } from "@playwright/test";

/** Redacts sensitive values before network data is written to test evidence. */
export function evidenceBody(text: string): unknown {
	if (!text) return null;

	try {
		const redact = (value: unknown, key = ""): unknown => {
			if (/password|confirmation|token|cookie|auth|secret/i.test(key)) {
				return "[redacted]";
			}
			if (Array.isArray(value)) return value.map((item) => redact(item));
			if (value !== null && typeof value === "object") {
				return Object.fromEntries(
					Object.entries(value).map(([field, item]) => [
						field,
						redact(item, field),
					]),
				);
			}
			return "[omitted]";
		};

		return redact(JSON.parse(text));
	} catch {
		return "[non-JSON body omitted]";
	}
}

export async function attachNetworkSummary(
	testInfo: TestInfo,
	details: {
		request: Request;
		responseBody: string;
		status: number;
		uiPath: string;
	},
): Promise<void> {
	await testInfo.attach("network-summary.json", {
		body: JSON.stringify({
			request: {
				method: details.request.method(),
				path: new URL(details.request.url()).pathname,
				body: evidenceBody(details.request.postData() ?? ""),
			},
			response: {
				status: details.status,
				body: evidenceBody(details.responseBody),
			},
			ui: { path: details.uiPath },
		}),
		contentType: "application/json",
	});
}
