# API-01 - Submit a valid contract payload

Verify the account-creation API contract with a valid payload.

The documented success status and response schema are returned, and secrets are not returned. The endpoint, field names, success status, and response schema are evidence gaps in the current plan and must be identified before execution.

## Given

The account-creation endpoint, request field names, authentication or anti-CSRF requirements, documented success status, and response schema are available. Use a safe environment and isolated, non-identifying data.

## When

Send one valid request payload that satisfies the documented account-creation contract.

## Then

The API returns the documented success status and response schema. The response does not contain secrets.

## Parameters

Not applicable.

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Confirm the endpoint, request fields, required security controls, success status, and response schema. | The API contract is documented before the request is sent. |
| 2 | Build a valid payload with isolated, non-identifying data according to the documented contract. | The payload satisfies all documented required fields and constraints. |
| 3 | Send the request to the documented account-creation endpoint. | The API returns the documented success status. |
| 4 | Validate the response against the documented schema and inspect returned fields. | The response matches the schema and does not return secrets. |
