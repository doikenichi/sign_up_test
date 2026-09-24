import { loadLocale } from "../../locales/load-locale.js";
import type { HeaderContent, SupportedLocale } from "../../locales/types.js";

/**
 * Header is an interface to decouple the layout and the business case
 * For example, switch locale in desktop and mobile has different sequence of actions, but the business action is switch locale
 *
 * The static method (default method) and interface in the same place are derived from a Java pattern.
 */

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
 * @param targetLocale
 */
export function loadNewLocale(targetLocale: string): HeaderContent {
	return loadLocale(<SupportedLocale>targetLocale, "header");
}
