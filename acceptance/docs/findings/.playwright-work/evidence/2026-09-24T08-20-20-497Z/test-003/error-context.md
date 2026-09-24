# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\signup\form-happy-path.spec.ts >> Sunny scenario - all fields are valid >> SUNNY-03: detects Canada from an international phone number
- Location: specs\ui\signup\form-happy-path.spec.ts:105:5

# Error details

```
Error: expect(locator).toHaveValue(expected) failed

Locator:  getByTestId('phoneInput')
Expected: "([redacted-phone]"
Received: "+[redacted-phone]"
Timeout:  5000ms

Call log:
  - Expect "toHaveValue" getByTestId('phoneInput') with timeout 5000ms
  - waiting for getByTestId('phoneInput')
    14 × locator resolved to <input type="tel" id="field-6" name="phone" autocomplete="tel" value="+[redacted-phone]" data-testid="phoneInput" placeholder="Phone number" aria-labelledby="form-placeholder-field-6" class="_input__field_w8g1t_167 _input__field--has-placeholder_w8g1t_1 PhoneInputInput"/>
       - unexpected value "+[redacted-phone]"

```

```yaml
- textbox "Phone number": +[redacted-phone]
```

# Test source

```ts
  19  |         await signUpPage.fillForm({
  20  |             ...data,
  21  |             phoneCountry: "CA",
  22  |             provinceOfPurchase: "Ontario",
  23  |             passwordConfirmation: data.password,
  24  |         });
  25  | 
  26  |         // Assert
  27  |         await expect(signUpPage.firstNameInput).toHaveValue(data.firstName);
  28  |         await expect(signUpPage.lastNameInput).toHaveValue(data.lastName);
  29  |         await expect(signUpPage.phoneCountrySelect).toHaveValue("CA");
  30  |         await expect(signUpPage.phoneNumberInput).toHaveValue(
  31  |             `(${data.phoneNumber.slice(0, 3)}) ${data.phoneNumber.slice(3, 6)}-${data.phoneNumber.slice(6)}`,
  32  |         );
  33  |         await expect(signUpPage.emailInput).toHaveValue(data.email);
  34  |         await expect(signUpPage.passwordInput).toHaveValue(data.password);
  35  |         await expect(signUpPage.passwordConfirmationInput).toHaveValue(
  36  |             data.password,
  37  |         );
  38  |         await expect(signUpPage.termsAndConditionsCheckbox).toBeChecked();
  39  |         await expect(signUpPage.validationMessages).toHaveCount(0);
  40  |     });
  41  | 
  42  |     test("SUNNY-02: submits a valid form with a unique email", async ({
  43  |                                                                           page,
  44  |                                                                           signUpPage,
  45  |                                                                           interceptNetworkCall,
  46  |                                                                       }, testInfo) => {
  47  |         // Arrange
  48  |         const data = createForm02ValidFields(testInfo.project.name);
  49  |         await signUpPage.goto();
  50  |         await expect(signUpPage.provinceOfPurchaseSelect).toHaveValue(/.+/);
  51  | 
  52  |         // Registering a SPY
  53  |         // Observe the browser request without fulfilling or modifying it.
  54  |         const accountCall = interceptNetworkCall({
  55  |             method: "POST",
  56  |             url: "**/api/accounts",
  57  |             timeout: 10_000,
  58  |         });
  59  | 
  60  |         // Act
  61  |         await signUpPage.signUp({
  62  |             ...data,
  63  |             phoneCountry: "CA",
  64  |             provinceOfPurchase: "Ontario",
  65  |             passwordConfirmation: data.password,
  66  |         });
  67  | 
  68  |         // Assert
  69  |         await expect(signUpPage.validationMessages).toHaveCount(0);
  70  |         const {request, response, responseJson, status, requestJson} =
  71  |             await accountCall;
  72  |         if (!request || !response || !responseJson || !requestJson) {
  73  |             throw new Error(
  74  |                 "SUNNY-02 did not capture the account request and response",
  75  |             );
  76  |         }
  77  | 
  78  |         const account =
  79  |             (responseJson as { account?: Record<string, unknown> }).account ??
  80  |             (responseJson as Record<string, unknown>);
  81  |         const submittedFields = requestJson as Record<string, unknown>;
  82  | 
  83  |         // The account response echoes the submitted account fields except password.
  84  |         expect(account).toMatchObject({
  85  |             firstName: submittedFields.firstName,
  86  |             lastName: submittedFields.lastName,
  87  |             email: submittedFields.email,
  88  |             phone: submittedFields.phone,
  89  |             region: submittedFields.region,
  90  |         });
  91  |         expect(account).not.toHaveProperty("password");
  92  |         expect(status).toBe(201);
  93  |         const responseBody = await response.text();
  94  |         expect(responseBody).not.toContain(data.password);
  95  | 
  96  |         await expect(page).toHaveURL(/\/getaquote\/callback(?:\?.*)?$/);
  97  |         await attachNetworkSummary(testInfo, {
  98  |             request,
  99  |             responseBody,
  100 |             status,
  101 |             uiPath: new URL(page.url()).pathname,
  102 |         });
  103 |     });
  104 | 
  105 |     test("SUNNY-03: detects Canada from an international phone number", async ({
  106 |                                                                                    signUpPage,
  107 |                                                                                }) => {
  108 |         // Arrange
  109 |         // 555-0100 through 555-0199 is reserved for fictional NANP numbers.
  110 |         const nationalNumber = "[redacted-phone]";
  111 |         await signUpPage.goto();
  112 | 
  113 |         // Act
  114 |         await signUpPage.phoneCountryOption("international");
  115 | 
  116 |         // Assert
  117 |         await signUpPage.phoneNumberInput.fill(`+1${nationalNumber}`);
  118 |         await expect(signUpPage.phoneCountrySelect).toHaveValue("CA");
> 119 |         await expect(signUpPage.phoneNumberInput).toHaveValue("([redacted-phone]");
      |                                                   ^ Error: expect(locator).toHaveValue(expected) failed
  120 | 
  121 |         // Trigger the phone field's blur validation without moving the viewport
  122 |         // to the lower email field.
  123 |         await signUpPage.phoneNumberInput.evaluate((element) => {
  124 |             (element as HTMLElement).blur();
  125 |         });
  126 |         await expect(signUpPage.phoneCountrySelect).toHaveValue("CA");
  127 |         await expect(signUpPage.phoneNumberInput).toHaveValue("([redacted-phone]");
  128 |         await expect(signUpPage.phoneNumberError).toHaveCount(0);
  129 |     });
  130 | });
  131 | 
```