import type { Locator, Page } from "@playwright/test";
import type { HeaderContent } from "../../locales/types.js";
import { type Header, loadNewLocale } from "./header.js";

export class MobileHeader implements Header {
	constructor(
		private readonly page: Page,
		private content: HeaderContent,
	) {}

	get hamburguerMenu(): Locator {
		return this.page.getByTestId("open-burger-menu");
	}

	get navBar(): Locator {
		return this.page.getByTestId("burger-menu");
	}

	get languageDropDown(): Locator {
		return this.navBar
			.getByTestId("menu-button")
			.filter({ hasText: this.content.navBarLocale });
	}

	async languageOption(targetOption: string): Promise<Locator> {
		return this.page.getByRole("menuitemradio", { name: targetOption });
	}

	async isNavBarOpen(): Promise<boolean> {
		return this.navBar.isVisible();
	}

	async currentLocale(): Promise<string> {
		const isNavBarOpen = await this.isNavBarOpen();
		if (!isNavBarOpen) {
			await this.hamburguerMenu.click();
		}

		const currentLocale = await this.languageDropDown.textContent();
		if (!currentLocale) {
			throw new Error("Could not determine current locale");
		}
		const locale = currentLocale === "English" ? "en-CA" : "fr-CA";

		if (!isNavBarOpen) {
			// close the nav bar if was previously closed (return to previous state)
			await this.hamburguerMenu.click();
		}
		return locale;
	}

	/**
	 * A simple helper function to determine the opposite locale of the current one.
	 * returns the opposite locale of the current one
	 */
	async getOppositeLocale(currentLocale: string | null): Promise<string> {
		if (!currentLocale) {
			// handle the case where currentLocale is null
			throw new Error("Could not determine current locale");
		}
		return currentLocale === "en-CA" ? "fr-CA" : "en-CA";
	}

	/**
	 * A simple helper function to convert a locale to an option selector.
	 * @param currentLocale
	 */
	localeToOption(currentLocale: string): string {
		switch (currentLocale) {
			case "en-CA":
				return "English";
			case "fr-CA":
				return "Français";
			default:
				throw new Error(`Unsupported locale: ${currentLocale}`);
		}
	}

	async switchLocale(): Promise<void> {
		if (!(await this.isNavBarOpen())) {
			await this.hamburguerMenu.click();
		}

		const targetLocale = await this.getOppositeLocale(
			await this.currentLocale(),
		);

		// click on the language drop down
		await this.languageDropDown.click();

		await (
			await this.languageOption(this.localeToOption(targetLocale))
		).click();

		this.content = loadNewLocale(await this.currentLocale());
	}
}
