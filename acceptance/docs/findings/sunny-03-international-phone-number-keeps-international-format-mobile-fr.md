# International Canadian phone number keeps the international display format in mobile-fr

## Summary

Entering a Canadian phone number with the international prefix changes the country selector to Canada, but the phone field keeps the international display format instead of the expected Canadian mask.

## Expected Result

After entering a Canadian number with the `+1` prefix, the country selector changes to Canada and the phone field displays `(416) 555-0133` without a validation error.

## Observed Result

The country selector changed to `CA`, but the phone field value was `+1 416 555 0133`. The expected `(416) 555-0133` value was not applied.

## Steps to reproduce

1. Open the sign-up page using the mobile-fr configuration.
2. Select `International` in the phone country selector.
3. Enter `+14165550133` in the phone number field.
4. Inspect the selected country and displayed phone value.

## Additional information

- Test suite: `SUNNY-03: detects Canada from an international phone number`
- Test source: `specs/ui/signup/form-happy-path.spec.ts:105`
- `ENV_FILE`: `env/.env.mobile-fr`
- Playwright project: `mobile-fr`
- Evidence: [error context](.playwright-work/evidence/2026-09-24T08-57-01-573Z/test-004/error-context.md), [screenshot](.playwright-work/evidence/2026-09-24T08-57-01-573Z/test-004/test-failed-1.png)

### stacktrace

```text
Expected: "(416) 555-0133"
Received: "+1 416 555 0133"
at specs/ui/signup/form-happy-path.spec.ts:119:51
```

### screenshots

[Failed test screenshot](.playwright-work/evidence/2026-09-24T08-57-01-573Z/test-004/test-failed-1.png)

