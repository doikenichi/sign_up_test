import { fakerEN_CA } from "@faker-js/faker";

export type Form01ValidFields = {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email: string;
	password: string;
};

export function createForm01ValidFields(): Form01ValidFields {
	// The 555-0100 through 555-0199 range is reserved for fictional NANP numbers.
	const fictionalLineNumber = fakerEN_CA.number
		.int({ min: 100, max: 199 })
		.toString()
		.padStart(4, "0");

	return {
		firstName: fakerEN_CA.person.firstName().replace(/[^A-Za-z]/g, ""),
		lastName: fakerEN_CA.person.lastName().replace(/[^A-Za-z]/g, ""),
		phoneNumber: `416555${fictionalLineNumber}`,
		email: `form01-${fakerEN_CA.string.uuid()}@example.com`,
		password: `Aa1${fakerEN_CA.string.alphanumeric({ length: 15 })}`,
	};
}
