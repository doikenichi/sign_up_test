# FORM-26 - Accept a Unicode first name

Verify that an accented and non-Latin first name is accepted.

The first-name value is retained and no first-name validation error is shown. No account-creation request is sent as part of this field-only check.

## Given

The sign-up page is available in the selected locale and device project, with a fresh form for each execution.

Complete the other required fields with isolated, non-identifying valid test data, select Canada, and select consent. Leave password confirmation empty so the test does not create an account.

## When

Enter `Élodie 李` in the first-name field and attempt to submit the form.

## Then

The first-name value is accepted and no first-name validation error is shown. The empty password confirmation prevents account creation.

## Parameters

| Project | Locale | Device | expected result |
|---|---|---|---|
| `chromium-en` | `en-CA` | Desktop | The Unicode first name is accepted without a first-name validation error. |
| `chromium-fr` | `fr-CA` | Desktop | The Unicode first name is accepted without a first-name validation error. |
| `mobile-en` | `en-CA` | Mobile | The Unicode first name is accepted without a first-name validation error. |
| `mobile-fr` | `fr-CA` | Mobile | The Unicode first name is accepted without a first-name validation error. |

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Open a fresh sign-up page in the selected locale and device project. | The sign-up form is available. |
| 2 | Fill the other required fields with valid isolated test data, select Canada and consent, and leave password confirmation empty. | The other fields accept their values and consent is selected. |
| 3 | Enter `Élodie 李` in the first-name field and submit the form. | The first-name value is retained and no first-name validation error is shown. |
| 4 | Inspect network activity for the account-creation request. | No account-creation request is sent because password confirmation is empty. |
