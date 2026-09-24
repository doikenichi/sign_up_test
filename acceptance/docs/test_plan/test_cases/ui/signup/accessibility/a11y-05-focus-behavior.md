# A11Y-05 - Focus behavior

Verify that focus is visible, follows an ordered path, and is not trapped on the sign-up page.

Focus is visible, ordered, and not trapped.

## Given

The sign-up page is available in one of the configured locale and device projects.

## When

Move keyboard focus through the sign-up page.

## Then

Focus remains visible, follows the expected order, and is not trapped.

## Parameters

| Parameter | expected result |
|---|---|
| `test:desk:en`, `test:desk:fr`, `test:mob:en`, and `test:mob:fr` | Focus is visible, ordered, and not trapped in each project. |

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Open the sign-up page in the selected locale and device project. | The sign-up page loads. |
| 2 | Move focus through the interactive elements with the keyboard. | Focus moves through the interactive elements. |
| 3 | Observe the focus indicator and the order in which elements receive focus. | Focus remains visible and follows the expected order. |
| 4 | Continue moving focus to confirm it is not trapped. | Focus is not trapped on the sign-up page. |
