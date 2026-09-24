import { expect, type Locator } from "@playwright/test";
import {
	type InterceptNetworkCallFn,
	NetworkTimeoutError,
} from "@seontechnologies/playwright-utils/intercept-network-call";

/** Clicks submit and verifies that validation prevented account creation. */
export async function expectNoAccountCreationRequest(
	interceptNetworkCall: InterceptNetworkCallFn,
	createAccountButton: Locator,
): Promise<void> {
	const accountCreationCall = interceptNetworkCall({
		method: "POST",
		url: "**/api/accounts",
		timeout: 1_000,
	}).then(
		() => true,
		(error: unknown) => {
			if (error instanceof NetworkTimeoutError) {
				return false;
			}
			throw error;
		},
	);

	await createAccountButton.click();
	await expect(accountCreationCall).resolves.toBe(false);
}
