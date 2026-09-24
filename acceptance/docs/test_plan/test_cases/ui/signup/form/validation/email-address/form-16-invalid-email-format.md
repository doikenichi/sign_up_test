# FORM-16 - Submit an invalid email format

Verify that invalid email formats are rejected before account creation.

The localized email error is shown and no account-creation request is sent.

## Given

The sign-up page is available in the selected locale and device project. Complete every required field except email with
isolated valid data, select Canada, and select consent. Prepare data-driven invalid email formats.

## When

Enter each invalid email value and submit the completed form while monitoring for an account-creation request.

## Then

The localized email error is shown for each invalid format and no account-creation request is sent.

## Parameters

| Invalid format | expected result |
|---|---|
| Data-driven invalid email format | The localized email error is shown and no request is sent. |

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Open a fresh sign-up page in the selected locale and device project. | The sign-up form is available. |
| 2 | Fill all required fields with valid isolated test data except email; select Canada and consent. | The other fields accept their values and consent is selected. |
| 3 | Enter one data-driven invalid email format and submit the form. | Submission is blocked and the localized email error is shown. |
| 4 | Inspect network activity for the account-creation request. | No account-creation request is sent. |
