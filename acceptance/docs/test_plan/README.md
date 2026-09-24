# Test Plan

## Introduction

This document defines acceptance coverage for Nesto's sign-up flow. It covers the supported locales (`en-CA` and
`fr-CA`) and the configured desktop and mobile Playwright projects. The plan separates implemented automated coverage
from planned coverage that still needs an automated test, a product decision, or an execution environment.

### Test scope

The plan covers:

- page availability and the visible sign-up form;
- localized copy, accessible names, navigation and legal links, locale switching, and rendered layout;
- keyboard access, focus behavior, validation feedback, and automated accessibility scanning;
- client-side validation for the form fields, including request prevention for invalid data;
- valid-form submission, request and response handling, and the observable success state;
- duplicate-email and repeated-submission behavior when the relevant backend contract is confirmed; and
- narrowly defined API and security checks when the endpoint, environment, and expected results are available.

The acceptance suite is end-to-end. A case is considered automated only when a corresponding test exists in
`acceptance/specs` or a linked test-case document explicitly identifies the implementation gap.

### Out of scope

The plan does not assess backend implementation details, email delivery, third-party service behavior, unconfigured
platforms, performance or load, a complete security assessment, production-data cleanup, or post-registration account
workflows. A security scenario in this plan does not replace a penetration test or a threat-model review.

### Test execution strategy

Run from `acceptance` with one of these commands:

| Command                | Locale  | Device  |
|------------------------|---------|---------|
| `npm run test:desk:en` | `en-CA` | Desktop |
| `npm run test:desk:fr` | `fr-CA` | Desktop |
| `npm run test:mob:en`  | `en-CA` | Mobile  |
| `npm run test:mob:fr`  | `fr-CA` | Mobile  |

Each command selects one Playwright project through its environment file. CI execution settings are one worker, two
retries, an HTML report, and a trace on the first retry. A test that passes only after a retry requires flaky-test
review.

### Parameterized test approach

Use Playwright projects for locale and device coverage. Use data tables for field values, payloads, link definitions,
and expected results. Include the test ID and case name in generated titles.

Parameterize cases when the workflow and outcome are the same and only the locale, device, viewport, field value,
payload, or expected response changes. Keep cases separate when setup, side effects, risk, workflow, or outcome differs.
Do not create unneeded locale-by-device-by-data combinations; use the smallest matrix that covers the stated risk.

---

## Smoke tests

Confirm that the sign-up page is available before running the broader UI suite. API smoke coverage is planned but is not
currently backed by an API fixture or test in this repository.

### Scope

Smoke coverage is limited to page load, form visibility, and the localized heading. Detailed UI, validation,
accessibility, and API checks remain in their respective suites.

### Tests

| ID       | Test                                                              | Expected result                                                                                     | Parameters                                                                  |
|----------|-------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| `SMK-01` | Open the sign-up route and verify the form and localized heading. | The page loads, the form is visible, and the heading matches the selected locale fixture.           | All four Playwright projects.                                               |
| `SMK-02` | Send a safe payload with one required field omitted.              | **Planned.** The API returns the documented validation status and error, and no account is created. | One run per API environment after the endpoint and contract are identified. |

SMK-01 is mapped to A11Y-01
SMK-03 is mapped to API-02

### Parametrization

`SMK-01` is covered by the page and localization setup. `SMK-02` should use one fixed, non-identifying invalid payload
per API environment. Additional invalid payloads belong in the API suite.

---

## UI testing

Verify the sign-up flow across supported locales and devices, covering content, controls, validation, accessibility,
responsive layout, and submission feedback. API contract validation remains in the API suite.

The UI suite covers accessibility, localized content and links, language switching, responsive rendering, client-side
validation, and submission behavior, including request prevention for invalid forms and progression to the
account-creation boundary for valid forms.

### Accessibility

Verify the sign-up form's semantics, accessible names and states, keyboard operation, focus behavior, validation
feedback,
and automated WCAG violations across the configured locale and device projects.

#### Accessibility checks

