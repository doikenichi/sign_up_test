# Sanitized evidence: missing required fields

- Tests: `API-02: rejects missing firstName`, `missing lastName`, `missing phone`, `missing region`, `missing password`, and `missing consent`
- Spec: `specs/api/signup/api-02-reject-missing-or-invalid-required-field.spec.ts:42`
- Request: `POST /api/accounts` with one required field omitted from an otherwise valid payload
- Response: HTTP `201 Created` for every case
- Expected by the test: HTTP `400` to `499`
- Final attempts: failed; no retries
- Raw screenshots, traces, logs, and API attachments are omitted because they contain sensitive account or authentication data.
