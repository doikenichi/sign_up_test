# FORM-06 - Submit a valid first name

Verify that a valid first name using the supported letters, spaces, apostrophes, periods, or hyphens is accepted.

No first-name validation error is shown, and the field value is accepted for the remaining form flow.

## Given

The sign-up page is available in the selected locale and device project, with a fresh form for each execution.

Complete the other required fields with isolated, non-identifying valid test data, select Canada, and select consent.
Use `Anne-Marie O'Neil` as the first-name value; it contains letters, a hyphen, a space, and an apostrophe.

## When

Enter `Anne-Marie O'Neil` in the first-name field and submit the completed form.

## Then

No first-name validation error is shown, and the field value is accepted for the remaining form flow. The test plan does
not require a success-state assertion for this field-only validation case.

## Parameters

| Project | Locale | Device | expected result |
|---|---|---|---|
| `chromium-en` | `en-CA` | Desktop | The valid first name is accepted without a first-name validation error. |
| `chromium-fr` | `fr-CA` | Desktop | The valid first name is accepted without a first-name validation error. |
| `mobile-en` | `en-CA` | Mobile | The valid first name is accepted without a first-name validation error. |
| `mobile-fr` | `fr-CA` | Mobile | The valid first name is accepted without a first-name validation error. |

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Open a fresh sign-up page in the selected locale and device project. | The sign-up form is available. |
| 2 | Fill the other required fields with valid isolated test data, select Canada, and select consent. | The other fields accept their values and consent is selected. |
| 3 | Enter `Anne-Marie O'Neil` in the first-name field and submit the form. | The first-name value is accepted and no first-name validation error is shown. |
| 4 | Inspect the form after submission. | The first-name field remains accepted for the remaining form flow. |
