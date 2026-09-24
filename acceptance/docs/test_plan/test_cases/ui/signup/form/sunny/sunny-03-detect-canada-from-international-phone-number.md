# SUNNY-03 - Detect Canada from an international phone number

Verify that entering a valid Canadian number with `+1` after selecting "international" automatically selects Canada
and applies Canadian phone formatting.

The selector changes to Canada, the Canadian mask is applied, and the phone number passes validation.

## Given

The sign-up page is available in the selected locale and device project, with a fresh form for each execution.

Prepare a valid, non-identifying synthetic Canadian phone number isolated to this case. Enter it in international
format: `+1` followed by its ten national digits. The confirmed display mask after Canada is detected is
`(###) ###-####`.

## When

Select "international" in the phone country selector, enter the prepared number including `+1`, and move focus out of
the phone field. Observe the automatic country selection without manually choosing Canada or submitting the form.

## Then

The phone country selector changes automatically to Canada, the ten national digits are displayed using the
`(###) ###-####` mask, and the phone number passes validation with no phone validation error shown.

## Parameters

| Project       | Locale  | Device  | expected result                                                                                                               |
|---------------|---------|---------|-------------------------------------------------------------------------------------------------------------------------------|
| `chromium-en` | `en-CA` | Desktop | Entering the Canadian number with `+1` changes the selector to Canada, applies `(###) ###-####`, and passes phone validation. |
| `chromium-fr` | `fr-CA` | Desktop | Entering the Canadian number with `+1` changes the selector to Canada, applies `(###) ###-####`, and passes phone validation. |
| `mobile-en`   | `en-CA` | Mobile  | Entering the Canadian number with `+1` changes the selector to Canada, applies `(###) ###-####`, and passes phone validation. |
| `mobile-fr`   | `fr-CA` | Mobile  | Entering the Canadian number with `+1` changes the selector to Canada, applies `(###) ###-####`, and passes phone validation. |

## Steps

| No | action                                                                                             | expected result                                                                                     |
|----|----------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| 1  | Open a fresh sign-up page in the selected locale and device project.                               | The phone country selector and phone number field are available.                                    |
| 2  | Select "international" in the phone country selector.                                              | The selector shows the international option.                                                        |
| 3  | Enter the prepared Canadian number as `+1` followed by its ten national digits.                    | The selector automatically changes to Canada.                                                       |
| 4  | Inspect the displayed phone number.                                                                | The national digits are preserved and displayed using `(###) ###-####`.                             |
| 5  | Move focus out of the phone field and inspect its validation feedback without submitting the form. | The phone number remains accepted, Canada remains selected, and no phone validation error is shown. |
