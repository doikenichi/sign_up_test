e2e flow of login page

The tests implemented are by definition intended to be end-to-end flows because are ran against the production environment.

However some implemented test are meant to be tested on unit or integration level due lack of integration needed, such as the form validation tests.

Ideally the end-to-end flow would be run against the integrated test environment, so the framework would have access to the database to validate data consistency and data cleanup. in the lack of access to database, this step is ommitted.

implementation decision:

- replace playwright native network monitoring with @seontechnologies/playwright-utils
  source: <https://www.npmjs.com/package/@seontechnologies/playwright-utils>
  video links explaining the
  library: <https://www.youtube.com/watch?v=FTLw_UzFtik&list=PLiWLY0XU2JRrY9TKeBvQJuNAgFNWqLLr0>

this library can be used to contract testing by mocking backend calls, but was not used in this repository because the focus is on production environment, making full calls.
