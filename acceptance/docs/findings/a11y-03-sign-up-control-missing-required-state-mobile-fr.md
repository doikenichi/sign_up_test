# Sign-up form controls do not expose required state in mobile-fr

## Summary

At least one of the eight required controls in the sign-up form exposes neither a `required` attribute nor `aria-required="true"` in the mobile-fr run.

## Expected Result

Every required sign-up control exposes its required state through `required` or `aria-required="true"` before submission.

## Observed Result

The `A11Y-03` check found eight required controls, but the required-state assertion returned `false` for at least one control.

## Steps to reproduce

1. Open the sign-up page using the mobile-fr configuration.
2. Inspect the eight controls represented by `SignUpPage.requiredFormControls`.
3. For each control, check whether `required` is present or `aria-required` equals `true`.

## Additional information

- Test suite: `A11Y-03: exposes required and invalid states`
- Test source: `specs/ui/signup/accessibility.spec.ts:56`
- `ENV_FILE`: `env/.env.mobile-fr`
- Playwright project: `mobile-fr`
- The failure occurred before the empty-form submission step.
- Evidence: [error context](.playwright-work/evidence/2026-09-24T08-57-01-573Z/test-001/error-context.md), [screenshot](.playwright-work/evidence/2026-09-24T08-57-01-573Z/test-001/test-failed-1.png)

### stacktrace

```text
Expected: true
Received: false
at specs/ui/signup/accessibility.spec.ts:69:23
```

### screenshots

[Failed test screenshot](.playwright-work/evidence/2026-09-24T08-57-01-573Z/test-001/test-failed-1.png)

