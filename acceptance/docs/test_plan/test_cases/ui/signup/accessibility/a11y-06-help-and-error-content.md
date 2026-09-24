# A11Y-06 - Help and error content

Verify that guidance and validation errors are readable, associated with their controls, and not dependent on color alone.

Guidance and errors are readable, associated with their controls, and not color-dependent.

## Given

The sign-up page is available in one of the configured locale and device projects.

## When

Review the form guidance and trigger validation errors.

## Then

Guidance and errors are readable, associated with their controls, and understandable without relying on color alone.

## Parameters

| Parameter | expected result |
|---|---|
| `test:desk:en`, `test:desk:fr`, `test:mob:en`, and `test:mob:fr` | Guidance and errors are readable, associated with controls, and not color-dependent in each project. |

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Open the sign-up page in the selected locale and device project. | The sign-up page loads. |
| 2 | Review the guidance presented by the form. | The guidance is readable and associated with the relevant controls. |
| 3 | Submit the form in an invalid state to display errors. | Validation errors are displayed. |
| 4 | Review the guidance and errors. | They are readable and associated with the relevant controls. |
| 5 | Check whether the guidance and errors communicate their meaning without relying on color alone. | The guidance and errors communicate their meaning without relying on color alone. |