| ID                                                                                 | Check                       | Expected result                                                                            |
|------------------------------------------------------------------------------------|-----------------------------|--------------------------------------------------------------------------------------------|
| [`A11Y-01`](test_cases/ui/signup/accessibility/a11y-01-localized-form-heading.md)  | Localized form heading      | The visible heading matches the locale fixture.                                            |
| [`A11Y-02`](test_cases/ui/signup/accessibility/a11y-02-control-names.md)           | Control names               | Every interactive form control has an accessible name.                                     |
| [`A11Y-03`](test_cases/ui/signup/accessibility/a11y-03-required-invalid-states.md) | Required and invalid states | Required state is exposed, and invalid submission exposes field errors.                    |
| [`A11Y-04`](test_cases/ui/signup/accessibility/a11y-04-keyboard-operation.md)      | Keyboard operation          | Links, controls, and submission are keyboard operable.                                     |
| [`A11Y-05`](test_cases/ui/signup/accessibility/a11y-05-focus-behavior.md)          | Focus behavior              | Focus is visible, ordered, and not trapped.                                                |
| [`A11Y-06`](test_cases/ui/signup/accessibility/a11y-06-help-and-error-content.md)  | Help and error content      | Guidance and errors are readable, associated with their controls, and not color-dependent. |
| [`A11Y-07`](test_cases/ui/signup/accessibility/a11y-07-automated-scan.md)          | Automated scan              | Axe reports no critical or serious violations.                                             |

Run all cases through the four Playwright projects. `A11Y-07` uses `@axe-core/playwright`. Targeted checks remain
necessary for keyboard flow, focus visibility, labels, and error behavior that an automated scan cannot fully assess.

### Locale

Verify localized content, links, language switching, and layout in `en-CA` and `fr-CA` across the configured desktop and
mobile projects.

#### Language switching

| ID                                                                                 | Test                                                  | Expected result                                                            | Parameters                              |
|------------------------------------------------------------------------------------|-------------------------------------------------------|----------------------------------------------------------------------------|-----------------------------------------|
| [`LOC-01`](test_cases/ui/signup/localization/loc-01-switch-to-alternate-locale.md) | Switch to the alternate locale from the sign-up page. | The target locale loads, key content updates, and the form remains usable. | `en-CA` to `fr-CA`; `fr-CA` to `en-CA`. |

#### Translation comparison

| ID                                                                                                  | Test                                                     | Expected result                                                                         | Parameters                                                                                                         |
|-----------------------------------------------------------------------------------------------------|----------------------------------------------------------|-----------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| [`LOC-02`](test_cases/ui/signup/localization/loc-02-compare-visible-content-with-locale-fixture.md) | Compare visible sign-up content with the locale fixture. | Each value matches the selected locale with no missing, mixed-locale, or fallback text. | Locale and content key: heading, field labels, password guidance, consent text, legal-link labels, and submit CTA. |

#### Links per locale

| ID                                                                                                | Test                                                      | Expected result                                                                                                                | Parameters                      |
|---------------------------------------------------------------------------------------------------|-----------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------|---------------------------------|
| [`LOC-03`](test_cases/ui/signup/localization/loc-03-open-localized-navigation-and-legal-links.md) | Open each navigation or legal link from the sign-up page. | The label matches the locale fixture, the `href` matches the approved destination, and the destination resolves without error. | Locale and link from the table. |

| Case         | Locale  | Link                         |
|--------------|---------|------------------------------|
| `login-en`   | `en-CA` | Log in                       |
| `login-fr`   | `fr-CA` | Connectez-vous               |
| `terms-en`   | `en-CA` | Terms of Service             |
| `terms-fr`   | `fr-CA` | Conditions d'utilisation     |
| `privacy-en` | `en-CA` | Privacy policy               |
| `privacy-fr` | `fr-CA` | Politique de confidentialite |

#### Page rendering

| ID                                                                                                    | Test                                                        | Expected result                                                                                                  | Parameters                    |
|-------------------------------------------------------------------------------------------------------|-------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|-------------------------------|
| [`LOC-04`](test_cases/ui/signup/localization/loc-04-page-rendering-before-and-after-locale-switch.md) | Check the initial layout and repeat after switching locale. | No text or controls overlap, clip, disappear, or cause unintended horizontal scrolling; the form remains usable. | All four Playwright projects. |

### Form validations

The form exposes these controls:

- First name
- Last name
- Phone number country selector
- Phone number
- Province of purchase
- Email
- Password
- Confirm password
- Consent checkbox
- Create your account button

