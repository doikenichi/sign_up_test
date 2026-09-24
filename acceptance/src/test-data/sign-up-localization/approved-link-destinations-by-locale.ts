import type { SupportedLocale } from "../../locales/types.js";

/**
 * The approved navigation link identifiers covered by the sign-up localization
 * tests.
 */
export type SignUpLinkName = "login" | "terms" | "privacy";

/**
 * Locale-specific destination allowlist used to validate sign-up navigation
 * links without coupling the tests to downstream page content.
 */
export const approvedLinkDestinationsByLocale = {
	"en-CA": {
		login: "https://app.qa.nesto.ca/",
		terms: "https://www.nesto.ca/terms-of-services/",
		privacy: "https://www.nesto.ca/privacy-policy/",
	},
	"fr-CA": {
		login: "https://app.qa.nesto.ca/fr",
		terms: "https://www.nesto.ca/fr/conditions-d-utilisation/",
		privacy: "https://www.nesto.ca/fr/politique-de-confidentialite/",
	},
} as const satisfies Record<SupportedLocale, Record<SignUpLinkName, string>>;
