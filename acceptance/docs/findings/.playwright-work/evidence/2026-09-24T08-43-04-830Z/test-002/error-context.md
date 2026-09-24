# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\signup\accessibility.spec.ts >> Accessibility checks >> A11Y-05: keeps keyboard focus visible and moving
- Location: specs\ui\signup\accessibility.spec.ts:93:2

# Error details

```
Error: expect(received).not.toBe(expected) // Object.is equality

Expected: not "BODY"
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - main [ref=e3]:
    - generic [ref=e4]:
      - link [ref=e5] [cursor=pointer]:
        - /url: /
        - img "nesto" [ref=e6]
      - button "open burger menu" [ref=e7] [cursor=pointer]
    - generic [ref=e11]:
      - generic [ref=e12]:
        - generic [ref=e14]:
          - heading "Create a nesto account" [level=2] [ref=e15]
          - img "nesto secure" [ref=e16]
        - generic [ref=e19]:
          - group [ref=e20]:
            - generic [ref=e21]:
              - textbox "First name" [ref=e22]
              - generic: First name
          - group [ref=e23]:
            - generic [ref=e24]:
              - textbox "Last name" [ref=e25]
              - generic: Last name
          - group [ref=e26]:
            - generic [ref=e27]:
              - combobox "Phone number country" [ref=e29] [cursor=pointer]:
                - option "International"
                - option "Afghanistan"
                - option "Åland Islands"
                - option "Albania"
                - option "Algeria"
                - option "American Samoa"
                - option "Andorra"
                - option "Angola"
                - option "Anguilla"
                - option "Antigua and Barbuda"
                - option "Argentina"
                - option "Armenia"
                - option "Aruba"
                - option "Ascension Island"
                - option "Australia"
                - option "Austria"
                - option "Azerbaijan"
                - option "Bahamas"
                - option "Bahrain"
                - option "Bangladesh"
                - option "Barbados"
                - option "Belarus"
                - option "Belgium"
                - option "Belize"
                - option "Benin"
                - option "Bermuda"
                - option "Bhutan"
                - option "Bolivia"
                - option "Bonaire, Sint Eustatius and Saba"
                - option "Bosnia and Herzegovina"
                - option "Botswana"
                - option "Brazil"
                - option "British Indian Ocean Territory"
                - option "Brunei Darussalam"
                - option "Bulgaria"
                - option "Burkina Faso"
                - option "Burundi"
                - option "Cambodia"
                - option "Cameroon"
                - option "Canada" [selected]
                - option "Cape Verde"
                - option "Cayman Islands"
                - option "Central African Republic"
                - option "Chad"
                - option "Chile"
                - option "China"
                - option "Christmas Island"
                - option "Cocos (Keeling) Islands"
                - option "Colombia"
                - option "Comoros"
                - option "Congo"
                - option "Congo, Democratic Republic of the"
                - option "Cook Islands"
                - option "Costa Rica"
                - option "Cote d'Ivoire"
                - option "Croatia"
                - option "Cuba"
                - option "Curaçao"
                - option "Cyprus"
                - option "Czech Republic"
                - option "Denmark"
                - option "Djibouti"
                - option "Dominica"
                - option "Dominican Republic"
                - option "Ecuador"
                - option "Egypt"
                - option "El Salvador"
                - option "Equatorial Guinea"
                - option "Eritrea"
                - option "Estonia"
                - option "Ethiopia"
                - option "Falkland Islands"
                - option "Faroe Islands"
                - option "Federated States of Micronesia"
                - option "Fiji"
                - option "Finland"
                - option "France"
                - option "French Guiana"
                - option "French Polynesia"
                - option "Gabon"
                - option "Gambia"
                - option "Georgia"
                - option "Germany"
                - option "Ghana"
                - option "Gibraltar"
                - option "Greece"
                - option "Greenland"
                - option "Grenada"
                - option "Guadeloupe"
                - option "Guam"
                - option "Guatemala"
                - option "Guernsey"
                - option "Guinea"
                - option "Guinea-Bissau"
                - option "Guyana"
                - option "Haiti"
                - option "Holy See (Vatican City State)"
                - option "Honduras"
                - option "Hong Kong"
                - option "Hungary"
                - option "Iceland"
                - option "India"
                - option "Indonesia"
                - option "Iran"
                - option "Iraq"
                - option "Ireland"
                - option "Isle of Man"
                - option "Israel"
                - option "Italy"
                - option "Jamaica"
                - option "Japan"
                - option "Jersey"
                - option "Jordan"
                - option "Kazakhstan"
                - option "Kenya"
                - option "Kiribati"
                - option "Kosovo"
                - option "Kuwait"
                - option "Kyrgyzstan"
                - option "Laos"
                - option "Latvia"
                - option "Lebanon"
                - option "Lesotho"
                - option "Liberia"
                - option "Libya"
                - option "Liechtenstein"
                - option "Lithuania"
                - option "Luxembourg"
                - option "Macao"
                - option "Madagascar"
                - option "Malawi"
                - option "Malaysia"
                - option "Maldives"
                - option "Mali"
                - option "Malta"
                - option "Marshall Islands"
                - option "Martinique"
                - option "Mauritania"
                - option "Mauritius"
                - option "Mayotte"
                - option "Mexico"
                - option "Moldova"
                - option "Monaco"
                - option "Mongolia"
                - option "Montenegro"
                - option "Montserrat"
                - option "Morocco"
                - option "Mozambique"
                - option "Myanmar"
                - option "Namibia"
                - option "Nauru"
                - option "Nepal"
                - option "Netherlands"
                - option "New Caledonia"
                - option "New Zealand"
                - option "Nicaragua"
                - option "Niger"
                - option "Nigeria"
                - option "Niue"
                - option "Norfolk Island"
                - option "North Korea"
                - option "North Macedonia"
                - option "Northern Mariana Islands"
                - option "Norway"
                - option "Oman"
                - option "Pakistan"
                - option "Palau"
                - option "Palestine"
                - option "Panama"
                - option "Papua New Guinea"
                - option "Paraguay"
                - option "Peru"
                - option "Philippines"
                - option "Poland"
                - option "Portugal"
                - option "Puerto Rico"
                - option "Qatar"
                - option "Reunion"
                - option "Romania"
                - option "Russia"
                - option "Rwanda"
                - option "Saint Barthélemy"
                - option "Saint Helena"
                - option "Saint Kitts and Nevis"
                - option "Saint Lucia"
                - option "Saint Martin (French Part)"
                - option "Saint Pierre and Miquelon"
                - option "Saint Vincent and the Grenadines"
                - option "Samoa"
                - option "San Marino"
                - option "Sao Tome and Principe"
                - option "Saudi Arabia"
                - option "Senegal"
                - option "Serbia"
                - option "Seychelles"
                - option "Sierra Leone"
                - option "Singapore"
                - option "Sint Maarten"
                - option "Slovakia"
                - option "Slovenia"
                - option "Solomon Islands"
                - option "Somalia"
                - option "South Africa"
                - option "South Korea"
                - option "South Sudan"
                - option "Spain"
                - option "Sri Lanka"
                - option "Sudan"
                - option "Suriname"
                - option "Svalbard and Jan Mayen"
                - option "Swaziland"
                - option "Sweden"
                - option "Switzerland"
                - option "Syria"
                - option "Taiwan"
                - option "Tajikistan"
                - option "Tanzania"
                - option "Thailand"
                - option "Timor-Leste"
                - option "Togo"
                - option "Tokelau"
                - option "Tonga"
                - option "Trinidad and Tobago"
                - option "Tristan da Cunha"
                - option "Tunisia"
                - option "Turkey"
                - option "Turkmenistan"
                - option "Turks and Caicos Islands"
                - option "Tuvalu"
                - option "Uganda"
                - option "Ukraine"
                - option "United Arab Emirates"
                - option "United Kingdom"
                - option "United States"
                - option "Uruguay"
                - option "Uzbekistan"
                - option "Vanuatu"
                - option "Venezuela"
                - option "Vietnam"
                - option "Virgin Islands, British"
                - option "Virgin Islands, U.S."
                - option "Wallis and Futuna"
                - option "Western Sahara"
                - option "Yemen"
                - option "Zambia"
                - option "Zimbabwe"
              - generic [ref=e33]:
                - textbox "Phone number" [ref=e34]
                - generic: Phone number
          - group [ref=e35]:
            - generic [ref=e36]:
              - combobox "Province of purchase" [ref=e37]:
                - option "Province of purchase" [disabled]
                - option "Ontario"
                - option "Quebec"
                - option "Alberta" [selected]
                - option "British-Columbia"
                - option "Manitoba"
                - option "New Brunswick"
                - option "Nova Scotia"
                - option "Newfoundland and Labrador"
                - option "Prince Edward Island"
                - option "Saskatchewan"
                - option "Northwest Territories"
                - option "Yukon"
                - option "Nunavut"
              - generic: Province of purchase
          - group [ref=e38]:
            - generic [ref=e39]:
              - textbox "Email" [ref=e40]
              - generic: Email
          - group [ref=e41]:
            - generic [ref=e42]:
              - textbox "Password" [ref=e43]
              - generic: Password
            - generic [ref=e44]: Password must be between 12 and 32 characters and contain one uppercase letter, one lowercase letter and one number.
          - group [ref=e45]:
            - generic [ref=e46]:
              - textbox "Confirm password" [ref=e47]
              - generic: Confirm password
          - group [ref=e48]:
            - generic [ref=e49]:
              - checkbox "By checking this box, you agree to be contacted by nesto’s partners for the purposes of offering you financial products. You agree to nesto sharing your mortgage information with its partners. You can opt-out at any time." [ref=e50]
              - generic [ref=e51]: By checking this box, you agree to be contacted by nesto’s partners for the purposes of offering you financial products. You agree to nesto sharing your mortgage information with its partners. You can opt-out at any time.
          - button "Create your account" [ref=e52] [cursor=pointer]
          - generic [ref=e54]:
            - text: Already have an account?
            - link "Log in" [ref=e55] [cursor=pointer]:
              - /url: /
            - text: .
      - generic [ref=e57]:
        - text: By clicking on "Create your account", I agree and consent to the
        - link "Terms of Service (opens in a new window)" [ref=e58] [cursor=pointer]:
          - /url: https://www.nesto.ca/terms-of-services/
        - text: .
    - generic [ref=e61]:
      - text: Read our
      - link "Privacy Policy (opens in a new window)" [ref=e62] [cursor=pointer]:
        - /url: https://www.nesto.ca/privacy-policy/
      - text: to learn more
  - alert [ref=e63]
```

