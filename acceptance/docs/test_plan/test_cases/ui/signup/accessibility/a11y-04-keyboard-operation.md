# A11Y-04 - Keyboard operation

Verify that links, controls, and form submission are operable using the keyboard.

Links, controls, and submission are keyboard operable.

## Given

The sign-up page is available in one of the configured locale and device projects.

## When

Use the keyboard to operate the links, controls, and form submission.

## Then

Links, controls, and submission are keyboard operable.

## Parameters

| Parameter | expected result |
|---|---|
| `test:desk:en`, `test:desk:fr`, `test:mob:en`, and `test:mob:fr` | Links, controls, and submission are keyboard operable in each project. |

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Open the sign-up page in the selected locale and device project. | The sign-up page loads. |
| 2 | Use the keyboard to reach the links and form controls. | The links and form controls can receive keyboard focus. |
| 3 | Operate the links and controls with the keyboard. | The links and controls respond to keyboard interaction. |
| 4 | Attempt form submission using the keyboard. | Form submission is operable using the keyboard. |
