# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\signup\api-02-reject-missing-or-invalid-required-field.spec.ts >> API-02: Reject missing or invalid required fields >> API-02: rejects password without uppercase
- Location: specs\api\signup\api-02-reject-missing-or-invalid-required-field.spec.ts:42:3

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
      - generic [ref=e9]: "{ \"firstName\": \"Dameon\", \"lastName\": \"Larson\", \"phone\": \"+[redacted-phone]\", \"region\": \"ON\", \"email\": \"[redacted-email]\", \"password\": \"aa1234567890\", \"leadDistributeConsentAgreement\": true }"
  - separator [ref=e11]
  - generic [ref=e12]:
    - text: "RESPONSE - (STATUS: 201 - Created) - Duration approx. 246ms"
    - generic [ref=e13]:
      - generic [ref=e14] [cursor=pointer]: BODY
      - generic [ref=e15]: "{ \"account\": { \"id\": 943567, \"rid\": \"2cb1742cc8ca13aff1f30aaa7ddd287b943567\", \"role\": \"borrower\", \"email\": \"[redacted-email]\", \"disabled\": false, \"deleted\": false, \"created\": \"2026-09-24T06:54:37Z\", \"updated\": \"2026-09-24T06:54:37Z\", \"tenant\": { \"id\": 1, \"slug\": \"nesto\" }, \"firstName\": \"Dameon\", \"firstNameSpecified\": true, \"lastName\": \"Larson\", \"lastNameSpecified\": true, \"nickname\": \"\", \"nicknameSpecified\": false, \"phone\": \"+[redacted-phone]\", \"phoneSpecified\": true, \"phoneExtension\": \"\", \"phoneExtensionSpecified\": false, \"preferredLanguage\": \"\", \"preferredLanguageSpecified\": false, \"region\": \"ON\", \"regionSpecified\": true, \"externalAuthenticationProviderUserID\": \"\", \"externalAuthenticationProviderUserIDSpecified\": false, \"identityId\": \"[redacted-email]\", \"identityIdSpecified\": true, \"partner\": \"nesto\", \"partnerSpecified\": true, \"postalCode\": \"\", \"postalCodeSpecified\": false, \"dateOfBirth\": null, \"dateOfBirthSpecified\": false, \"loggedAtLeastOnce\": false, \"loggedAtLeastOnceSpecified\": false, \"lastLoggedInOn\": null, \"partnerAgreement\": false, \"partnerAgreementSpecified\": true, \"subPartnerId\": 0, \"subPartnerIdSpecified\": false, \"impressionsTrackingId\": \"\", \"impressionsTrackingIdSpecified\": false, \"ckTrackingId\": \"\", \"ckTrackingIdSpecified\": false, \"partialPostalCode\": \"\", \"partialPostalCodeSpecified\": false, \"socialLoginProviderSpecified\": false, \"socialLoginProvider\": \"\", \"socialLoginUserId\": \"\", \"leadDistributeConsentAgreement\": true, \"leadDistributeConsentAgreementSpecified\": true, \"leadDistributionPlatformPartnerID\": 0, \"emailMachineValidationStatusSpecified\": false, \"emailMachineValidationStatus\": \"\", \"sin\": \"\", \"isGuarantor\": false, \"advisorNumber\": \"\", \"address\": null, \"tenantReferralId\": \"\", \"prefersPaperCommunications\": false, \"isDigital\": true, \"isDigitalSpecified\": true, \"prefersPaperMail\": false, \"prefersPaperMailSpecified\": true, \"active\": false, \"activated\": \"1000-01-01T00:00:00Z\", \"createdAt\": \"UNKNOWN\" }, \"token\": { \"accessToken\": \"eyJhbGciOiJSUzI1NiIsImtpZCI6IjIwMTgwNzIzMTUwNzExXG4iLCJ0eXAiOiJKV1QifQ.eyJhdXQiOnRydWUsImV4cCI6MTc5MDIzMzQ3NywianRpIjoiZGY1OWI1NWU4ZTQ5YWE2ODhiY2E0YzRkMmU1MTUwYTgiLCJyZXAiOnsiZW5hIjpmYWxzZX0sInJvbCI6ImJvcnJvd2VyIiwic3ViIjoiOTQzNTY3IiwidGlkIjoxfQ.HSiRVmAjzgdclIefYA_zTY37GLAz6PpBQ2_DWnG1UHeW-huLmlo7Vwps-Y470o_QXJz9azfd2rdqUjGYX6Tq3wMamC4MXhthMSX8qch6F_aWylX3ap5b1xNKGEAKTCarucVhdVAlq9GYUahE49AuJoFFTjnntyUE6PJaF9AhDQvOV2q8KPBU_aBv7IlLi44ED7abcMA5dWQlYCZ0jOWOM8n7S4nZcKeh08zyEVRj6Fm0tAc3BbbhaQZYjVcXAFQurAZ-Cl4m8vLO3EhICbU5d-Z_rZNSZFFi_fIOZMsFCmjOawRYuf0G4XWQKAWlRY_WXbsmM1S7Haho-BnAOud6OQ\", \"tokenType\": \"Bearer\", \"expires\": \"2026-09-24T07:04:37Z\", \"refreshToken\": \"615d890f30744eff3eb227a4b71b2160fbcbd71499798ad2185825a48e782005\" } }"
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