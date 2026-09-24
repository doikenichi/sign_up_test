# FORM-15 - Submit with an empty email address

Verify that an empty email address is rejected before account creation.

The email validation error is shown and no account-creation request is sent. The exact required message needs confirmation.

## Given

The sign-up page is available in the selected locale and device project. Complete every required field except email with
isolated valid data, select Canada, and select consent. Leave the email field empty.

## When

Submit the completed form while monitoring for an account-creation request.

## Then

The email validation error is shown and no account-creation request is sent. Assert the exact localized message only
after it is confirmed.

## Parameters

| Project | Locale | Device | expected result |
|---|---|---|---|
| `chromium-en` | `en-CA` | Desktop | Email validation is shown and no request is sent. |
| `chromium-fr` | `fr-CA` | Desktop | Email validation is shown and no request is sent. |
| `mobile-en` | `en-CA` | Mobile | Email validation is shown and no request is sent. |
| `mobile-fr` | `fr-CA` | Mobile | Email validation is shown and no request is sent. |

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Open a fresh sign-up page in the selected locale and device project. | The sign-up form is available. |
| 2 | Fill all required fields with valid isolated test data except email; select Canada and consent. | The other fields accept their values and consent is selected. |
| 3 | Leave email empty and submit the form. | Email validation is shown and submission is blocked. |
| 4 | Inspect network activity for the account-creation request. | No account-creation request is sent. |
