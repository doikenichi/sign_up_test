# FORM-19 - Submit a password below the minimum length

Verify that a password shorter than the documented minimum is rejected before account creation.

The minimum-length error is shown and no account-creation request is sent.

## Given

The sign-up page is available in the selected locale and device project. Complete every other required field with
isolated valid data, select Canada and consent, and prepare a password below 12 characters. Use the same value in the
confirmation field so only the password length is invalid.

## When

Submit the form with the below-minimum password while monitoring for an account-creation request.

## Then

The localized minimum-length error is shown and no account-creation request is sent. Confirm whether the lower bound is
inclusive before implementation.

## Parameters

| Boundary value | expected result |
|---|---|
| Below 12 characters | The minimum-length error is shown and no request is sent. |

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Open a fresh sign-up page in the selected locale and device project. | The sign-up form is available. |
| 2 | Fill all required fields with valid isolated test data, select Canada and consent, and use the same below-minimum value in both password fields. | All fields accept their values except the intentionally invalid password. |
| 3 | Submit the form. | Submission is blocked and the localized minimum-length error is shown. |
| 4 | Inspect network activity for the account-creation request. | No account-creation request is sent. |
