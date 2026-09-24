# Sign-up validation messages are not exposed to the accessibility check in mobile-fr

## Summary

After submitting the empty sign-up form, the accessibility test cannot find any validation message elements to verify that their text is readable.

## Expected Result

Validation messages are present after invalid submission, contain readable text, and are available to the accessibility check for association with their controls.

## Observed Result

The page displayed validation text after submission, but `signUpPage.validationMessages` matched zero elements. The `A11Y-06` test therefore failed before checking message text.

## Steps to reproduce

1. Open the sign-up page using the mobile-fr configuration.
2. Confirm that the password guidance is visible.
3. Submit the empty form.
4. Inspect the validation message elements targeted by `signUpPage.validationMessages`.
5. Observe that the locator finds zero elements.

## Additional information

- Test suite: `A11Y-06: exposes readable validation and help text`
- Test source: `specs/ui/signup/accessibility.spec.ts:120`
- Page object locator: `src/pages/signup.page.ts:124`
- `ENV_FILE`: `env/.env.mobile-fr`
- Playwright project: `mobile-fr`
- The staged page snapshot shows validation text on the page, while the test locator matched zero elements. The exact DOM association is not provided by this artifact.
- Evidence: [error context](.playwright-work/evidence/2026-09-24T08-57-01-573Z/test-003/error-context.md), [screenshot](.playwright-work/evidence/2026-09-24T08-57-01-573Z/test-003/test-failed-1.png)

### stacktrace

```text
Expected: > 0
Received: 0
at specs/ui/signup/accessibility.spec.ts:16:29
```

### screenshots

[Failed test screenshot](.playwright-work/evidence/2026-09-24T08-57-01-573Z/test-003/test-failed-1.png)

