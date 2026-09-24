# Sign-up form rejects Unicode first and last names in mobile-en

## Summary

The sign-up form displays a name validation error for the Unicode first-name and last-name cases in the mobile-en run.

## Expected Result

Unicode first and last names are accepted without a name-validation error.

## Observed Result

The first-name case and the last-name case each displayed one validation error after the form was submitted. The tests expected no corresponding error for either field.

## Steps to reproduce

1. Open the sign-up page using the mobile-en configuration.
2. Enter an accented or non-Latin Unicode value in the first-name field.
3. Complete the remaining fields with valid values and submit the form.
4. Repeat with a Unicode last name.
5. Observe the name validation message.

## Additional information

- Test suites: `FORM-26: handles Unicode characters first name` and `FORM-28: handles Unicode characters last name`
- Test sources: `specs/ui/signup/validation/form-first-name.spec.ts:77` and `specs/ui/signup/validation/form-last-name.spec.ts:55`
- `ENV_FILE`: `env/.env.mobile-en`
- Playwright project: `mobile-en`
- Browser in the test log: WebKit
- Both tests failed after submitting the form with the Unicode name value.
- Screenshots are omitted because they contain generated form data.
- Evidence: [first-name error context](.playwright-work/evidence/2026-09-24T08-43-04-830Z/test-005/error-context.md), [last-name error context](.playwright-work/evidence/2026-09-24T08-43-04-830Z/test-006/error-context.md)

### stacktrace

```text
FORM-26: expected first-name error count 0, received 1
at specs/ui/signup/validation/form-first-name.spec.ts:102:57

FORM-28: expected last-name error count 0, received 1
at specs/ui/signup/validation/form-last-name.spec.ts:80:56
```

### screenshots

Not provided; the staged screenshots contain generated form data.
