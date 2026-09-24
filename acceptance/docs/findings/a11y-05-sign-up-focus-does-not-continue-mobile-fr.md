# Sign-up page focus does not continue after the form in mobile-fr

## Summary

After keyboard focus reaches the last sign-up form control, pressing Tab leaves `document.activeElement` on the `BODY` element instead of moving to another interactive element.

## Expected Result

Keyboard focus remains visible and moves to the next interactive element when the user presses Tab after the last form control.

## Observed Result

The `A11Y-05` test reached the end of the form controls, pressed Tab, and found `document.activeElement.tagName` equal to `BODY`.

## Steps to reproduce

1. Open the sign-up page using the mobile-fr configuration.
2. Focus the first interactive sign-up control.
3. Move through the form controls with the Tab key.
4. Press Tab after the last control in `SignUpPage.interactiveFormControls`.
5. Inspect the active element.

## Additional information

- Test suite: `A11Y-05: keeps keyboard focus visible and moving`
- Test source: `specs/ui/signup/accessibility.spec.ts:93`
- `ENV_FILE`: `env/.env.mobile-fr`
- Playwright project: `mobile-fr`
- Evidence: [error context](.playwright-work/evidence/2026-09-24T08-57-01-573Z/test-002/error-context.md), [screenshot](.playwright-work/evidence/2026-09-24T08-57-01-573Z/test-002/test-failed-1.png)

### stacktrace

```text
Expected: not "BODY"
at specs/ui/signup/accessibility.spec.ts:114:74
```

### screenshots

[Failed test screenshot](.playwright-work/evidence/2026-09-24T08-57-01-573Z/test-002/test-failed-1.png)

