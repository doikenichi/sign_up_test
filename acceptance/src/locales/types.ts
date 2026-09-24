export type SupportedLocale = "en-CA" | "fr-CA";

export type HeaderContent = Readonly<{
    localeLink: string;
    navBarLocale: string;
    navBarOptionEnglish: string;
    navBarOptionFrench: string;
    LoginLink: string;
    openMenu: string;
    closeMenu: string;
    homeLink: string;
}>;

export type FooterContent = Readonly<{
    privacyPolicy: string;
}>;

export type SignUpContent = Readonly<{
    path: string;
    formHeader: string;
    firstNameInput: string;
    firstNameErrorRequired: string;
    firstNameErrorInvalid: string;
    firstNameErrorTooManyCharacters: string;
    LastNameInput: string;
    lastNameErrorRequired: string;
    lastNameErrorInvalid: string;
    lastNameErrorTooManyCharacters: string;
    phoneNumberInput: string;
    phoneNumberError: string;
    provinceOfPurchaseLabel: string;
    emailInput: string;
    emailError: string;
    passwordInput: string;
    passwordErrorMinimumRequired: string;
    passwordErrorComplexity: string;
    passwordErrorComplexityTip: string;
    passwordConfirmationInput: string;
    passwordConfirmationError: string;
    agreementCheckbox: string;
    createYourAccountButton: string;
    LoginLink: string;
    TermsOfServiceLink: string;
}>;

export type LocaleContent = Readonly<{
    locale: SupportedLocale;
    htmlLang: string;
    header: HeaderContent;
    footer: FooterContent;
    signUp: SignUpContent;
}>;
