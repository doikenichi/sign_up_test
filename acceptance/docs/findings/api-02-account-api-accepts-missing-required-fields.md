# Account creation accepts missing required fields

## Summary

The account creation API accepts requests that omit individual required fields and creates an account with HTTP 201.

## Expected Result

The API should reject a request missing any required field with a client validation response in the HTTP 400 to 499 range and should not create an account.

## Observed Result

Requests missing `firstName`, `lastName`, `phone`, `region`, `password`, or `leadDistributeConsentAgreement` each returned HTTP 201 Created.

## Steps to reproduce

1. Start with a valid signup payload.
2. Remove one of `firstName`, `lastName`, `phone`, `region`, `password`, or `leadDistributeConsentAgreement`.
3. Send the payload to `POST /api/accounts`.
4. Observe that the API returns HTTP 201 Created.

The cases are defined in `src/test-data/api/invalid-sign-up-payloads.ts` and exercised by `specs/api/signup/api-02-reject-missing-or-invalid-required-field.spec.ts:42`.

## Additional information

- Test suite: API-02, missing or invalid required fields.
- Final status: 6 failed tests; 0 retries.
- Sanitized evidence: [missing required fields evidence](.playwright-work/evidence/2026-09-24T07-01-16-109Z/api-02-missing-required-fields-sanitized.md).
- Raw artifacts were omitted because they contain sensitive account or authentication data.

### stacktrace

```text
Expected: >= 400
Received:    201
at expectSafeApiRejection (src/assertions/api/expect-safe-api-rejection.ts:14)
```

### screenshots

Not provided. The raw screenshots contained sensitive account or authentication data.
