import { createDup01ValidFields } from "../sign-up-form/dup-01-valid-fields.js";
import type { Form01ValidFields } from "../sign-up-form/form-01-valid-fields.js";

export type SignUpPayload = Record<string, unknown>;

export type InvalidPayloadCase = {
	name: string;
	field?: string;
	value?: unknown;
	reflectedValue?: string;
	tags?: string[];
};

export function createValidSignUpPayload(): SignUpPayload {
	const fields: Form01ValidFields = createDup01ValidFields();
	return {
		firstName: fields.firstName,
		lastName: fields.lastName,
		phone: `+1${fields.phoneNumber}`,
		region: "ON",
		email: fields.email,
		password: fields.password,
		leadDistributeConsentAgreement: true,
	};
}

export const api02InvalidCases: InvalidPayloadCase[] = [
	{ name: "missing firstName", field: "firstName", tags: ["@SEC-06"] },
	{ name: "missing lastName", field: "lastName", tags: ["@SEC-06"] },
	{ name: "missing phone", field: "phone", tags: ["@SEC-05"] },
	{ name: "missing region", field: "region", tags: ["@SEC-05"] },
	{ name: "missing email", field: "email", tags: ["@SEC-02"] },
	{ name: "missing password", field: "password", tags: ["@SEC-03"] },
	{
		name: "missing consent",
		field: "leadDistributeConsentAgreement",
		tags: ["@SEC-08"],
	},
	{
		name: "malformed email without domain",
		field: "email",
		value: "name",
		tags: ["@SEC-02"],
	},
	{
		name: "malformed email without local part",
		field: "email",
		value: "@example.com",
		tags: ["@SEC-02"],
	},
	{
		name: "email with embedded whitespace",
		field: "email",
		value: "name @example.com",
		tags: ["@SEC-02"],
	},
	{
		name: "email with surrounding whitespace",
		field: "email",
		value: " name@example.com ",
		tags: ["@SEC-02"],
	},
	{
		name: "password length 11",
		field: "password",
		value: "Aa1abcdefgh",
		tags: ["@SEC-03", "@SEC-07"],
	},
	{
		name: "password length 33",
		field: "password",
		value: "Aa1abcdefgh12345678901234567890",
		tags: ["@SEC-03", "@SEC-07"],
	},
	{
		name: "password without uppercase",
		field: "password",
		value: "aa1234567890",
		tags: ["@SEC-03"],
	},
	{
		name: "password without lowercase",
		field: "password",
		value: "AA1234567890",
		tags: ["@SEC-03"],
	},
	{
		name: "password without number",
		field: "password",
		value: "Aaabcdefghij",
		tags: ["@SEC-03"],
	},
	{
		name: "invalid phone",
		field: "phone",
		value: "not-a-phone",
		tags: ["@SEC-05"],
	},
	{
		name: "incomplete phone",
		field: "phone",
		value: "+1416",
		tags: ["@SEC-05"],
	},
	{
		name: "phone with letters",
		field: "phone",
		value: "+1416abc5550100",
		tags: ["@SEC-05"],
	},
	{
		name: "whitespace-only first name",
		field: "firstName",
		value: "   ",
		tags: ["@SEC-06"],
	},
	{
		name: "control character in first name",
		field: "firstName",
		value: "Jane\u0000",
		tags: ["@SEC-06"],
	},
];

export const api03InvalidCases: InvalidPayloadCase[] = [
	{ name: "null firstName", field: "firstName", value: null },
	{ name: "numeric firstName", field: "firstName", value: 42 },
	{
		name: "object email",
		field: "email",
		value: { address: "name@example.com" },
	},
	{ name: "array phone", field: "phone", value: ["+14165550100"] },
	{
		name: "control character in lastName",
		field: "lastName",
		value: "Doe\u0000",
	},
	{
		name: "script markup in firstName",
		field: "firstName",
		value: "<script>alert(1)</script>",
		reflectedValue: "<script>alert(1)</script>",
	},
	{
		name: "markup in lastName",
		field: "lastName",
		value: "<img src=x onerror=alert(1)>",
		reflectedValue: "<img src=x onerror=alert(1)>",
	},
	{ name: "oversized firstName", field: "firstName", value: "x".repeat(4096) },
	{
		name: "oversized email",
		field: "email",
		value: `${"x".repeat(2048)}@example.com`,
	},
];

export function createInvalidPayload(
	testCase: InvalidPayloadCase,
): SignUpPayload {
	const payload = createValidSignUpPayload();
	if (testCase.field) {
		if (testCase.value === undefined) {
			delete payload[testCase.field];
		} else {
			payload[testCase.field] = testCase.value;
		}
	}
	return payload;
}
