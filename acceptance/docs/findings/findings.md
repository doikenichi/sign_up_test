This file contains findings from testing.

## Manual testing

1. Create your account button is enabled on page load
   This finding is not a feature bug but maybe an UX issue and a suggestion to improvement.

Since the button is enabled on page load, it may be confusing for users who are not yet ready to create an account.
Since the UI makes basic form validation, the user could be instructed to fill in the form before proceeding clicking
the button.
And the button could be disabled until the form is valid.

2. Lack of clear instructions for users on how to proceed with creating an account.

This finding is not a feature bug but maybe an UX issue and a suggestion to improvement.
Even though everyone at this point is used to the account creation process, it is still important to provide clear
instructions to users on how to proceed with creating an account.

One example is a wizard-style form that guides users on how to fill each form.

For example, there are no clear instructions of the name validation; however, the error is shown if the rule is broken
and there is no clear instruction on how the user could proceed.

3. Phone Country code
   What is the `International` country code?


4. inconsistent locale for phone number error text
   In English is "invalid value" and in French is "Valeur invalide."
   There is a dot "." at the end of the French string

5. inconsistent locale for privacy policy text
   In English is "Privacy Policy" and in French is "politique de confidentialité"
   While in English is "Camel Case" in French is lowercase

6. sign up flow returns access token with about 5 hours access
   The user is authenticated with user and password by calling https://auth.nesto.ca/co/authenticate
   The token should be valid for the session, there shouldn't be a need to generate new token.
   I haven't checked the content of the jwt token, but I'm assuming that is same tenant
   {
   "client_id":"Fg4dnbZoCq7oA0rWplMLWnI1oE0HGy3l",
   "username":"form02-chromium-en-fe6080ee-3062-4237-b8da-2558e37f45af@gmail.com",
   "password":"Aa1wZs9qOfM6wDWFqT",
   "realm":"Username-Password-Authentication-Qa",
   "credential_type":"http://auth0.com/oauth/grant-type/password-realm"
   }

## Automated Testing

### UI testing

#### `env/.env.mobile-en`

| Test suite | ENV_FILE | Playwright project | Finding |
| --- | --- | --- | --- |
| A11Y-05: keeps keyboard focus visible and moving | `env/.env.mobile-en` | `mobile-en` | [Sign-up page focus does not continue after the form in mobile-en](a11y-05-sign-up-focus-does-not-continue-mobile-en.md) |
| A11Y-06: exposes readable validation and help text | `env/.env.mobile-en` | `mobile-en` | [Sign-up validation messages are not exposed to the accessibility check in mobile-en](a11y-06-sign-up-validation-messages-not-found-mobile-en.md) |
| A11Y-03: exposes required and invalid states | `env/.env.mobile-en` | `mobile-en` | [Sign-up form controls do not expose required state in mobile-en](a11y-03-sign-up-control-missing-required-state-mobile-en.md) |
| SUNNY-03: detects Canada from an international phone number | `env/.env.mobile-en` | `mobile-en` | [International Canadian phone number keeps the international display format in mobile-en](sunny-03-international-phone-number-keeps-international-format-mobile-en.md) |
| FORM-26 and FORM-28: Unicode first and last names | `env/.env.mobile-en` | `mobile-en` | [Sign-up form rejects Unicode first and last names in mobile-en](form-26-28-sign-up-rejects-unicode-names-mobile-en.md) |
| FORM-12: handles phone number with too many digits | `env/.env.mobile-en` | `mobile-en` | [Sign-up form does not show an error for an overlong phone number in mobile-en](form-12-overlong-phone-number-no-validation-mobile-en.md) |

#### `env/.env.mobile-fr`

| Test suite | ENV_FILE | Playwright project | Finding |
| --- | --- | --- | --- |
| A11Y-03: exposes required and invalid states | `env/.env.mobile-fr` | `mobile-fr` | [Sign-up form controls do not expose required state in mobile-fr](a11y-03-sign-up-control-missing-required-state-mobile-fr.md) |
| A11Y-05: keeps keyboard focus visible and moving | `env/.env.mobile-fr` | `mobile-fr` | [Sign-up page focus does not continue after the form in mobile-fr](a11y-05-sign-up-focus-does-not-continue-mobile-fr.md) |
| A11Y-06: exposes readable validation and help text | `env/.env.mobile-fr` | `mobile-fr` | [Sign-up validation messages are not exposed to the accessibility check in mobile-fr](a11y-06-sign-up-validation-messages-not-found-mobile-fr.md) |
| SUNNY-03: detects Canada from an international phone number | `env/.env.mobile-fr` | `mobile-fr` | [International Canadian phone number keeps the international display format in mobile-fr](sunny-03-international-phone-number-keeps-international-format-mobile-fr.md) |
| FORM-26 and FORM-28: Unicode first and last names | `env/.env.mobile-fr` | `mobile-fr` | [Sign-up form rejects Unicode first and last names in mobile-fr](form-26-28-sign-up-rejects-unicode-names-mobile-fr.md) |
| FORM-12: handles phone number with too many digits | `env/.env.mobile-fr` | `mobile-fr` | [Sign-up form does not show an error for an overlong phone number in mobile-fr](form-12-overlong-phone-number-no-validation-mobile-fr.md) |

#### `env/.env.desk-en` and `env/.env.desk-fr`

| Test suite | ENV_FILE | Playwright project | Finding |
| --- | --- | --- | --- |
| A11Y-03: exposes required and invalid states | `env/.env.desk-en`, `env/.env.desk-fr` | `chromium-en`, `chromium-fr` | [Sign-up form control does not expose its required state](a11y-03-sign-up-control-missing-required-state.md) |
| SUNNY-03: detects Canada from an international phone number | `env/.env.desk-en`, `env/.env.desk-fr` | `chromium-en`, `chromium-fr` | [International Canadian phone number keeps the international display format](sunny-03-international-phone-number-keeps-international-format.md) |
| FORM-26 and FORM-28: Unicode first and last names | `env/.env.desk-en`, `env/.env.desk-fr` | `chromium-en`, `chromium-fr` | [Sign-up form rejects Unicode first and last names](form-26-28-sign-up-rejects-unicode-names.md) |
| FORM-12: handles phone number with too many digits | `env/.env.desk-en`, `env/.env.desk-fr` | `chromium-en`, `chromium-fr` | [Sign-up form does not show an error for an overlong phone number](form-12-overlong-phone-number-no-validation.md) |

### API testing

| Test suite | Finding |
| --- | --- |
| API-02: Reject missing or invalid required fields | [Account creation returns HTTP 500 for an empty payload](api-02-account-api-returns-500-for-empty-payload.md) |
| API-02: Reject missing or invalid required fields | [Account creation accepts missing required fields](api-02-account-api-accepts-missing-required-fields.md) |
| API-02: Reject missing or invalid required fields | [Account creation accepts invalid password values](api-02-account-api-accepts-invalid-passwords.md) |
| API-02: Reject missing or invalid required fields | [Account creation accepts invalid phone values](api-02-account-api-accepts-invalid-phone-values.md) |
| API-02 and API-03: Invalid name values | [Account creation accepts malformed name values](api-03-account-api-accepts-invalid-name-values.md) |
