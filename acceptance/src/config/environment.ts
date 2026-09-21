import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

export type TestEnvironment = Readonly<{
	baseURL: string;
	projectName?: string;
}>;

// Resolve relative ENV_FILE paths from acceptance/, regardless of cwd.
const acceptanceRoot = fileURLToPath(new URL("../../", import.meta.url));

export function loadEnvironment(): TestEnvironment {
	const envFile = process.env.ENV_FILE?.trim();

	// CI can inject variables directly without supplying a file.
	if (envFile) {
		const result = dotenv.config({
			path: resolve(acceptanceRoot, envFile),
			override: false,
		});

		if (result.error) {
			throw new Error(`Could not load ENV_FILE "${envFile}"`, {
				cause: result.error,
			});
		}
	}

	const baseURL = process.env.UI_BASE_URL?.trim();

	if (!baseURL) {
		throw new Error("UI_BASE_URL is required");
	}

	let parsedURL: URL;

	try {
		parsedURL = new URL(baseURL);
	} catch {
		throw new Error("UI_BASE_URL must be an absolute HTTP or HTTPS URL");
	}

	if (!["http:", "https:"].includes(parsedURL.protocol)) {
		throw new Error("UI_BASE_URL must use HTTP or HTTPS");
	}

	const projectName = process.env.TEST_PROJECT?.trim() || undefined;

	return Object.freeze({
		baseURL,
		projectName,
	});
}
