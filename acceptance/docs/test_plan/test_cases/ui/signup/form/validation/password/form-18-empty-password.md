# FORM-18 - Submit with an empty password

Verify that an empty password is rejected before account creation.

The password validation error is shown and no account-creation request is sent. The exact required message needs confirmation.

## Given

The sign-up page is available in the selected locale and device project. Complete every required field except password
with isolated valid data, select Canada, select consent, and leave password empty. The confirmation field is also empty.

## When

Submit the completed form while monitoring for an account-creation request.

## Then

The password validation error is shown and no account-creation request is sent. Assert the exact localized message only
after it is confirmed.

## Parameters

| Project | Locale | Device | expected result |
|---|---|---|---|
| `chromium-en` | `en-CA` | Desktop | Password validation is shown and no request is sent. |
| `chromium-fr` | `fr-CA` | Desktop | Password validation is shown and no request is sent. |
| `mobile-en` | `en-CA` | Mobile | Password validation is shown and no request is sent. |
| `mobile-fr` | `fr-CA` | Mobile | Password validation is shown and no request is sent. |

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Open a fresh sign-up page in the selected locale and device project. | The sign-up form is available. |
| 2 | Fill all required fields with valid isolated test data except password and confirmation; select Canada and consent. | The other fields accept their values and consent is selected. |
| 3 | Leave password empty and submit the form. | Password validation is shown and submission is blocked. |
| 4 | Inspect network activity for the account-creation request. | No account-creation request is sent. |
