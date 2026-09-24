import type { Locator, Page } from "@playwright/test";
import type { Logger } from "winston";
import type { FooterContent } from "../locales/types.js";

export class FooterComponent {
	constructor(
		private page: Page,
		private content: FooterContent,
		private readonly logger: Logger,
	) {}

	get privacyPolicyLink(): Locator {
		this.logger.info("Getting privacy policy link");
		this.logger.debug(`Privacy policy text: ${this.content.privacyPolicy}`);
		return this.page.locator(
			".privacy-phone-footer_privacy-phone-footer__link__r1TRi",
		);
	}
}
