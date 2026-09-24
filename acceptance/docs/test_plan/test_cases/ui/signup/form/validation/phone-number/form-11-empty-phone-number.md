# FORM-11 - Submit with an empty phone number

Verify that an empty phone number is rejected before account creation.

The phone required or invalid result is shown and no account-creation request is sent. The exact required message needs confirmation.

## Given

The sign-up page is available in the selected locale and device project. Complete every required field except the phone
number with isolated valid data, select Canada, and select consent. Leave the phone number empty.

## When

Submit the completed form while monitoring for an account-creation request.

## Then

The phone validation result is shown and no account-creation request is sent. Assert the exact localized message only
after it is confirmed by the locale fixture or product evidence.

## Parameters

| Project | Locale | Device | expected result |
|---|---|---|---|
| `chromium-en` | `en-CA` | Desktop | Phone validation is shown and no request is sent. |
| `chromium-fr` | `fr-CA` | Desktop | Phone validation is shown and no request is sent. |
| `mobile-en` | `en-CA` | Mobile | Phone validation is shown and no request is sent. |
| `mobile-fr` | `fr-CA` | Mobile | Phone validation is shown and no request is sent. |

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Open a fresh sign-up page in the selected locale and device project. | The sign-up form is available. |
| 2 | Fill all required fields with valid isolated test data except phone number; select Canada and consent. | The other fields accept their values and consent is selected. |
| 3 | Leave the phone number empty and submit the form. | Phone validation is shown and submission is blocked. |
| 4 | Inspect network activity for the account-creation request. | No account-creation request is sent. |
