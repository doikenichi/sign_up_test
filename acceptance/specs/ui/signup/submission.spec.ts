import { interceptNetworkCall as interceptNetworkCallOnPage } from "@seontechnologies/playwright-utils/intercept-network-call";
import { loadEnvironment } from "../../../src/config/environment.js";
import { expect, test } from "../../../src/fixtures/ui/test-options.js";
import { createDup01ValidFields } from "../../../src/test-data/sign-up-form/dup-01-valid-fields.js";
import { createForm02ValidFields } from "../../../src/test-data/sign-up-form/form-02-valid-fields.js";

test.describe("Submission", () => {
	test("SUBM-01: sends only one account request during repeated activation", async ({
		page,
		signUpPage,
		interceptNetworkCall,
		logger,
	}, testInfo) => {
		// Arrange
		const data = createForm02ValidFields(testInfo.project.name);
		await signUpPage.goto();
		await expect(signUpPage.provinceOfPurchaseSelect).toHaveValue(/.+/);

		await signUpPage.fillForm({
			...data,
			phoneCountry: "CA",
			provinceOfPurchase: "Ontario",
			passwordConfirmation: data.password,
		});

		const accountUrl = new URL("accounts", loadEnvironment().apiBaseURL);
		let accountRequestCount = 0;
		let submittedEmailMatches = false;
		let actualStatus: number | null = null;
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
			url: `**${accountUrl.href}`,
			timeout: 10_000,
			handler: async (route, request) => {
				const interceptedUrl = new URL(request.url());
				try {
					submittedEmailMatches =
						(request.postDataJSON() as { email?: unknown }).email ===
						data.email;
				} catch {
					submittedEmailMatches = false;
				}
				accountRequestCount += 1;
				logger.info("Intercepted account creation request", {
					method: request.method(),
					origin: interceptedUrl.origin,
					path: interceptedUrl.pathname,
					resourceType: request.resourceType(),
					submittedEmailMatches,
					accountRequestCount,
				});
				notifyRequestPaused();
				await requestGate;
				await route.continue();
			},
		});

		// Act
		const submitPromise = signUpPage.createAccountButton.click();
		try {
			// The interceptor's timeout also bounds the wait if no request is sent.
			await Promise.race([
				requestPaused,
				accountCallPromise.then(() => requestPaused),
			]);
			const buttonDisabledWhilePending =
				await signUpPage.createAccountButton.isDisabled();
			await testInfo.attach("subm-01-pending-button-state", {
				body: JSON.stringify({ disabled: buttonDisabledWhilePending }),
				contentType: "application/json",
			});

			// Dispatch repeated activations while the intercepted request is still held.
			for (let activation = 0; activation < 5; activation += 1) {
				await expect(async () => {
					await signUpPage.createAccountButton.click({ timeout: 1000 });
				}).rejects.toThrow(/Timeout .* exceeded/);
			}

			releaseRequest();
			const accountCall = await accountCallPromise;
			if (!accountCall.request) {
				throw new Error("POST /api/accounts was not captured");
			}
			const response = await accountCall.request.response();
			if (!response) {
				throw new Error("POST /api/accounts received no HTTP response");
			}
			actualStatus = response.status();
			logger.info("Account creation response received", {
				method: accountCall.request.method(),
				origin: new URL(accountCall.request.url()).origin,
				path: new URL(accountCall.request.url()).pathname,
				status: actualStatus,
			});
			await submitPromise;

			expect(submittedEmailMatches).toBe(true);
			expect(accountRequestCount).toBe(1);
			expect(actualStatus).toBe(201);
			await expect(page).toHaveURL(/\/getaquote\/callback(?:\?.*)?$/);
		} catch (error) {
			logger.error("Account creation interception failed", {
				errorName: error instanceof Error ? error.name : "UnknownError",
			});
			throw error;
		} finally {
			releaseRequest();
			await testInfo.attach("subm-01-account-call", {
				body: JSON.stringify({
					method: "POST",
					origin: accountUrl.origin,
					path: accountUrl.pathname,
					accountRequestCount,
					submittedEmailMatches,
					actualStatus,
				}),
				contentType: "application/json",
			});
		}
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
