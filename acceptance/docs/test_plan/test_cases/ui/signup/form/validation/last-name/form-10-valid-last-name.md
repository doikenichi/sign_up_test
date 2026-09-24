# FORM-10 - Submit a valid last name

Verify that a valid last name is accepted in an otherwise valid form.

No last-name validation error is shown; request behavior follows the valid-form case.

## Given

The sign-up page is available in the selected locale and device project, with a fresh form for each execution.

Complete the other required fields with isolated, non-identifying valid test data, select Canada, and select consent.
Use `O'Neil-Smith` as the last-name value.

## When

Enter `O'Neil-Smith` in the last-name field and submit the completed form.

## Then

No last-name validation error is shown, and the field value is accepted for the remaining form flow. The test plan does
not require a success-state assertion for this field-only validation case.

## Parameters

| Project | Locale | Device | expected result |
|---|---|---|---|
| `chromium-en` | `en-CA` | Desktop | The valid last name is accepted without a last-name validation error. |
| `chromium-fr` | `fr-CA` | Desktop | The valid last name is accepted without a last-name validation error. |
| `mobile-en` | `en-CA` | Mobile | The valid last name is accepted without a last-name validation error. |
| `mobile-fr` | `fr-CA` | Mobile | The valid last name is accepted without a last-name validation error. |

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Open a fresh sign-up page in the selected locale and device project. | The sign-up form is available. |
| 2 | Fill the other required fields with valid isolated test data, select Canada, and select consent. | The other fields accept their values and consent is selected. |
| 3 | Enter `O'Neil-Smith` in the last-name field and submit the form. | The last-name value is accepted and no last-name validation error is shown. |
| 4 | Inspect the form after submission. | The last-name field remains accepted for the remaining form flow. |
