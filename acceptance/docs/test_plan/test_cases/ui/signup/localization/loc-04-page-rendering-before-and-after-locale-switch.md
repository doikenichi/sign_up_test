# LOC-04 - Check the initial layout and repeat after switching locale

Verify that the sign-up page remains usable and correctly rendered before and after switching locale.

No text or controls overlap, clip, disappear, or cause unintended horizontal scrolling; the form remains usable.

## Given

The sign-up page is available, and the test runs with each configured locale and device project.

## When

Check the initial sign-up page layout, switch to the alternate locale, and check the layout again.

## Then

Before and after switching locale, no text or controls overlap, clip, or disappear, the page does not cause unintended horizontal scrolling, and the form remains usable.

## Parameters

| Parameter | expected result |
|---|---|
| `test:desk:en`, `test:desk:fr`, `test:mob:en`, and `test:mob:fr` | Before and after switching locale, the page remains correctly rendered and the form remains usable. |

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Open the sign-up page in the selected locale and device project. | The sign-up page loads. |
| 2 | Check the initial layout for overlapping, clipped, or missing text and controls. | No text or controls overlap, clip, or disappear. |
| 3 | Check the page for unintended horizontal scrolling. | The page does not cause unintended horizontal scrolling. |
| 4 | Switch to the alternate locale. | The alternate locale loads. |
| 5 | Repeat the layout and horizontal-scrolling checks. | No text or controls overlap, clip, disappear, or cause unintended horizontal scrolling after switching. |
| 6 | Check the form in both locales. | The form remains usable in both locales. |
