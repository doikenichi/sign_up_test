import { DesktopHeader } from "../../components/header/desktop-header.js";
import type { Header } from "../../components/header/header.js";
import { MobileHeader } from "../../components/header/mobile-header.js";
import { getLocaleContent } from "../../locales/index.js";
import type { LocaleContent } from "../../locales/types.js";
import { SignUpPage } from "../../pages/signup.page.js";
import { test as base } from "../test-fixture.js";

export type UIPages = {
	content: LocaleContent;
	navigation: Header;
	signUpPage: SignUpPage;
};

export const test = base.extend<UIPages>({
	// Read the browser locale configured for the current test.
	content: async (
		{ locale },
		use: (content: LocaleContent) => Promise<void>,
	) => {
		await use(getLocaleContent(locale));
	},

	// Provide the header implementation for the expected layout.
	navigation: async (
		{ page, content, isMobile },
		use: (navigation: Header) => Promise<void>,
	) => {
		// small page factory: if mobile uses mobile header, so adapts all locators to mobile
		// so will keep test same from users' action perspective: e.g., switch locale
		const navigation = isMobile
			? new MobileHeader(page, content.header)
			: new DesktopHeader(page, content.header);

		await use(navigation);
	},

	// Both layouts share this page object.
	signUpPage: async (
		{ page, content },
		use: (signUpPage: SignUpPage) => Promise<void>,
	) => {
		await use(new SignUpPage(page, content.signUp));
	},
});

export { expect } from "../test-fixture.js";
