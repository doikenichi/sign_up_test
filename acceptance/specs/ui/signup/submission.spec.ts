import { interceptNetworkCall as interceptNetworkCallOnPage } from "@seontechnologies/playwright-utils/intercept-network-call";
import { expect, test } from "../../../src/fixtures/ui/test-options.js";
import { createDup01ValidFields } from "../../../src/test-data/sign-up-form/dup-01-valid-fields.js";
import { createForm01ValidFields } from "../../../src/test-data/sign-up-form/form-01-valid-fields.js";

test.describe("Submission", () => {
	test("SUBM-01: sends only one account request during repeated activation", async ({
		page,
		signUpPage,
		interceptNetworkCall,
	}, testInfo) => {
		// Arrange
		const data = createForm01ValidFields();
		await signUpPage.goto();
		await expect(signUpPage.provinceOfPurchaseSelect).toHaveValue(/.+/);

		await signUpPage.fillForm({
			...data,
			phoneCountry: "CA",
			provinceOfPurchase: "Ontario",
			passwordConfirmation: data.password,
		});

		let accountRequestCount = 0;
		let releaseRequest!: () => void;
		let notifyRequestPaused!: () => void;
		const requestPaused = new Promise<void>((resolve) => {
			notifyRequestPaused = resolve;
		});
		const requestGate = new Promise<void>((resolve) => {
			releaseRequest = resolve;
		});

		const accountCallPromise = interceptNetworkCall({
			method: "POST",
			url: "**/api/accounts",
			timeout: 10_000,
			handler: async (route) => {
				accountRequestCount += 1;
				notifyRequestPaused();
				await requestGate;
				await route.continue();
			},
		});

		// Act
		const submitPromise = signUpPage.createAccountButton.click();
		await requestPaused;
		const buttonDisabledWhilePending =
			await signUpPage.createAccountButton.isDisabled();
		await testInfo.attach("subm-01-pending-button-state", {
			body: JSON.stringify({ disabled: buttonDisabledWhilePending }),
			contentType: "application/json",
		});

		// Dispatch repeated activations while the intercepted request is still held.
		for (let activation = 0; activation < 5; activation += 1) {
			// Assert that the click fails with a timeout error
			// do actual click
			await expect(async () => {
				await signUpPage.createAccountButton.click({ timeout: 1000 });
			}).rejects.toThrow(/Timeout .* exceeded/);

			// skip triggering the event because would not UI testing anymore
			// await signUpPage.createAccountButton.dispatchEvent("click");
		}

		// Assert
		releaseRequest();
		const accountCall = await accountCallPromise;
		await submitPromise;

		// A valid first submission must not be rejected by the cybersecurity fallback.
		expect(accountRequestCount).toBe(1);
		expect(accountCall.status).toBe(201);
		await expect(page).toHaveURL(/\/getaquote(?:\?.*)?$/);
	});

	test("DUP-01: rejects a second completed registration with the same email", async ({
		context,
		browser,
		page,
		signUpPage,
		signUpPageFactory,
		interceptNetworkCall,
	}) => {
		// Arrange
		const data = createDup01ValidFields();
		await signUpPage.goto();
		await expect(signUpPage.provinceOfPurchaseSelect).toHaveValue(/.+/);
		await signUpPage.fillForm({
			...data,
			phoneCountry: "CA",
			provinceOfPurchase: "Ontario",
			passwordConfirmation: data.password,
		});

		// Act: complete the first registration.
		const firstAccountCallPromise = interceptNetworkCall({
			method: "POST",
			url: "**/api/accounts",
			timeout: 10_000,
		});
		await signUpPage.createAccountButton.click();
		const firstAccountCall = await firstAccountCallPromise;

		// Assert: the randomized mailbox avoids the security fallback on a valid submission.
		expect(firstAccountCall.status).toBe(201);
		await expect(page).toHaveURL(/\/getaquote\/callback(?:\?.*)?$/, {
			timeout: 60_000,
		});

		// Act: complete a fresh registration with the same email.
		await context.close();
		const secondContext = await browser.newContext();

		try {
			const secondPage = await secondContext.newPage();
			const newSignUpPage = signUpPageFactory(secondPage);

			await newSignUpPage.goto();
			await expect(newSignUpPage.provinceOfPurchaseSelect).toHaveValue(/.+/);
			await newSignUpPage.fillForm({
				...data,
				phoneCountry: "CA",
				provinceOfPurchase: "Ontario",
				passwordConfirmation: data.password,
			});

			const secondAccountCallPromise = interceptNetworkCallOnPage({
				method: "POST",
				url: "**/api/accounts",
				page: secondPage,
				timeout: 10_000,
			});
			await newSignUpPage.createAccountButton.click();
			const secondAccountCall = await secondAccountCallPromise;

			// Assert: the completed duplicate attempt is rejected by the backend.
			expect(secondAccountCall.status).toBe(400);
			expect(secondAccountCall.responseJson).toBeDefined();
			expect(secondAccountCall.responseJson).toEqual({
				error: "bad format",
				description: "error creating account",
			});
			expect([firstAccountCall, secondAccountCall]).toHaveLength(2);
			await expect(secondPage).not.toHaveURL(/\/getaquote(?:\?.*)?$/);
		} finally {
			await secondContext.close();
		}
	});
});
