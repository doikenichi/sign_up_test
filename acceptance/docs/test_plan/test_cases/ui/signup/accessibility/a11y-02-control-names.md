# A11Y-02 - Control names

Verify that every interactive form control exposes an accessible name.

Every interactive form control has an accessible name.

## Given

The sign-up page is available in one of the configured locale and device projects.

## When

Inspect the interactive form controls on the sign-up page.

## Then

Every interactive form control has an accessible name.

## Parameters

| Parameter | expected result |
|---|---|
| `test:desk:en`, `test:desk:fr`, `test:mob:en`, and `test:mob:fr` | Every interactive form control has an accessible name in each project. |

## Steps

| No | action                                                           | expected result                                        |
|----|------------------------------------------------------------------|--------------------------------------------------------|
| 1  | Open the sign-up page in the selected locale and device project. | The sign-up page loads.                                |
| 2  | Identify every interactive form control.                         | The interactive form controls are identified.          |
| 3  | Check the accessible name of each control.                       | Every interactive form control has an accessible name. |
