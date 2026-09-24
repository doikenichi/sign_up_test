# Playwright Fixtures Review

Review date: 2026-09-21

Scope reviewed:

- `src/fixtures/test-fixture.ts`
- `src/fixtures/ui/page-object-fixture.ts`
- `src/fixtures/ui/test-options.ts`
- `src/fixtures/api/test-fixture.ts`
- Related usage in `playwright.config.ts` and `specs/navigation.spec.ts`

## Executive Summary

The fixture layer has a good foundation: tests import a project-specific `test`, page objects are injected instead of
constructed in specs, locale content is centralized, and the logger is declared as a worker fixture. Those are healthy
Playwright patterns.

The biggest issue is that the custom `layout` option is not wired into the Playwright projects. All projects currently
receive the fixture default of `"desktop"`, including `mobile-en` and `mobile-fr`, so the `navigation` fixture will
instantiate `DesktopHeader` on mobile projects. That is the most important convention and correctness gap to fix
first.

The second important issue is fixture organization. `api/test-fixture.ts` only re-exports the base fixture and does not
add API-specific behavior, while the UI fixture is named around page objects but also owns locale content and layout
routing. This is manageable now, but it will become confusing as the suite grows.

## What Is Right

### Tests import from the fixture layer

`specs/navigation.spec.ts` imports `test` and `expect` from `src/fixtures/ui/page-object-fixture.ts`. That is the right
direction for a Playwright suite. Tests should not import directly from `@playwright/test` once the project has shared
fixtures.

Good outcome:

- Specs get a consistent test context.
- Page object creation stays outside test bodies.
- Shared setup can be evolved centrally.

### Worker-scoped logger is the right fixture scope

`src/fixtures/test-fixture.ts` declares `logger` as a worker fixture:

```ts
logger: [
    async ({browserName}, use) => {
        const environment = loadEnvironment();
        const logger = createLogger(environment.logging);

        logger.debug("Logger fixture initialized", {browserName});
        await use(logger);
    },
    {scope: "worker"},
],
```

That is a sensible choice because a logger is infrastructure, not a per-test browser resource. Creating it once per
worker avoids unnecessary object churn.

### Locale content is exposed through a fixture

`content` reads the Playwright `locale` option and resolves the matching locale bundle. This is cleaner than calling
`getLocaleContent()` in every spec.

Good outcome:

- Test assertions can use localized expected text.
- The active project locale controls the expected content.
- Specs stay independent from locale lookup details.

### Navigation is abstracted behind a shared interface

The `navigation` fixture returns either `MobileHeader` or `DesktopHeader` behind a `Header` interface. That
is a good idea because tests should express intent, not know which menu implementation exists on a device.

## What Is Wrong

### Mobile projects do not set the custom `layout` option

`src/fixtures/ui/page-object-fixture.ts` defines the custom option:

```ts
layout: ["desktop", {option: true}],
```

But `playwright.config.ts` does not set `layout` for any project. The mobile projects only apply the iPhone device
descriptor and locale:

```ts
{
    name: "mobile-en",
        use
:
    {
    ...
        devices["iPhone 16 Pro"],
            locale
    :
        "en-CA",
            baseURL
    :
        environment.baseURL,
    }
,
}
```

Playwright device descriptors do not automatically set this custom fixture option. As written, mobile projects still
receive `layout: "desktop"`.

Impact:

- `navigation` will choose `DesktopHeader` for mobile tests.
- Any mobile navigation behavior can be silently untested.
- The fixture comment says projects can override `use.layout`, but the config does not actually do it.

Recommended fix:

```ts
import type {TestOptions} from "./src/fixtures/ui/test-options.js";

export default defineConfig<TestOptions>({
    projects: [
        {
            name: "chromium-en",
            use: {
                ...devices["Desktop Chrome"],
                locale: "en-CA",
                baseURL: environment.baseURL,
                layout: "desktop",
            },
        },
        {
            name: "mobile-en",
            use: {
                ...devices["iPhone 16 Pro"],
                locale: "en-CA",
                baseURL: environment.baseURL,
                layout: "mobile",
            },
        },
    ],
});
```

