This file contains findings from testing.

## Manual testing

1. Create your account button is enabled on page load
   This finding is not a feature bug but maybe an UX issue and a suggestion to improvement.

Since the button is enabled on page load, it may be confusing for users who are not yet ready to create an account.
Since the UI makes basic form validation, the user could be instructed to fill in the form before proceeding clicking
the button.
And the button could be disabled until the form is valid.

2. Lack of clear instructions for users on how to proceed with creating an account.

This finding is not a feature bug but maybe an UX issue and a suggestion to improvement.
Even though everyone at this point is used to the account creation process, it is still important to provide clear
instructions to users on how to proceed with creating an account.

One example is a wizard-style form that guides users on how to fill each form.

For example, there are no clear instructions of the name validation; however, the error is shown if the rule is broken
and there is no clear instruction on how the user could proceed.

3. Phone Country code
   What is the `International` country code?


4. inconsistent locale for phone number error text
   In English is "invalid value" and in French is "Valeur invalide."
   There is a dot "." at the end of the French string

5. inconsistent locale for privacy policy text
   In English is "Privacy Policy" and in French is "politique de confidentialité"
   While in English is "Camel Case" in French is lowercase

6. sign up flow returns access token with about 5 hours access
   The user is authenticated with user and password by calling https://auth.nesto.ca/co/authenticate
   The token should be valid for the session, there shouldn't be a need to generate new token.
   I haven't checked the content of the jwt token, but I'm assuming that is same tenant
   {
   "client_id":"Fg4dnbZoCq7oA0rWplMLWnI1oE0HGy3l",
   "username":"form02-chromium-en-fe6080ee-3062-4237-b8da-2558e37f45af@gmail.com",
   "password":"Aa1wZs9qOfM6wDWFqT",
   "realm":"Username-Password-Authentication-Qa",
   "credential_type":"http://auth0.com/oauth/grant-type/password-realm"
   }
