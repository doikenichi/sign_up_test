# Sign-up form rejects Unicode first and last names

## Summary

The sign-up form displays `Invalid name` for valid accented and non-Latin first and last names.

## Expected Result

Unicode first and last names are accepted without a name-validation error.

## Observed Result

The first-name case and the last-name case each displayed one validation error when the form was submitted. The test expected no corresponding error for either field.

## Steps to reproduce

1. Open the sign-up page.
2. Enter an accented and non-Latin Unicode value in the first-name field, such as `Élodie 李`.
3. Complete the remaining fields with valid values and submit the form.
4. Repeat with a Unicode last name, such as `Nguyễn 山田`.
5. Observe the name validation message.

## Additional information

- Test suites: `FORM-26: handles Unicode characters first name` and `FORM-28: handles Unicode characters last name`
- Test sources: `specs/ui/signup/validation/form-first-name.spec.ts:77` and `specs/ui/signup/validation/form-last-name.spec.ts:55`
- Confirmed runs: `env/.env.desk-en` / `chromium-en`, and `env/.env.desk-fr` / `chromium-fr`.
- Both failures occurred after the form was submitted with the Unicode name value in both runs.
- The latest failed test artifacts remain available under `.playwright-work/evidence/2026-09-24T08-33-49-930Z/test-004/` and `test-005/`. Screenshots are omitted because they contain generated form data.
- The earlier `env/.env.desk-en` / `chromium-en` evidence remains linked in the original report history.

### stacktrace

```text
FORM-26: expected first-name error count 0, received 1
at specs/ui/signup/validation/form-first-name.spec.ts:102:57

FORM-28: expected last-name error count 0, received 1
at specs/ui/signup/validation/form-last-name.spec.ts:80:56
```

### screenshots

Not provided; the staged screenshots contain generated form data.
