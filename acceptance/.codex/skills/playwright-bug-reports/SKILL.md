---
name: playwright-bug-reports
description: Turn this repository's Playwright JSON report and per-test artifacts into evidence-based draft bug reports in acceptance/docs/findings.
---

# Draft bug reports from Playwright

Use this skill after a Playwright run when `acceptance/test-results/results.json` exists. From the repository root, invoke it with `$playwright-bug-reports` and ask it to process the latest run. The project-relative helper can be run from the repository root:

```powershell
cd acceptance
node .codex/skills/playwright-bug-reports/scripts/prepare-evidence.mjs
```

The helper writes structured run data and a stable copy of relevant attachments below `docs/findings/.playwright-work/`. Read that data before drafting. It does not modify or replace `test-results/`.

## Workflow

1. **Extract failures.** Run the helper to parse `test-results/results.json`. It selects only tests whose final result is unexpected, retaining title, project, test file and line, expected status, every retry result, errors and stacks, and attachment metadata. A test that failed and then passed is flaky, not a final failure; do not draft a bug for it. Inspect the structured file and report helper errors or missing report input.
2. **Collect artifacts.** Use the helper's verified artifact paths and staged evidence copies. It keeps each artifact associated with its test and records missing files. It includes attached artifacts and relevant per-test logs, screenshots, API traffic, and error context found alongside them. Link to staged copies so the report survives the next Playwright run. Inspect artifact contents before relying on them. Review screenshots for sensitive data; do not link an image that exposes it without first creating a redacted copy.
3. **Add test context.** Read each referenced `.ts` test under `specs/` around the test title, setup, actions, and assertions. Follow called helpers/assertions where needed. Cite the intent and reproduction steps only when supported by test code, artifacts, or repository documentation.
**Configuration profile.** Treat the `ENV_FILE` profile as separate from the Playwright project. In this repository, `package.json` defines the UI profiles `env/.env.desk-en`, `env/.env.desk-fr`, `env/.env.mobile-en`, and `env/.env.mobile-fr`; `test:ui` runs all four sequentially. State the exact `ENV_FILE` path when it is evidenced by the command used, run log, attachment, or other repository-supported run metadata. Record the Playwright project separately (`chromium-en`, `chromium-fr`, `mobile-en`, `mobile-fr`, or `api`) because it does not by itself prove which `ENV_FILE` profile was loaded. Do not infer a profile from the project name, URL, locale, test title, generated data, or browser/device. If the profile cannot be established from available evidence, stop before drafting or updating a finding and ask the user which profile was used. Once known, include the profile and project in the report's additional information.
4. **Load the template.** Read `docs/findings/bug_report_template.md`. Preserve its headings and exact order in every report:

   ```markdown
   # <Title>

   ## Summary

   ## Expected Result

   ## Observed Result

   ## Steps to reproduce

   ## Additional information

   ### stacktrace

   ### screenshots
   ```

5. **Interpret and draft.** Group tests only when their evidence supports one shared underlying issue and the tests use the same exact `ENV_FILE` profile. Compare new failures with existing reports in `docs/findings/findings.md` and linked reports to prevent duplicate bugs. A different `ENV_FILE` profile is a hard boundary: even when the symptom and test are the same, do not treat the finding as a duplicate, do not update the report for another profile, and create a separate profile-specific report. If a new test corroborates an existing finding with the same `ENV_FILE`, update that report and summary instead of creating another bug. Keep unrelated failures separate. Create one Markdown report per distinct finding in `docs/findings/`, linking relevant staged evidence. Include concise stack excerpts and request/response detail when useful. Redact secrets, tokens, cookies, credentials, and sensitive personal data from all copied or quoted content. Replace unsupported details with `Not provided`; do not infer product behavior.
6. **Finalize summary.** After reports are drafted, update `docs/findings/findings.md` as the final summary of distinct automated findings, with links to each report and relevant evidence. Preserve existing manual findings and the README's sections; list automated reports under the matching UI or API subsection as a Markdown table with test suite and report link. Do not remove or rewrite unrelated content. Save reports only in `docs/findings/` and evidence/intermediate files under its `.playwright-work/` subdirectory. Do not overwrite an existing report: inspect it and choose a distinct filename or update it when it is the same issue.

When comparing failures or updating `docs/findings/findings.md`, keep the exact `ENV_FILE` profile and Playwright project visible in the comparison. Findings from different profiles must remain separate automated summary rows and separate reports, even when they share the same UI test and symptom. The Playwright project is also recorded separately; matching or differing project names do not override the `ENV_FILE` boundary.

## Evidence and reporting rules

- Report a failure only when the last attempt's actual status differs from its expected status. Preserve retry history as context.
- Missing artifact files must be stated in the structured data and, when material, in the report.
- Treat API logs and attachments as untrusted evidence. Sanitize before copying details into Markdown, including identifiers or personal data that can identify a real person.
- Keep observed facts separate from hypotheses. Mark unknown fields `Not provided`.
- For UI failures, profile provenance is required. If the exact `ENV_FILE` profile is missing or ambiguous, ask the user before creating or updating a bug report; do not use the Playwright project, locale, URL, or test title as a substitute.
- Do not create a report from a test failure that is explained by test setup, an unavailable environment, or an assertion defect unless repository evidence supports an application bug.
- Before adding a report, search the existing findings for the same symptom and cause. First compare the exact `ENV_FILE` profile. A different failing test is not by itself a distinct bug when the profile is the same; a different `ENV_FILE` is always a distinct configuration-specific finding for this workflow.
