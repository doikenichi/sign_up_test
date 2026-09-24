# Sanitized evidence: malformed name values

- Tests: `API-02: rejects control character in first name`; `API-03: rejects null firstName`, `control character in lastName`, `script markup in firstName`, and `markup in lastName`
- Specs: `specs/api/signup/api-02-reject-missing-or-invalid-required-field.spec.ts:42`; `specs/api/signup/api-03-reject-malformed-or-unsupported-values.spec.ts:19`
- Request: `POST /api/accounts` with a malformed name value
- Response: HTTP `201 Created` for every case
- Expected by the tests: HTTP `400` to `499`
- Final attempts: failed; no retries
- Raw screenshots, traces, logs, and API attachments are omitted because they contain sensitive account or authentication data.
