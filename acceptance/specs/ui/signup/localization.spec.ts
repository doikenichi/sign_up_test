import { expectUsableControls } from "../../../src/assertions/form-controls/expect-usable-controls.js";
import { expectLinkLabelAndDestination } from "../../../src/assertions/navigation-links/expect-link-label-and-destination.js";
import { expectSignUpContentToMatchLocale } from "../../../src/assertions/sign-up-localization/expect-sign-up-content-to-match-locale.js";
import { expect, test } from "../../../src/fixtures/ui/page-object-fixture.js";
import { getAlternateSupportedLocale } from "../../../src/locales/get-alternate-supported-locale.js";
import { getLocaleContent } from "../../../src/locales/index.js";
import {
	approvedLinkDestinationsByLocale,
	type SignUpLinkName,
} from "../../../src/test-data/sign-up-localization/approved-link-destinations-by-locale.js";

// https://playwright.dev/docs/test-parameterize
// Parameterized tests
const localizedLinks = [
	{ caseName: "login", key: "login" },
	{ caseName: "terms", key: "terms" },
	{ caseName: "privacy", key: "privacy" },
] as const satisfies readonly { caseName: string; key: SignUpLinkName }[];

test.describe("Locale validation", () => {
	test.beforeEach(async ({ signUpPage }) => {
		// Arrange
		await signUpPage.goto();
	});

	/**
	 * LOC-01
	 */
	test("LOC-01: switches to the alternate locale from the sign-up page", async ({
		content,
		signUpPage,
	}) => {
		// Arrange
		const initialLocale = await signUpPage.header.currentLocale();
		const targetLocale = getAlternateSupportedLocale(content.locale);
		const targetContent = getLocaleContent(targetLocale);

		expect(initialLocale).toBe(content.locale);

		// Act
		await signUpPage.header.switchLocale();

		// Assert
		expect(await signUpPage.header.currentLocale()).toBe(targetLocale);
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

	/**
	 * LOC-02
	 */
	test("LOC-02: compares visible sign-up content with the locale fixture", async ({
		content,
		signUpPage,
	}) => {
		// Assert
		await expectSignUpContentToMatchLocale(signUpPage, content.signUp);
	});

	/**
	 * LOC-03
	 */
	for (const link of localizedLinks) {
		test(`LOC-03: validates the ${link.caseName} link label, destination, and reachability`, async ({
			content,
			page,
			signUpPage,
		}): Promise<void> => {
			// Arrange
			const expectedDestination =
				approvedLinkDestinationsByLocale[content.locale][link.key];
			const linkLocator = {
				login: signUpPage.loginLink,
				terms: signUpPage.termsOfUseLink,
				privacy: signUpPage.footer.privacyPolicyLink,
			}[link.key];
			const expectedLabel = {
				login: content.signUp.LoginLink,
				terms: content.signUp.TermsOfServiceLink,
				privacy: content.footer.privacyPolicy,
			}[link.key];

			// Assert the localized label and approved destination.
			await expectLinkLabelAndDestination(linkLocator, {
				label: expectedLabel,
				destination: expectedDestination,
			});

			// Verify the destination resolves without coupling the test to its page markup.
			const response = await page.request.get(expectedDestination);
			expect(response.ok()).toBe(true);
		});
	}

	/**
	 * LOC-04
	 * https://playwright.dev/docs/test-snapshots
	 *
	 * Asserts that the layout via screenshots comparison of the sign-up page is usable before and after switching locale.
	 *
	 * To update the golden screenshots, run :
	 *  * cross-env ENV_FILE=env/.env.mobile-en playwright test --grep "LOC-04" --update-snapshots
	 *  * cross-env ENV_FILE=env/.env.desk-en playwright test --grep "LOC-04" --update-snapshots
	 */
	test("LOC-04: renders a usable layout before and after switching locale", async ({
		content,
		page,
		signUpPage,
	}) => {
		// Arrange
		const initialLocale = await signUpPage.header.currentLocale();
		const targetLocale = getAlternateSupportedLocale(content.locale);
		expect(initialLocale).toBe(content.locale);

		// Assert the initial locale before checking its rendered layout.
		// await expectNoRenderedLayoutIssues(page);
		await expectUsableControls(signUpPage.interactiveFormControls);
		await expect(page).toHaveScreenshot(`signup-${initialLocale}.png`, {
			fullPage: true,
			animations: "disabled",
			maxDiffPixelRatio: 0.05, // ratio of 5% was picked as a low number to avoid false positives.
		});

		// Act
		// Switch locale and repeat the same checks for the translated layout.
		await signUpPage.header.switchLocale();

		// Assert
		expect(await signUpPage.header.currentLocale()).toBe(targetLocale);
		await expectUsableControls(signUpPage.interactiveFormControls);
		await expect(page).toHaveScreenshot(`signup-${targetLocale}.png`, {
			fullPage: true,
			animations: "disabled",
			maxDiffPixelRatio: 0.05, // ratio of 5% was picked as a low number to avoid false positives.
		});
	});
});
