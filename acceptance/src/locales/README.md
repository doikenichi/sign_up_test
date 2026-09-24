src/locales directory is used to store locale-specific content for the application.
It is designed to be the source of truth of all visual texts on the signup page, and facilitate localization and
internationalization of the application.
It also contains helper functions to facilitate the retrieval of the correct translation based on the user's locale.

@en-CA.ts and @fr-CA.ts files are used to store the English and French translations of the visual texts, respectively.
Since they are not a source code, it should be placed in a more verbose place, like /assets/locales, but due to the time
constraint, it was placed as ts files

The benefit of this code is a single place of maintenance of UI texts, leading to a fast recovery in case text changes.

The locale content is wired to the test by @src/fixtures/ui/page-object-fixture.ts