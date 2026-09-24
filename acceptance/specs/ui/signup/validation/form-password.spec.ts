import { expectNoAccountCreationRequest } from "../../../../src/assertions/sign-up-validation/expect-no-account-creation-request.js";
import { expect, test } from "../../../../src/fixtures/ui/test-options.js";
import { completeSignUpForm } from "../../../../src/test-helpers/complete-sign-up-form.js";

const missingCharacterClasses = [
	{ description: "uppercase letter", password: "aa1234567890" },
	{ description: "lowercase letter", password: "AA1234567890" },
	{ description: "number", password: "Aabcdefghijkl" },
] as const;

const compliantPasswords = [
	{ description: "12-character minimum", password: "Aa1234567890" },
	{ description: "32-character maximum", password: `Aa1${"b".repeat(29)}` },
	{ description: "representative value", password: "Aa1b2c3d4e5f" },
] as const;

test.describe("Password validation", () => {
	test("FORM-18: handles an empty password", {
		tag: ["@security", "@SEC-01"],
	}, async ({ interceptNetworkCall, signUpPage }) => {
		// Arrange
		await completeSignUpForm(signUpPage, {
			password: "",
			passwordConfirmation: "",
			firstName: "",
		});

		// Act
		await expectNoAccountCreationRequest(
			interceptNetworkCall,
			signUpPage.createAccountButton,
		);

		// Assert
		await expect(signUpPage.passwordError).toBeVisible();
	});

	test("FORM-19: handles a password below the 12-character minimum", {
		tag: ["@security", "@SEC-03", "@SEC-07"],
	}, async ({ content, interceptNetworkCall, signUpPage }) => {
		// Arrange
		const password = "Aa123456789";
		await completeSignUpForm(signUpPage, {
			password,
			passwordConfirmation: password,
			firstName: "",
		});

		// Act
		await expectNoAccountCreationRequest(
			interceptNetworkCall,
			signUpPage.createAccountButton,
		);

		// Assert
		await expect(signUpPage.passwordError).toHaveText(
			content.signUp.passwordErrorMinimumRequired,
		);
	});

	test("FORM-20: handles a password above the 32-character maximum", {
		tag: ["@security", "@SEC-03", "@SEC-07"],
	}, async ({ interceptNetworkCall, signUpPage }) => {
		// Arrange
		const password = `Aa1${"b".repeat(30)}`;
		await completeSignUpForm(signUpPage, {
			password,
			passwordConfirmation: password,
			firstName: "",
		});

		// Act
		await expectNoAccountCreationRequest(
			interceptNetworkCall,
			signUpPage.createAccountButton,
		);

		// Assert
		await expect(signUpPage.passwordError).toBeVisible();
	});

	for (const invalidCase of missingCharacterClasses) {
		test(`FORM-21: handles a password missing required ${invalidCase.description}`, {
			tag: ["@security", "@SEC-03"],
		}, async ({ content, interceptNetworkCall, signUpPage }) => {
			// Arrange
			await completeSignUpForm(signUpPage, {
				password: invalidCase.password,
				passwordConfirmation: invalidCase.password,
				firstName: "",
			});

			// Act
			await expectNoAccountCreationRequest(
				interceptNetworkCall,
				signUpPage.createAccountButton,
			);

			// Assert
			await expect(signUpPage.passwordError).toHaveText(
				content.signUp.passwordErrorComplexity,
			);
		});
	}

	for (const validCase of compliantPasswords) {
		test(`FORM-22: accepts a compliant password at the ${validCase.description}`, {
			tag: ["@security", "@SEC-03"],
		}, async ({ signUpPage }) => {
			// Arrange
			await completeSignUpForm(signUpPage, {
				password: validCase.password,
				passwordConfirmation: validCase.password,
				firstName: "",
			});

			// Act
			await signUpPage.createAccountButton.click();

			// Assert
			await expect(signUpPage.passwordError).toHaveCount(0);
		});
	}
});
