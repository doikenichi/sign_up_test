import { expect, test } from "../../../src/fixtures/ui/test-options.js";
import { attachNetworkSummary } from "../../../src/logging/network-evidence.js";
import { createForm01ValidFields } from "../../../src/test-data/sign-up-form/form-01-valid-fields.js";
import { createForm02ValidFields } from "../../../src/test-data/sign-up-form/form-02-valid-fields.js";

// Traces retain raw network bodies, including the submitted password.
1;

test.describe("Sunny scenario - all fields are valid", () => {
	test("SUNNY-01: populates valid fields and accepts consent without submitting", async ({
		signUpPage,
	}) => {
		// Arrange
		const data = createForm01ValidFields();
		await signUpPage.goto();
		await expect(signUpPage.provinceOfPurchaseSelect).toHaveValue(/.+/);

		// Act
		await signUpPage.fillForm({
			...data,
			phoneCountry: "CA",
			provinceOfPurchase: "Ontario",
			passwordConfirmation: data.password,
		});

		// Assert
		await expect(signUpPage.firstNameInput).toHaveValue(data.firstName);
		await expect(signUpPage.lastNameInput).toHaveValue(data.lastName);
		await expect(signUpPage.phoneCountrySelect).toHaveValue("CA");
		await expect(signUpPage.phoneNumberInput).toHaveValue(
			`(${data.phoneNumber.slice(0, 3)}) ${data.phoneNumber.slice(3, 6)}-${data.phoneNumber.slice(6)}`,
		);
		await expect(signUpPage.emailInput).toHaveValue(data.email);
		await expect(signUpPage.passwordInput).toHaveValue(data.password);
		await expect(signUpPage.passwordConfirmationInput).toHaveValue(
			data.password,
		);
		await expect(signUpPage.termsAndConditionsCheckbox).toBeChecked();
		await expect(signUpPage.validationMessages).toHaveCount(0);
	});

	test("SUNNY-02: submits a valid form with a unique email", async ({
		page,
		signUpPage,
		interceptNetworkCall,
	}, testInfo) => {
		// Arrange
		const data = createForm02ValidFields(testInfo.project.name);
		await signUpPage.goto();
		await expect(signUpPage.provinceOfPurchaseSelect).toHaveValue(/.+/);

		// Registering a SPY
		// Observe the browser request without fulfilling or modifying it.
		const accountCall = interceptNetworkCall({
			method: "POST",
			url: "**/api/accounts",
			timeout: 10_000,
		});

		// Act
		await signUpPage.signUp({
			...data,
			phoneCountry: "CA",
			provinceOfPurchase: "Ontario",
			passwordConfirmation: data.password,
		});

		// Assert
		await expect(signUpPage.validationMessages).toHaveCount(0);
		const { request, response, responseJson, status, requestJson } =
			await accountCall;
		if (!request || !response || !responseJson || !requestJson) {
			throw new Error(
				"SUNNY-02 did not capture the account request and response",
			);
		}

		const account =
			(responseJson as { account?: Record<string, unknown> }).account ??
			(responseJson as Record<string, unknown>);
		const submittedFields = requestJson as Record<string, unknown>;

		// The account response echoes the submitted account fields except password.
		expect(account).toMatchObject({
			firstName: submittedFields.firstName,
			lastName: submittedFields.lastName,
			email: submittedFields.email,
			phone: submittedFields.phone,
			region: submittedFields.region,
		});
		expect(account).not.toHaveProperty("password");
		expect(status).toBe(201);
		const responseBody = await response.text();
		expect(responseBody).not.toContain(data.password);

		await expect(page).toHaveURL(/\/getaquote\/callback(?:\?.*)?$/);
		await attachNetworkSummary(testInfo, {
			request,
			responseBody,
			status,
			uiPath: new URL(page.url()).pathname,
		});
	});

	test("SUNNY-03: detects Canada from an international phone number", async ({
		signUpPage,
	}) => {
		// Arrange
		// 555-0100 through 555-0199 is reserved for fictional NANP numbers.
		const nationalNumber = "4165550133";
		await signUpPage.goto();

		// Act
		await signUpPage.phoneCountryOption("international");

		// Assert
		await signUpPage.phoneNumberInput.fill(`+1${nationalNumber}`);
		await expect(signUpPage.phoneCountrySelect).toHaveValue("CA");
		await expect(signUpPage.phoneNumberInput).toHaveValue("(416) 555-0133");

		// Trigger the phone field's blur validation without moving the viewport
		// to the lower email field.
		await signUpPage.phoneNumberInput.evaluate((element) => {
			(element as HTMLElement).blur();
		});
		await expect(signUpPage.phoneCountrySelect).toHaveValue("CA");
		await expect(signUpPage.phoneNumberInput).toHaveValue("(416) 555-0133");
		await expect(signUpPage.phoneNumberError).toHaveCount(0);
	});
});
