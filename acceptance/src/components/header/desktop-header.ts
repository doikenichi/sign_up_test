import type { Locator, Page } from "@playwright/test";
import type { Header } from "./header.js";

export class DesktopHeader implements Header {
	constructor(
		private readonly page: Page,
		// private content: HeaderContent,
	) {}

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
		await this.localeSwitch.click();

		// this.content = loadNewLocale(await this.currentLocale());
	}
}
