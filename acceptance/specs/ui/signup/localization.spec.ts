import { expect, test } from "../../../src/fixtures/ui/page-object-fixture.js";
import { getLocaleContent } from "../../../src/locales/index.js";

test("LOC-01: switches to the alternate locale from the sign-up page", async ({
	content,
	navigation,
	signUpPage,
}) => {
	// Arrange
	await signUpPage.goto();
	const initialLocale = await navigation.currentLocale();
	const targetLocale = initialLocale === "en-CA" ? "fr-CA" : "en-CA";
	const targetContent = getLocaleContent(targetLocale);

	expect(initialLocale).toBe(content.locale);

	// Act
	await navigation.switchLocale();

	// Assert
	await expect.poll(() => navigation.currentLocale()).toBe(targetLocale);
	await expect(signUpPage.formHeader).toHaveText(
		targetContent.signUp.formHeader,
	);
	await expect(signUpPage.createAccountButton).toHaveText(
		targetContent.signUp.createYourAccountButton,
	);
	await expect(signUpPage.firstNameInput).toBeVisible();
	await expect(signUpPage.createAccountButton).toBeVisible();
	await expect(signUpPage.createAccountButton).toBeEnabled();
});
