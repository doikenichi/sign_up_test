# FORM-05A - Submit a first name with an invalid character

Verify that a first name containing a character outside the supported name character set is rejected before account creation.

The invalid-name error is shown and no account-creation request is sent.

## Given

The sign-up page is available in the selected locale and device project, with a fresh form for each execution.

Complete every required field with isolated, non-identifying valid test data, select Canada, and select consent. Use
`Anne@` as the first-name value to exercise a character outside the supported name character set.

## When

Submit the completed form with `Anne@` in the first-name field while monitoring for an account-creation request.

## Then

The first-name field shows the localized invalid-name error: `Invalid name` in `en-CA` or `Nom invalide` in `fr-CA`.
No account-creation request is sent.

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
| 2 | Fill all required fields with valid isolated test data, select Canada, and select consent. | All fields except the intentionally invalid first name accept their values. |
| 3 | Enter `Anne@` in the first-name field and submit the form. | Submission is blocked and the localized invalid-name error is shown for first name. |
| 4 | Inspect network activity for the account-creation request. | No account-creation request is sent. |
