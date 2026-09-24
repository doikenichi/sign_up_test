# FORM-14 - Submit a valid Canadian phone number

Verify that a valid Canadian phone number passes validation after Canada is selected.

The `(###) ###-####` mask is shown and no phone validation error is shown.

## Given

The sign-up page is available in the selected locale and device project. Complete every other required field with
isolated valid data, select Canada, and select consent. Prepare a valid synthetic Canadian phone number.

## When

Enter the valid Canadian phone number and submit the otherwise valid form.

## Then

The phone number is displayed using the confirmed `(###) ###-####` mask, no phone validation error is shown, and the
valid-form flow continues.

## Parameters

| Project | Locale | Device | expected result |
|---|---|---|---|
| `chromium-en` | `en-CA` | Desktop | The Canadian mask is shown and no phone error is shown. |
| `chromium-fr` | `fr-CA` | Desktop | The Canadian mask is shown and no phone error is shown. |
| `mobile-en` | `en-CA` | Mobile | The Canadian mask is shown and no phone error is shown. |
| `mobile-fr` | `fr-CA` | Mobile | The Canadian mask is shown and no phone error is shown. |

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Open a fresh sign-up page and select Canada. | Canada is selected. |
| 2 | Fill all other required fields with valid isolated test data and select consent. | The other fields accept their values and consent is selected. |
| 3 | Enter a valid synthetic Canadian phone number and submit the form. | The `(###) ###-####` mask is shown and no phone error is shown. |
| 4 | Inspect the form after submission. | The phone value is accepted for the remaining form flow. |