Do the same for the French projects.

### The highest-risk fixture is not covered by the visible test

`navigation` is defined in `src/fixtures/ui/page-object-fixture.ts`, but `specs/navigation.spec.ts` currently requests
`content`, `logger`, and `signUpPage`; it does not request or exercise `navigation`.

Impact:

- The fixture can be broken while the navigation spec still passes.
- The desktop/mobile routing logic has no direct test pressure.
- The test name says "from navigation", but the implementation calls `signUpPage.goto()` directly.

Recommended fix:

- Update the navigation spec to use the `navigation` fixture if the intent is to validate navigation.
- Or rename the spec if the intent is only direct signup page access.

### Logger fixture does not clean up after `use`

The logger fixture creates a Winston logger and calls `await use(logger)`, but it does not close the logger after the
worker completes.

Impact:

- File transports may not flush deterministically.
- Open handles can make debugging worker shutdown harder.
- The problem will be more visible if `LOG_OUTPUT=file` is used in CI.

Recommended fix:

```ts
await use(logger);
logger.close();
```

If the logger supports async flushing in the chosen transport setup, prefer awaiting that flush explicitly.

### `api/test-fixture.ts` is an API fixture in name only

`src/fixtures/api/test-fixture.ts` contains:

```ts
export type {WorkerFixtures} from "../test-fixture.js";
export {expect, test} from "../test-fixture.js";
```

That file does not add an API client, request helpers, API base URL handling, authentication state, response assertions,
or any other API-specific behavior.

Impact:

- The folder suggests there is an API fixture contract when there is not.
- Future test authors may import it expecting API-specific capabilities.
- It increases the number of fixture entry points without increasing clarity.

Recommended fix:

- Remove it until there are real API fixtures.
- Or rename it to make clear it is only a base re-export.
- Or add actual API fixtures such as `apiClient`, `authHeaders`, or typed endpoint clients when API tests arrive.

## Convention Gaps

### The config should be typed with the custom options

When Playwright projects use custom options, the config should be typed with those options. Otherwise, `layout` is easy
to forget and the compiler will not help.

Recommended convention:

```ts
export default defineConfig<TestOptions>({
    use: {
        trace: "on-first-retry",
    },
    projects,
});
```

You may need to type the `projects` array as Playwright projects carrying `TestOptions`, or inline the projects inside
`defineConfig<TestOptions>()`, depending on how strict the current Playwright types are.

### Fixture names are too generic

`TestOptions`, `UIPages`, and `test-fixture.ts` are workable in a small project, but they are generic.

Suggested naming:

- `UILayoutOptions` instead of `TestOptions`
- `UIFixtures` instead of `UIPages`
- `src/fixtures/base.ts` instead of `src/fixtures/test-fixture.ts`
- `src/fixtures/ui.ts` or `src/fixtures/ui/page-objects.ts` instead of `src/fixtures/ui/page-object-fixture.ts`

The goal is not naming perfection. The goal is making imports communicate intent quickly.

### The fixture chain should have one obvious public entry point per test type

Current shape:

- `src/fixtures/test-fixture.ts`
- `src/fixtures/ui/page-object-fixture.ts`
- `src/fixtures/api/test-fixture.ts`

Suggested shape:

```text
src/fixtures/
  base.ts
  ui.ts
  api.ts
```

Tests would import from exactly one of these:

```ts
import {expect, test} from "../src/fixtures/ui.js";
```

or:

```ts
import {expect, test} from "../src/fixtures/api.js";
```

This follows a common Playwright convention: each test type imports a pre-extended `test` that already includes the
right fixtures.

### Fixture callback types are more verbose than necessary

`page-object-fixture.ts` annotates `use` manually:

