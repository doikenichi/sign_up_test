This file contains summary of all findings.

Each bug has its own md file that is linked from here as a table and test suite or manual testing

## Manual testing

## Automated Testing

### UI testing

### API testing

curl --url '<https://app.qa.nesto.ca/api/accounts>' \
  -H 'accept: application/json' \
  -H 'accept-language: en-CA' \
  -H 'content-type: application/json' \
  -b 'partner=nesto; __existingsess=Tue Sep 22 2026 22:26:50 GMT-0600 (Mountain Daylight Time);__utmzz=utmcsr=(direct)|utmcmd=(none)|utmccn=(not set)|channel=Direct; __utmzzses=1; flowLanguage=undefined; _gcl_au=1.1.182499144.1790137612; ga4_ga_Z4M617HVKN=GS2.1.s1790137611$o1$g0$t1790137611$j60$l0$h1444790752; ga4_ga=GA1.1.1703808982.1790137612; FPID=FPID2.2.hXwRaYAqbTCF1qG1kfCN5qL4pFk48D47hJvBWgSep4c%3D.1790137612; FPLC=D3W56zWm3gQBsWbKKeJV2lu7qm64k7H%2BTT2DeNrM2rSSj0p45WtuiLoadWUDnIxsoHajYM8E4l3l1qQh8otzIuaveLZnG8W7%2Fo9oN134%2F5JDaBGIc1UGijrKX33SQg%3D%3D;_switch_session_id=fd404c84-75a9-4554-8670-08deac7dbffe; _dd_s=rum=1&id=3007261e-9b80-4d12-9ce8-7d8feeb6139a&created=1790137611362&expire=1790138529081' \
  -H 'origin: <https://app.qa.nesto.ca>' \
  -H 'priority: u=1, i' \
  -H 'referer: <https://app.qa.nesto.ca/signup>' \
  -H 'sec-ch-ua: "Chromium";v="153", "Not_A Brand";v="8"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Windows"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-origin' \
  -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.8010.12 Safari/537.36' \
  -H 'x-datadog-origin: rum' \
  -H 'x-datadog-parent-id: 689086218781047712' \
  -H 'x-datadog-sampling-priority: 1' \
  -H 'x-datadog-trace-id: 8316766228363624240' \
  -H 'x-request-id: b84e425f-0433-457a-a6bb-27a136460605' \
  --data-raw '{"firstName":"Tommie","lastName":"Upton","email":"<form02-chromium-en-fe6080ee-3062-4237-b8da-2558e37f45af@gmail.com>","phone":"+14165550117","region":"ON","language":"en","leadDistributeConsentAgreement":true,"password":"Aa1wZs9qOfM6wDWFqT","passwordSpecified":true,"createdAt":"LOGIN","postalCode":"","partialPostalCode":"","emailConsent":true,"partnerAgreement":false,"partnerAgreementSpecified":false,"partner":"nesto","subPartnerId":0,"gaClientId":"1703808982.1790137612","anonymousAccountId":"drSW0cP390eCgYAS1cBsDJ5pvXDafqCt2NXg","marketingChannel":"Direct","utmSource":"(direct)","utmMedium":"(none)","utmCampaign":"(not set)","affiliateMarketingId":null,"impressionsTrackingId":null,"impressionsTrackingIdSpecified":false,"direct":true,"social":false,"formName":"signup","cfProvince":"ON"}'

