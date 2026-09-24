# Nesto sign-up acceptance tests

This repository contains a Playwright acceptance-testing framework for Nesto's sign-up experience. It checks the user-visible form and its interaction with the account-creation API, with coverage configured for English Canadian (`en-CA`) and French Canadian (`fr-CA`), on desktop Chrome and an emulated iPhone.
There is API testing too for applying OWASP Top 10 based testing.

The suite is configured to call the application and API at the URLs supplied in the acceptance environment configuration. Treat runs that target a shared or production environment as real interactions: valid submissions can create accounts. Use only approved environments and isolated test data.

## Repository map

| Path | Purpose |
| --- | --- |
| [`acceptance/`](acceptance/) | Playwright project, specs, fixtures, test data, and test configuration. |
| [`acceptance/docs/test_plan/README.md`](acceptance/docs/test_plan/README.md) | Scope, test strategy, case inventory, and distinction between implemented and planned coverage. |
| [`acceptance/docs/findings/README.md`](acceptance/docs/findings/README.md) | Findings index linking to individual automated and manual reports. |
| [`acceptance/env/.env.example`](acceptance/env/.env.example) | Names of the environment variables needed to configure a run. |

The detailed test plan is the source of truth for coverage. A scenario listed there is not necessarily automated; check the plan's implementation notes and the specs under `acceptance/specs/`.

## Setup

Requirements: Node.js and npm. From the repository root, install the acceptance project's dependencies:

Recommended node v24.18.1 and npm version 12.0.2

```sh
cd acceptance
npm install
```

Playwright browser installation is run by the package's `postinstall` script. If it did not complete, install the required browser using the Playwright CLI:

```sh
npx playwright install
```

Configure the environment before running tests. Copy `env/.env.example` to the environment file used by your chosen npm script (for example, `env/.env.desk-en` or `env/.env.api`) and set its values:

```text
API_BASE_URL=
UI_BASE_URL=
TEST_PROJECT=chromium-en
LOG_LEVEL=debug
LOG_OUTPUT=console
```

The npm scripts select environment files under [`acceptance/env/`](acceptance/env/):

| Environment file | Used by | Configuration |
| --- | --- | --- |
| [`.env.desk-en`](acceptance/env/.env.desk-en) | `test:desk:en`, `test:smoke:en` | English Canadian desktop browser project. |
| [`.env.desk-fr`](acceptance/env/.env.desk-fr) | `test:desk:fr`, `test:smoke:fr` | French Canadian desktop browser project. |
| [`.env.mobile-en`](acceptance/env/.env.mobile-en) | `test:mob:en` | English Canadian emulated mobile project. |
| [`.env.mobile-fr`](acceptance/env/.env.mobile-fr) | `test:mob:fr` | French Canadian emulated mobile project. |
| [`.env.api`](acceptance/env/.env.api) | `test:api` | Direct API project. |
| [`.env.example`](acceptance/env/.env.example) | Template | Variable names and example defaults for creating or updating an environment file. |

The environment files set the target URLs and project/logging options. Ensure the URLs in the selected file point to an environment you are authorized to test. Do not commit credentials, access tokens, or other secrets. The API project uses `TEST_PROJECT=api`; browser projects are `chromium-en`, `chromium-fr`, `mobile-en`, and `mobile-fr`.

## Run tests

Run these commands from `acceptance/`:

| Command | Coverage |
| --- | --- |
| `npm run test:smoke` | Desktop page/form smoke checks in English and French. |
| `npm run test:ui` | UI suite across the configured desktop/mobile and English/French projects; opens Playwright UI for each project. |
| `npm run test:security` | UI checks tagged `@security` using the English desktop environment. |
| `npm run test:api` | API specs using the API environment; opens Playwright UI. |

To run a single UI project, use one of `npm run test:desk:en`, `npm run test:desk:fr`, `npm run test:mob:en`, or `npm run test:mob:fr`. These commands also open Playwright UI. Test results are written under `acceptance/test-results/`; traces and screenshots may be retained for failures according to the Playwright configuration.

## Test plan and findings

- Start with the [test plan](acceptance/docs/test_plan/README.md) for scope, test IDs, expected outcomes, and planned work.
- Use the [findings index](acceptance/docs/findings/README.md) to locate reports from automated and manual testing.
- Automated specs are under [`acceptance/specs/`](acceptance/specs/). Test case documents under the plan explain scenarios and expected behavior in more detail.

Findings describe observed results in the tested environment; they do not by themselves establish a product requirement. Check each report for its reproduction steps, evidence, environment, and limitations.

## Design rationale

### Why this framework

The goal is to exercise the sign-up experience as a user encounters it, including localization, responsive layouts, form validation, accessibility signals, submission behavior, and the API boundary. The browser suite uses real application and API calls so it can observe the integrated behavior available in the configured environment.

Some checks, such as individual field validation, could also be tested at a unit or integration layer. They are included here because the acceptance suite focuses on behavior observable through the sign-up flow, including whether invalid input is blocked from reaching account creation.

### Decisions

- **Playwright projects cover locale and device.** The configured projects exercise `en-CA` and `fr-CA` on desktop Chrome and emulated iPhone, keeping the main scenarios consistent across those dimensions.
- **`@seontechnologies/playwright-utils` supports network observation.** It is used to help inspect network activity associated with the browser flow. The suite does not use its request-mocking capability for the main acceptance path because that path is intended to exercise the configured service rather than a simulated backend. See the [package documentation](https://www.npmjs.com/package/@seontechnologies/playwright-utils) and its [video walkthroughs](https://www.youtube.com/watch?v=FTLw_UzFtik&list=PLiWLY0XU2JRrY9TKeBvQJuNAgFNWqLLr0).
- **The browser and API checks serve different purposes.** UI tests cover behavior through the page; API tests exercise the account-creation boundary directly. API expectations that depend on an undocumented contract should be treated as items to confirm, not assumed guarantees.

### Assumptions and constraints

- The configured UI and API URLs identify the intended test target. A run does not automatically make an environment safe for test data or account creation.
- The framework has no database access for checking persistence or cleaning up accounts. It therefore verifies observable browser/API outcomes and uses isolated test data; it cannot assert database consistency or remove created accounts.
- Successful signup cases may create accounts. Use unique, non-identifying test data and follow the target environment's data-handling rules. Avoid retaining passwords, tokens, cookies, or raw authentication traffic in reports.
- Some expected API behavior and response details still need confirmation against an authoritative service contract. The test plan marks relevant gaps; keep those expectations explicit when interpreting results.
- Automated tests do not replace manual exploratory testing, a full security assessment, or backend and persistence testing.
