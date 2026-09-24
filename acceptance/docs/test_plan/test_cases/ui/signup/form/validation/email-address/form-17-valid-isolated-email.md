# FORM-17 - Submit a valid isolated email address

Verify that a valid, isolated email address is accepted in an otherwise valid form.

No email validation error is shown; request behavior follows the valid-form case.

## Given

The sign-up page is available in the selected locale and device project. Complete the other required fields with
isolated valid data, select Canada, and select consent. Generate a unique synthetic email address for this execution.

## When

Enter the generated email address and submit the completed form.

## Then

No email validation error is shown and the field is accepted for the valid-form flow. The test plan does not define a
separate success indicator for this field-only case.

## Parameters

| Project | Locale | Device | expected result |
|---|---|---|---|
| `chromium-en` | `en-CA` | Desktop | The isolated email is accepted without an email validation error. |
| `chromium-fr` | `fr-CA` | Desktop | The isolated email is accepted without an email validation error. |
| `mobile-en` | `en-CA` | Mobile | The isolated email is accepted without an email validation error. |
| `mobile-fr` | `fr-CA` | Mobile | The isolated email is accepted without an email validation error. |

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Open a fresh sign-up page in the selected locale and device project and generate a unique synthetic email. | The sign-up form is available and the email is isolated to this execution. |
| 2 | Fill the other required fields with valid isolated test data, select Canada, and select consent. | The other fields accept their values and consent is selected. |
| 3 | Enter the unique email and submit the form. | No email validation error is shown. |
| 4 | Inspect the form after submission. | The email is accepted for the remaining form flow. |
