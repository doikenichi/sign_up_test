# Sign-up form does not show an error for an overlong phone number

## Summary

The sign-up form accepts a Canadian phone value with too many digits without displaying a phone validation error.

## Expected Result

An overlong phone number is rejected, a phone validation message is shown, and no account-creation request is sent.

## Observed Result

The form contained the overlong value, the test confirmed that no account-creation request was sent, but the phone validation message was not present or visible.

## Steps to reproduce

1. Open the sign-up page.
2. Select Canada as the phone country.
3. Enter an overlong phone value such as `4165550133333333`.
4. Complete the remaining fields with valid values.
5. Submit the form.
6. Observe that no phone validation message is shown.

## Additional information

- Test suite: `FORM-12: handles phone number with too many digits`
- Test source: `specs/ui/signup/validation/form-phone-number.spec.ts:32`
- Confirmed runs: `env/.env.desk-en` / `chromium-en`, and `env/.env.desk-fr` / `chromium-fr`.
- Latest evidence: [error context](.playwright-work/evidence/2026-09-24T08-33-49-930Z/test-006/error-context.md). The earlier `env/.env.desk-en` / `chromium-en` evidence remains linked in the original report history.
- The test's no-request assertion passed in both runs.
- Staged screenshots are omitted because they contain generated form data.

### stacktrace

```text
Expected: visible
Error: element(s) not found
at specs/ui/signup/validation/form-phone-number.spec.ts:49:55
```

### screenshots

Not provided; the staged screenshot contains generated form data.
