# Test Plan

## Introduction

This document defines the acceptance test coverage for Nesto's sign-up flow across supported locales and devices. It
groups tests by risk area and identifies cases suitable for project-level or data-driven parametrization.

### Test scope

Coverage includes page availability, `en-CA` and `fr-CA` content, desktop and mobile layouts, accessibility, client-side
validation, submission behavior, duplicate handling, the account-creation API contract, and targeted security checks.

### Out of scope

Excluded areas are backend internals, email delivery, third-party services, unconfigured platforms, performance and load
testing, full security assessment, production data cleanup, and post-registration account workflows.

### Test execution strategy

Run from `acceptance` using `npm run test:desk:en`, `test:desk:fr`, `test:mob:en`, or `test:mob:fr`; each command loads
its
environment file and selects one Playwright project. CI uses one worker, two retries, an HTML report, and a trace on the
first retry; passed retries require flaky-test review.

### Parametrized test approach

Use Playwright projects for locale and device coverage, and data tables for field values, payloads, and expected
results.
Generated titles must include the test ID and case name; keep separate tests when workflows, side effects, or outcomes
differ, and avoid irrelevant cross-product combinations.

---

## Smoke tests

### Objective

Confirm that the sign-up page and account-creation endpoint are available before running the broader suite.

### Scope

Smoke coverage is limited to page load, form and localized heading visibility, and a controlled API validation response;
detailed UI, validation, accessibility, and API checks remain in their respective suites.

### Tests

| ID       | Test                                                              | Expected result                                                                     | Parameters                    |
|----------|-------------------------------------------------------------------|-------------------------------------------------------------------------------------|-------------------------------|
| `SMK-01` | Open the sign-up route and verify the form and localized heading. | Page loads without error and expected content is visible.                           | All four Playwright projects. |
| `SMK-02` | Send a safe payload with one required field omitted.              | API returns the documented validation status and error without creating an account. | Once per API environment.     |

### Parametrization

`SMK-01` runs through the four Playwright projects; `SMK-02` runs once per API environment with one fixed,
non-identifying
invalid payload. Additional invalid payloads belong in the API suite.

---

## UI testing

### Objective

Verify the sign-up flow across supported locales and devices, covering content, controls, validation, accessibility,
responsive layout, and submission feedback; API contract validation remains in the API suite.

### UI test coverage

The UI suite covers accessibility, localized content and links, language switching, responsive rendering, client-side
validation, and submission behavior, including request prevention for invalid forms and progression to the
account-creation boundary for valid forms.

### Accessibility

Verify the sign-up form's semantics, accessible names and states, keyboard operation, focus behavior, validation
feedback,
and automated WCAG violations across the configured locale and device projects.

#### Accessibility checks

| ID        | Check                       | Expected result                                                                            |
|-----------|-----------------------------|--------------------------------------------------------------------------------------------|
| `A11Y-01` | Localized form heading      | The visible heading matches the locale fixture.                                            |
| `A11Y-02` | Control names               | Every interactive form control has an accessible name.                                     |
| `A11Y-03` | Required and invalid states | Required state is exposed, and invalid submission exposes field errors.                    |
| `A11Y-04` | Keyboard operation          | Links, controls, and submission are keyboard operable.                                     |
| `A11Y-05` | Focus behavior              | Focus is visible, ordered, and not trapped.                                                |
| `A11Y-06` | Help and error content      | Guidance and errors are readable, associated with their controls, and not color-dependent. |
| `A11Y-07` | Automated scan              | Axe reports no critical or serious violations.                                             |

Run all cases through the four Playwright projects. `A11Y-07` uses `@axe-core/playwright`; targeted checks remain
required
for keyboard flow, focus visibility, labels, and error behavior that automated scanning cannot fully assess.

### Locale

Verify localized content, links, language switching, and layout in `en-CA` and `fr-CA` across the configured desktop and
mobile projects.

#### Language switching

