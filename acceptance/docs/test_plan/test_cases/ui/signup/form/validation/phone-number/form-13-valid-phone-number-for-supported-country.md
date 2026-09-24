# FORM-13 - Submit a valid phone number for another supported country

Verify that a valid phone number for another supported country uses that country’s format and passes validation.

The country-specific format is applied and no phone validation error is shown. The supported country and exact format
remain evidence gaps and must be confirmed before execution.

## Given

The sign-up page is available in the selected locale and device project. Confirm a supported country other than the
default Canadian flow and its valid phone format. Complete the other required fields with isolated valid data and select consent.

## When

Select the confirmed country, enter a valid number for that country, and submit the form.

## Then

The confirmed country-specific format is applied, no phone validation error is shown, and the test follows the valid-form flow.

## Parameters

| Project | Locale | Device | expected result |
|---|---|---|---|
| `chromium-en` | `en-CA` | Desktop | The confirmed country format is applied and no phone error is shown. |
| `chromium-fr` | `fr-CA` | Desktop | The confirmed country format is applied and no phone error is shown. |
| `mobile-en` | `en-CA` | Mobile | The confirmed country format is applied and no phone error is shown. |
| `mobile-fr` | `fr-CA` | Mobile | The confirmed country format is applied and no phone error is shown. |

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Open a fresh sign-up page and select the confirmed supported country. | The selector shows the confirmed country. |
| 2 | Fill the other required fields with valid isolated test data and select consent. | The other fields accept their values and consent is selected. |
| 3 | Enter the confirmed valid phone number and submit the form. | The country-specific format is applied and no phone validation error is shown. |
| 4 | Inspect the form after submission. | Phone validation passes for the remaining form flow. |
