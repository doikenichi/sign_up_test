# FORM-23 - Submit with an empty password confirmation

Verify that an empty confirmation is rejected while the password is valid.

The confirmation error is shown and no account-creation request is sent.

## Given

The sign-up page is available in the selected locale and device project. Complete every other required field with
isolated valid data, select Canada and consent, enter a compliant password, and leave password confirmation empty.

## When

Submit the form while monitoring for an account-creation request.

## Then

The confirmation validation error is shown and no account-creation request is sent.

## Parameters

| Project | Locale | Device | expected result |
|---|---|---|---|
| `chromium-en` | `en-CA` | Desktop | Confirmation validation is shown and no request is sent. |
| `chromium-fr` | `fr-CA` | Desktop | Confirmation validation is shown and no request is sent. |
| `mobile-en` | `en-CA` | Mobile | Confirmation validation is shown and no request is sent. |
| `mobile-fr` | `fr-CA` | Mobile | Confirmation validation is shown and no request is sent. |

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Open a fresh sign-up page in the selected locale and device project. | The sign-up form is available. |
| 2 | Fill all required fields with valid isolated test data except confirmation; select Canada and consent. | The password is compliant, confirmation is empty, and the other fields accept their values. |
| 3 | Submit the form. | Submission is blocked and confirmation validation is shown. |
| 4 | Inspect network activity for the account-creation request. | No account-creation request is sent. |
