# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\signup\validation\form-phone-number.spec.ts >> Phone-number validation >> FORM-12: handles phone number with too many digits
- Location: specs\ui\signup\validation\form-phone-number.spec.ts:32:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('phone-error-message-typography')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByTestId('phone-error-message-typography') with timeout 5000ms
  - waiting for getByTestId('phone-error-message-typography')

```

```yaml
- main:
  - link "nesto":
    - /url: /
    - img "nesto"
  - link "EN":
    - /url: /signup
  - link "Connexion":
    - /url: /
  - heading "Créez un compte nesto" [level=2]
  - img "nesto secure"
  - group:
    - textbox "Prénom" [invalid]
    - text: Prénom Ce champ est obligatoire.
  - group:
    - textbox "Nom": Hamill
    - text: Nom
  - group:
    - combobox "Phone number country":
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
    - textbox "Téléphone": "[redacted]"
    - text: Téléphone
  - group:
    - combobox "Province de l'achat":
      - option "Province de l'achat" [disabled]
      - option "Ontario" [selected]
      - option "Québec"
      - option "Alberta"
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
    - img
    - text: Province de l'achat
  - group:
    - textbox "Courriel": [redacted-email]
    - text: Courriel
  - group:
    - textbox "Mot de passe": Aa1XsmoCuoUXL0fa9K
    - text: Mot de passe Le mot de passe doit contenir au entre 12 et 32 caractères et contenir au moins une lettre majuscule, une lettre minuscule et un chiffre.
  - group:
    - textbox "Confirmation du mot de passe": Aa1XsmoCuoUXL0fa9K
    - text: Confirmation du mot de passe
  - group:
    - checkbox "En cochant cette case, vous acceptez d’être contacté par les partenaires de nesto dans le but de vous proposer des produits financiers. Vous acceptez que nesto partage vos informations de demande hypothécaire avec ses partenaires, si nous ne sommes pas en mesure de vous fournir nos services. Vous pouvez vous désinscrire à tout moment." [checked]
    - text: En cochant cette case, vous acceptez d’être contacté par les partenaires de nesto dans le but de vous proposer des produits financiers. Vous acceptez que nesto partage vos informations de demande hypothécaire avec ses partenaires, si nous ne sommes pas en mesure de vous fournir nos services. Vous pouvez vous désinscrire à tout moment.
  - button "Créez votre compte"
  - text: Vous avez déjà un compte?
  - link "Connectez-vous":
    - /url: /fr
  - text: . En cliquant sur "Créez votre compte", j'accepte et consens aux
  - link "Conditions d'utilisation (opens in a new window)":
    - /url: https://www.nesto.ca/fr/conditions-d-utilisation/
  - text: . Lisez notre
  - link "politique de confidentialité (opens in a new window)":
    - /url: https://www.nesto.ca/fr/politique-de-confidentialite/
  - text: pour en savoir plus
- alert
```

# Test source

```ts
  1  | import {
  2  |     expectNoAccountCreationRequest
  3  | } from "../../../../src/assertions/sign-up-validation/expect-no-account-creation-request.js";
  4  | import {expect, test} from "../../../../src/fixtures/ui/test-options.js";
  5  | import {completeSignUpForm} from "../../../../src/test-helpers/complete-sign-up-form.js";
  6  | 
  7  | 
  8  | const invalidNumbers = [
  9  |     {description: "letters", phoneNumber: "41655ABCD"},
  10 |     {description: "too few digits", phoneNumber: "[redacted-phone]"},
  11 |     {description: "too many digits", phoneNumber: "[redacted-phone]"},
  12 | ] as const;
  13 | 
  14 | test.describe("Phone-number validation", () => {
  15 |     test("FORM-11: handles an empty phone number", {
  16 |         tag: ["@security", "@SEC-01", "@SEC-05"],
  17 |     }, async ({interceptNetworkCall, signUpPage}) => {
  18 |         // Arrange
  19 |         await completeSignUpForm(signUpPage, {phoneNumber: "", firstName: "[redacted]"});
  20 | 
  21 |         // Act
  22 |         await expectNoAccountCreationRequest(
  23 |             interceptNetworkCall,
  24 |             signUpPage.createAccountButton,
  25 |         );
  26 | 
  27 |         // Assert
  28 |         await expect(signUpPage.phoneNumberError).toBeVisible();
  29 |     });
  30 | 
  31 |     for (const invalidCase of invalidNumbers) {
  32 |         test(`FORM-12: handles phone number with ${invalidCase.description}`, {
  33 |             tag: ["@security", "@SEC-05"],
  34 |         }, async ({interceptNetworkCall, signUpPage}) => {
  35 |             // Arrange
  36 |             await completeSignUpForm(signUpPage, {
  37 |                 phoneCountry: "CA",
  38 |                 phoneNumber: invalidCase.phoneNumber,
  39 |                 firstName: "[redacted]",
  40 |             });
  41 | 
  42 |             // Act
  43 |             await expectNoAccountCreationRequest(
  44 |                 interceptNetworkCall,
  45 |                 signUpPage.createAccountButton,
  46 |             );
  47 | 
  48 |             // Assert
> 49 |             await expect(signUpPage.phoneNumberError).toBeVisible();
     |                                                       ^ Error: expect(locator).toBeVisible() failed
  50 |         });
  51 |     }
  52 | 
  53 |     test("FORM-13: accepts a valid Brazilian phone number", {
  54 |         tag: ["@security", "@SEC-05"],
  55 |     }, async ({signUpPage}) => {
  56 |         // Arrange
  57 |         await completeSignUpForm(signUpPage, {
  58 |             phoneCountry: "BR",
  59 |             phoneNumber: "[redacted-phone]",
  60 |             firstName: "[redacted]",
  61 |         });
  62 | 
  63 |         // Act
  64 |         await signUpPage.createAccountButton.click();
  65 | 
  66 |         // Assert
  67 |         await expect(signUpPage.phoneCountrySelect).toHaveValue("BR");
  68 |         await expect(signUpPage.phoneNumberInput).toHaveValue("([redacted-phone]");
  69 |         await expect(signUpPage.phoneNumberError).toHaveCount(0);
  70 |     });
  71 | 
  72 |     test("FORM-14: accepts a valid Canadian phone number", {
  73 |         tag: ["@security", "@SEC-05"],
  74 |     }, async ({signUpPage}) => {
  75 |         // Arrange
  76 |         await completeSignUpForm(signUpPage, {
  77 |             phoneCountry: "CA",
  78 |             phoneNumber: "[redacted-phone]",
  79 |             firstName: "[redacted]",
  80 |         });
  81 | 
  82 |         // Act
  83 |         await signUpPage.createAccountButton.click();
  84 | 
  85 |         // Assert
  86 |         await expect(signUpPage.phoneCountrySelect).toHaveValue("CA");
  87 |         await expect(signUpPage.phoneNumberInput).toHaveValue("([redacted-phone]");
  88 |         await expect(signUpPage.phoneNumberError).toHaveCount(0);
  89 |     });
  90 | });
  91 | 
```