| ID       | Test                                                  | Expected result                                                            | Parameters                              |
|----------|-------------------------------------------------------|----------------------------------------------------------------------------|-----------------------------------------|
| `LOC-01` | Switch to the alternate locale from the sign-up page. | The target locale loads, key content updates, and the form remains usable. | `en-CA` to `fr-CA`; `fr-CA` to `en-CA`. |

#### Translation comparison

| ID       | Test                                                     | Expected result                                                                         | Parameters                                                                                                         |
|----------|----------------------------------------------------------|-----------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| `LOC-02` | Compare visible sign-up content with the locale fixture. | Each value matches the selected locale with no missing, mixed-locale, or fallback text. | Locale and content key: heading, field labels, password guidance, consent text, legal-link labels, and submit CTA. |

#### Links per locale

| ID | Test | Expected result | Parameters |
|----|------|-----------------|------------|
| `LOC-03` | Open each localized legal link from the sign-up page. | The link resolves without error to the expected locale-specific or approved default destination. | Locale and legal-link type. |

#### Page rendering

- LOC-10: Ensure no text overlaps, inputs disappear, or layout elements overlap after switching locale.
- LOC-11: Validate the page remains visually intact at common desktop and mobile widths.

### Form validations

The page contains the following visible fields:

- First name
- Last name
- Phone number country selector
- Phone number
- Email
- Password
- Confirm password
- Consent checkbox
- Create your account button

#### Sunny scenario - all fields are valid

This test suite focuses on scenarios that the account is created successfully.

- FORM-01: Enter a valid first name, last name, valid Canadian phone number, valid email, password matching the length
  requirement, matching confirm password, and check the consent box.
    - fills fields with values that match the expected input format or mask
    - this confirms the values are acceptable at the input level

- FORM-02: Submit the form and confirm the page accepts the input without any validation errors and the submission path
  can proceed successfully.
  checks the immediate validation result after submitting
    - confirms the form passes business validation
    - confirms no validation errors are shown
    - confirms the submission proceeds
    - confirms the response status is 201 and the response body contains the information
      entered in the form

#### First name error scenarios

- FORM-04: Leave first name empty and submit; validation should fail.
- FORM-05: Enter only spaces in first name and submit; validation should fail.
- FORM-06: Enter a valid name with letters or common punctuation and confirm validation passes.

checks the immediate validation result after submitting

- confirms that no request is done to the endpoint since this is a form validation error performed by the frontend.

#### Last name error scenarios

- FORM-07: Leave last name empty and submit; validation should fail.
- FORM-08: Enter whitespace-only last name and submit; validation should fail.
- FORM-09: Enter a valid last name and confirm validation passes.

checks the immediate validation result after submitting

- confirms that no request is done to the endpoint since this is a form validation error performed by the frontend.

#### Phone number error scenarios

- FORM-10: Leave the phone number empty and submit; validation should fail.
- FORM-11: Enter an invalid phone format such as letters or too few digits; validation should fail.
- FORM-12: Change the country selector to another locale and confirm the phone format rules update appropriately.
- FORM-13: Enter a valid phone number for the selected country and confirm validation passes.

checks the immediate validation result after submitting

- confirms that no request is done to the endpoint since this is a form validation error performed by the frontend.

#### Email address error scenarios

- FORM-14: Leave email empty and submit; validation should fail.
- FORM-15: Enter an invalid email format and submit; validation should fail.
- FORM-16: Enter a valid email address with a realistic corporate or personal address and confirm validation passes.
- FORM-17: Attempt duplicate registration if the backend enforces uniqueness, and verify the correct error message
  appears.

checks the immediate validation result after submitting

- confirms that no request is done to the endpoint since this is a form validation error performed by the frontend.

#### Password error scenarios

- FORM-18: Leave password empty and submit; validation should fail.
- FORM-19: Enter a password shorter than 12 characters; validation should fail.
- FORM-20: Enter a password longer than 32 characters; validation should fail.
- FORM-21: Enter a valid compliant password and confirm it passes validation.

