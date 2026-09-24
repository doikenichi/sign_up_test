# International Canadian phone number keeps the international display format

## Summary

Entering a Canadian phone number with the international prefix changes the country selector to Canada, but the phone field keeps the `+1 416 555 0133` display format instead of the expected Canadian `(416) 555-0133` mask.

## Expected Result

After entering a Canadian number with the `+1` prefix, the country selector changes to Canada and the phone field displays `(416) 555-0133` without a validation error.

## Observed Result

The country selector changed to `CA`, but the phone field value was `+1 416 555 0133`. The expected `(416) 555-0133` value was not applied.

## Steps to reproduce

1. Open the sign-up page.
2. Select `International` in the phone country selector.
3. Enter `+14165550133` in the phone number field.
4. Inspect the selected country and displayed phone value.

## Additional information

- Test suite: `SUNNY-03: detects Canada from an international phone number`
- Test source: `specs/ui/signup/form-happy-path.spec.ts:105`
- Confirmed runs: `env/.env.desk-en` / `chromium-en`, and `env/.env.desk-fr` / `chromium-fr`.
- Latest evidence: [error context](.playwright-work/evidence/2026-09-24T08-33-49-930Z/test-003/error-context.md), [screenshot](.playwright-work/evidence/2026-09-24T08-33-49-930Z/test-003/test-failed-1.png). Earlier evidence: [error context](.playwright-work/evidence/2026-09-24T08-21-58-876Z/test-003/error-context.md), [screenshot](.playwright-work/evidence/2026-09-24T08-21-58-876Z/test-003/test-failed-1.png).

### stacktrace

```text
Expected: "(416) 555-0133"
Received: "+1 416 555 0133"
at specs/ui/signup/form-happy-path.spec.ts:119:51
```

### screenshots

[Latest failed test screenshot](.playwright-work/evidence/2026-09-24T08-33-49-930Z/test-003/test-failed-1.png)
