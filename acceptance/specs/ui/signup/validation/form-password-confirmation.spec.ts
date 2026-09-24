import {
    expectNoAccountCreationRequest
} from "../../../../src/assertions/sign-up-validation/expect-no-account-creation-request.js";
import {expect, test} from "../../../../src/fixtures/ui/test-options.js";
import {completeSignUpForm} from "../../../../src/test-helpers/complete-sign-up-form.js";

test.use({screenshot: "off"});

const validPassword = "Aa1b2c3d4e5f";

test.describe("Password-confirmation validation", () => {
    test("FORM-23: handles an empty password confirmation", async ({
                                                                       interceptNetworkCall,
                                                                       signUpPage,
                                                                   }) => {
        // Arrange
        await completeSignUpForm(signUpPage, {
            firstName: "",
            password: validPassword,
            passwordConfirmation: "",
        });

        // Act
        await expectNoAccountCreationRequest(
            interceptNetworkCall,
            signUpPage.createAccountButton,
        );

        // Assert
        await expect(signUpPage.passwordConfirmationError).toBeVisible();
    });

    test("FORM-24: handles a mismatched password confirmation", async ({
                                                                           content,
                                                                           interceptNetworkCall,
                                                                           signUpPage,
                                                                       }) => {
        // Arrange
        await completeSignUpForm(signUpPage, {
            firstName: "",
            password: validPassword,
            passwordConfirmation: "Bb2c3d4e5f6g",
        });

        // Act
        await expectNoAccountCreationRequest(
            interceptNetworkCall,
            signUpPage.createAccountButton,
        );

        // Assert
        await expect(signUpPage.passwordConfirmationError).toHaveText(
            content.signUp.passwordConfirmationError,
        );
    });

    test("FORM-25: accepts matching password confirmation", async ({
                                                                       signUpPage,
                                                                   }) => {
        // Arrange
        await completeSignUpForm(signUpPage, {
            firstName: "",
            password: validPassword,
            passwordConfirmation: validPassword,
        });

        // Act
        await signUpPage.createAccountButton.click();

        // Assert
        await expect(signUpPage.passwordConfirmationError).toHaveCount(0);
    });
});
