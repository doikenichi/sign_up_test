import {expect, type Locator, type Page} from "@playwright/test";
import type {SignUpContent} from "../locales/types.js";

export class SignUpPage {
    constructor(
        private readonly page: Page,
        private readonly content: SignUpContent,
    ) {
    }

    /**
     * Sign up Locators
     */

    get formHeader(): Locator {
        return this.page.locator('h2[data-testid="typography"]');
    }

    get firstNameInput(): Locator {
        return this.page.getByTestId("first-name-input");
    }

    get lastNameInput(): Locator {
        return this.page.getByTestId("last-name-input");
    }

    get phoneCountrySelect(): Locator {
        return this.page.getByRole("combobox", {
            name: "Phone number country",
        });
    }

    get phoneNumberInput(): Locator {
        return this.page.getByTestId("phoneInput");
    }

    get provinceOfPurchaseSelect(): Locator {
        return this.page.getByRole("combobox", {
            name: this.content.provinceOfPurchaseLabel,
        });
    }

    get emailInput(): Locator {
        return this.page.getByTestId("email-input");
    }

    get passwordInput(): Locator {
        return this.page.getByTestId("password-input");
    }

    get passwordConfirmationInput(): Locator {
        return this.page.getByTestId("passwordConfirmation-input");
    }

    get termsAndConditionsCheckbox(): Locator {
        return this.page.getByTestId("agreement-checkbox");
    }

    get createAccountButton(): Locator {
        return this.page.getByTestId("submit-button");
    }

    get firstNameError(): Locator {
        return this.page.getByTestId("first-name-error-message-typography");
    }

    get lastNameError(): Locator {
        return this.page.getByTestId("last-name-error-message-typography");
    }

    get phoneNumberError(): Locator {
        return this.page.getByTestId("phone-error-message-typography");
    }

    get emailError(): Locator {
        return this.page.getByTestId("email-error-message-typography");
    }

    get passwordError(): Locator {
        return this.page.getByTestId("password-error-message-typography");
    }

    get passwordConfirmationError(): Locator {
        return this.page.getByTestId(
            "passwordConfirmation-error-message-typography",
        );
    }

    get requiredFormControls(): Locator {
        return this.firstNameInput
            .or(this.lastNameInput)
            .or(this.phoneCountrySelect)
            .or(this.phoneNumberInput)
            .or(this.emailInput)
            .or(this.passwordInput)
            .or(this.passwordConfirmationInput)
            .or(this.termsAndConditionsCheckbox);
    }

    get interactiveFormControls(): Locator {
        return this.requiredFormControls
            .or(this.provinceOfPurchaseSelect)
            .or(this.createAccountButton);
    }

    get validationMessages(): Locator {
        return this.page.locator('[id^="-error-message-typography"]');
    }

    get passwordComplexityTip(): Locator {
        return this.page.getByText(this.content.passwordErrorComplexityTip, {
            exact: true,
        });
    }

    /**
     * Non-Sign up Locators
     */

    get loginLink(): Locator {
        return this.page.getByTestId("login-link");
    }

    get termsOfUseLink(): Locator {
        return this.page.getByTestId("terms-link");
    }

    /**
     * Sign up error Locators
     */

    async firstNameErrorMessage(): Promise<string | null> {
        return this.firstNameError.textContent();
    }

    async lastNameErrorMessage(): Promise<string | null> {
        return this.lastNameError.textContent();
    }

    async phoneNumberErrorMessage(): Promise<string | null> {
        return this.phoneNumberError.textContent();
    }

    async emailErrorMessage(): Promise<string | null> {
        return this.emailError.textContent();
    }

    async passwordErrorMessage(): Promise<string | null> {
        return this.passwordError.textContent();
    }

    async passwordConfirmationErrorMessage(): Promise<string | null> {
        return this.passwordConfirmationError.textContent();
    }

    /**
     * Sign up flow
     */
    async signUp(
        firstName: string,
        lastName: string,
        countryName: string,
        phoneNumber: string,
        email: string,
        password: string,
        passwordConfirmation: string,
    ): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.phoneCountrySelect.selectOption(countryName);
        await this.phoneNumberInput.fill(phoneNumber);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.passwordConfirmationInput.fill(passwordConfirmation);
        await this.createAccountButton.click();
    }

    /**
     * Navigate to the signup page.
     */
    async goto(): Promise<void> {
        await this.page.goto(this.content.path);

        await this.expectToBeOnPage();
    }

    /**
     * Expect to be on the signup page.
     */
    async expectToBeOnPage(): Promise<void> {
        await expect(this.page).toHaveURL(this.content.path);
    }
}
