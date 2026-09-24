# SUNNY-04 - Populate valid fields with consent unchecked

Verify that the sign-up form accepts valid data in every required field and allows consent to be selected before submission.

Values are accepted, applicable masks are applied, and no validation errors are shown.

## Given

The sign-up page is available in the selected locale and device project, with a fresh form for each execution.

Prepare isolated, non-identifying data for this case: synthetic first and last names containing letters, a valid
synthetic Canadian phone number, an email address generated for this execution, and a generated password. The password
must follow the existing locale guidance: 12-32 characters with at least one uppercase letter, one lowercase letter,
and one number. Use the same generated value for password confirmation.

## When

Populate every required field, select Canada as the phone country, and leave consent unchecked. Stop before submitting the form.

## Then

The form accepts the entered values, Canada remains selected, the phone number uses the confirmed mask
`(###) ###-####`, and consent remains unchecked. No field validation errors are shown after completing the form.

## Parameters

| Project | Locale | Device | expected result |
| --- | --- | --- | --- |
| `chromium-en` | `en-CA` | Desktop | Valid values are accepted, the Canadian phone mask is applied, consent is checked, and no validation errors are shown. |
| `chromium-fr` | `fr-CA` | Desktop | Valid values are accepted, the Canadian phone mask is applied, consent is checked, and no validation errors are shown. |
| `mobile-en` | `en-CA` | Mobile | Valid values are accepted, the Canadian phone mask is applied, consent is checked, and no validation errors are shown. |
| `mobile-fr` | `fr-CA` | Mobile | Valid values are accepted, the Canadian phone mask is applied, consent is checked, and no validation errors are shown. |

## Steps

| No | action | expected result |
| --- | --- | --- |
| 1 | Open a fresh sign-up page in the selected locale and device project. | The sign-up form is available in the selected locale. |
| 2 | Enter the synthetic first and last names. | Both fields retain the entered names. |
| 3 | Select Canada as the phone country and enter the valid synthetic Canadian number. | Canada is selected and the number is displayed as `(###) ###-####`, preserving its ten national digits. |
| 4 | Enter the email address generated for this execution. | The email field retains the entered address. |
| 5 | Enter the generated compliant password and the identical confirmation. | Both fields accept their values without password or confirmation validation errors. |
| 6 | Select the consent checkbox. | Consent is checked. |
| 7 | Inspect the completed form without submitting it. | The entered values remain accepted, the Canadian phone mask is applied, and no validation errors are shown. |