# Test source

```ts
  14  | 	const controlList = await controls.all();
  15  | 
  16  | 	expect(controlList.length).toBeGreaterThan(0);
  17  | 	for (const control of controlList) {
  18  | 		await assertion(control);
  19  | 	}
  20  | }
  21  | 
  22  | // https://playwright.dev/docs/accessibility-testing
  23  | test.describe("Accessibility checks", () => {
  24  | 	test.beforeEach(async ({ signUpPage }) => {
  25  | 		// Arrange
  26  | 		await signUpPage.goto();
  27  | 	});
  28  | 
  29  | 	// The heading is the primary-localized landmark for the sign-up form.
  30  | 	test("A11Y-01: exposes the localized form heading", {
  31  | 		tag: ["@smoke"],
  32  | 	}, async ({ content, signUpPage }) => {
  33  | 		// Arrange - beforeach
  34  | 		// Assert
  35  | 		await expect(signUpPage.formHeader).toBeVisible();
  36  | 		await expect(signUpPage.formHeader).toHaveText(content.signUp.formHeader);
  37  | 	});
  38  | 
  39  | 	// Every interactive control must expose a name to assistive technology.
  40  | 	test("A11Y-02: gives every form control an accessible name", async ({
  41  | 		logger,
  42  | 		signUpPage,
  43  | 	}) => {
  44  | 		// Arrange - beforeach
  45  | 		// Act
  46  | 		const controls = signUpPage.interactiveFormControls;
  47  | 		logger.debug(`Found ${await controls.count()} interactive form controls`);
  48  | 
  49  | 		// Assert
  50  | 		await expectEvery(controls, (control) =>
  51  | 			expect(control).toHaveAccessibleName(/.+/),
  52  | 		);
  53  | 	});
  54  | 
  55  | 	// Required state is checked before submission; validation messages are checked after it.
  56  | 	test("A11Y-03: exposes required and invalid states", {
  57  | 		tag: ["@security", "@SEC-01"],
  58  | 	}, async ({ signUpPage }) => {
  59  | 		// Arrange - beforeach
  60  | 		const requiredControls = signUpPage.requiredFormControls;
  61  | 
  62  | 		// Assert the initial required-state contract.
  63  | 		await expect(requiredControls).toHaveCount(8);
  64  | 		await expectEvery(requiredControls, async (control) => {
  65  | 			const isRequired =
  66  | 				(await control.getAttribute("required")) !== null ||
  67  | 				(await control.getAttribute("aria-required")) === "true";
  68  | 
  69  | 			expect(isRequired).toBe(true);
  70  | 		});
  71  | 
  72  | 		// Act
  73  | 		await signUpPage.createAccountButton.click();
  74  | 
  75  | 		// Assert validation feedback after submitting the empty form.
  76  | 		await expect(signUpPage.validationMessages).toHaveCount(5);
  77  | 	});
  78  | 
  79  | 	// Direct focus checks confirm that each control can receive keyboard focus.
  80  | 	test("A11Y-04: makes interactive elements keyboard accessible", async ({
  81  | 		signUpPage,
  82  | 	}) => {
  83  | 		// Arrange - beforeach
  84  | 		// Act and assert each control independently.
  85  | 		await expectEvery(signUpPage.interactiveFormControls, async (control) => {
  86  | 			await expect(control).toBeVisible();
  87  | 			await control.focus();
  88  | 			await expect(control).toBeFocused();
  89  | 		});
  90  | 	});
  91  | 
  92  | 	// Tab navigation verifies that focus progresses through the form without becoming trapped.
  93  | 	test("A11Y-05: keeps keyboard focus visible and moving", async ({
  94  | 		page,
  95  | 		signUpPage,
  96  | 	}) => {
  97  | 		// Arrange - beforeach
  98  | 		const controls = await signUpPage.interactiveFormControls.all();
  99  | 
  100 | 		// Act and assert focus as the user advances with the Tab key.
  101 | 		expect(controls.length).toBeGreaterThan(0);
  102 | 		await controls[0].focus();
  103 | 
  104 | 		for (const [index, control] of controls.entries()) {
  105 | 			await expect(control).toBeVisible();
  106 | 			await expect(control).toBeFocused();
  107 | 
  108 | 			if (index < controls.length - 1) {
  109 | 				await page.keyboard.press("Tab");
  110 | 			}
  111 | 		}
  112 | 
  113 | 		await page.keyboard.press("Tab");
> 114 | 		expect(await page.evaluate(() => document.activeElement?.tagName)).not.toBe(
      |                                                                          ^ Error: expect(received).not.toBe(expected) // Object.is equality
  115 | 			"BODY",
  116 | 		);
  117 | 	});
  118 | 
  119 | 	// Help and validation content must be present and contain readable text.
  120 | 	test("A11Y-06: exposes readable validation and help text", async ({
  121 | 		signUpPage,
  122 | 	}) => {
  123 | 		// Arrange
  124 | 		await expect(signUpPage.passwordComplexityTip).toBeVisible();
  125 | 
  126 | 		// Act
  127 | 		await signUpPage.createAccountButton.click();
  128 | 
  129 | 		// Assert
  130 | 		await expectEvery(signUpPage.validationMessages, (control) =>
  131 | 			expect(control).not.toHaveText(/^\s*$/),
  132 | 		);
  133 | 	});
  134 | 
  135 | 	// Axe violations with critical or serious impact block this accessibility check.
  136 | 	test("A11Y-07: has no critical or serious violations", async ({ page }) => {
  137 | 		// Arrange - beforeach
  138 | 		// Act
  139 | 		const accessibilityScanResults = await new AxeBuilder({
  140 | 			page,
  141 | 		}).analyze();
  142 | 
  143 | 		const criticalOrSeriousViolations =
  144 | 			accessibilityScanResults.violations.filter(
  145 | 				({ impact }) => impact === "critical" || impact === "serious",
  146 | 			);
  147 | 
  148 | 		// Assert
  149 | 		expect(criticalOrSeriousViolations).toEqual([]);
  150 | 	});
  151 | });
  152 | 
```