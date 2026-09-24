# SUNNY-02 - Submit a valid form with a unique email

Verify that submitting a valid sign-up form sends one account-creation request and produces the expected response
without exposing the password or password confirmation.

One request is sent, the API returns `201`, and the UI enters the expected success state without validation errors.
The exact visible success state and additional response-body assertions remain pending exploration.

## Given

The sign-up page is available in the selected locale and device project, with a fresh form for each execution.

Prepare isolated, non-identifying data for this case: synthetic first and last names containing letters, a valid
synthetic Canadian phone number, and a generated password matching its confirmation. Follow the existing locale
password guidance: 12-32 characters with at least one uppercase letter, one lowercase letter, and one number.
Generate a unique email address for every execution, including each project and retry, so previous registrations do
not affect this case. Select Canada and accept consent when completing the form.

Network monitoring must be active before submission and remain active through the response and resulting UI observation.
Correlate the account-creation request with its response; count account-creation requests separately from unrelated
page traffic and any CORS preflight. The endpoint and request/response field names are not defined in the test plan
and must be identified during exploration.

Inspect the response for password disclosure before sanitizing retained evidence. Save only redacted request and
response evidence: remove passwords, password confirmation, authentication tokens, and cookies from retained bodies
and headers. Record any disclosure without copying the exposed secret into the case or its evidence.

## When

Complete the form with valid data and the unique email, accept consent, and activate the localized create-account
button once. Capture the account-creation request and its associated response, then inspect the resulting UI.

## Then

Exactly one account-creation request is sent and its response status is HTTP `201`. The response body does not return
the password or password confirmation. Non-sensitive submitted fields may be returned, but no particular response
schema or echoed field is required until the contract is clarified.

No validation errors are shown, and the UI is expected to reach its success state. Pending exploration: identify the
observable success indicator, such as the actual confirmation content or destination, and clarify the response schema
and any additional body assertions. Capture those observations without treating them as approved requirements.
HTTP `201` alone does not establish that the pending UI success check passed.

## Parameters

| Project | Locale | Device | expected result |
|---|---|---|---|
| `chromium-en` | `en-CA` | Desktop | One account-creation request returns `201`, its body excludes passwords, and the UI succeeds without validation errors; the exact success indicator remains pending exploration. |
| `chromium-fr` | `fr-CA` | Desktop | One account-creation request returns `201`, its body excludes passwords, and the UI succeeds without validation errors; the exact success indicator remains pending exploration. |
| `mobile-en` | `en-CA` | Mobile | One account-creation request returns `201`, its body excludes passwords, and the UI succeeds without validation errors; the exact success indicator remains pending exploration. |
| `mobile-fr` | `fr-CA` | Mobile | One account-creation request returns `201`, its body excludes passwords, and the UI succeeds without validation errors; the exact success indicator remains pending exploration. |

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Prepare isolated data and generate an email unique to this execution, project, and retry. Open a fresh sign-up page. | The form is available and the email has not been used by an earlier execution. |
| 2 | Start network monitoring before submission, retaining only sanitized evidence. | Monitoring is ready to capture and correlate the account-creation request and response. |
| 3 | Fill the first name, last name, phone, email, password, and confirmation; select Canada and accept consent. | The form accepts the data, the phone displays as `(###) ###-####`, consent is checked, and no validation errors are shown. |
| 4 | Activate the localized create-account button once. Observe the network through the response and resulting UI. | Exactly one account-creation request is sent. |
| 5 | Correlate the captured response with that request and inspect its status. | The account-creation response status is HTTP `201`. |
| 6 | Inspect the response body for returned password or password-confirmation fields or values, then retain a redacted copy for contract exploration. | Neither password nor password confirmation is returned. Additional schema and field assertions remain pending exploration. |
| 7 | Inspect and record the resulting UI and any validation feedback. | No validation errors are shown. The exact success-state check remains pending until its observable indicator is clarified. |
