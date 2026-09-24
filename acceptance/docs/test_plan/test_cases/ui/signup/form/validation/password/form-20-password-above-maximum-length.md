# FORM-20 - Submit a password above the maximum length

Verify that a password longer than the documented maximum is rejected before account creation.

The length error is shown and no account-creation request is sent.

## Given

The sign-up page is available in the selected locale and device project. Complete every other required field with
isolated valid data, select Canada and consent, and prepare a compliant password above 32 characters. Use the same value
in the confirmation field so only the password length is invalid.

## When

Submit the form with the above-maximum password while monitoring for an account-creation request.

## Then

The password length error is shown and no account-creation request is sent. Confirm whether the upper bound is inclusive
before implementation.

## Parameters

| Boundary value | expected result |
|---|---|
| Above 32 characters | The length error is shown and no request is sent. |

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Open a fresh sign-up page in the selected locale and device project. | The sign-up form is available. |
| 2 | Fill all required fields with valid isolated test data, select Canada and consent, and use the same above-maximum value in both password fields. | All fields accept their values except the intentionally invalid password. |
| 3 | Submit the form. | Submission is blocked and the password length error is shown. |
| 4 | Inspect network activity for the account-creation request. | No account-creation request is sent. |
