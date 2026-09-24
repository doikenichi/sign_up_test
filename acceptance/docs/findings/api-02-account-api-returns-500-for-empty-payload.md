# Account creation returns HTTP 500 for an empty payload

## Summary

The account creation API returns HTTP 500 when `POST /api/accounts` receives an empty JSON object.

## Expected Result

The API should reject the empty payload with a client validation response in the HTTP 400 to 499 range and should not create an account.

## Observed Result

The request with `{}` returned HTTP 500 Internal Server Error. The API-02 test failed because the response status was not below 500.

## Steps to reproduce

1. Send `POST /api/accounts`.
2. Use `{}` as the JSON request body.
3. Observe that the API returns HTTP 500.

The case is exercised by `specs/api/signup/api-02-reject-missing-or-invalid-required-field.spec.ts:18`.

## Additional information

- Test suite: API-02, missing or invalid required fields.
- Final status: failed; 0 retries.
- Sanitized evidence: [empty payload evidence](.playwright-work/evidence/2026-09-24T07-01-16-109Z/api-02-empty-payload-sanitized.md).
- Raw artifacts were omitted because they contain sensitive account or authentication data.

### stacktrace

```text
Expected: < 500
Received:   500
at expectSafeApiRejection (src/assertions/api/expect-safe-api-rejection.ts:15)
```

### screenshots

Not provided. The raw screenshot contained sensitive account or authentication data.
