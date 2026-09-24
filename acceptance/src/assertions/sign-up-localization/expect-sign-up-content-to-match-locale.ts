import { expect, test } from "@playwright/test";
import type { SignUpContent } from "../../locales/types.js";
import type { SignUpPage } from "../../pages/signup.page.js";

/**
 * Verifies the localized sign-up copy and accessible names that belong to the
 * sign-up page content contract for the active locale.
 */
export async function expectSignUpContentToMatchLocale(
	signUpPage: SignUpPage,
	expectedContent: SignUpContent,
): Promise<void> {
	await test.step("Expect sign-up content to match the locale", async () => {
		// Text assertions cover visible page copy shown to the user.
		const textAssertions = [
			[signUpPage.formHeader, expectedContent.formHeader],
			[
				signUpPage.passwordComplexityTip,
				expectedContent.passwordErrorComplexityTip,
			],
			[signUpPage.loginLink, expectedContent.LoginLink],
			[signUpPage.termsOfUseLink, expectedContent.TermsOfServiceLink],
			[signUpPage.createAccountButton, expectedContent.createYourAccountButton],
		] as const;

		// Accessible-name assertions cover labels announced to assistive tech.
		const accessibleNameAssertions = [
			[signUpPage.firstNameInput, expectedContent.firstNameInput],
			[signUpPage.lastNameInput, expectedContent.LastNameInput],
			[signUpPage.phoneNumberInput, expectedContent.phoneNumberInput],
			[
				signUpPage.provinceOfPurchaseSelect,
				expectedContent.provinceOfPurchaseLabel,
			],
			[signUpPage.emailInput, expectedContent.emailInput],
			[signUpPage.passwordInput, expectedContent.passwordInput],
			[
				signUpPage.passwordConfirmationInput,
				expectedContent.passwordConfirmationInput,
			],
			[
				signUpPage.termsAndConditionsCheckbox,
				expectedContent.agreementCheckbox,
			],
		] as const;

		for (const [locator, expectedText] of textAssertions) {
			await expect(locator).toHaveText(expectedText);
		}
		for (const [locator, expectedName] of accessibleNameAssertions) {
			await expect(locator).toHaveAccessibleName(expectedName);
		}
	});
}
