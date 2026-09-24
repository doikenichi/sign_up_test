# A11Y-01 - Localized form heading

Verify that the sign-up form displays the heading defined by the selected locale fixture.

The visible heading matches the locale fixture.

## Given

The sign-up page is available, and the test runs with one of the configured locale and device projects.

## When

Open the sign-up page for the selected locale.

## Then

The form heading is visible and its text matches the selected locale fixture.

## Parameters

| Parameter | expected result |
|---|---|
| `test:desk:en`, `test:desk:fr`, `test:mob:en`, and `test:mob:fr` | The heading matches the selected locale fixture in each project. |

## Steps

| No | action                                                           | expected result                                  |
|----|------------------------------------------------------------------|--------------------------------------------------|
| 1  | Open the sign-up page in the selected locale and device project. | The sign-up page loads.                          |
| 2  | Locate the visible form heading.                                 | The form heading is visible.                     |
| 3  | Compare the heading text with the selected locale fixture.       | The heading matches the selected locale fixture. |
