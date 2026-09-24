# Sign-up form control does not expose its required state

## Summary

At least one of the eight controls included in the sign-up form's required-control contract exposes neither a `required` attribute nor `aria-required="true"`.

## Expected Result

Every required sign-up control exposes its required state through `required` or `aria-required="true"` before submission.

## Observed Result

The `A11Y-03` check found eight controls, but the required-state assertion returned `false` for at least one control. The failing artifact does not identify which control was visited when the assertion failed.

## Steps to reproduce

1. Open the sign-up page.
2. Inspect the eight controls represented by `SignUpPage.requiredFormControls`.
3. For each control, check whether `required` is present or `aria-required` equals `true`.

## Additional information

- Test suite: `A11Y-03: exposes required and invalid states`
- Test source: `specs/ui/signup/accessibility.spec.ts:56`
- Confirmed runs: `env/.env.desk-en` / `chromium-en`, and `env/.env.desk-fr` / `chromium-fr`.
- The failure occurred before the empty-form submission step.
- Latest evidence: [error context](.playwright-work/evidence/2026-09-24T08-33-49-930Z/test-001/error-context.md), [screenshot](.playwright-work/evidence/2026-09-24T08-33-49-930Z/test-001/test-failed-1.png). Earlier evidence: [error context](.playwright-work/evidence/2026-09-24T08-21-58-876Z/test-001/error-context.md), [screenshot](.playwright-work/evidence/2026-09-24T08-21-58-876Z/test-001/test-failed-1.png).

### stacktrace

```text
Expected: true
Received: false
at specs/ui/signup/accessibility.spec.ts:69:23
```

### screenshots

[Latest failed test screenshot](.playwright-work/evidence/2026-09-24T08-33-49-930Z/test-001/test-failed-1.png)