```ts
use: (content: LocaleContent) => Promise<void>
```

Playwright can infer these types from `base.extend<TestOptions & FrameworkFixtures>()`. Manual callback typing is not
wrong, but it adds noise and creates another thing to maintain.

Preferred style:

```ts
content: async ({locale}, use) => {
    await use(getLocaleContent(locale));
},
```

The explicit fixture type on `extend` should be enough.

### The empty test-fixture generic is documented, but still awkward

`base.extend<{}, WorkerFixtures>()` needs a Biome ignore because `{}` is banned. Playwright examples often use this
shape, so the current code is understandable.

Still, the convention would be cleaner if the project used a named alias or a linter configuration exception for
Playwright fixture generics. A local ignore is acceptable, but repeated ignores should be avoided.

Example:

```ts
type NoTestFixtures = Record<string, never>;

export const test = base.extend<NoTestFixtures, WorkerFixtures>({
    // ...
});
```

Validate this against Playwright's generic constraints before adopting it.

## What Should Change First

1. Wire `layout` into `playwright.config.ts` for every project.
2. Type `defineConfig` with the custom option type so missing or invalid layout values are caught.
3. Update `specs/navigation.spec.ts` to actually use the `navigation` fixture, or rename the test.
4. Add logger cleanup after `await use(logger)`.
5. Simplify the fixture entry points to `base`, `ui`, and `api` once the suite grows beyond this challenge.

## Suggested Refactor Target

A clean target structure would look like this:

```ts
// src/fixtures/base.ts
import {test as base} from "@playwright/test";

export type WorkerFixtures = {
    logger: Logger;
};

export const test = base.extend<Record<string, never>, WorkerFixtures>({
    logger: [
        async ({browserName}, use) => {
            const logger = createLogger(loadEnvironment().logging);
            logger.debug("Logger fixture initialized", {browserName});

            await use(logger);
            logger.close();
        },
        {scope: "worker"},
    ],
});

export {expect} from "@playwright/test";
```

```ts
// src/fixtures/ui.ts
import {test as base} from "./base.js";

export type UILayoutOptions = {
    layout: "desktop" | "mobile";
};

export type UIFixtures = {
    content: LocaleContent;
    navigation: Navigation;
    signUpPage: SignUpPage;
};

export const test = base.extend<UILayoutOptions & UIFixtures>({
    layout: ["desktop", {option: true}],

    content: async ({locale}, use) => {
        await use(getLocaleContent(locale));
    },

    navigation: async ({page, content, layout}, use) => {
        await use(
            layout === "mobile"
                ? new MobileHeader(page, content.navigation)
                : new DesktopHeader(page, content.navigation),
        );
    },

    signUpPage: async ({page, content}, use) => {
        await use(new SignUpPage(page, content.signUp));
    },
});

export {expect} from "./base.js";
```

This keeps the current design while making the fixture entry points and custom options easier to reason about.

## Additional Improvement Ideas

- Add a smoke spec or small fixture-level test that asserts mobile projects receive `layout: "mobile"` and desktop
  projects receive `layout: "desktop"`.
- Consider adding `test.step()` inside higher-level page object actions instead of logging every test action manually.
- Keep fixtures thin. If page object setup starts needing data, API calls, or authentication, move that complexity into
  focused helper classes and let fixtures only compose them.
- Avoid adding every page object to a single global UI fixture forever. For a larger app, split by product area or
  expose a grouped `pages` fixture to control growth.
- Keep `expect` exported from the same fixture entry point as `test`; the current pattern is good and should remain
  consistent.

## Verification Note

I attempted to run:

```sh
npx tsc -p tsconfig.json --noEmit
```

It did not complete because there is no local `node_modules/.bin/tsc.cmd`, and `npx` attempted to fetch/use npm cache
outside the sandboxed workspace, which failed with `EPERM`. The review above is based on source inspection rather than a
successful type-check run.
