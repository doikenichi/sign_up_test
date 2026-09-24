# Sign-up form does not show an error for an overlong phone number in mobile-en

## Summary

The sign-up form accepts a Canadian phone value with too many digits without displaying a phone validation error in the mobile-en run.

## Expected Result

An overlong phone number is rejected, a phone validation message is shown, and no account-creation request is sent.

## Observed Result

The form contained the overlong value and no account-creation request was sent, but the phone validation message was not present or visible.

## Steps to reproduce

1. Open the sign-up page using the mobile-en configuration.
2. Select Canada as the phone country.
3. Enter an overlong phone value.
4. Complete the remaining fields with valid values.
5. Submit the form.
6. Observe that no phone validation message is shown.

## Additional information

- Test suite: `FORM-12: handles phone number with too many digits`
- Test source: `specs/ui/signup/validation/form-phone-number.spec.ts:32`
- `ENV_FILE`: `env/.env.mobile-en`
- Playwright project: `mobile-en`
- Browser in the test log: WebKit
- The test's no-request assertion passed.
- Screenshots are omitted because they contain generated form data.
- Evidence: [error context](.playwright-work/evidence/2026-09-24T08-43-04-830Z/test-007/error-context.md)

### stacktrace

```text
Expected: visible
Error: element(s) not found
at specs/ui/signup/validation/form-phone-number.spec.ts:49:55
```

### screenshots

Not provided; the staged screenshot contains generated form data.
