---
name: create-test-case
description: Create a Markdown test case for a requested sign-up test ID or named scenario using the project's test plan and test-case template.
---

# Create Test Case

Use this skill when the user asks for a test case file for a test in this acceptance-test project.

## Inputs

Read these files from the repository before writing anything:

- `docs/test_plan/README.md` is the only source of test requirements, IDs, expected outcomes, parameters, and scope.
- `docs/test_plan/test_case_template.md` is the required output structure.
- The `specs/` directory is the reference for the automated-test suite and sub-suite organization. Keep generated test-case files aligned with the corresponding README section and spec path. A spec file is also a directory: remove `.spec.ts` from the matching filename and append that name beneath its parent directories. For example, `specs/ui/signup/accessibility.spec.ts` maps to `docs/test_plan/test_cases/ui/signup/accessibility/`, while `specs/ui/signup/localization.spec.ts` maps to `docs/test_plan/test_cases/ui/signup/localization/`.
- If a Playwright MCP server is available in the current environment, use it to confirm the observable UI actions and outcomes before finalizing the case. Treat MCP observations as confirmation of test steps, not as a replacement for the test plan.

The request should identify a test ID such as `FORM-10`, `LOC-02`, or `SMK-01`, or provide a distinctive test name. Search the entire README because tests may appear in tables, bullet lists, or headings.

## Workflow

1. Resolve the requested test to its exact ID and description in the README. If multiple entries match, ask the user to choose; do not silently combine them.
2. Gather the matching expected result, parameters, suite context, constraints, and any shared notes that apply to the scenario.
3. Identify the matching test suite and subsection in the README and the corresponding spec file under `specs/` when one exists. Mirror the complete spec path under `docs/test_plan/test_cases/`, treating the `.spec.ts` basename as an additional directory. For example, cases from `specs/ui/signup/accessibility.spec.ts` belong under `docs/test_plan/test_cases/ui/signup/accessibility/`, and cases from `specs/ui/signup/localization.spec.ts` belong under `docs/test_plan/test_cases/ui/signup/localization/`. Use the test suite directory as part of the path as well; do not flatten cases into `ui/signup/` or use a spelling that differs from the spec basename. When no corresponding spec exists, mirror the README's top-level suite and subsection names.
4. Create the resolved test-suite/spec directory when it does not exist.
5. Write `<test-id>-<slug>.md` in that directory, using lowercase hyphen-separated text for `<slug>`.
6. Start from the headings and order in `docs/test_plan/test_case_template.md`: title, objective, expected result, `Given`, `When`, `Then`, `Parameters`, and `Steps`. The `Steps` section must be a Markdown table with the columns `No`, `action`, and `expected result`.
7. Replace every placeholder with concrete, testable content. Keep the test focused on the requested scenario and do not add unrelated cases.
8. Make `Given` describe the preconditions and test data, `When` describe the user/API action, and `Then` describe observable outcomes and side effects. Include request prevention, status codes, localization, device projects, or isolation requirements when the README specifies them.
9. Use `Parameters` only when the README identifies parameters. Write `Not applicable` when none are specified so no placeholder remains.
10. If Playwright MCP is available, navigate to the relevant page and perform the safe, in-scope actions needed to confirm the draft's observable steps. Confirm labels, visibility, enabled/disabled state, navigation, validation feedback, localization, and other behavior only when the plan or spec calls for them. Do not submit real accounts, expose credentials, or make destructive or irreversible changes. If the server is unavailable, continue without MCP and do not claim that runtime behavior was confirmed.
11. Update `docs/test_plan/README.md` by adding a relative Markdown link to the created case beside the matching test ID or named scenario. Preserve the README's existing headings, tables, bullets, and ordering; do not create a separate index or duplicate entry. If the matching entry already has a link to the same case, leave it unchanged.

## Constraints

- Do not invent requirements, UI labels, API fields, status codes, validation rules, or environments absent from the README. When the plan is insufficient to make a step testable, state the missing detail briefly in the test case and ask for clarification rather than guessing.
- Preserve the exact test ID and the plan's expected behavior. Correct obvious grammar in prose only when it does not change meaning.
- Use isolated, non-identifying data whenever the plan calls for test data. Never place real credentials, tokens, or personal data in the file.
- Keep the generated file Markdown and do not modify the template. The source README must be updated only to add or maintain the link to the generated case.
- Do not turn unverified Playwright MCP observations into new requirements. When a planned step cannot be confirmed because the page, environment, or server is unavailable, retain only behavior supported by the README or spec and mention the verification gap briefly when useful.
- If the target test-case file already exists, inspect it first and update it only when the user asked to create or regenerate that case; preserve unrelated user edits.

## Completion Check

Before finishing, verify that the file exists at the expected test-suite/spec-aligned path, including the spec basename directory derived from `<name>.spec.ts`, contains no angle-bracket placeholders, includes the exact test ID, has all template sections in the original order, and uses a `Steps` table with `No`, `action`, and `expected result` columns. If Playwright MCP was available, verify that the case reflects the confirmed observations without adding unsupported requirements. Also verify that `docs/test_plan/README.md` contains exactly one relative link for the created case at the matching test entry.