#### Sunny scenario - all fields are valid

| ID                                                                                                      | Test                                                                       | Expected result                                                                                                     | Parameters                    |
|---------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|-------------------------------|
| [`SUNNY-01`](test_cases/ui/signup/form/sunny/sunny-01-populate-valid-fields-and-accept-consent.md)      | Populate every required field with valid data and accept consent.          | Values are accepted, applicable masks are applied, and no validation errors are shown.                              | All four Playwright projects. |
| [`SUNNY-02`](test_cases/ui/signup/form/sunny/sunny-02-submit-valid-form-with-unique-email.md)           | Submit a valid form using a unique email address.                          | One request is sent, the API returns `201`, and the UI enters the expected success state without validation errors. | All four Playwright projects. |
| [`SUNNY-03`](test_cases/ui/signup/form/sunny/sunny-03-detect-canada-from-international-phone-number.md) | Detect Canada from an international phone number.                          | The selector changes to Canada, the Canadian mask is applied, and the phone number passes validation.               | All four Playwright projects. |
| [`SUNNY-04`](test_cases/ui/signup/form/sunny/sunny-04-populate-valid-fields-and-uncheck-accept.md)      | Populate every required field with valid data and leave consent unchecked. | Values are accepted, applicable masks are applied, and no validation errors are shown.                              | All four Playwright projects. |

Use isolated, non-identifying data for each case. `SUNNY-01` stops before submission. `SUNNY-02` requires a unique email
per execution and must not retain passwords, password confirmation, tokens, or cookies in evidence. The exact success
indicator and response schema for `SUNNY-02` still require confirmation.

#### First name validation scenarios

Verify required, format, and length validation for the first-name field before account creation.

For each case, complete the other required fields with valid test data, leave consent selected, submit the form, and
inspect the first-name validation result immediately. Invalid first-name values must prevent a request to the account-
creation endpoint. A valid first name must produce no first-name validation error; request behavior for a fully valid
form is covered by `SUNNY-02`.

| ID                                                                                                             | Scenario                                                                                                             | Expected result                                                                                       |
|----------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| [`FORM-04`](test_cases/ui/signup/form/validation/form-04-empty-first-name.md)                                  | Leave the first-name field empty and submit the form.                                                                | Submission is blocked, the required-field error is shown, and no account-creation request is sent.    |
| [`FORM-05`](test_cases/ui/signup/form/validation/form-05-whitespace-first-name.md)                             | Enter only whitespace in the first-name field and submit the form.                                                   | Whitespace is trimmed, the required-field error is shown, and no account-creation request is sent.    |
| [`FORM-05A`](test_cases/ui/signup/form/validation/form-05a-invalid-character-in-first-name.md)                 | Enter a value containing a character outside the supported name character set, such as `@`, `_`, or `;`, and submit. | The invalid-name error is shown and no account-creation request is sent.                              |
| [`FORM-05B`](test_cases/ui/signup/form/validation/form-05b-first-name-over-63-characters.md)                   | Enter more than 63 characters in the first-name field and submit the form.                                           | The length validation error is shown and no account-creation request is sent.                         |
| [`FORM-06`](test_cases/ui/signup/form/validation/form-06-valid-first-name.md)                                  | Enter a valid first name using letters, spaces, apostrophes, periods, or hyphens, then submit.                       | No first-name validation error is shown, and the field value is accepted for the remaining form flow. |
| [`FORM-26`](test_cases/ui/signup/form/validation/first-name/form-26-unicode-first-name.md)                     | Enter a first name containing accented and non-Latin characters, then submit.                                        | The Unicode value is accepted without a first-name validation error.                                  |
| [`FORM-27`](test_cases/ui/signup/form/validation/first-name/form-27-reject-control-character-in-first-name.md) | Enter a first name containing a control character and submit.                                                        | The invalid-name error is shown and no account-creation request is sent.                              |

Run the cases in each configured locale and device project. Assert the localized error text where the locale fixtures
define it: `The field is required` / `Ce champ est obligatoire.` for required errors and `Invalid name` / `Nom invalide`
for invalid-name errors. The Playwright first-name validation spec covers the listed FORM cases.

#### Last-name validation scenarios

