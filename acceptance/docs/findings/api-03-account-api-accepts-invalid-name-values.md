# Account creation accepts malformed name values

## Summary

The account creation API accepted five malformed name values and returned `201 Created` for each request: a control character in `firstName`, `null` as `firstName`, a control character in `lastName`, script markup in `firstName`, and markup in `lastName`.

## Expected Result

The API should reject malformed or unsupported name values with a client error response and avoid creating an account.

## Observed Result

Each of the four requests returned `201 Created`; the response included an account object. The test expected a rejection status of at least 400 and failed on the received 201 response.

## Steps to reproduce

1. Send a valid signup payload to `POST /api/accounts`.
2. Replace one name field with one of these values: a NUL control character in `firstName`, `null` for `firstName`, a NUL control character in `lastName`, `<script>alert(1)</script>` for `firstName`, or `<img src=x onerror=alert(1)>` for `lastName`.
3. Observe that the API returns `201 Created` and an account object.

The cases are defined in `src/test-data/api/invalid-sign-up-payloads.ts` and exercised by `specs/api/signup/api-02-reject-missing-or-invalid-required-field.spec.ts` and `specs/api/signup/api-03-reject-malformed-or-unsupported-values.spec.ts`.

## Additional information

- Test suite: API-03, malformed or unsupported values.
- Final status: 5 failed tests; 0 flaky tests. Each test had one failed attempt.
- Sanitized evidence: [malformed name evidence](.playwright-work/evidence/2026-09-24T07-01-16-109Z/malformed-names-sanitized.md).
- Raw API request/response attachments and screenshots were omitted because they contain account identifiers and authentication tokens.

### stacktrace

```text
Expected: >= 400
Received:    201
at expectSafeApiRejection (src/assertions/api/expect-safe-api-rejection.ts:14)
```

### screenshots

Not provided. The raw screenshots included sensitive account and authentication data.
