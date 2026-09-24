import type { SupportedLocale } from "./types.js";

/**
 * Returns the other supported locale so localization tests can exercise an
 * explicit English-to-French or French-to-English switch.
 */
export function getAlternateSupportedLocale(
	locale: SupportedLocale,
): SupportedLocale {
	return locale === "en-CA" ? "fr-CA" : "en-CA";
}