For each case, complete the other required fields with valid test data, leave consent selected, submit the form, and
inspect the last-name result immediately. Invalid values must block the account-creation request. Assert the localized
required and invalid-name messages from the locale fixture. The Playwright last-name validation spec exercises the
listed FORM cases.

| ID                                                                                                           | Scenario                                                                     | Expected result                                                            | Parameters                                 |
|--------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------|----------------------------------------------------------------------------|--------------------------------------------|
| [`FORM-07`](test_cases/ui/signup/form/validation/last-name/form-07-empty-last-name.md)                       | Leave last name empty and submit.                                            | The required error is shown and no account-creation request is sent.       | Four locale/device projects.               |
| [`FORM-08`](test_cases/ui/signup/form/validation/last-name/form-08-whitespace-last-name.md)                  | Enter only whitespace in last name and submit.                               | The required error is shown and no account-creation request is sent.       | Four locale/device projects.               |
| [`FORM-09`](test_cases/ui/signup/form/validation/last-name/form-09-invalid-character-in-last-name.md)        | Enter a disallowed character, such as `@`, `_`, or `;`, and submit.          | The invalid-name error is shown and no account-creation request is sent.   | Data-driven invalid values; four projects. |
| [`FORM-10`](test_cases/ui/signup/form/validation/last-name/form-10-valid-last-name.md)                       | Enter a valid last name and submit the otherwise valid form.                 | No last-name error is shown; request behavior follows the valid-form case. | Four locale/device projects.               |
| [`FORM-28`](test_cases/ui/signup/form/validation/last-name/form-28-unicode-last-name.md)                     | Enter a last name containing accented and non-Latin characters, then submit. | The Unicode value is accepted without a last-name validation error.        | Four locale/device projects.               |
| [`FORM-29`](test_cases/ui/signup/form/validation/last-name/form-29-reject-control-character-in-last-name.md) | Enter a last name containing a control character and submit.                 | The invalid-name error is shown and no account-creation request is sent.   | Four locale/device projects.               |

Run the cases in each configured locale and device project. The Playwright last-name validation spec covers the listed
FORM cases.

#### Phone-number validation scenarios

The country selector and phone value are one validation concern. Confirm the supported country set and exact invalid
messages before automating cases outside the currently evidenced Canadian flow.

| ID                                                                                                                 | Scenario                                                                    | Expected result                                                                      | Parameters                                                                                  |
|--------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|--------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| [`FORM-11`](test_cases/ui/signup/form/validation/phone-number/form-11-empty-phone-number.md)                       | Leave the phone number empty and submit.                                    | The phone required/invalid result is shown and no account-creation request is sent.  | Four locale/device projects; exact required message needs confirmation.                     |
| [`FORM-12`](test_cases/ui/signup/form/validation/phone-number/form-12-invalid-phone-number.md)                     | Enter a phone value with letters, too few digits, or too many digits.       | The phone validation error is shown and no account-creation request is sent.         | Data-driven invalid values; supported country must be confirmed.                            |
| [`FORM-13`](test_cases/ui/signup/form/validation/phone-number/form-13-valid-phone-number-for-supported-country.md) | Select another supported country and enter a valid number for that country. | The country-specific format is applied and no phone validation error is shown.       | Supported country and format are evidence gaps; do not assume Brazil.                       |
| [`FORM-14`](test_cases/ui/signup/form/validation/phone-number/form-14-valid-canadian-phone-number.md)              | Enter a valid Canadian number after selecting Canada.                       | The confirmed `(###) ###-####` mask is shown and no phone validation error is shown. | Four locale/device projects; overlaps with `SUNNY-01` and `SUNNY-03` and should share data. |

#### Email-address validation scenarios

| ID                                                                                              | Scenario                                                          | Expected result                                                                   | Parameters                                                              |
|-------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|-----------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| [`FORM-15`](test_cases/ui/signup/form/validation/email-address/form-15-empty-email.md)          | Leave email empty and submit.                                     | The email validation error is shown and no account-creation request is sent.      | Four locale/device projects; exact required message needs confirmation. |
| [`FORM-16`](test_cases/ui/signup/form/validation/email-address/form-16-invalid-email-format.md) | Enter an invalid email format and submit.                         | The localized email error is shown and no account-creation request is sent.       | Data-driven invalid formats; four projects.                             |
| [`FORM-17`](test_cases/ui/signup/form/validation/email-address/form-17-valid-isolated-email.md) | Enter a valid, isolated email address in an otherwise valid form. | No email validation error is shown; request behavior follows the valid-form case. | Unique synthetic addresses; four projects.                              |

