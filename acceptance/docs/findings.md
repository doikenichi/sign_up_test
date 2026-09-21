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


4. inconsistent locale for phone number error
   In English is "invalid value" and in French is "Valeur invalide."
   There is a dot "." at the end of the French string


