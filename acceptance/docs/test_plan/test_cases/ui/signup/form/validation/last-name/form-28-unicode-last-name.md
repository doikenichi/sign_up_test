# FORM-28 - Accept a Unicode last name

Verify that accented and non-Latin characters in a last name are accepted.

The last-name value is retained and no last-name validation error is shown. No account-creation request is sent as part of this field-only check.

## Given

The sign-up page is available in the selected locale and device project, with a fresh form for each execution.

Complete the other required fields with isolated, non-identifying valid test data, select Canada, and select consent. Leave password confirmation empty so the test does not create an account.

## When

Enter `Nguyễn 山田` in the last-name field and attempt to submit the form.

## Then

The last-name value is accepted and no last-name validation error is shown. The empty password confirmation prevents account creation.

## Parameters

| Project | Locale | Device | expected result |
|---|---|---|---|
| `chromium-en` | `en-CA` | Desktop | The Unicode last name is accepted without a last-name validation error. |
| `chromium-fr` | `fr-CA` | Desktop | The Unicode last name is accepted without a last-name validation error. |
| `mobile-en` | `en-CA` | Mobile | The Unicode last name is accepted without a last-name validation error. |
| `mobile-fr` | `fr-CA` | Mobile | The Unicode last name is accepted without a last-name validation error. |

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Open a fresh sign-up page in the selected locale and device project. | The sign-up form is available. |
| 2 | Fill the other required fields with valid isolated test data, select Canada and consent, and leave password confirmation empty. | The other fields accept their values and consent is selected. |
| 3 | Enter `Nguyễn 山田` in the last-name field and submit the form. | The last-name value is retained and no last-name validation error is shown. |
| 4 | Inspect network activity for the account-creation request. | No account-creation request is sent because password confirmation is empty. |
