import type { Page } from "@playwright/test";
import type { Navigation, NavigationLabels } from "./navigation.js";

export class MobileNavigation implements Navigation {
	constructor(
		private readonly page: Page,
		private readonly labels: NavigationLabels,
	) {}

	async openSearch(): Promise<void> {
		await this.page
			.getByRole("button", {
				name: this.labels.openMenu,
				exact: true,
			})
			.click();

		const navigation = this.page.getByRole("navigation", {
			name: this.labels.region,
			exact: true,
		});

		await navigation
			.getByRole("link", {
				name: this.labels.search,
				exact: true,
			})
			.click();
	}
}
