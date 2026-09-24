import type { Locator } from "@playwright/test";
import { expect, test } from "@playwright/test";

/**
 * Verifies that a locator collection resolves to usable form controls for the
 * active page state.
 */
export async function expectUsableControls(controls: Locator): Promise<void> {
	await test.step("Verify controls are present, visible, and enabled", async () => {
		const matchedControls = await controls.all();
		expect(matchedControls, "expected controls are present").not.toHaveLength(
			0,
		);
		for (const control of matchedControls) {
			await expect(control).toBeVisible();
			await expect(control).toBeEnabled();
		}
	});
}
