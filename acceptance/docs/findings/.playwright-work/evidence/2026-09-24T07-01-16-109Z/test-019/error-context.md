# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\signup\api-03-reject-malformed-or-unsupported-values.spec.ts >> API-03: Reject malformed or unsupported values >> API-03: rejects script markup in firstName
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
      - generic [ref=e9]: "{ \"firstName\": \"<script>alert(1)</script>\", \"lastName\": \"Farrell\", \"phone\": \"+[redacted-phone]\", \"region\": \"ON\", \"email\": \"[redacted-email]\", \"password\": \"Aa1svDeLbNoKuDJcGx\", \"leadDistributeConsentAgreement\": true }"
  - separator [ref=e11]
  - generic [ref=e12]:
    - text: "RESPONSE - (STATUS: 201 - Created) - Duration approx. 242ms"
    - generic [ref=e13]:
      - generic [ref=e14] [cursor=pointer]: BODY
      - generic [ref=e15]: "{ \"account\": { \"id\": 943577, \"rid\": \"e8739913b5651e0990a3458fd5d100c7943577\", \"role\": \"borrower\", \"email\": \"[redacted-email]\", \"disabled\": false, \"deleted\": false, \"created\": \"2026-09-24T06:54:39Z\", \"updated\": \"2026-09-24T06:54:39Z\", \"tenant\": { \"id\": 1, \"slug\": \"nesto\" }, \"firstName\": \"<script>alert(1)</script>\", \"firstNameSpecified\": true, \"lastName\": \"Farrell\", \"lastNameSpecified\": true, \"nickname\": \"\", \"nicknameSpecified\": false, \"phone\": \"+[redacted-phone]\", \"phoneSpecified\": true, \"phoneExtension\": \"\", \"phoneExtensionSpecified\": false, \"preferredLanguage\": \"\", \"preferredLanguageSpecified\": false, \"region\": \"ON\", \"regionSpecified\": true, \"externalAuthenticationProviderUserID\": \"\", \"externalAuthenticationProviderUserIDSpecified\": false, \"identityId\": \"[redacted-email]\", \"identityIdSpecified\": true, \"partner\": \"nesto\", \"partnerSpecified\": true, \"postalCode\": \"\", \"postalCodeSpecified\": false, \"dateOfBirth\": null, \"dateOfBirthSpecified\": false, \"loggedAtLeastOnce\": false, \"loggedAtLeastOnceSpecified\": false, \"lastLoggedInOn\": null, \"partnerAgreement\": false, \"partnerAgreementSpecified\": true, \"subPartnerId\": 0, \"subPartnerIdSpecified\": false, \"impressionsTrackingId\": \"\", \"impressionsTrackingIdSpecified\": false, \"ckTrackingId\": \"\", \"ckTrackingIdSpecified\": false, \"partialPostalCode\": \"\", \"partialPostalCodeSpecified\": false, \"socialLoginProviderSpecified\": false, \"socialLoginProvider\": \"\", \"socialLoginUserId\": \"\", \"leadDistributeConsentAgreement\": true, \"leadDistributeConsentAgreementSpecified\": true, \"leadDistributionPlatformPartnerID\": 0, \"emailMachineValidationStatusSpecified\": false, \"emailMachineValidationStatus\": \"\", \"sin\": \"\", \"isGuarantor\": false, \"advisorNumber\": \"\", \"address\": null, \"tenantReferralId\": \"\", \"prefersPaperCommunications\": false, \"isDigital\": true, \"isDigitalSpecified\": true, \"prefersPaperMail\": false, \"prefersPaperMailSpecified\": true, \"active\": false, \"activated\": \"1000-01-01T00:00:00Z\", \"createdAt\": \"UNKNOWN\" }, \"token\": { \"accessToken\": \"eyJhbGciOiJSUzI1NiIsImtpZCI6IjIwMTgwNzIzMTUwNzExXG4iLCJ0eXAiOiJKV1QifQ.eyJhdXQiOnRydWUsImV4cCI6MTc5MDIzMzQ3OSwianRpIjoiY2M3MjFmMjNlMDBjMzg5ZmNmZjMzNDVlNzg2YWU1MWMiLCJyZXAiOnsiZW5hIjpmYWxzZX0sInJvbCI6ImJvcnJvd2VyIiwic3ViIjoiOTQzNTc3IiwidGlkIjoxfQ.WNcDWbsd11ybce2n0TZ_5660KOKkhsLuMhKwh-7hj3vxugNEJPK48AOHVeE13w0D9XLS2rZbL1naZu_vDk-3uO3xG5JgY9qg17Zyv6uK4ZG8E_FMqo05SC7DrheT-9czF0FWCIOVf-WxLQMZGt-C7qApv4OpZoK9WHzvpR1zdOEb0KOryQGjQ9LTheRyd4U9EJgym2w-F4y5TkNjnWZGlNRsEILEnSDaALkC9RkqusdetJUp51Bqdinu_VLzpq7NuvPOdSevDYeLuP122kODjrL7ePS4IvT1HH9MTLydUH6pJ1zqMxG8WzWb8Vx-c-0lYgWu3OtDcYbeFUQDFiYjNg\", \"tokenType\": \"Bearer\", \"expires\": \"2026-09-24T07:04:39Z\", \"refreshToken\": \"b77a9fe84983caa742bf4743468657e624f1b446520c609988e60752b8aba807\" } }"
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