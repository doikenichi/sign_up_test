# LOC-03 - Open each navigation or legal link from the sign-up page

Verify that each sign-up navigation or legal link has the localized label and approved destination for the selected
locale.

The label matches the locale fixture, the `href` matches the approved destination, and the destination resolves without
error.

## Given

The sign-up page is available in the selected locale, and the test runs with one of the configured locale and device
projects.

## When

Inspect and open each navigation or legal link from the sign-up page for the selected locale.

## Then

Each link label matches the locale fixture, each `href` matches the approved destination for the selected locale, and
each destination resolves without error.

## Parameters

| Parameter | expected result |
|---|---|
| `login-en` (`en-CA`, Log in) | The label matches the locale fixture, the `href` matches the approved destination, and the destination resolves without error. |
| `login-fr` (`fr-CA`, Connectez-vous) | The label matches the locale fixture, the `href` matches the approved destination, and the destination resolves without error. |
| `terms-en` (`en-CA`, Terms of Service) | The label matches the locale fixture, the `href` matches the approved destination, and the destination resolves without error. |
| `terms-fr` (`fr-CA`, Conditions d'utilisation) | The label matches the locale fixture, the `href` matches the approved destination, and the destination resolves without error. |
| `privacy-en` (`en-CA`, Privacy policy) | The label matches the locale fixture, the `href` matches the approved destination, and the destination resolves without error. |
| `privacy-fr` (`fr-CA`, Politique de confidentialite) | The label matches the locale fixture, the `href` matches the approved destination, and the destination resolves without error. |

## Steps

| No | action                                                                                            | expected result                                |
|----|---------------------------------------------------------------------------------------------------|------------------------------------------------|
| 1  | Open the sign-up page in the selected locale and device project.                                  | The sign-up page loads in the selected locale. |
| 2  | For each link listed in the parameters, verify that its visible label matches the locale fixture. | Each link label matches the locale fixture.    |
| 3  | Verify that each link's `href` matches the approved destination for the selected locale.          | Each `href` matches the approved destination.  |
| 4  | Open or request each destination.                                                                 | Each destination resolves without error.       |
