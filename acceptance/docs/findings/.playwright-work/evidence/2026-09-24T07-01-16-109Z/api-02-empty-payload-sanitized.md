# Sanitized evidence: empty payload

- Test: `API-02: rejects an empty payload`
- Spec: `specs/api/signup/api-02-reject-missing-or-invalid-required-field.spec.ts:18`
- Request: `POST /api/accounts` with `{}`
- Response: HTTP `500 Internal Server Error`
- Expected by the test: HTTP `400` to `499`
- Final attempt: failed; no retries
- Raw screenshots, traces, logs, and API attachments are omitted because they contain sensitive account or authentication data.
