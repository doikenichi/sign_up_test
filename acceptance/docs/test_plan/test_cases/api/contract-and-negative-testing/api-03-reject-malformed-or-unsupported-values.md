# API-03 - Reject malformed or unsupported values

Verify that the account-creation API safely rejects malformed, oversized, or unsupported values.

The API rejects each malformed, unsupported, or oversized payload without stack traces or sensitive implementation details. No executable content is reflected, and no account or partial signup state remains. The endpoint, field definitions, status, and expected error contract are evidence gaps in the current plan and must be identified before execution.

## Given

The account-creation endpoint, request field definitions, approved malformed or unsupported value set, and documented error behavior are available. Use a safe environment and isolated, non-identifying data.

## When

Send one request per approved malformed, oversized, or unsupported value variation.

## Then

The API rejects each invalid payload without returning a stack trace or sensitive implementation detail. No executable content is reflected, no account is created, and no partial or inconsistent signup state remains.

## Parameters

| Parameter group | Variations |
|---|---|
| JSON types | Unexpected types for fields defined by the request contract. |
| Null values | `null` for fields that require a non-null value. |
| Control characters | Representative control characters in text fields. |
| Script and markup | Representative script/markup strings in text fields; verify safe rejection and no reflected executable content. |
| Oversized payloads | Values beyond documented field limits and representative unusually large request bodies; use a safe, low-volume test set. |

Use synthetic data and send one malformed or unsupported variation per request. Confirm the allowed size and value limits from the API contract before execution. Include confirmation mismatch only if the endpoint accepts a confirmation field; country-change recalculation remains UI coverage.

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Confirm the endpoint, field definitions, approved invalid-value set, and documented error behavior. | The negative cases are defined before requests are sent. |
| 2 | Build a request containing one parameterized malformed, oversized, or unsupported value. | The request isolates the defined invalid input. |
| 3 | Send the request to the documented account-creation endpoint. | The API rejects the payload according to the documented error behavior. |
| 4 | Inspect the response body and logs available to the test, then verify the account result. | No executable content, stack trace, or sensitive implementation detail is exposed; no account or partial signup state is created. |
