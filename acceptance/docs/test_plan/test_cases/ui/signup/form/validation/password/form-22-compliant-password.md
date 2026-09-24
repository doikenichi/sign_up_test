# FORM-22 - Submit a compliant password and matching confirmation

Verify that a compliant password and matching confirmation are accepted.

No password error is shown; request behavior follows the valid-form case. Passwords must not be retained in evidence.

## Given

The sign-up page is available in the selected locale and device project. Complete the other required fields with
isolated valid data, select Canada, and select consent. Prepare boundary and representative passwords from the confirmed
12–32 character range, each containing an uppercase letter, lowercase letter, and number.

## When

Enter the compliant password and the same value in confirmation, then submit the completed form.

## Then

No password validation error is shown and the password fields are accepted for the valid-form flow. Do not retain the
password or confirmation in evidence.

## Parameters

| Password value | expected result |
|---|---|
| Confirmed lower-bound compliant value | No password error is shown. |
| Confirmed upper-bound compliant value | No password error is shown. |
| Representative compliant value | No password error is shown. |

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Open a fresh sign-up page in the selected locale and device project. | The sign-up form is available. |
| 2 | Fill the other required fields with valid isolated test data, select Canada and consent, and enter one data-driven compliant password in both password fields. | The fields accept their values and no password error is shown. |
| 3 | Submit the completed form. | No password validation error is shown. |
| 4 | Inspect retained evidence. | Password and confirmation values are not retained. |