checks the immediate validation result after submitting

- confirms that no request is done to the endpoint since this is a form validation error performed by the frontend.

#### Password Confirmation error scenarios

- FORM-22: Leave confirm password empty while password is filled; validation should fail.
- FORM-23: Enter a different value in confirm password; validation should fail.
- FORM-24: Enter the same value as the password and confirm validation passes.

checks the immediate validation result after submitting

- confirms that no request is done to the endpoint since this is a form validation error performed by the frontend.

### Idempotency test

- ID-01: Submit the same valid form twice in rapid succession and verify duplicate account creation is prevented.
- ID-02: Double-click the create account button and confirm only one request is processed.
- ID-03: Retry after a timeout or network interruption and confirm the app handles the second attempt safely.

### Create your account button

- CTA-01: Confirm the button label reads "Create your account" in English and the localized equivalent in French.
- CTA-02: Validate the button remains visible and clickable across locale switching and viewport changes.
- CTA-03: Confirm the button does not submit when required fields are incomplete.
- CTA-04: Confirm the button submits successfully when all required validation passes.

### checkbox uncheck

- CB-01: Leave the consent checkbox unchecked and attempt submission; validation should fail.
- CB-02: Check the box and verify the form proceeds normally.
- CB-03: Uncheck the box again after checking it and confirm the validation state updates correctly.

### duplicated email registration

- first email is accepted and registration with same email is rejected.

### OWASP top 10

#### SQL Injection

- OWASP-01: Attempt common SQL injection payloads in text inputs such as name and email fields.
- OWASP-02: Verify the application rejects malicious payloads without returning stack traces or backend errors.

#### DDoS

- OWASP-03: Submit repeated registration attempts in a short time to verify rate limiting or throttling.
- OWASP-04: Test verification-email flooding by submitting multiple near-duplicate registrations and confirming the app
  restricts repeated sends.

#### IP whitelist

- OWASP-05: Validate that a non-CA IP is blocked by the expected access control if the environment requires an
  allowlist.
- OWASP-06: Validate that an allowed CA IP accesses the signup page without restrictions.

---

## API testing

### Sunny scenario - all fields are valid

This test suite focuses on scenarios that the account is created successfully, and response status is 201 and the
response body
contains the information
entered in the form.

### Security

#### OWASP top 10

- API-01: Verify API endpoints reject malformed or malicious payloads safely.
- API-02: Confirm error responses do not leak sensitive internals or stack traces.
- API-03: Validate authentication and anti-CSRF behavior for the signup endpoint where applicable.

#### SQL Injection

- OWASP-01: Attempt common SQL injection payloads in text inputs such as name and email fields.
- OWASP-02: Verify the application rejects malicious payloads without returning stack traces or backend errors.

#### DDoS

- OWASP-03: Submit repeated registration attempts in a short time to verify rate limiting or throttling.
- OWASP-04: Test verification-email flooding by submitting multiple near-duplicate registrations and confirming the app
  restricts repeated sends.

#### IP whitelist

- OWASP-05: Validate that a non-CA IP is blocked by the expected access control if the environment requires an
  allowlist.
- OWASP-06: Validate that an allowed CA IP accesses the signup page without restrictions.

#### Swagger

- Check if swagger documentation is not available in production.

## Manual testing

### Security

Due to raising cybersecurity awareness, a common safety measure is blocking IPs that are not from the target audience;
since the current domain is .ca, the target audience is Canada.
This is because bad actors usually obscure their real IP and use public IPs from countries considered safer for them,
which often means countries outside of Canada.
For this reason, the signup page should block any IP address not from Canada as a cybersecurity measure.

Although automating this isn't possible with my current resources, it would be feasible in a corporate environment.
As a workaround, I manually tested this by setting up a VPN to another country from my machine and was able to load the
page.
