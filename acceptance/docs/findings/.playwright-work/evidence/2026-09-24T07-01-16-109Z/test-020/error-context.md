# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\signup\api-03-reject-malformed-or-unsupported-values.spec.ts >> API-03: Reject malformed or unsupported values >> API-03: rejects markup in lastName
- Location: specs\api\signup\api-03-reject-malformed-or-unsupported-values.spec.ts:19:3

# Error details

```
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 400
Received:    201
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - text: "REQUEST - (METHOD: POST)"
    - generic [ref=e5] [cursor=pointer]: URL
    - generic [ref=e6]: https://app.qa.nesto.ca/api/accounts
    - generic [ref=e7]:
      - generic [ref=e8] [cursor=pointer]: BODY
      - generic [ref=e9]: "{ \"firstName\": \"Fausto\", \"lastName\": \"<img src=x onerror=alert(1)>\", \"phone\": \"+[redacted-phone]\", \"region\": \"ON\", \"email\": \"[redacted-email]\", \"password\": \"Aa1Fp2D6Nto4ggfAKJ\", \"leadDistributeConsentAgreement\": true }"
  - separator [ref=e11]
  - generic [ref=e12]:
    - text: "RESPONSE - (STATUS: 201 - Created) - Duration approx. 239ms"
    - generic [ref=e13]:
      - generic [ref=e14] [cursor=pointer]: BODY
      - generic [ref=e15]: "{ \"account\": { \"id\": 943570, \"rid\": \"245c8ff890d429548211a9914a791ce9943570\", \"role\": \"borrower\", \"email\": \"[redacted-email]\", \"disabled\": false, \"deleted\": false, \"created\": \"2026-09-24T06:54:38Z\", \"updated\": \"2026-09-24T06:54:38Z\", \"tenant\": { \"id\": 1, \"slug\": \"nesto\" }, \"firstName\": \"Fausto\", \"firstNameSpecified\": true, \"lastName\": \"<img src=x onerror=alert(1)>\", \"lastNameSpecified\": true, \"nickname\": \"\", \"nicknameSpecified\": false, \"phone\": \"+[redacted-phone]\", \"phoneSpecified\": true, \"phoneExtension\": \"\", \"phoneExtensionSpecified\": false, \"preferredLanguage\": \"\", \"preferredLanguageSpecified\": false, \"region\": \"ON\", \"regionSpecified\": true, \"externalAuthenticationProviderUserID\": \"\", \"externalAuthenticationProviderUserIDSpecified\": false, \"identityId\": \"[redacted-email]\", \"identityIdSpecified\": true, \"partner\": \"nesto\", \"partnerSpecified\": true, \"postalCode\": \"\", \"postalCodeSpecified\": false, \"dateOfBirth\": null, \"dateOfBirthSpecified\": false, \"loggedAtLeastOnce\": false, \"loggedAtLeastOnceSpecified\": false, \"lastLoggedInOn\": null, \"partnerAgreement\": false, \"partnerAgreementSpecified\": true, \"subPartnerId\": 0, \"subPartnerIdSpecified\": false, \"impressionsTrackingId\": \"\", \"impressionsTrackingIdSpecified\": false, \"ckTrackingId\": \"\", \"ckTrackingIdSpecified\": false, \"partialPostalCode\": \"\", \"partialPostalCodeSpecified\": false, \"socialLoginProviderSpecified\": false, \"socialLoginProvider\": \"\", \"socialLoginUserId\": \"\", \"leadDistributeConsentAgreement\": true, \"leadDistributeConsentAgreementSpecified\": true, \"leadDistributionPlatformPartnerID\": 0, \"emailMachineValidationStatusSpecified\": false, \"emailMachineValidationStatus\": \"\", \"sin\": \"\", \"isGuarantor\": false, \"advisorNumber\": \"\", \"address\": null, \"tenantReferralId\": \"\", \"prefersPaperCommunications\": false, \"isDigital\": true, \"isDigitalSpecified\": true, \"prefersPaperMail\": false, \"prefersPaperMailSpecified\": true, \"active\": false, \"activated\": \"1000-01-01T00:00:00Z\", \"createdAt\": \"UNKNOWN\" }, \"token\": { \"accessToken\": \"eyJhbGciOiJSUzI1NiIsImtpZCI6IjIwMTgwNzIzMTUwNzExXG4iLCJ0eXAiOiJKV1QifQ.eyJhdXQiOnRydWUsImV4cCI6MTc5MDIzMzQ3OCwianRpIjoiMzQ5NjIzYjY0MDllYjlhZDVlODljZmE3MzVjNDZmNzAiLCJyZXAiOnsiZW5hIjpmYWxzZX0sInJvbCI6ImJvcnJvd2VyIiwic3ViIjoiOTQzNTcwIiwidGlkIjoxfQ.ATj0F591gy28vc1EdFOgKTtBVpmM13cBj4b8-Wd1nN_WAQekjzhBkVkWtbdAFJgZC5It7XqwSXSASxx3W_vFZw-1hP-S2q0-r2hcXd--kykX3rBzzi6_oLm0JV2YfZPDJrvsoPFwXNi1PLV8i5dH-9rA4ArI5jdPiVci9H48k9Tyy2KCFpZ-DXrRlMJVlWAGg9GiYRmTQmEp2u6d-u3FmYhnzLrxttyxGIxoW6woGAE1GyYmCgjAeifRkUBX5TwJKGii4xa4va_8WqrX71t8rsIIaG7xuwqiR_Ha80mwAH8f4UQPjmEYHmED2o05UlQBPAgwUG-W3fHDMRAmJWhjpw\", \"tokenType\": \"Bearer\", \"expires\": \"2026-09-24T07:04:38Z\", \"refreshToken\": \"de5ad2d44d52d4f98ffd08e9f12bcb686b67447a476e113fdeb0ffa2edb6c77f\" } }"
      - generic [ref=e17] [cursor=pointer]: HEADERS
```

# Test source

```ts
  1  | import { expect } from "@playwright/test";
  2  | 
  3  | const sensitiveErrorDetails = [
  4  | 	/stack\s*trace/i,
  5  | 	/\bat\s+[\w$.<>]+\s*\([^\n)]*\)/,
  6  | 	/\b(?:exception|traceback|internal server error)\b/i,
  7  | 	/\b(?:password|secret|authorization|cookie)\s*[:=]/i,
  8  | ];
  9  | 
  10 | export async function expectSafeApiRejection(
  11 | 	response: { status(): number; text(): Promise<string> },
  12 | 	reflectedValues: string[] = [],
  13 | ): Promise<void> {
> 14 | 	expect(response.status()).toBeGreaterThanOrEqual(400);
     |                            ^ Error: expect(received).toBeGreaterThanOrEqual(expected)
  15 | 	expect(response.status()).toBeLessThan(500);
  16 | 
  17 | 	const body = await response.text();
  18 | 	for (const pattern of sensitiveErrorDetails) {
  19 | 		expect(body).not.toMatch(pattern);
  20 | 	}
  21 | 	for (const value of reflectedValues) {
  22 | 		expect(body).not.toContain(value);
  23 | 	}
  24 | }
  25 | 
```