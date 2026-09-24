# FORM-25 - Submit with matching password confirmation

Verify that the same compliant value in both password fields is accepted.

No confirmation error is shown; request behavior follows the valid-form case. Passwords must not be retained in evidence.

## Given

The sign-up page is available in the selected locale and device project. Complete the other required fields with
isolated valid data, select Canada, and select consent. Prepare one compliant password containing an uppercase letter,
lowercase letter, and number within the confirmed 12–32 character range.

## When

Enter the same compliant value in password and confirmation, then submit the completed form.

## Then

No password-confirmation error is shown and the matching values are accepted for the valid-form flow. Do not retain the
password or confirmation in evidence.

## Parameters

| Project | Locale | Device | expected result |
|---|---|---|---|
| `chromium-en` | `en-CA` | Desktop | Matching confirmation is accepted without an error. |
| `chromium-fr` | `fr-CA` | Desktop | Matching confirmation is accepted without an error. |
| `mobile-en` | `en-CA` | Mobile | Matching confirmation is accepted without an error. |
| `mobile-fr` | `fr-CA` | Mobile | Matching confirmation is accepted without an error. |

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Open a fresh sign-up page in the selected locale and device project. | The sign-up form is available. |
| 2 | Fill the other required fields with valid isolated test data, select Canada and consent, and enter the same compliant value in both password fields. | The fields accept their values and no confirmation error is shown. |
| 3 | Submit the completed form. | No password-confirmation error is shown. |
| 4 | Inspect retained evidence. | Password and confirmation values are not retained. |