{
    "account": {
        "id": 937690,
        "rid": "bdc7a50bbe803266d44c4f770d3464ae937690",
        "role": "borrower",
        "email": "<form02-chromium-en-fe6080ee-3062-4237-b8da-2558e37f45af@gmail.com>",
        "disabled": false,
        "deleted": false,
        "created": "2026-09-23T04:27:09Z",
        "updated": "2026-09-23T04:27:09Z",
        "tenant": {
            "id": 1,
            "slug": "nesto"
        },
        "firstName": "Tommie",
        "firstNameSpecified": true,
        "lastName": "Upton",
        "lastNameSpecified": true,
        "nickname": "",
        "nicknameSpecified": false,
        "phone": "+14165550117",
        "phoneSpecified": true,
        "phoneExtension": "",
        "phoneExtensionSpecified": false,
        "preferredLanguage": "en",
        "preferredLanguageSpecified": true,
        "region": "ON",
        "regionSpecified": true,
        "externalAuthenticationProviderUserID": "",
        "externalAuthenticationProviderUserIDSpecified": false,
        "identityId": "<form02-chromium-en-fe6080ee-3062-4237-b8da-2558e37f45af@gmail.com>",
        "identityIdSpecified": true,
        "partner": "nesto",
        "partnerSpecified": true,
        "postalCode": "",
        "postalCodeSpecified": false,
        "dateOfBirth": null,
        "dateOfBirthSpecified": false,
        "loggedAtLeastOnce": false,
        "loggedAtLeastOnceSpecified": false,
        "lastLoggedInOn": null,
        "partnerAgreement": false,
        "partnerAgreementSpecified": true,
        "subPartnerId": 0,
        "subPartnerIdSpecified": false,
        "impressionsTrackingId": "",
        "impressionsTrackingIdSpecified": false,
        "ckTrackingId": "",
        "ckTrackingIdSpecified": false,
        "partialPostalCode": "",
        "partialPostalCodeSpecified": false,
        "socialLoginProviderSpecified": false,
        "socialLoginProvider": "",
        "socialLoginUserId": "",
        "leadDistributeConsentAgreement": true,
        "leadDistributeConsentAgreementSpecified": true,
        "leadDistributionPlatformPartnerID": 0,
        "emailMachineValidationStatusSpecified": false,
        "emailMachineValidationStatus": "",
        "sin": "",
        "isGuarantor": false,
        "advisorNumber": "",
        "address": null,
        "tenantReferralId": "",
        "prefersPaperCommunications": false,
        "isDigital": true,
        "isDigitalSpecified": true,
        "prefersPaperMail": false,
        "prefersPaperMailSpecified": true,
        "active": false,
        "activated": "1000-01-01T00:00:00Z",
        "createdAt": "LOGIN"
    },
    "token": {
        "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjIwMTgwNzIzMTUwNzExXG4iLCJ0eXAiOiJKV1QifQ.eyJhdXQiOnRydWUsImV4cCI6MTc5MDEzODIyOSwianRpIjoiMGZjMTliOTk2OTE4MWU2YTY2NmUzZDA2NDJmZDM0YWYiLCJyZXAiOnsiZW5hIjpmYWxzZX0sInJvbCI6ImJvcnJvd2VyIiwic3ViIjoiOTM3NjkwIiwidGlkIjoxfQ.jakitEUbVWA1zWjIh_8Sbjv2AZHIwAMdIUagIMupE0GYPKKcK8N8OyxxjVK1HkHB6VqI-2Z6RYBUqzUK01mYpC4Lg5KXr5a2_LGpnM8bGCMdG7d6s6RAEvlHwMBxDYWKn2im8oyYxAdCfNFNa8qyjiHk4oTLSj5DNd1UV9u8osHep4wDTcyN4RFTH50CzWtA6Xu3lpUjCoKP1Kl3uN3Fg6tASw_wQZoBGpVbNZ7RJA9_OLkK9_PYZS7smi8YyIg8C3mz-DXM5rz9KFgwzMLJOIRGEBvqggLM879W-QOSfHfGFR2gDTuSZ4AYgSBN3XTBjcIbnvhw5zGKH-6I6HmUsw",
        "tokenType": "Bearer",
        "expires": "2026-09-23T04:37:09Z",
        "refreshToken": "7f15fefd21581c35596b99296258a5bd91543c2004da858f23f758dd57bd615f"
    }
}

lands to <https://app.qa.nesto.ca/getaquote>
