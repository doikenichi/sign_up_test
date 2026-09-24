# FORM-02 refactor plan: page-object workflow and Playwright Utils

## Goal and success criteria

Refactor `FORM-02: submits a valid form with a unique email` so it uses the existing `SignUpPage.signUp` workflow rather than duplicating field-entry operations, and uses `@seontechnologies/playwright-utils` to correlate the browser-driven account request and response. The resulting test must still prove one correlated account-creation POST returns `201`, rejects password disclosure in the response, reaches the callback URL, reports no UI validation errors, and attaches redacted diagnostics.

The work is scoped to `acceptance`; install the dependency there with `npm install -D @seontechnologies/playwright-utils`. Its published peer requirement is compatible with the repository's `@playwright/test` 1.63.0. Context7 was requested but no Context7 MCP tool was exposed in this session; the evidence below comes from the package's [npm page](https://www.npmjs.com/package/%40seontechnologies/playwright-utils) and its [official API documentation](https://github.com/seontechnologies/playwright-utils/blob/main/docs/api-request.md). Both document the package's fixture-first pattern and ESM support. The installed 4.4.1 declarations show that Network Recorder is HAR record/playback, so the implementation uses the `interceptNetworkCall` fixture for live request/response observation.

## Current-state findings

- `acceptance/specs/ui/signup/form.spec.ts` manually fills FORM-02, registers request and response listeners, waits for a matching response, creates bespoke diagnostics, and unregisters the listeners.
- `SignUpPage.signUp` currently fills fields and clicks the submit button, but it neither selects the purchase province nor accepts the terms checkbox. Calling it for FORM-02 as-is would submit an incomplete form and violate the test's success path.
- `page-object-fixture.ts` is already the project fixture chain. `src/fixtures/ui/test-options.ts` is the natural composition point because it already uses Playwright `mergeTests`, but FORM-02 currently imports `page-object-fixture.ts` directly.
- `FORM-02` needs passive observation of the browser-driven request, not an out-of-band `apiRequest`; invoking `apiRequest` would create a second request and would not prove what the form submitted.

## Options considered

### Option 1 - retain bespoke Playwright event listeners

**Patterns:** Event-listener observation and test-local diagnostics.

**Conceptual Approach:** Keep the existing `page.on('request')`, `page.on('response')`, `waitForResponse`, and `finally` cleanup; only replace duplicated UI interaction with `signUp`.

**Technical Approach:** Expand `signUp` to prepare every required field and preserve the existing listener arrays, matcher, redaction helper, and attachment code in `form.spec.ts`.

**Pros:** Lowest immediate migration risk; its behavior and error messages are already known.

**Cons:** Does not meet the requested library adoption, duplicates network-observation lifecycle/error handling, and leaves the test responsible for listener cleanup and raw request/response retention risks.

**Usually Intended For:** A one-off assertion where no shared network abstraction is available.

**Most Common Applications:** Small isolated tests and temporary investigations.

### Option 2 - import the library's interception helper directly in FORM-02

**Patterns:** Functional core with explicit dependencies.

**Conceptual Approach:** Invoke the library's `interceptNetworkCall` helper with `page` and await the observed request/response pair after `signUp`.

**Technical Approach:** Import from the package's `intercept-network-call` subpath, start observation of the known account endpoint before the submit action, then build the existing redacted attachment from the returned request and response.

**Pros:** Uses the library while keeping change localized to one spec; it avoids changing project fixtures.

**Cons:** Still repeats lifecycle wiring in every future network-observing spec; it is easy to forget cleanup. It is less aligned with the package's documented fixture shell and the repository's existing fixture composition.

**Usually Intended For:** Helpers invoked outside Playwright tests or a narrow migration proof of concept.

**Most Common Applications:** Utility modules, global setup, and tests with an unusual lifecycle.

### Option 3 - compose the library interception fixture with the project fixture (recommended)

**Patterns:** Fixture composition, Page Object Model, Arrange-Act-Assert, and passive network observation.

**Conceptual Approach:** Extend the established UI fixture with the package's interception fixture once, then let FORM-02 declare `interceptNetworkCall` as a typed test dependency. Keep business interactions in `SignUpPage` and assertions/contract evidence in the spec.

**Technical Approach:** Install the package, inspect the installed interception declarations and examples, compose its fixture using `mergeTests` in `src/fixtures/ui/test-options.ts`, and import that composed `test`/`expect` from FORM-02. Begin observing `POST **/api/accounts` before `signUp`, await its response, and use the fixture's request/response data for assertions and redacted attachment creation.

**Pros:** Satisfies the requested package use; makes the observation helper reusable through Playwright fixture composition; leaves the test readable; and preserves browser-originated request evidence.

**Cons:** Touches shared fixture wiring; its exact API must be verified after installation rather than guessed from stale documentation; request and response objects may retain raw secrets in memory, so attachments and thrown errors must remain redacted.

**Usually Intended For:** A suite with repeated cross-cutting browser/network concerns.

**Most Common Applications:** E2E suites that standardize network diagnostics, error monitoring, and API observability.

## Comparative critique

Option 1 preserves behavior but fails the explicit library-use objective. Option 2 meets it but merely moves listener boilerplate behind an import and creates a second lifecycle convention. Option 3 fits the project's existing `mergeTests` seam and the package's documented direct-function/fixture design. It also keeps FORM-02 an authentic UI test: `apiRequest` is deliberately excluded because its extra HTTP call would make the one-request assertion meaningless.

## Recommended solution

Adopt Option 3. Make `SignUpPage.signUp` a complete, explicit happy-path workflow, compose the interception fixture into the existing UI test entry point, and use it only for passive observation of FORM-02's browser request. Preserve the current redaction policy and assertion intent; do not introduce schema validation or a direct API client until an approved registration response contract exists.

## Implementation steps

1. From `acceptance`, run `npm install -D @seontechnologies/playwright-utils`. Commit the resulting `package.json` and `package-lock.json` changes. Confirm it resolves with the existing ESM/NodeNext configuration and `@playwright/test` peer version.
2. Before writing imports, inspect `node_modules/@seontechnologies/playwright-utils/dist/types/intercept-network-call/**/*.d.ts` and its installed README/docs. Record the exact fixture import path, fixture key, matcher behavior, and request/response access. Do not infer these names from examples for a different package version.
3. In `acceptance/src/pages/signup.page.ts`, replace the positional `signUp` parameters with an exported, named input type (or an equally explicit object) containing first name, last name, country code, phone number, province selector value/label, email, password, and confirmation. Add consent as part of this workflow. Set province and check terms before clicking submit; retain the logger and error handling. Rename misleading `countryName` to `countryCode` if that is the selected option value. Update any callers (currently none) in the same change.
4. In `acceptance/src/fixtures/ui/test-options.ts`, merge `pageObjectFixture` with the library's interception fixture using the version-verified import. Re-export the composed `test` plus the existing `expect`.
5. In `acceptance/specs/ui/signup/form.spec.ts`, change the import to `src/fixtures/ui/test-options.js` so `signUpPage` and the interception fixture arrive together. Keep FORM-01 unchanged unless the page-object signature requires a caller update.
6. Refactor FORM-02 arrangement: create unique data, navigate, assert the default province if it remains an expected precondition, start the `POST **/api/accounts` observation, then invoke `signUpPage.signUp({ ...data, phoneCountry: 'CA', provinceOfPurchase: 'Ontario', passwordConfirmation: data.password })`. Do not manually fill any form field or click the button in the spec.
7. Refactor FORM-02 observation and assertions: use the library's `interceptNetworkCall` fixture for the observed `POST **/api/accounts` request and its paired response. Correlate it with the unique email, retain a narrowly scoped Playwright request listener to assert exactly one matching submission, then assert `201`, the callback URL, zero validation messages, and zero `aria-invalid` controls. Keep the password-response checks on the raw in-memory response only.
8. Retain `evidenceBody`, but feed it solely into the `testInfo.attach` payload. Never include raw bodies, the generated password, or email-bearing body content in thrown diagnostics. On failure, report only the interception error message, sanitized paths/counts, and validation text.
9. Remove the obsolete response-event listener and manual `waitForResponse` code. Retain the narrowly scoped request listener only to count email-correlated submissions; remove it in `finally`.
10. Update this plan or a nearby test note with the installed package version and exact interception API chosen, so a future upgrade can be assessed deliberately.

## Validation and rollout

1. Run `npm run biome:ci` and the non-watch TypeScript command appropriate to the repository (for example `npx tsc -p tsconfig.json --noEmit`).
2. Run only FORM-02 for each configured project, using the project/environment commands already used by the suite. Confirm one successful registration per execution with fresh generated email data.
3. Deliberately inspect the generated Playwright attachment: it must contain method/path/status and redacted body fields, never password, confirmation, token, cookie, or authorization values.
4. Force a known invalid/mocked failure only in a safe local/QA environment if available. Confirm the thrown diagnostic is sanitized and the scoped request listener is removed before a following test.
5. Run the full sign-up form spec across desktop and mobile locales. The acceptance gate is unchanged behavior with less test-local plumbing: one correlated account POST, `201`, callback success, no validation errors, and no secret disclosure in evidence.

## Files expected to change

| File | Change |
|---|---|
| `acceptance/package.json` | Add the utility as a development dependency. |
| `acceptance/package-lock.json` | Lock the resolved package and transitive dependencies. |
| `acceptance/src/pages/signup.page.ts` | Make `signUp` a complete typed happy-path workflow, including province and consent. |
| `acceptance/src/fixtures/ui/test-options.ts` | Compose the verified interception fixture with page-object fixtures. |
| `acceptance/specs/ui/signup/form.spec.ts` | Use the composed fixture and `signUp`; replace manual response monitoring with library-based passive observation. |
| `acceptance/docs/refactor/form-02-playwright-utils-plan.md` | Retain this decision record and implementation checklist. |
