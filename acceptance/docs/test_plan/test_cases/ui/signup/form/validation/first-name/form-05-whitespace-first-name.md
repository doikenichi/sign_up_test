# FORM-05 - Submit with whitespace as the first name

Verify that whitespace-only input in the first-name field is trimmed and treated as missing.

Whitespace is trimmed, the required-field error is shown, and no account-creation request is sent.

## Given

The sign-up page is available in the selected locale and device project, with a fresh form for each execution.

Complete every required field except the first-name field with isolated, non-identifying valid test data. Select Canada,
use a valid synthetic Canadian phone number, use a unique synthetic email address, use a compliant generated password
in both password fields, and select consent. Prepare whitespace-only first-name input such as three spaces.

## When

Enter only whitespace in the first-name field and submit the completed form while monitoring for an account-creation
request.

## Then

The whitespace-only value is trimmed, the first-name field shows the localized required error: `The field is required`
in `en-CA` or `Ce champ est obligatoire.` in `fr-CA`, and no account-creation request is sent.

## Parameters

| Project | Locale | Device | expected result |
|---|---|---|---|
| `chromium-en` | `en-CA` | Desktop | Whitespace is treated as missing, the localized required error is shown, and no request is sent. |
| `chromium-fr` | `fr-CA` | Desktop | Whitespace is treated as missing, the localized required error is shown, and no request is sent. |
| `mobile-en` | `en-CA` | Mobile | Whitespace is treated as missing, the localized required error is shown, and no request is sent. |
| `mobile-fr` | `fr-CA` | Mobile | Whitespace is treated as missing, the localized required error is shown, and no request is sent. |

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Open a fresh sign-up page in the selected locale and device project. | The sign-up form is available. |
| 2 | Fill every required field with valid isolated test data except first name; select Canada and consent. | The other fields accept their values and consent is selected. |
| 3 | Enter three spaces in the first-name field and submit the form. | The whitespace is trimmed, submission is blocked, and the localized required error is shown. |
| 4 | Inspect network activity for the account-creation request. | No account-creation request is sent. |
