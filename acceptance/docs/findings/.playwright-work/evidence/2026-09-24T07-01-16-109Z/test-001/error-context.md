# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\signup\api-02-reject-missing-or-invalid-required-field.spec.ts >> API-02: Reject missing or invalid required fields >> API-02: rejects an empty payload
- Location: specs\api\signup\api-02-reject-missing-or-invalid-required-field.spec.ts:18:2

# Error details

```
Error: expect(received).toBeLessThan(expected)

Expected: < 500
Received:   500
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
      - generic [ref=e9]: "{}"
  - separator [ref=e11]
  - generic [ref=e12]:
    - text: "RESPONSE - (STATUS: 500 - Internal Server Error) - Duration approx. 528ms"
    - generic [ref=e13]:
      - generic [ref=e14] [cursor=pointer]: BODY
      - generic [ref=e15]: "{ \"Status\": \"500 Internal Server Error\", \"StatusCode\": 500, \"Body\": \"Internal Server Error\\n\" }"
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
  14 | 	expect(response.status()).toBeGreaterThanOrEqual(400);
> 15 | 	expect(response.status()).toBeLessThan(500);
     |                            ^ Error: expect(received).toBeLessThan(expected)
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