import {
    expectNoAccountCreationRequest
} from "../../../../src/assertions/sign-up-validation/expect-no-account-creation-request.js";
import {expect, test} from "../../../../src/fixtures/ui/test-options.js";
import {completeSignUpForm} from "../../../../src/test-helpers/complete-sign-up-form.js";

test.use({screenshot: "off"});

const cases = [
    {id: "FORM-07", description: "empty", lastName: "", error: "required"},
    {
        id: "FORM-08",
        description: "whitespace-only",
        lastName: "   ",
        error: "required",
    },
    {
        id: "FORM-09",
        description: "invalid-character",
        lastName: "Anne@",
        error: "invalid",
    },
    {
        id: "FORM-10",
        description: "valid characters",
        lastName: "O'Neil-Smith",
        error: "none",
    },
] as const;

test.describe("Last-name validation", () => {
    for (const validationCase of cases) {
        test(`${validationCase.id}: handles ${validationCase.description} last name`, async ({
                                                                                                 content,
                                                                                                 interceptNetworkCall,
                                                                                                 signUpPage,
                                                                                             }) => {
            // Arrange
            // passwordConfirmation: "" to not allow user submission
            await completeSignUpForm(signUpPage, {
                lastName: validationCase.lastName,
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
                await expect(signUpPage.lastNameInput).toHaveValue(
                    validationCase.lastName,
                );
                await expect(signUpPage.lastNameError).toHaveCount(0);
                return;
            }

            const expectedError =
                validationCase.error === "invalid"
                    ? content.signUp.lastNameErrorInvalid
                    : content.signUp.lastNameErrorRequired;
            await expect(signUpPage.lastNameError).toHaveText(expectedError);
        });
    }
});
