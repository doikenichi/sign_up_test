# FORM-29 - Reject a control character in the last name

Verify that a last name containing a control character is rejected before account creation.

The localized invalid-name error is shown and no account-creation request is sent.

## Given

The sign-up page is available in the selected locale and device project, with a fresh form for each execution.

Complete every required field with isolated, non-identifying valid test data, select Canada, and select consent. Use `O'Neil\u0007` as the last-name value, where `\u0007` is the BEL control character.

## When

Submit the completed form with the control character in the last-name field while monitoring for an account-creation request.

## Then

The last-name field shows the localized invalid-name error: `Invalid name` in `en-CA` or `Nom invalide` in `fr-CA`. No account-creation request is sent.

## Parameters

| Project | Locale | Device | expected result |
|---|---|---|---|
| `chromium-en` | `en-CA` | Desktop | The localized invalid-name error is shown and no account-creation request is sent. |
| `chromium-fr` | `fr-CA` | Desktop | The localized invalid-name error is shown and no account-creation request is sent. |
| `mobile-en` | `en-CA` | Mobile | The localized invalid-name error is shown and no account-creation request is sent. |
| `mobile-fr` | `fr-CA` | Mobile | The localized invalid-name error is shown and no account-creation request is sent. |

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Open a fresh sign-up page in the selected locale and device project. | The sign-up form is available. |
| 2 | Fill all required fields with valid isolated test data, select Canada and consent. | All fields except the intentionally invalid last name accept their values. |
| 3 | Enter `O'Neil\u0007` in the last-name field and submit the form. | Submission is blocked and the localized invalid-name error is shown for last name. |
| 4 | Inspect network activity for the account-creation request. | No account-creation request is sent. |
