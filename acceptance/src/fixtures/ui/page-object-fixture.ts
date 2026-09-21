import { test as base } from "@playwright/test";
import { DesktopNavigation } from "../../components/navigation/desktop-navigation.js";
import { MobileNavigation } from "../../components/navigation/mobile-navigation.js";
import type { Navigation } from "../../components/navigation/navigation.js";
import { getLocaleContent } from "../../locales/index.js";
import type { LocaleContent } from "../../locales/types.js";
import { SignUpPage } from "../../pages/signup.page.js";
import type { TestOptions } from "./test-options.js";

export type FrameworkFixtures = {
	content: LocaleContent;
	navigation: Navigation;
    signUpPage: SignUpPage;
};

export const test = base.extend<TestOptions & FrameworkFixtures>({
    // Projects can override this through use.layout.
    layout: ["desktop", { option: true }],

    // Read the browser locale configured for the current test.
	content: async (
		{ locale },
		use: (content: LocaleContent) => Promise<void>,
	) => {
		await use(getLocaleContent(locale));
	},

    // Provide the navigation implementation for the expected layout.
	navigation: async (
		{ page, content, layout },
		use: (navigation: Navigation) => Promise<void>,
	) => {
		const navigation =
			layout === "mobile"
				? new MobileNavigation(page, content.navigation)
				: new DesktopNavigation(page, content.navigation);

		await use(navigation);
	},

    // Both layouts share this page object.
	signUpPage: async (
		{ page },
		use: (signUpPage: SignUpPage) => Promise<void>,
	) => {
		await use(new SignUpPage(page));
	},
});

export { expect } from "@playwright/test";
