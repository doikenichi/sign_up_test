# FORM-24 - Submit with a mismatched password confirmation

Verify that a confirmation value different from the password is rejected.

The mismatch error is shown and no account-creation request is sent.

## Given

The sign-up page is available in the selected locale and device project. Complete every other required field with
isolated valid data, select Canada and consent, and prepare data-driven mismatch values. The password itself is compliant.

## When

Enter the compliant password and a different confirmation value, then submit the form while monitoring for an
account-creation request.

## Then

The localized mismatch error is shown and no account-creation request is sent.

## Parameters

| Mismatch value | expected result |
|---|---|
| Data-driven value different from password | The localized mismatch error is shown and no request is sent. |

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Open a fresh sign-up page in the selected locale and device project. | The sign-up form is available. |
| 2 | Fill all other required fields with valid isolated test data, select Canada and consent, and enter a compliant password with one data-driven different confirmation value. | All fields accept their values except the intentionally mismatched confirmation. |
| 3 | Submit the form. | Submission is blocked and the localized mismatch error is shown. |
| 4 | Inspect network activity for the account-creation request. | No account-creation request is sent. |
