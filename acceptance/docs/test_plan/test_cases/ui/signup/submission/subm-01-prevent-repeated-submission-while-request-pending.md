# SUBM-01 - Prevent repeated submission while the account-creation request is pending

Verify that repeatedly activating **Create your account** during one in-flight valid submission sends one account-creation request and creates at most one account.

Exactly one request to the account-creation endpoint is sent and at most one account is created. Whether the button must become disabled while the request is pending remains a requirement to confirm before implementation.

## Given

The sign-up page is available in the selected locale and device project, and the test runs in a safe environment with a way to verify the resulting account.

Prepare valid, isolated, non-identifying form data with a unique unused email address. Open a fresh sign-up form, wait for the province field to have its default value, select Canada and Ontario, fill all required fields, match the password confirmation, and leave consent selected.

Configure the account-creation request so the first request remains pending long enough to perform repeated activations. Count only requests to the account-creation endpoint; exclude unrelated traffic and preflight requests.

## When

Activate **Create your account** repeatedly while the first account-creation request is still pending, then allow the request to complete.

## Then

Exactly one account-creation request is sent and at most one account is created. Record the observed button state while the request is pending; the plan does not yet establish whether the button must be disabled.

## Parameters

| Project | Locale | Device | Test data and expected result |
|---|---|---|---|
| `chromium-en` | `en-CA` | Desktop | Valid data with an isolated, unused email; repeated activation during one pending request results in exactly one account-creation request and at most one account. |
| `chromium-fr` | `fr-CA` | Desktop | Valid data with an isolated, unused email; repeated activation during one pending request results in exactly one account-creation request and at most one account. |
| `mobile-en` | `en-CA` | Mobile | Valid data with an isolated, unused email; repeated activation during one pending request results in exactly one account-creation request and at most one account. |
| `mobile-fr` | `fr-CA` | Mobile | Valid data with an isolated, unused email; repeated activation during one pending request results in exactly one account-creation request and at most one account. |

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Confirm the safe test environment and the mechanism for verifying whether the isolated email produced an account. Generate a unique unused email for this execution. | The test can verify the account result without using production data, and the email is isolated from earlier executions. |
| 2 | Open a fresh sign-up page in the selected locale and device project. Wait for the province field to have its default value. | The sign-up form is available and ready to complete. |
| 3 | Fill first name, last name, phone number, email, password, and matching password confirmation. Select Canada, select Ontario, and leave consent selected. | The valid form data is accepted and no validation errors are shown. |
| 4 | Start monitoring requests to the account-creation endpoint, excluding unrelated traffic and preflight requests. Configure the first account-creation request to remain pending. | Monitoring records the first account-creation request and keeps it in flight for repeated activation. |
| 5 | Activate **Create your account** repeatedly before releasing the pending request. | The account-creation request count remains observable, and the button's pending state is recorded without assuming that it must be disabled. |
| 6 | Release the first pending request and wait for the account-creation flow to settle. | Exactly one account-creation request was sent. |
| 7 | Verify the account result for the isolated email. | At most one account was created. |
