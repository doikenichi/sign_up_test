# FORM-05B - Submit a first name longer than 63 characters

Verify that a first-name value longer than 63 characters is rejected before account creation.

The length validation error is shown and no account-creation request is sent.

## Given

The sign-up page is available in the selected locale and device project, with a fresh form for each execution.

Complete every required field with isolated, non-identifying valid test data, select Canada, and select consent. Prepare
a first-name value containing 64 letters so it exceeds the documented 63-character limit.

## When

Enter the 64-character first name and submit the completed form while monitoring for an account-creation request.

## Then

The first-name field shows the length validation error, and no account-creation request is sent. The test plan does not
define the exact localized text for this length error, so assert the field's length validation result without guessing its
message.

## Parameters

| Project | Locale | Device | expected result |
|---|---|---|---|
| `chromium-en` | `en-CA` | Desktop | The length validation error is shown and no account-creation request is sent. |
| `chromium-fr` | `fr-CA` | Desktop | The length validation error is shown and no account-creation request is sent. |
| `mobile-en` | `en-CA` | Mobile | The length validation error is shown and no account-creation request is sent. |
| `mobile-fr` | `fr-CA` | Mobile | The length validation error is shown and no account-creation request is sent. |

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Open a fresh sign-up page in the selected locale and device project. | The sign-up form is available. |
| 2 | Fill all required fields with valid isolated test data, select Canada, and select consent. | All fields except the overlong first name accept their values. |
| 3 | Enter a first-name value containing 64 letters and submit the form. | Submission is blocked and the first-name length validation error is shown. |
| 4 | Inspect network activity for the account-creation request. | No account-creation request is sent. |
