# A11Y-07 - Automated scan

Run an automated accessibility scan against the sign-up page.

Axe reports no critical or serious violations.

## Given

The sign-up page is available in one of the configured locale and device projects.

## When

Run the automated accessibility scan against the sign-up page.

## Then

Axe reports no critical or serious violations.

## Parameters

| Parameter | expected result |
|---|---|
| `test:desk:en`, `test:desk:fr`, `test:mob:en`, and `test:mob:fr` | Axe reports no critical or serious violations in each project. |
| `@axe-core/playwright` | The automated accessibility scan runs against the sign-up page. |

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Open the sign-up page in the selected locale and device project. | The sign-up page loads. |
| 2 | Run the accessibility scan using `@axe-core/playwright`. | Axe reports accessibility violations, if any. |
| 3 | Review the reported violations. | The violations are classified by impact. |
| 4 | Confirm that no critical or serious violations are reported. | No critical or serious violations are reported. |
