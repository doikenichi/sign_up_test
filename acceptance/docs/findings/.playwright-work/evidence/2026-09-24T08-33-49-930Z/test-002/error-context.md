# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\signup\accessibility.spec.ts >> Accessibility checks >> A11Y-06: exposes readable validation and help text
- Location: specs\ui\signup\accessibility.spec.ts:120:2

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - main [ref=e3]:
    - generic [ref=e4]:
      - link [ref=e5] [cursor=pointer]:
        - /url: /
        - img "nesto" [ref=e6]
      - generic [ref=e7]:
        - link "EN" [ref=e8] [cursor=pointer]:
          - /url: /signup
        - link "Connexion" [ref=e9] [cursor=pointer]:
          - /url: /
    - generic [ref=e11]:
      - generic [ref=e12]:
        - generic [ref=e14]:
          - heading "Créez un compte nesto" [level=2] [ref=e15]
          - img "nesto secure" [ref=e16]
        - generic [ref=e19]:
          - group [ref=e20]:
            - generic [ref=e21]:
              - textbox "Prénom" [active] [invalid] [ref=e22]
              - generic: Prénom
            - generic [ref=e23]: Ce champ est obligatoire.
          - group [ref=e25]:
            - generic [ref=e26]:
              - textbox "Nom" [invalid] [ref=e27]
              - generic: Nom
            - generic [ref=e28]: Ce champ est obligatoire.
          - group [ref=e30]:
            - generic [ref=e31]:
              - combobox "Phone number country" [ref=e33] [cursor=pointer]:
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
              - generic [ref=e37]:
                - textbox "Téléphone" [invalid] [ref=e38]
                - generic: Téléphone
            - generic [ref=e39]: Valeur invalide.
          - group [ref=e41]:
            - generic [ref=e42]:
              - combobox "Province de l'achat" [ref=e43]:
                - option "Province de l'achat" [disabled]
                - option "Ontario"
                - option "Québec"
                - option "Alberta" [selected]
                - option "Colombie-Britannique"
                - option "Manitoba"
                - option "Nouveau-Brunswick"
                - option "Nouvelle-Écosse"
                - option "Terre-Neuve-et-Labrador"
                - option "Île-du-Prince-Édouard"
                - option "Saskatchewan"
                - option "Territoires du Nord-Ouest"
                - option "Yukon"
                - option "Nunavut"
              - generic: Province de l'achat
          - group [ref=e44]:
            - generic [ref=e45]:
              - textbox "Courriel" [invalid] [ref=e46]
              - generic: Courriel
            - generic [ref=e47]: Courriel invalide
          - group [ref=e49]:
            - generic [ref=e50]:
              - textbox "Mot de passe" [invalid] [ref=e51]
              - generic: Mot de passe
            - generic [ref=e52]: Minimum de 12 lettres requises
            - generic [ref=e54]: Le mot de passe doit contenir au entre 12 et 32 caractères et contenir au moins une lettre majuscule, une lettre minuscule et un chiffre.
          - group [ref=e55]:
            - generic [ref=e56]:
              - textbox "Confirmation du mot de passe" [ref=e57]
              - generic: Confirmation du mot de passe
          - group [ref=e58]:
            - generic [ref=e59]:
              - checkbox "En cochant cette case, vous acceptez d’être contacté par les partenaires de nesto dans le but de vous proposer des produits financiers. Vous acceptez que nesto partage vos informations de demande hypothécaire avec ses partenaires, si nous ne sommes pas en mesure de vous fournir nos services. Vous pouvez vous désinscrire à tout moment." [ref=e60]
              - generic [ref=e61]: En cochant cette case, vous acceptez d’être contacté par les partenaires de nesto dans le but de vous proposer des produits financiers. Vous acceptez que nesto partage vos informations de demande hypothécaire avec ses partenaires, si nous ne sommes pas en mesure de vous fournir nos services. Vous pouvez vous désinscrire à tout moment.
          - button "Créez votre compte" [ref=e62] [cursor=pointer]
          - generic [ref=e64]:
            - text: Vous avez déjà un compte?
            - link "Connectez-vous" [ref=e65] [cursor=pointer]:
              - /url: /fr
            - text: .
      - generic [ref=e67]:
        - text: En cliquant sur "Créez votre compte", j'accepte et consens aux
        - link "Conditions d'utilisation (opens in a new window)" [ref=e68] [cursor=pointer]:
          - /url: https://www.nesto.ca/fr/conditions-d-utilisation/
        - text: .
    - generic [ref=e71]:
      - text: Lisez notre
      - link "politique de confidentialité (opens in a new window)" [ref=e72] [cursor=pointer]:
        - /url: https://www.nesto.ca/fr/politique-de-confidentialite/
      - text: pour en savoir plus
  - alert [ref=e73]
```

# Test source

```ts
  1   | import { AxeBuilder } from "@axe-core/playwright";
  2   | import type { Locator } from "@playwright/test";
  3   | import { expect, test } from "../../../src/fixtures/ui/page-object-fixture.js";
  4   | 
  5   | /**
  6   |  * Applies the same assertion to every matched control.
  7   |  * @param controls
  8   |  * @param assertion
  9   |  */
  10  | async function expectEvery(
  11  | 	controls: Locator,
  12  | 	assertion: (control: Locator) => Promise<void>,
  13  | ): Promise<void> {
  14  | 	const controlList = await controls.all();
  15  | 
> 16  | 	expect(controlList.length).toBeGreaterThan(0);
      |                             ^ Error: expect(received).toBeGreaterThan(expected)
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
  114 | 		expect(await page.evaluate(() => document.activeElement?.tagName)).not.toBe(
  115 | 			"BODY",
  116 | 		);
```