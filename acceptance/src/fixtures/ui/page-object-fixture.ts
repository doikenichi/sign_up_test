import type { Page } from "@playwright/test";
import { FooterComponent } from "../../components/footer.component.js";
import { DesktopHeader } from "../../components/header/desktop-header.js";
import type { Header } from "../../components/header/header.js";
import { MobileHeader } from "../../components/header/mobile-header.js";
import { getLocaleContent } from "../../locales/index.js";
import type { LocaleContent } from "../../locales/types.js";
import { SignUpPage } from "../../pages/signup.page.js";
import { test as base } from "../test-fixture.js";

export type UIPages = {
	content: LocaleContent;
	header: Header;
	signUpPage: SignUpPage;
	signUpPageFactory: SignUpPageFactory;
	footer: FooterComponent;
};

export type SignUpPageFactory = (page: Page) => SignUpPage;

export const test = base.extend<UIPages>({
	// Read the browser locale configured for the current test.
	content: async (
		{ locale },
		use: (content: LocaleContent) => Promise<void>,
	) => {
		await use(getLocaleContent(locale));
	},

	// Provide the header implementation for the expected layout.
	header: async (
		{ page, content, isMobile, logger },
		use: (navigation: Header) => Promise<void>,
	) => {
		// small page factory: if mobile uses mobile header, so adapts all locators to mobile
		// so will keep test same from users' action perspective: e.g., switch locale
		const navigation = isMobile
			? new MobileHeader(page, content.header, logger)
			: new DesktopHeader(page, content.header, logger);

		await use(navigation);
	},

	footer: async (
		{ page, content, logger },
		use: (footer: FooterComponent) => Promise<void>,
	) => {
		await use(new FooterComponent(page, content.footer, logger));
	},

	// Both layouts share this page object.
	signUpPage: async (
		{ page, content, logger, header, footer },
		use: (signUpPage: SignUpPage) => Promise<void>,
	) => {
		await use(new SignUpPage(page, content.signUp, logger, header, footer));
	},

	// Create page objects whose locators are bound to a caller-provided Page.
	signUpPageFactory: async (
		{ content, isMobile, logger },
		use: (factory: SignUpPageFactory) => Promise<void>,
	) => {
		await use((page) => {
			const navigation = isMobile
				? new MobileHeader(page, content.header, logger)
				: new DesktopHeader(page, content.header, logger);
			const footer = new FooterComponent(page, content.footer, logger);

			return new SignUpPage(page, content.signUp, logger, navigation, footer);
		});
	},
});

export { expect } from "../test-fixture.js";
