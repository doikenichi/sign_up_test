import { AxeBuilder } from "@axe-core/playwright";
import type { Locator } from "@playwright/test";
import { expect, test } from "../../../src/fixtures/ui/page-object-fixture.js";

/**
 * Applies the same assertion to every matched control.
 * @param controls
 * @param assertion
 */
async function expectEvery(
	controls: Locator,
	assertion: (control: Locator) => Promise<void>,
): Promise<void> {
	const controlList = await controls.all();

	expect(controlList.length).toBeGreaterThan(0);
	for (const control of controlList) {
		await assertion(control);
	}
}

// https://playwright.dev/docs/accessibility-testing
test.describe("Accessibility checks", () => {
	test.beforeEach(async ({ signUpPage }) => {
		// Arrange
		await signUpPage.goto();
	});

	// The heading is the primary-localized landmark for the sign-up form.
	test("A11Y-01: exposes the localized form heading", {
		tag: ["@smoke"],
	}, async ({ content, signUpPage }) => {
		// Arrange - beforeach
		// Assert
		await expect(signUpPage.formHeader).toBeVisible();
		await expect(signUpPage.formHeader).toHaveText(content.signUp.formHeader);
	});

	// Every interactive control must expose a name to assistive technology.
	test("A11Y-02: gives every form control an accessible name", async ({
		logger,
		signUpPage,
	}) => {
		// Arrange - beforeach
		// Act
		const controls = signUpPage.interactiveFormControls;
		logger.debug(`Found ${await controls.count()} interactive form controls`);

		// Assert
		await expectEvery(controls, (control) =>
			expect(control).toHaveAccessibleName(/.+/),
		);
	});

	// Required state is checked before submission; validation messages are checked after it.
	test("A11Y-03: exposes required and invalid states", {
		tag: ["@security", "@SEC-01"],
	}, async ({ signUpPage }) => {
		// Arrange - beforeach
		const requiredControls = signUpPage.requiredFormControls;

		// Assert the initial required-state contract.
		await expect(requiredControls).toHaveCount(8);
		await expectEvery(requiredControls, async (control) => {
			const isRequired =
				(await control.getAttribute("required")) !== null ||
				(await control.getAttribute("aria-required")) === "true";

			expect(isRequired).toBe(true);
		});

		// Act
		await signUpPage.createAccountButton.click();

		// Assert validation feedback after submitting the empty form.
		await expect(signUpPage.validationMessages).toHaveCount(5);
	});

	// Direct focus checks confirm that each control can receive keyboard focus.
	test("A11Y-04: makes interactive elements keyboard accessible", async ({
		signUpPage,
	}) => {
		// Arrange - beforeach
		// Act and assert each control independently.
		await expectEvery(signUpPage.interactiveFormControls, async (control) => {
			await expect(control).toBeVisible();
			await control.focus();
			await expect(control).toBeFocused();
		});
	});

	// Tab navigation verifies that focus progresses through the form without becoming trapped.
	test("A11Y-05: keeps keyboard focus visible and moving", async ({
		page,
		signUpPage,
	}) => {
		// Arrange - beforeach
		const controls = await signUpPage.interactiveFormControls.all();

		// Act and assert focus as the user advances with the Tab key.
		expect(controls.length).toBeGreaterThan(0);
		await controls[0].focus();

		for (const [index, control] of controls.entries()) {
			await expect(control).toBeVisible();
			await expect(control).toBeFocused();

			if (index < controls.length - 1) {
				await page.keyboard.press("Tab");
			}
		}

		await page.keyboard.press("Tab");
		expect(await page.evaluate(() => document.activeElement?.tagName)).not.toBe(
			"BODY",
		);
	});

	// Help and validation content must be present and contain readable text.
	test("A11Y-06: exposes readable validation and help text", async ({
		signUpPage,
	}) => {
		// Arrange
		await expect(signUpPage.passwordComplexityTip).toBeVisible();

		// Act
		await signUpPage.createAccountButton.click();

		// Assert
		await expectEvery(signUpPage.validationMessages, (control) =>
			expect(control).not.toHaveText(/^\s*$/),
		);
	});

	// Axe violations with critical or serious impact block this accessibility check.
	test("A11Y-07: has no critical or serious violations", async ({ page }) => {
		// Arrange - beforeach
		// Act
		const accessibilityScanResults = await new AxeBuilder({
			page,
		}).analyze();

		const criticalOrSeriousViolations =
			accessibilityScanResults.violations.filter(
				({ impact }) => impact === "critical" || impact === "serious",
			);

		// Assert
		expect(criticalOrSeriousViolations).toEqual([]);
	});
});
