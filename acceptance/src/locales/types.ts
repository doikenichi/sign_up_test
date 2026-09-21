export type SupportedLocale = "en-CA" | "fr-CA";

export type NavigationContent = Readonly<{
    localeLink: string;
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
    LastNameInput: string;
    lastNameErrorRequired: string;
    lastNameErrorInvalid: string;
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
    navigation: NavigationContent;
    footer: FooterContent;
    signUp: SignUpContent;
}>;
