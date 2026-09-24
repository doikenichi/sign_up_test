# A11Y-03 - Required and invalid states

Verify that required state and invalid submission errors are exposed to assistive technology.

Required state is exposed, and invalid submission exposes field errors.

## Given

The sign-up page is available in one of the configured locale and device projects.

## When

Inspect the required controls, then submit the form in an invalid state.

## Then

Required state is exposed for the required controls, and field errors are exposed after invalid submission.

## Parameters

| Parameter | expected result |
|---|---|
| `test:desk:en`, `test:desk:fr`, `test:mob:en`, and `test:mob:fr` | Required state and invalid submission errors are exposed in each project. |

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Open the sign-up page in the selected locale and device project. | The sign-up page loads. |
| 2 | Inspect the controls that are required. | Required state is exposed for the required controls. |
| 3 | Submit the form in an invalid state. | Field validation errors are displayed. |
| 4 | Inspect the invalid controls and their errors. | Field errors are exposed to assistive technology. |
