import type {LocaleContent} from "./types.js";

export const frCA = {
    locale: "fr-CA",
    htmlLang: "fr",

    header: {
        localeLink: "EN",
        navBarLocale: "Français",
        navBarOptionEnglish: "Anglais",
        navBarOptionFrench: "Français",
        LoginLink: "Connexion",
        homeLink:
            "https://storage.googleapis.com/nesto-qa2-tenant-admin/tenants/1/assets/d5bf458a-ce63-4eef-b25b-9d7821c85202.svg",
        openMenu: "Ouvrir le menu",
        closeMenu: "Fermer le menu",
    },

    footer: {
        privacyPolicy: "politique de confidentialité",
    },

    signUp: {
        path: "signup",
        formHeader: "Créez un compte nesto",
        firstNameInput: "Prénom",
        firstNameErrorRequired: "Ce champ est obligatoire.",
        firstNameErrorInvalid: "Nom invalide",
        firstNameErrorTooManyCharacters: "Trop de caractères",
        LastNameInput: "Nom",
        lastNameErrorRequired: "Ce champ est obligatoire.",
        lastNameErrorInvalid: "Nom invalide",
        lastNameErrorTooManyCharacters: "Trop de caractères",
        phoneNumberInput: "Téléphone",
        phoneNumberError: "Valeur invalide.",
        provinceOfPurchaseLabel: "Province de l'achat",
        emailInput: "Courriel",
        emailError: "Courriel invalide",
        passwordInput: "Mot de passe",
        passwordErrorMinimumRequired: "Minimum de 12 lettres requises",
        passwordErrorComplexity:
            "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre",
        passwordErrorComplexityTip:
            "Le mot de passe doit contenir au entre 12 et 32 caractères et contenir au moins une lettre majuscule, une lettre minuscule et un chiffre.",
        passwordConfirmationInput: "Confirmation du mot de passe",
        passwordConfirmationError: "Les mots de passe ne correspondent pas",
        agreementCheckbox:
            "En cochant cette case, vous acceptez d’être contacté par les partenaires de nesto dans le but de vous proposer des produits financiers. Vous acceptez que nesto partage vos informations de demande hypothécaire avec ses partenaires, si nous ne sommes pas en mesure de vous fournir nos services. Vous pouvez vous désinscrire à tout moment.",
        createYourAccountButton: "Créez votre compte",
        LoginLink: "Connectez-vous",
        TermsOfServiceLink: "Conditions d'utilisation",
    },
} as const satisfies LocaleContent;
