import { expectNoAccountCreationRequest } from "../../../../src/assertions/sign-up-validation/expect-no-account-creation-request.js";
import { expect, test } from "../../../../src/fixtures/ui/test-options.js";
import { completeSignUpForm } from "../../../../src/test-helpers/complete-sign-up-form.js";

test.use({ screenshot: "off" });

const invalidEmails = [
	{ description: "missing at sign", email: "invalid.example.com" },
	{ description: "missing domain", email: "invalid@" },
	{ description: "contains whitespace", email: "invalid @example.com" },
] as const;

test.describe("Email-address validation", () => {
	test("FORM-15: handles an empty email address", {
		tag: ["@security", "@SEC-01", "@SEC-02"],
	}, async ({ content, interceptNetworkCall, signUpPage }) => {
		// Arrange
		await completeSignUpForm(signUpPage, { email: "" });

		// Act
		await expectNoAccountCreationRequest(
			interceptNetworkCall,
			signUpPage.createAccountButton,
		);

		// Assert
		await expect(signUpPage.emailError).toHaveText(content.signUp.emailError);
	});

	for (const invalidCase of invalidEmails) {
		test(`FORM-16: handles an email address ${invalidCase.description}`, {
			tag: ["@security", "@SEC-02"],
		}, async ({ content, interceptNetworkCall, signUpPage }) => {
			// Arrange
			// passwordConfirmation: "" to not allow user submission
			await completeSignUpForm(signUpPage, {
				email: invalidCase.email,
				passwordConfirmation: "",
			});

			// Act
			await expectNoAccountCreationRequest(
				interceptNetworkCall,
				signUpPage.createAccountButton,
			);

			// Assert
			await expect(signUpPage.emailError).toHaveText(content.signUp.emailError);
		});
	}

	test("FORM-17: accepts a valid isolated email address", async ({
		signUpPage,
	}) => {
		// Arrange
		await completeSignUpForm(signUpPage);

		// Act
		await signUpPage.createAccountButton.click();

		// Assert
		await expect(signUpPage.emailError).toHaveCount(0);
	});
});
