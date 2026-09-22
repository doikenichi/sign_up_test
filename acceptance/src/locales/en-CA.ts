import type { LocaleContent } from "./types.js";

export const enCA = {
	locale: "en-CA",
	htmlLang: "en",

	header: {
		localeLink: "FR",
		navBarLocale: "English",
		navBarOptionEnglish: "English",
		navBarOptionFrench: "French",
		LoginLink: "Login",
		homeLink:
			"https://storage.googleapis.com/nesto-qa2-tenant-admin/tenants/1/assets/8ddce3c9-79b6-4117-a10a-f9c4e65e7604.svg",
		openMenu: "Open menu",
		closeMenu: "Close menu",
	},

	footer: {
		privacyPolicy: "Privacy policy",
	},

	signUp: {
		path: "signup",
		formHeader: "Create a nesto account",
		firstNameInput: "First name",
		firstNameErrorRequired: "The field is required",
		firstNameErrorInvalid: "Invalid name",
		LastNameInput: "Last name",
		lastNameErrorRequired: "The field is required",
		lastNameErrorInvalid: "Invalid name",
		phoneNumberInput: "Phone number",
		phoneNumberError: "Invalid Value",
		provinceOfPurchaseLabel: "Province of purchase",
		emailInput: "Email",
		emailError: "Invalid email",
		passwordInput: "Password",
		passwordErrorMinimumRequired: "Minimum of 12 letters required",
		passwordErrorComplexity:
			"Password must contain at least one uppercase letter, one lowercase letter and one number",
		passwordErrorComplexityTip:
			"Password must be between 12 and 32 characters and contain one uppercase letter, one lowercase letter and one number.",
		passwordConfirmationInput: "Confirm password",
		passwordConfirmationError: "Passwords do not match",
		agreementCheckbox:
			"By checking this box, you agree to be contacted by nesto’s partners for the purposes of offering you financial products. You agree to nesto sharing your mortgage information with its partners. You can opt-out at any time.",
		createYourAccountButton: "Create your account",
		LoginLink: "Log in",
		TermsOfServiceLink: "Terms of Service",
	},
} as const satisfies LocaleContent;
