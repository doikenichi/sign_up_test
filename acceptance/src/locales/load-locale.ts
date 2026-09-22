import { getLocaleContent } from "./index.js";
import type { LocaleContent, SupportedLocale } from "./types.js";

/**
 * Loads the content of a section of the target locale.
 * It is targeted to load the locale after switching locales.
 * @param currentLocale - The current locale.
 * @param section - The section to load.
 * @returns The content of the section.
 */
export function loadLocale<K extends keyof LocaleContent>(
	currentLocale: SupportedLocale,
	section: K,
): LocaleContent[K] {
	const nextLocale = currentLocale === "en-CA" ? "en-CA" : "fr-CA";
	return getLocaleContent(nextLocale)[section];
}
