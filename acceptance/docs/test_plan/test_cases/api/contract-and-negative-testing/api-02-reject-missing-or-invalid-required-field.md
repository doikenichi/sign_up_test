# API-02 - Reject a missing or invalid required field

Verify that the account-creation API rejects an empty payload and payloads with a missing or invalid required field.

The API returns the documented client-error status and field error, and no account is created. The endpoint, required fields, status, and error schema are evidence gaps in the current plan and must be identified before execution.

## Given

The account-creation endpoint, required request fields, documented client-error status, field-error schema, and account-verification method are available. Use a safe environment and isolated, non-identifying data.

## When

Send an empty payload, then send one payload per parameter with exactly one required field omitted or invalid, using the variation defined by the contract.

## Then

The API returns the documented client-error status and field error. No account is created.

## Parameters

| Parameter group | Variations |
|---|---|
| Required fields | Empty payload; omit each required field individually; omit consent. |
| Email | Malformed values (`name`, `name@`, `@example.com`, `name@example`); leading/trailing and embedded whitespace. |
| Password | Lengths 11 and 33; omit uppercase, lowercase, or numeric characters one at a time. Use documented minimum/maximum values as valid boundary controls. |
| Password confirmation | Mismatch by one character only if the endpoint accepts a confirmation field. |
| Phone | Invalid, incomplete, and country-incompatible values; letters or unsupported punctuation according to the documented contract. |
| Names | Whitespace-only, leading/trailing whitespace, accented/non-Latin names, and control characters according to the documented contract. |
| Field lengths | Documented minimum/maximum lengths and adjacent values for each applicable field; oversized values. |

Send one invalid field per request, except the empty-payload variation. Use isolated synthetic data and the documented contract to define valid controls and expected errors.
Keep country-change recalculation in the UI suite; API coverage checks the submitted phone value against the documented country rules.

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Confirm the endpoint, required fields, client-error status, field-error schema, and account-verification method. | The negative contract is documented before the request is sent. |
| 2 | Build the empty payload or a payload with one parameterized required-field failure. | Each request isolates the documented invalid condition. |
| 3 | Send the payload to the documented account-creation endpoint. | The API returns the documented client-error status and field error. |
| 4 | Repeat for each parameter variation and verify the account result for the isolated data. | Every invalid variation is rejected, and no account is created. |
