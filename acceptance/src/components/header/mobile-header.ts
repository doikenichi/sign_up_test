import { expect, type Locator, type Page } from "@playwright/test";
import type { Logger } from "winston";
import type { HeaderContent } from "../../locales/types.js";
import { type Header, loadNewLocale } from "./header.js";

/**
 * Mobile header is the Header component implementation for mobile layout.
 * It implements the Header interface.
 */

export class MobileHeader implements Header {
	constructor(
		private readonly page: Page,
		private content: HeaderContent,
		private readonly logger: Logger,
	) {
		this.logger = logger.child({ component: "MobileHeader" });
	}

	get hamburgerMenuOpen(): Locator {
		return this.page.getByTestId("open-burger-menu");
	}

	get hamburgerMenuClosed(): Locator {
		return this.page.getByTestId("close-burger-menu");
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
			await this.hamburgerMenuOpen.click();
		}

		const currentLocale = await this.languageDropDown.textContent();
		if (!currentLocale) {
			throw new Error("Could not determine current locale");
		}
		const locale = currentLocale === "English" ? "en-CA" : "fr-CA";

		if (!isNavBarOpen) {
			// close the nav bar if was previously closed (return to previous state)
			await this.hamburgerMenuClosed.click();
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
	 * @param targetLocale
	 */
	localeToOption(targetLocale: string): string {
		return targetLocale === "en-CA"
			? this.content.navBarOptionEnglish
			: this.content.navBarOptionFrench;
	}

	async switchLocale(): Promise<void> {
		const isNavBarOpen = await this.isNavBarOpen();
		if (!isNavBarOpen) {
			await this.hamburgerMenuOpen.click();
		}

		const targetLocale = await this.getOppositeLocale(
			await this.currentLocale(),
		);
		this.logger.info("Switching mobile locale", { targetLocale });

		try {
			// click on the language drop down
			await this.languageDropDown.click();

			await (
				await this.languageOption(this.localeToOption(targetLocale))
			).click();

			this.content = loadNewLocale(targetLocale);
			await expect(this.languageDropDown).toHaveText(
				this.content.navBarLocale,
				{
					timeout: 15000,
				},
			);

			if (!isNavBarOpen) {
				// close the nav bar if was previously closed (return to previous state)
				await this.hamburgerMenuClosed.click();
			}
		} catch (error) {
			this.logger.error("Mobile locale switch failed", { targetLocale, error });
			throw error;
		}
	}
}
