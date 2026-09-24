import { expectNoAccountCreationRequest } from "../../../../src/assertions/sign-up-validation/expect-no-account-creation-request.js";
import { expect, test } from "../../../../src/fixtures/ui/test-options.js";
import { completeSignUpForm } from "../../../../src/test-helpers/complete-sign-up-form.js";

test.use({ screenshot: "off" });

const invalidNumbers = [
	{ description: "letters", phoneNumber: "41655ABCD" },
	{ description: "too few digits", phoneNumber: "416555013" },
	{ description: "too many digits", phoneNumber: "4165550133333333" },
] as const;

test.describe("Phone-number validation", () => {
	test("FORM-11: handles an empty phone number", {
		tag: ["@security", "@SEC-01", "@SEC-05"],
	}, async ({ interceptNetworkCall, signUpPage }) => {
		// Arrange
		await completeSignUpForm(signUpPage, { phoneNumber: "", firstName: "" });

		// Act
		await expectNoAccountCreationRequest(
			interceptNetworkCall,
			signUpPage.createAccountButton,
		);

		// Assert
		await expect(signUpPage.phoneNumberError).toBeVisible();
	});

	for (const invalidCase of invalidNumbers) {
		test(`FORM-12: handles phone number with ${invalidCase.description}`, {
			tag: ["@security", "@SEC-05"],
		}, async ({ interceptNetworkCall, signUpPage }) => {
			// Arrange
			await completeSignUpForm(signUpPage, {
				phoneCountry: "CA",
				phoneNumber: invalidCase.phoneNumber,
				firstName: "",
			});

			// Act
			await expectNoAccountCreationRequest(
				interceptNetworkCall,
				signUpPage.createAccountButton,
			);

			// Assert
			await expect(signUpPage.phoneNumberError).toBeVisible();
		});
	}

	test("FORM-13: accepts a valid Brazilian phone number", {
		tag: ["@security", "@SEC-05"],
	}, async ({ signUpPage }) => {
		// Arrange
		await completeSignUpForm(signUpPage, {
			phoneCountry: "BR",
			phoneNumber: "11912345678",
			firstName: "",
		});

		// Act
		await signUpPage.createAccountButton.click();

		// Assert
		await expect(signUpPage.phoneCountrySelect).toHaveValue("BR");
		await expect(signUpPage.phoneNumberInput).toHaveValue("(11) 91234-5678");
		await expect(signUpPage.phoneNumberError).toHaveCount(0);
	});

	test("FORM-14: accepts a valid Canadian phone number", {
		tag: ["@security", "@SEC-05"],
	}, async ({ signUpPage }) => {
		// Arrange
		await completeSignUpForm(signUpPage, {
			phoneCountry: "CA",
			phoneNumber: "4165550133",
			firstName: "",
		});

		// Act
		await signUpPage.createAccountButton.click();

		// Assert
		await expect(signUpPage.phoneCountrySelect).toHaveValue("CA");
		await expect(signUpPage.phoneNumberInput).toHaveValue("(416) 555-0133");
		await expect(signUpPage.phoneNumberError).toHaveCount(0);
	});
});
