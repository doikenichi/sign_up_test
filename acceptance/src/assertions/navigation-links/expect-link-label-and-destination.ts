import { expect, type Locator, test } from "@playwright/test";

/**
 * Verifies the link text and the absolute URL resolved from its href.
 */
export async function expectLinkLabelAndDestination(
	link: Locator,
	expected: Readonly<{ label: string; destination: string }>,
): Promise<void> {
	await test.step(`Expect link "${expected.label}" to match its label and destination`, async () => {
		await expect(link).toHaveText(expected.label);
		const resolvedHref: string = await link.evaluate(
			(link: HTMLAnchorElement | SVGElement): string =>
				new URL(link.getAttribute("href") ?? "", window.location.href).href,
		);
		expect(resolvedHref).toBe(expected.destination);
	});
}
