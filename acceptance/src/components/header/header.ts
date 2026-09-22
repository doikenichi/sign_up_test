import { loadLocale } from "../../locales/load-locale.js";
import type { HeaderContent } from "../../locales/types.js";

export interface Header {
	/**
	 * Switches locale without checking the current locale
	 */
	switchLocale(): Promise<void>;

	/**
	 * Returns the current locale
	 */
	currentLocale(): Promise<string>;
}

/**
 * Loads the content of the header section targeting the opposite locale
 * @param currentLocale
 */
export function loadNewLocale(currentLocale: string): HeaderContent {
	const targetLocale = currentLocale === "en-CA" ? "fr-CA" : "en-CA";
	return loadLocale(targetLocale, "header");
}
