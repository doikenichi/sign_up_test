# UI testing

## Accessibility

The goal of this section is to validate the deployed signup page's accessibility and usability, based on the rendered
local page observed at <http://127.0.0.1:5500/local-site/capture/index.html>.

### Accessibility checks

Verifies some common accessibility checks, defined by [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/)

- A11Y-01: Page loads with the heading "Create a nesto account" and a visible title for the form.
- A11Y-02: All form controls have visible labels and usable text associations.
- A11Y-03: The FR locale switcher is visible and clickable.
- A11Y-04: The login link and external links (terms/privacy) remain keyboard accessible.
- A11Y-05: The page can be navigated by keyboard in a logical order: first name, last name, phone country, phone number,
  email, password, confirm password, checkbox, submit button.
- A11Y-06: Focus styling is visible on interactive elements and the page does not trap focus.
- A11Y-07: Run an automated accessibility scan and verify there are no critical or serious issues.
- A11Y-08: Confirm form help text, validation messages, and required states remain readable and not color-only.

## Locale

The locale test focuses on validating the signup flow in English and French.
This tests has a version for mobile desktop and a version for Mobile since screen size and UX are different

### Language switching

This test suite focuses on language switching, links comparison for non-sign up form

- LOC-01: Select the FR language switch and confirm the page re-renders in French without losing form structure.
- LOC-02: Validate the heading, labels, CTA, and helper text are translated correctly.
- LOC-04: Switch back to English and confirm the original labels return without broken layout.

### Translation comparison

This test suite focuses on sign up form translation

- LOC-05: Compare the field names across locales: first name, last name, phone number, email, password, confirm
  password.
- LOC-06: Validate the password requirement copy and the create-account CTA are translated consistently.
- LOC-07: Confirm all visible terms/privacy text is localized and not partially untranslated.

### Links per locale

- LOC-08: Validate the legal links route to the correct locale-specific policy or default policy pages.
- LOC-09: Confirm the page does not generate broken links when switching between locales.

### Page rendering

- LOC-10: Ensure no text overlaps, inputs disappear, or layout elements overlap after switching locale.
- LOC-11: Validate the page remains visually intact at common desktop and mobile widths.

## Form validations

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

### Sunny scenario - all fields are valid

This test suite focus on scenarios that user is created successfully - as designed by product and UX.

- FORM-01: Enter a valid first name, last name, valid Canadian phone number, valid email, password matching the length
  requirement, matching confirm password, and check the consent box.
    - fills fields with values that match the expected input format or mask
    - this confirms the values are acceptable at the input level

- FORM-02: Submit the form and confirm the page accepts the input without any validation errors and the submission path
  can proceed successfully.
  checks the immediate validation result after submit
    - confirms the form passes business validation
    - confirms no validation errors are shown
    - confirms the submission proceeds

### First name error scenarios

- FORM-04: Leave first name empty and submit; validation should fail.
- FORM-05: Enter only spaces in first name and submit; validation should fail.
- FORM-06: Enter a valid name with letters or common punctuation and confirm validation passes.

### Last name error scenarios

- FORM-07: Leave last name empty and submit; validation should fail.
- FORM-08: Enter whitespace-only last name and submit; validation should fail.
- FORM-09: Enter a valid last name and confirm validation passes.

### Phone number error scenarios

- FORM-10: Leave the phone number empty and submit; validation should fail.
- FORM-11: Enter an invalid phone format such as letters or too few digits; validation should fail.
- FORM-12: Change the country selector to another locale and confirm the phone format rules update appropriately.
- FORM-13: Enter a valid phone number for the selected country and confirm validation passes.

### Email address error scenarios

- FORM-14: Leave email empty and submit; validation should fail.
- FORM-15: Enter an invalid email format and submit; validation should fail.
- FORM-16: Enter a valid email address with a realistic corporate or personal address and confirm validation passes.
- FORM-17: Attempt duplicate registration if the backend enforces uniqueness, and verify the correct error message
  appears.

### Password error scenarios

- FORM-18: Leave password empty and submit; validation should fail.
- FORM-19: Enter a password shorter than 12 characters; validation should fail.
- FORM-20: Enter a password longer than 32 characters; validation should fail.
- FORM-21: Enter a valid compliant password and confirm it passes validation.

### Password Confirmation error scenarios

- FORM-22: Leave confirm password empty while password is filled; validation should fail.
- FORM-23: Enter a different value in confirm password; validation should fail.
- FORM-24: Enter the same value as the password and confirm validation passes.

## Idempotency test

- ID-01: Submit the same valid form twice in rapid succession and verify duplicate account creation is prevented.
- ID-02: Double-click the create account button and confirm only one request is processed.
- ID-03: Retry after a timeout or network interruption and confirm the app handles the second attempt safely.

## Create your account button

- CTA-01: Confirm the button label reads "Create your account" in English and the localized equivalent in French.
- CTA-02: Validate the button remains visible and clickable across locale switching and viewport changes.
- CTA-03: Confirm the button does not submit when required fields are incomplete.
- CTA-04: Confirm the button submits successfully when all required validation passes.

## checkbox uncheck

- CB-01: Leave the consent checkbox unchecked and attempt submission; validation should fail.
- CB-02: Check the box and verify the form proceeds normally.
- CB-03: Uncheck the box again after checking it and confirm the validation state updates correctly.

## OWASP top 10

### SQL Injection

- OWASP-01: Attempt common SQL injection payloads in text inputs such as name and email fields.
- OWASP-02: Verify the application rejects malicious payloads without returning stack traces or backend errors.

### DDoS

- OWASP-03: Submit repeated registration attempts in a short time to verify rate limiting or throttling.
- OWASP-04: Test verification-email flooding by submitting multiple near-duplicate registrations and confirming the app
  restricts repeated sends.

### IP whitelist

- OWASP-05: Validate that a non-CA IP is blocked by the expected access control if the environment requires an
  allowlist.
- OWASP-06: Validate that an allowed CA IP accesses the signup page without restrictions.

# API testing

## Security

### OWASP top 10

- API-01: Verify API endpoints reject malformed or malicious payloads safely.
- API-02: Confirm error responses do not leak sensitive internals or stack traces.
- API-03: Validate authentication and anti-CSRF behavior for the signup endpoint where applicable.

### Swagger

- API-04: Review the signup API contract and validate that documented request and response schemas match the UI
  behavior.
- API-05: Check that required/optional fields and error codes in the contract reflect the frontend validation rules.
- API-06: Confirm the API documentation includes success and failure examples for account creation flows.
