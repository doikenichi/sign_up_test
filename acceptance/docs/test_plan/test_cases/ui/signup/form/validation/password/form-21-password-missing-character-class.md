# FORM-21 - Submit a password missing a required character class

Verify that a 12–32 character password missing an uppercase letter, lowercase letter, or number is rejected.

The localized complexity error is shown and no account-creation request is sent.

## Given

The sign-up page is available in the selected locale and device project. Complete every other required field with
isolated valid data, select Canada and consent, and prepare data-driven passwords that are 12–32 characters long and
each omit one required character class. Use each invalid password in the confirmation field as well.

## When

Submit the form once for each password missing a required character class while monitoring for an account-creation request.

## Then

The localized password complexity error is shown for each value and no account-creation request is sent.

## Parameters

| Missing class | expected result |
|---|---|
| Uppercase letter | The complexity error is shown and no request is sent. |
| Lowercase letter | The complexity error is shown and no request is sent. |
| Number | The complexity error is shown and no request is sent. |

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Open a fresh sign-up page in the selected locale and device project. | The sign-up form is available. |
| 2 | Fill all other required fields with valid isolated test data, select Canada and consent, and enter one data-driven invalid password in both password fields. | All fields accept their values except the intentionally incomplete password. |
| 3 | Submit the form. | Submission is blocked and the localized complexity error is shown. |
| 4 | Inspect network activity for the account-creation request. | No account-creation request is sent. |
