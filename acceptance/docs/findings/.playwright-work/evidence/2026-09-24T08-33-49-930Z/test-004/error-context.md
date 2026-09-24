# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\signup\validation\form-first-name.spec.ts >> First-name validation >> FORM-26: handles Unicode characters first name
- Location: specs\ui\signup\validation\form-first-name.spec.ts:77:9

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('first-name-error-message-typography')
Expected: 0
Received: 1
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" getByTestId('first-name-error-message-typography') with timeout 5000ms
  - waiting for getByTestId('first-name-error-message-typography')
    14 × locator resolved to 1 element
       - unexpected value "1"

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
              - textbox "Prénom" [active] [invalid] [ref=e22]: Élodie 李
              - generic: Prénom
            - generic [ref=e23]: Nom invalide
          - group [ref=e25]:
            - generic [ref=e26]:
              - textbox "Nom" [ref=e27]: Mohr
              - generic: Nom
          - group [ref=e28]:
            - generic [ref=e29]:
              - combobox "Phone number country" [ref=e31] [cursor=pointer]:
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
              - generic [ref=e35]:
                - textbox "Téléphone" [ref=e36]: ([redacted-phone]
                - generic: Téléphone
          - group [ref=e37]:
            - generic [ref=e38]:
              - combobox "Province de l'achat" [ref=e39]:
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
              - generic: Province de l'achat
          - group [ref=e40]:
            - generic [ref=e41]:
              - textbox "Courriel" [ref=e42]: [redacted-email]
              - generic: Courriel
          - group [ref=e43]:
            - generic [ref=e44]:
              - textbox "Mot de passe" [ref=e45]: Aa1UR7SswDRXyVDksR
              - generic: Mot de passe
            - generic [ref=e46]: Le mot de passe doit contenir au entre 12 et 32 caractères et contenir au moins une lettre majuscule, une lettre minuscule et un chiffre.
          - group [ref=e47]:
            - generic [ref=e48]:
              - textbox "Confirmation du mot de passe" [invalid] [ref=e49]
              - generic: Confirmation du mot de passe
            - generic [ref=e50]: Les mots de passe ne correspondent pas
          - group [ref=e52]:
            - generic [ref=e53]:
              - checkbox "En cochant cette case, vous acceptez d’être contacté par les partenaires de nesto dans le but de vous proposer des produits financiers. Vous acceptez que nesto partage vos informations de demande hypothécaire avec ses partenaires, si nous ne sommes pas en mesure de vous fournir nos services. Vous pouvez vous désinscrire à tout moment." [checked] [ref=e54]
              - generic [ref=e55]: En cochant cette case, vous acceptez d’être contacté par les partenaires de nesto dans le but de vous proposer des produits financiers. Vous acceptez que nesto partage vos informations de demande hypothécaire avec ses partenaires, si nous ne sommes pas en mesure de vous fournir nos services. Vous pouvez vous désinscrire à tout moment.
          - button "Créez votre compte" [ref=e56] [cursor=pointer]
          - generic [ref=e58]:
            - text: Vous avez déjà un compte?
            - link "Connectez-vous" [ref=e59] [cursor=pointer]:
              - /url: /fr
            - text: .
      - generic [ref=e61]:
        - text: En cliquant sur "Créez votre compte", j'accepte et consens aux
        - link "Conditions d'utilisation (opens in a new window)" [ref=e62] [cursor=pointer]:
          - /url: https://www.nesto.ca/fr/conditions-d-utilisation/
        - text: .
    - generic [ref=e65]:
      - text: Lisez notre
      - link "politique de confidentialité (opens in a new window)" [ref=e66] [cursor=pointer]:
        - /url: https://www.nesto.ca/fr/politique-de-confidentialite/
      - text: pour en savoir plus
  - alert [ref=e67]
```

# Test source

```ts
  2   | 	expectNoAccountCreationRequest
  3   | } from "../../../../src/assertions/sign-up-validation/expect-no-account-creation-request.js";
  4   | import {expect, test} from "../../../../src/fixtures/ui/test-options.js";
  5   | import {completeSignUpForm} from "../../../../src/test-helpers/complete-sign-up-form.js";
  6   | 
  7   | 
  8   | type FirstNameValidationCase = {
  9   |     id:
  10  |         | "FORM-04"
  11  |         | "FORM-05"
  12  |         | "FORM-05A"
  13  |         | "FORM-05B"
  14  |         | "FORM-06"
  15  |         | "FORM-26"
  16  |         | "FORM-27";
  17  |     description: string;
  18  |     firstName: string;
  19  |     error: "required" | "invalid" | "too_long" | "none";
  20  |     tags: string[];
  21  | };
  22  | 
  23  | const firstNameValidationCases: FirstNameValidationCase[] = [
  24  |     {
  25  |         id: "FORM-04",
  26  |         description: "empty",
  27  |         firstName: "[redacted]",
  28  |         error: "required",
  29  |         tags: ["@security", "@SEC-01", "@SEC-06"],
  30  |     },
  31  |     {
  32  |         id: "FORM-05",
  33  |         description: "whitespace-only",
  34  |         firstName: "[redacted]",
  35  |         error: "required",
  36  |         tags: ["@security", "@SEC-06"],
  37  |     },
  38  |     {
  39  |         id: "FORM-05A",
  40  |         description: "invalid-character",
  41  |         firstName: "[redacted]",
  42  |         error: "invalid",
  43  |         tags: ["@security", "@SEC-06"],
  44  |     },
  45  |     {
  46  |         id: "FORM-05B",
  47  |         description: "overlong",
  48  |         firstName: "[redacted]".repeat(64),
  49  |         error: "too_long",
  50  |         tags: ["@security", "@SEC-06", "@SEC-07"],
  51  |     },
  52  |     {
  53  |         id: "FORM-06",
  54  |         description: "valid characters",
  55  |         firstName: "[redacted]",
  56  |         error: "none",
  57  |         tags: ["@security", "@SEC-06"],
  58  |     },
  59  |     {
  60  |         id: "FORM-26",
  61  |         description: "Unicode characters",
  62  |         firstName: "[redacted]",
  63  |         error: "none",
  64  |         tags: ["@security", "@SEC-06"],
  65  |     },
  66  |     {
  67  |         id: "FORM-27",
  68  |         description: "control character",
  69  |         firstName: "[redacted]",
  70  |         error: "invalid",
  71  |         tags: ["@security", "@SEC-06"],
  72  |     },
  73  | ];
  74  | 
  75  | test.describe("First-name validation", () => {
  76  |     for (const validationCase of firstNameValidationCases) {
  77  |         test(`${validationCase.id}: handles ${validationCase.description} first name`, {
  78  |             tag: validationCase.tags,
  79  |         }, async ({content, interceptNetworkCall, signUpPage}) => {
  80  |             // Arrange
  81  |             // passwordConfirmation: "" to not allow user submission
  82  |             await completeSignUpForm(signUpPage, {
  83  |                 firstName: validationCase.firstName,
  84  |                 passwordConfirmation: "",
  85  |             });
  86  | 
  87  |             // Act
  88  |             if (validationCase.error === "none") {
  89  |                 await signUpPage.createAccountButton.click();
  90  |             } else {
  91  |                 await expectNoAccountCreationRequest(
  92  |                     interceptNetworkCall,
  93  |                     signUpPage.createAccountButton,
  94  |                 );
  95  |             }
  96  | 
  97  |             // Assert
  98  |             if (validationCase.error === "none") {
  99  |                 await expect(signUpPage.firstNameInput).toHaveValue(
  100 |                     validationCase.firstName,
  101 |                 );
> 102 |                 await expect(signUpPage.firstNameError).toHaveCount(0);
      |                                                         ^ Error: expect(locator).toHaveCount(expected) failed
  103 |                 return;
  104 |             }
  105 | 
  106 |             const expectedError = {
  107 |                 required: content.signUp.firstNameErrorRequired,
  108 |                 invalid: content.signUp.firstNameErrorInvalid,
  109 |                 too_long: content.signUp.firstNameErrorTooManyCharacters,
  110 |             }[validationCase.error];
  111 |             await expect(signUpPage.firstNameError).toHaveText(expectedError);
  112 |         });
  113 |     }
  114 | });
  115 | 
```