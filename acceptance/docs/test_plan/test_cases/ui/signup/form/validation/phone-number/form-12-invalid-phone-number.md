# FORM-12 - Submit an invalid phone number

Verify that phone values containing letters, too few digits, or too many digits are rejected.

The phone validation error is shown and no account-creation request is sent.

## Given

The sign-up page is available in the selected locale and device project. Complete every required field except the phone
number with isolated valid data, select a confirmed supported country, and select consent. Prepare data-driven invalid
values containing letters, too few digits, and too many digits. The supported country must be confirmed before execution.

## When

Submit the form once for each invalid phone value while monitoring for an account-creation request.

## Then

The phone validation error is shown for each invalid value and no account-creation request is sent.

## Parameters

| Invalid value class | expected result |
|---|---|
| Letters | The phone validation error is shown and no request is sent. |
| Too few digits | The phone validation error is shown and no request is sent. |
| Too many digits | The phone validation error is shown and no request is sent. |

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Open a fresh sign-up page in the selected locale and device project and select the confirmed supported country. | The phone country selector shows the confirmed country. |
| 2 | Fill all other required fields with valid isolated test data and select consent. | The other fields accept their values and consent is selected. |
| 3 | Enter one data-driven invalid phone value and submit the form. | Submission is blocked and the phone validation error is shown. |
| 4 | Inspect network activity for the account-creation request. | No account-creation request is sent. |
