# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\signup\validation\form-last-name.spec.ts >> Last-name validation >> FORM-28: handles Unicode characters last name
- Location: specs\ui\signup\validation\form-last-name.spec.ts:55:9

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('last-name-error-message-typography')
Expected: 0
Received: 1
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" getByTestId('last-name-error-message-typography') with timeout 5000ms
  - waiting for getByTestId('last-name-error-message-typography')
    13 × locator resolved to 1 element
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
      - button "open burger menu" [ref=e7] [cursor=pointer]
    - generic [ref=e11]:
      - generic [ref=e12]:
        - generic [ref=e14]:
          - heading "Create a nesto account" [level=2] [ref=e15]
          - img "nesto secure" [ref=e16]
        - generic [ref=e19]:
          - group [ref=e20]:
            - generic [ref=e21]:
              - textbox "First name" [ref=e22]: Gregory
              - generic: First name
          - group [ref=e23]:
            - generic [ref=e24]:
              - textbox "Last name" [active] [invalid] [ref=e25]: Nguyễn 山田
              - generic: Last name
            - generic [ref=e26]: Invalid name
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
                - textbox "Phone number" [ref=e36]: ([redacted-phone]
                - generic: Phone number
          - group [ref=e37]:
            - generic [ref=e38]:
              - combobox "Province of purchase" [ref=e39]:
                - option "Province of purchase" [disabled]
                - option "Ontario" [selected]
                - option "Quebec"
                - option "Alberta"
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
          - group [ref=e40]:
            - generic [ref=e41]:
              - textbox "Email" [ref=e42]: [redacted-email]
              - generic: Email
          - group [ref=e43]:
            - generic [ref=e44]:
              - textbox "Password" [ref=e45]: Aa1mXmYnOkxIYCoHhO
              - generic: Password
            - generic [ref=e46]: Password must be between 12 and 32 characters and contain one uppercase letter, one lowercase letter and one number.
          - group [ref=e47]:
            - generic [ref=e48]:
              - textbox "Confirm password" [invalid] [ref=e49]
              - generic: Confirm password
            - generic [ref=e50]: Passwords do not match
          - group [ref=e52]:
            - generic [ref=e53]:
              - checkbox "By checking this box, you agree to be contacted by nesto’s partners for the purposes of offering you financial products. You agree to nesto sharing your mortgage information with its partners. You can opt-out at any time." [checked] [ref=e54]
              - generic [ref=e55]: By checking this box, you agree to be contacted by nesto’s partners for the purposes of offering you financial products. You agree to nesto sharing your mortgage information with its partners. You can opt-out at any time.
          - button "Create your account" [ref=e56] [cursor=pointer]
          - generic [ref=e58]:
            - text: Already have an account?
            - link "Log in" [ref=e59] [cursor=pointer]:
              - /url: /
            - text: .
      - generic [ref=e61]:
        - text: By clicking on "Create your account", I agree and consent to the
        - link "Terms of Service (opens in a new window)" [ref=e62] [cursor=pointer]:
          - /url: https://www.nesto.ca/terms-of-services/
        - text: .
    - generic [ref=e65]:
      - text: Read our
      - link "Privacy Policy (opens in a new window)" [ref=e66] [cursor=pointer]:
        - /url: https://www.nesto.ca/privacy-policy/
      - text: to learn more
  - alert [ref=e67]
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
  8  | const cases = [
  9  |     {
  10 |         id: "FORM-07",
  11 |         description: "empty",
  12 |         lastName: "[redacted]",
  13 |         error: "required",
  14 |         tags: ["@security", "@SEC-01", "@SEC-06"],
  15 |     },
  16 |     {
  17 |         id: "FORM-08",
  18 |         description: "whitespace-only",
  19 |         lastName: "[redacted]",
  20 |         error: "required",
  21 |         tags: ["@security", "@SEC-06"],
  22 |     },
  23 |     {
  24 |         id: "FORM-09",
  25 |         description: "invalid-character",
  26 |         lastName: "[redacted]",
  27 |         error: "invalid",
  28 |         tags: ["@security", "@SEC-06"],
  29 |     },
  30 |     {
  31 |         id: "FORM-10",
  32 |         description: "valid characters",
  33 |         lastName: "[redacted]",
  34 |         error: "none",
  35 |         tags: ["@security", "@SEC-06"],
  36 |     },
  37 |     {
  38 |         id: "FORM-28",
  39 |         description: "Unicode characters",
  40 |         lastName: "[redacted]",
  41 |         error: "none",
  42 |         tags: ["@security", "@SEC-06"],
  43 |     },
  44 |     {
  45 |         id: "FORM-29",
  46 |         description: "control character",
  47 |         lastName: "[redacted]",
  48 |         error: "invalid",
  49 |         tags: ["@security", "@SEC-06"],
  50 |     },
  51 | ] as const;
  52 | 
  53 | test.describe("Last-name validation", () => {
  54 |     for (const validationCase of cases) {
  55 |         test(`${validationCase.id}: handles ${validationCase.description} last name`, {
  56 |             tag: [...validationCase.tags],
  57 |         }, async ({content, interceptNetworkCall, signUpPage}) => {
  58 |             // Arrange
  59 |             // passwordConfirmation: "" to not allow user submission
  60 |             await completeSignUpForm(signUpPage, {
  61 |                 lastName: validationCase.lastName,
  62 |                 passwordConfirmation: "",
  63 |             });
  64 | 
  65 |             // Act
  66 |             if (validationCase.error === "none") {
  67 |                 await signUpPage.createAccountButton.click();
  68 |             } else {
  69 |                 await expectNoAccountCreationRequest(
  70 |                     interceptNetworkCall,
  71 |                     signUpPage.createAccountButton,
  72 |                 );
  73 |             }
  74 | 
  75 |             // Assert
  76 |             if (validationCase.error === "none") {
  77 |                 await expect(signUpPage.lastNameInput).toHaveValue(
  78 |                     validationCase.lastName,
  79 |                 );
> 80 |                 await expect(signUpPage.lastNameError).toHaveCount(0);
     |                                                        ^ Error: expect(locator).toHaveCount(expected) failed
  81 |                 return;
  82 |             }
  83 | 
  84 |             const expectedError =
  85 |                 validationCase.error === "invalid"
  86 |                     ? content.signUp.lastNameErrorInvalid
  87 |                     : content.signUp.lastNameErrorRequired;
  88 |             await expect(signUpPage.lastNameError).toHaveText(expectedError);
  89 |         });
  90 |     }
  91 | });
  92 | 
```