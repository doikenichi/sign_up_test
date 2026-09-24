import { expect, type Locator, type Page } from "@playwright/test";
import type { Logger } from "winston";
import type { HeaderContent } from "../../locales/types.js";
import { type Header, loadNewLocale } from "./header.js";

/**
 * Desktop header is the Header component implementation for desktop layout.
 * It implements the Header interface.
 */

export class DesktopHeader implements Header {
	constructor(
		private readonly page: Page,
		private content: HeaderContent,
		private readonly logger: Logger,
	) {
		this.logger = logger.child({ component: "DesktopHeader" });
	}

	get localeSwitch(): Locator {
		return this.page.getByTestId("header-language-switch");
	}

	async currentLocale(): Promise<string> {
		const currentLocale = await this.localeSwitch.textContent();
		if (!currentLocale) {
			throw new Error("Could not determine current locale");
		}
		if (currentLocale === "EN") {
			return "fr-CA";
		}
		return "en-CA";
	}

	async switchLocale(): Promise<void> {
		const targetLocale =
			(await this.currentLocale()) === "en-CA" ? "fr-CA" : "en-CA";
		this.logger.info("Switching desktop locale", { targetLocale });

		try {
			await this.localeSwitch.click();

			this.content = loadNewLocale(targetLocale);
			await expect(this.localeSwitch).toHaveText(this.content.localeLink, {
				timeout: 15000,
			});
		} catch (error) {
			this.logger.error("Desktop locale switch failed", {
				targetLocale,
				error,
			});
			throw error;
		}
	}
}
