# FORM-07 - Submit with an empty last name

Verify that submitting the sign-up form with no last-name value blocks submission and reports the required-field error.

The required error is shown and no account-creation request is sent.

## Given

The sign-up page is available in the selected locale and device project, with a fresh form for each execution.

Complete every required field except the last-name field with isolated, non-identifying valid test data. Select Canada
for the phone country, use a valid synthetic Canadian phone number, use a unique synthetic email address, use a
compliant generated password in both password fields, and select consent. Leave the last-name field empty.

## When

Submit the completed form with the last-name field empty while monitoring for an account-creation request.

## Then

The last-name field shows the localized required error: `The field is required` in `en-CA` or
`Ce champ est obligatoire.` in `fr-CA`. No account-creation request is sent.

## Parameters

| Project | Locale | Device | expected result |
|---|---|---|---|
| `chromium-en` | `en-CA` | Desktop | The localized required error is shown and no account-creation request is sent. |
| `chromium-fr` | `fr-CA` | Desktop | The localized required error is shown and no account-creation request is sent. |
| `mobile-en` | `en-CA` | Mobile | The localized required error is shown and no account-creation request is sent. |
| `mobile-fr` | `fr-CA` | Mobile | The localized required error is shown and no account-creation request is sent. |

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Open a fresh sign-up page in the selected locale and device project. | The sign-up form is available. |
| 2 | Fill every required field with valid isolated test data except last name; select Canada and consent. | The other fields accept their values and consent is selected. |
| 3 | Leave the last-name field empty and submit the form. | Submission is blocked and the localized required error is shown for last name. |
| 4 | Inspect network activity for the account-creation request. | No account-creation request is sent. |