#### Password validation scenarios

Use the password rules represented by the locale fixtures: 12–32 characters, with at least one uppercase letter, one
lowercase letter, and one number. Confirm whether the lower and upper bounds are inclusive before implementation.

| ID                                                                                                     | Scenario                                                               | Expected result                                                                 | Parameters                                                              |
|--------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------|---------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| [`FORM-18`](test_cases/ui/signup/form/validation/password/form-18-empty-password.md)                   | Leave password empty and submit.                                       | The password validation error is shown and no account-creation request is sent. | Four locale/device projects; exact required message needs confirmation. |
| [`FORM-19`](test_cases/ui/signup/form/validation/password/form-19-password-below-minimum-length.md)    | Enter a password below the minimum length.                             | The minimum-length error is shown and no account-creation request is sent.      | Boundary value below 12; four projects.                                 |
| [`FORM-20`](test_cases/ui/signup/form/validation/password/form-20-password-above-maximum-length.md)    | Enter a password above the maximum length.                             | The length error is shown and no account-creation request is sent.              | Boundary value above 32; four projects.                                 |
| [`FORM-21`](test_cases/ui/signup/form/validation/password/form-21-password-missing-character-class.md) | Enter a 12–32 character password missing one required character class. | The complexity error is shown and no account-creation request is sent.          | Data-driven missing uppercase, lowercase, and number; four projects.    |
| [`FORM-22`](test_cases/ui/signup/form/validation/password/form-22-compliant-password.md)               | Enter a compliant password and matching confirmation.                  | No password error is shown; request behavior follows the valid-form case.       | Boundary and representative valid values; do not retain secrets.        |

#### Password-confirmation validation scenarios

| ID                                                                                                                  | Scenario                                                | Expected result                                                               | Parameters                                          |
|---------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------|-------------------------------------------------------------------------------|-----------------------------------------------------|
| [`FORM-23`](test_cases/ui/signup/form/validation/password-confirmation/form-23-empty-password-confirmation.md)      | Leave confirmation empty while password is valid.       | The confirmation error is shown and no account-creation request is sent.      | Four locale/device projects.                        |
| [`FORM-24`](test_cases/ui/signup/form/validation/password-confirmation/form-24-mismatched-password-confirmation.md) | Enter a value different from the password.              | The mismatch error is shown and no account-creation request is sent.          | Data-driven mismatch values; four projects.         |
| [`FORM-25`](test_cases/ui/signup/form/validation/password-confirmation/form-25-matching-password-confirmation.md)   | Enter the same compliant value in both password fields. | No confirmation error is shown; request behavior follows the valid-form case. | Four locale/device projects; do not retain secrets. |

For `FORM-04` through `FORM-25`, assert the immediate field result and verify that no account-creation request is sent.

### Submission

| ID                                                                                                        | Scenario                                                                                                                  | Expected result                                                                                                                                                                                               | Parameters                                                                                                                                                                 |
|-----------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [`SUBM-01`](test_cases/ui/signup/submission/subm-01-prevent-repeated-submission-while-request-pending.md) | With a valid form, activate **Create your account** repeatedly while the first account-creation request is still pending. | Exactly one account-creation request is sent and at most one account is created. Confirm whether the button must become disabled while the request is pending before treating that UI state as a requirement. | Valid data with an isolated, unused email; hold the request pending to allow repeated activation; run in each of the four locale/device projects if coverage is confirmed. |

Count only requests to the account-creation endpoint; exclude unrelated traffic and any preflight request. This covers
repeated activation during one in-flight submission. `DUP-01` covers a separate, completed registration followed by
another completed attempt with the same email, and depends on the backend duplicate-email contract. A linked detailed
case can be added when the pending-request setup and required button behavior are confirmed.

On controlled environment, this test case would be complemented with database validation, but there is no such access on
production.

### Duplicate-email registration

