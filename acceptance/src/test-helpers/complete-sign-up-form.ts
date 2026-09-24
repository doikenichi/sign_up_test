import { expect } from "@playwright/test";
import type { SignUpForm, SignUpPage } from "../pages/signup.page.js";
import { createForm01ValidFields } from "../test-data/sign-up-form/form-01-valid-fields.js";

/** Opens a fresh sign-up form with valid defaults and applies the supplied overrides. */
export async function completeSignUpForm(
	signUpPage: SignUpPage,
	overrides: Partial<SignUpForm> = {},
): Promise<void> {
	const data = createForm01ValidFields();
	await signUpPage.goto();
	await expect(signUpPage.provinceOfPurchaseSelect).toHaveValue(/.+/);
	await signUpPage.fillForm({
		...data,
		phoneCountry: "CA",
		provinceOfPurchase: "Ontario",
		passwordConfirmation: data.password,
		...overrides,
	});
}
