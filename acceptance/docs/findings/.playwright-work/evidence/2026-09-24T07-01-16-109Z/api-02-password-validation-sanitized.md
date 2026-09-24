# Sanitized evidence: password validation

- Tests: `API-02: rejects password length 11`, `length 33`, `without uppercase`, `without lowercase`, and `without number`
- Spec: `specs/api/signup/api-02-reject-missing-or-invalid-required-field.spec.ts:42`
- Request: `POST /api/accounts` with one password constraint violated
- Response: HTTP `201 Created` for every case
- Expected by the test: HTTP `400` to `499`
- Final attempts: failed; no retries
- Raw screenshots, traces, logs, and API attachments are omitted because they contain sensitive account or authentication data.
