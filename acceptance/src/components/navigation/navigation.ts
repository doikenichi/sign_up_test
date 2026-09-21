export interface Navigation {
	openSearch(): Promise<void>;
}

export type NavigationLabels = Readonly<{
	region: string;
	openMenu: string;
	search: string;
}>;
