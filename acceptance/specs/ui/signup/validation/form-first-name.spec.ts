import { expectNoAccountCreationRequest } from "../../../../src/assertions/sign-up-validation/expect-no-account-creation-request.js";
import { expect, test } from "../../../../src/fixtures/ui/test-options.js";
import { completeSignUpForm } from "../../../../src/test-helpers/complete-sign-up-form.js";

type FirstNameValidationCase = {
	id:
		| "FORM-04"
		| "FORM-05"
		| "FORM-05A"
		| "FORM-05B"
		| "FORM-06"
		| "FORM-26"
		| "FORM-27";
	description: string;
	firstName: string;
	error: "required" | "invalid" | "too_long" | "none";
	tags: string[];
};

const firstNameValidationCases: FirstNameValidationCase[] = [
	{
		id: "FORM-04",
		description: "empty",
		firstName: "",
		error: "required",
		tags: ["@security", "@SEC-01", "@SEC-06"],
	},
	{
		id: "FORM-05",
		description: "whitespace-only",
		firstName: "   ",
		error: "required",
		tags: ["@security", "@SEC-06"],
	},
	{
		id: "FORM-05A",
		description: "invalid-character",
		firstName: "Anne@",
		error: "invalid",
		tags: ["@security", "@SEC-06"],
	},
	{
		id: "FORM-05B",
		description: "overlong",
		firstName: "A".repeat(64),
		error: "too_long",
		tags: ["@security", "@SEC-06", "@SEC-07"],
	},
	{
		id: "FORM-06",
		description: "valid characters",
		firstName: "Anne-Marie O'Neil",
		error: "none",
		tags: ["@security", "@SEC-06"],
	},
	{
		id: "FORM-26",
		description: "Unicode characters",
		firstName: "Élodie 李",
		error: "none",
		tags: ["@security", "@SEC-06"],
	},
	{
		id: "FORM-27",
		description: "control character",
		firstName: "Anne\u0007",
		error: "invalid",
		tags: ["@security", "@SEC-06"],
	},
];

test.describe("First-name validation", () => {
	for (const validationCase of firstNameValidationCases) {
		test(`${validationCase.id}: handles ${validationCase.description} first name`, {
			tag: validationCase.tags,
		}, async ({ content, interceptNetworkCall, signUpPage }) => {
			// Arrange
			// passwordConfirmation: "" to not allow user submission
			await completeSignUpForm(signUpPage, {
				firstName: validationCase.firstName,
				passwordConfirmation: "",
			});

			// Act
			if (validationCase.error === "none") {
				await signUpPage.createAccountButton.click();
			} else {
				await expectNoAccountCreationRequest(
					interceptNetworkCall,
					signUpPage.createAccountButton,
				);
			}

			// Assert
			if (validationCase.error === "none") {
				await expect(signUpPage.firstNameInput).toHaveValue(
					validationCase.firstName,
				);
				await expect(signUpPage.firstNameError).toHaveCount(0);
				return;
			}

			const expectedError = {
				required: content.signUp.firstNameErrorRequired,
				invalid: content.signUp.firstNameErrorInvalid,
				too_long: content.signUp.firstNameErrorTooManyCharacters,
			}[validationCase.error];
			await expect(signUpPage.firstNameError).toHaveText(expectedError);
		});
	}
});
