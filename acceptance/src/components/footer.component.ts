import type { Locator, Page } from "@playwright/test";

export class FooterComponent {
	constructor(private page: Page) {}

	get privacyPolicyLink(): Locator {
		return this.page.locator(
			".privacy-phone-footer_privacy-phone-footer__link__r1TRi",
		);
	}
}
