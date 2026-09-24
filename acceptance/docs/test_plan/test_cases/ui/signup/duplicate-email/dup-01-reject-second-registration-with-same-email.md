# DUP-01 - Reject second registration with the same email

Verify that a second completed registration using an already registered email is rejected.

The first attempt returns HTTP `201`. The second attempt returns the documented duplicate-email response, HTTP `422`, and does not enter the account-creation success state. The randomized mailbox prevents the valid first submission from being mistaken for a security-triggered rejection.

## Given

The account-creation backend enforces email uniqueness in a safe test environment. A fresh, non-identifying Gmail address is generated for each execution and retry, with no test ID or project name in the mailbox. Valid registration data are available. The first registration can be completed and its result can be confirmed without retaining credentials or personal data.

## When

Complete one valid registration with the isolated email. After that registration completes, submit a second valid form using the same email address.

## Then

The first registration succeeds with HTTP `201`. The second attempt is rejected with HTTP `422`, does not navigate to the account-creation success callback, and produces no second successful account creation. The exact localized duplicate message remains outside the current contract.

## Parameters

| Parameter | expected result |
|---|---|
| Safe test environment with backend email uniqueness enabled | Two completed attempts use the same randomized isolated email; the first returns `201` and the second returns `422` without entering the success state. |
| Four locale/device projects | The duplicate result is observable in `en-CA` and `fr-CA` on desktop and mobile, subject to the confirmed backend contract. |

## Steps

| No | action | expected result |
|---|---|---|
| 1 | Open the sign-up page in the selected locale and device project and prepare fresh randomized valid data. | The sign-up form is available and the mailbox is isolated to this execution. |
| 2 | Submit the valid form with the generated email and wait for the first registration to complete. | One account-creation request returns HTTP `201` and the success callback is reached. |
| 3 | Start a fresh valid registration and submit it with the same email address. | The second account-creation request returns HTTP `422` and the success callback is not reached. |
| 4 | Verify the request count and completed attempt outcomes. | Exactly two account-creation requests were sent: one successful first attempt and one rejected duplicate attempt. |
