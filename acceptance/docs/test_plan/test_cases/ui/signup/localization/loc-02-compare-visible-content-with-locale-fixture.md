# LOC-02 - Compare visible sign-up content with the locale fixture

Verify that visible sign-up content matches the fixture for the selected locale.

Each value matches the selected locale with no missing, mixed-locale, or fallback text.

## Given

The sign-up page is available, and the test runs with one of the configured `en-CA` or `fr-CA` locale and device projects.

## When

Open the sign-up page for the selected locale and compare the visible sign-up content with the selected locale fixture.

## Then

The heading, field labels, password guidance, consent text, legal-link labels, and submit CTA match the selected locale fixture. No required value is missing, displayed in the other locale, or replaced with fallback text.

## Parameters

| Parameter | expected result |
|---|---|
| `en-CA` and `fr-CA` | Each selected-locale value matches the locale fixture with no missing, mixed-locale, or fallback text. |
| Heading, field labels, password guidance, consent text, legal-link labels, and submit CTA | Each content value matches the selected locale fixture. |

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Open the sign-up page in the selected locale and device project. | The sign-up page loads in the selected locale. |
| 2 | Read the visible heading, field labels, password guidance, consent text, legal-link labels, and submit CTA. | Each required visible value is available for comparison. |
| 3 | Compare each value with the corresponding selected-locale fixture value. | Each value matches the selected locale fixture. |
| 4 | Check for missing, mixed-locale, or fallback text. | No compared value is missing, mixed-locale, or fallback text. |