| ID                                                                                                    | Scenario                                                                                       | Expected result                                                                                              | Parameters                                                                          |
|-------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| [`DUP-01`](test_cases/ui/signup/duplicate-email/dup-01-reject-second-registration-with-same-email.md) | Create an account with an isolated email, then submit a second valid form with the same email. | The second attempt is rejected with the documented duplicate-email result, and no second account is created. | Requires backend uniqueness, a safe test environment, and the exact status/message. |

This case is separate from rapid duplicate submission: it uses two completed registration attempts and has a different
side effect and contract.
On controlled environment, this test case would be complemented with database validation, but there is no such access on
production.

### Targeted security checks

Based on [OWASP Smart Contract Top 10](https://scs.owasp.org/sctop10/)
The existing UI validation tests cover some of the checks below. This coverage confirms client-side behavior only; it
does not establish server-side enforcement.

The signup form visibly contains fields for first name, last name, phone, email, password, password confirmation, and a
consent checkbox. The page displays this password policy: 12–32 characters, including at least one uppercase letter, one
lowercase letter, and one number. The page code references client-side form validation and field-level error handling.

This inspection did not submit the form or create an account. Client-side validation behavior and server-side
enforcement have not been verified. The cases below are recommended automation coverage, not confirmed vulnerabilities.

| ID       | UI mapping                                                                                                                      | API mapping        | Scenario                                                 | Expected result                                                                                                                              | Parameters                                                                                                                                                                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------|--------------------|----------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `SEC-01` | `A11Y-03`, `FORM-04`, `FORM-07`, `FORM-11`, `FORM-15`, `FORM-18`, `FORM-23`                                                     | `API-02`           | Required fields and empty submission (P0).               | **MISSING API COVERAGE:** all-fields-empty and individually omitted-field API checks must reject the request and create no account.          | Include every required field and unchecked consent; verify each required field omission individually.                                                                         |
| `SEC-02` | `FORM-15`, `FORM-16`                                                                                                            | `API-02`, `API-03` | Email syntax and whitespace (P0).                        | Verify malformed and whitespace values are rejected server-side and invalid input creates no account.                                        | Try `name`, `name@`, `@example.com`, `name@example`, leading/trailing whitespace, and embedded whitespace; confirm trimming rules and server-side rejection.                  |
| `SEC-03` | `FORM-19`–`FORM-22`                                                                                                             | `API-02`           | Password policy and length boundaries (P0).              | Verify server-side enforcement and agreement with the displayed policy.                                                                      | Check lengths 11, 12, 32, and 33; omit uppercase, lowercase, and numeric characters one at a time.                                                                            |
| `SEC-04` | `FORM-23`–`FORM-25` (UI doesn't submit mismattech passwords)                                                                    | `API-02`           | Password confirmation (P0).                              | If the endpoint accepts confirmation, verify it rejects a mismatch. Rechecking after the password changes is UI coverage.                    | Use values differing by one character; repeat after changing the password in the UI.                                                                                          |
| `SEC-05` | `FORM-11`–`FORM-14` (UI doesn't send incomplete or invalid phone numbers)                                                       | `API-02`           | Phone number and country selection (P1).                 | Verify server rejection for invalid/incomplete numbers and confirmed country rules; country-change behavior is UI-only.                      | Include incomplete and country-incompatible numbers; change country after entry; check letters and unsupported punctuation.                                                   |
| `SEC-06` | `FORM-04`–`FORM-10`, `FORM-26`–`FORM-29` (UI doesn't send invalid values; trimming and full length boundaries remain uncovered) | `API-02`, `API-03` | Name trimming, length, and character handling (P1).      | Verify trimming, limits, Unicode names, and control characters server-side.                                                                  | Check leading/trailing spaces and values at and beyond documented limits; include representative accented and non-Latin names.                                                |
| `SEC-07` | `FORM-19`, `FORM-20`, `FORM-05B` (UI doesn't off boundaries names and password)                                                 | `API-02`, `API-03` | Boundary lengths and oversized values (P1).              | Verify remaining field boundaries and oversized payload handling without errors or unexpected truncation.                                    | Cover email, first name, last name, and phone; use documented minimum/maximum and adjacent values; test oversized values through UI and API.                                  |
| `SEC-08` | —                                                                                                                               | `API-02`           | Server-side validation with client checks bypassed (P0). | The mapped case is planned only; the server must reject invalid requests and create no account when browser validation is bypassed.          | Use synthetic data in the test environment; include invalid email/phone, weak or oversized password, mismatched confirmation if accepted, missing names, and missing consent. |
| `SEC-09` | —                                                                                                                               | `API-03`           | Malformed or hostile input and safe failure (P1).        | Verify rejection or safe handling, no reflected executable content or sensitive error details, and no partial account or inconsistent state. | Send unexpected JSON types, nulls, control characters, and representative script/markup strings in text fields.                                                               |

Security-relevant Playwright UI tests carry the `@security` tag and the corresponding `@SEC-*` scenario tags. Use
Playwright tag filtering to select the targeted security checks.

---

## API testing

### Sunny scenario - all fields are valid

The API suite should verify the account-creation contract independently of page rendering. At present, the repository
contains no API request fixture, endpoint definition, or API test that establishes the endpoint, request schema,
response
schema, or success status. `SUNNY-02` records an expected `201` response, but that expectation remains a contract item
to
confirm before it is treated as evidence.

### Contract and negative testing

Add API cases only after the endpoint and contract are identified:

| ID                                                                                                          | Scenario                                                       | Expected result                                                                                                  | Parameters |
|-------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|------------|
| [`API-01`](test_cases/api/contract-and-negative-testing/api-01-submit-valid-contract-payload.md)            | Submit a valid contract payload.                               | The documented success status and response schema are returned; secrets are not returned.                        |
| [`API-02`](test_cases/api/contract-and-negative-testing/api-02-reject-missing-or-invalid-required-field.md) | Submit an empty payload or omit/invalidate one required field. | The documented client-error status and field error are returned; no account is created.                          |
| [`API-03`](test_cases/api/contract-and-negative-testing/api-03-reject-malformed-or-unsupported-values.md)   | Submit malformed, oversized, or unsupported values.            | The API rejects the payload without stack traces or sensitive implementation details, and no account is created. |

Parameterize `API-02` with missing consent; malformed or whitespace email; password lengths 11 and 33 and missing
character classes; mismatched confirmation if the endpoint accepts it; invalid, incomplete, or country-incompatible
phone values; name trimming, Unicode and control-character cases; and documented minimum/maximum field lengths with
adjacent and oversized values. Send one invalid field per request, plus an empty payload. Assert the documented client
error and verify that no account is created for each variation.

Parameterize `API-03` with unexpected JSON types, `null` values, control characters, representative script/markup
strings, and oversized payloads. Verify safe rejection, no reflected executable content or sensitive details, and no
partial account or inconsistent signup state. Keep country-change recalculation in UI tests. Include confirmation
mismatch in API coverage only if the endpoint accepts a confirmation field.

## Manual testing

### Security

#### Network-origin check

This is an exploratory manual check of whether sign-up page access changes based on the apparent network location of
the client. A Canada-only IP-blocking rule is not established as a product requirement or acceptance criterion in this
repository.

**Observed result.** A VPN endpoint in another country was used from the tester's machine, and the sign-up page loaded.
This records the result of the attempted check; it does not establish the country of the egress IP or the behavior of
any account-creation endpoint.

**Expected behavior.** The allowed and disallowed network locations, the treatment of VPN, proxy, and cloud-provider
addresses, the enforcement point, and the expected page or API response must be defined before this check can produce a
pass or fail result. Do not infer a network policy from the `.ca` domain or the configured `en-CA` and `fr-CA` locales.

**Evidence.** The current evidence is the manual observation that the page loaded through the VPN. No source IP,
geolocation result, VPN exit location, timestamp, response status, response body, or comparison with a controlled
Canadian connection is recorded in this plan.

**Limitations.** One VPN page-load attempt cannot confirm or disprove IP-based access control. VPN geolocation may be
inaccurate, and the check did not cover form submission, the account-creation API, alternate network providers, or
known proxy and hosting ranges. It is not a security assessment.

**Follow-up prerequisites.** Before repeating or automating the check, obtain a documented network policy and a safe
test environment; provide controlled egress locations; record the observed IP and geolocation source; define the
expected UI and API behavior; and agree on evidence retention and privacy handling. Until then, report this as an
observed manual result with an unresolved requirement, not as a passed or failed security test.
