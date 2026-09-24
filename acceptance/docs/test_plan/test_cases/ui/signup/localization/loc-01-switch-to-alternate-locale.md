# LOC-01 - Switch to the alternate locale from the sign-up page

Verify that switching from the current sign-up locale loads the alternate supported locale and keeps the form usable.

The target locale loads, key content updates, and the form remains usable.

## Given

The sign-up page is available in one of the supported locales, and the test runs with one of the configured locale and
device projects.

## When

Switch from the current locale to the alternate locale using the sign-up page's locale control.

## Then

The target locale is loaded, the form heading and create-account button use the target locale content, and the form
controls remain visible and usable.

## Parameters

| Parameter | expected result |
|---|---|
| `en-CA` to `fr-CA` | The target locale loads, key content updates, and the form remains usable. |
| `fr-CA` to `en-CA` | The target locale loads, key content updates, and the form remains usable. |

## Steps

| No | action                                                                    | expected result                                                           |
|----|---------------------------------------------------------------------------|---------------------------------------------------------------------------|
| 1  | Open the sign-up page in the selected starting locale and device project. | The sign-up page loads in the starting locale.                            |
| 2  | Record the current locale.                                                | The current locale is identified.                                         |
| 3  | Switch to the alternate locale.                                           | The target locale loads.                                                  |
| 4  | Verify the target locale and key form content.                            | The form heading and create-account button use the target locale content. |
| 5  | Check the form controls.                                                  | The form controls remain visible and usable.                              |
