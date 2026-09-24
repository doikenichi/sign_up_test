import { fakerEN_CA } from "@faker-js/faker";
import {
	createForm01ValidFields,
	type Form01ValidFields,
} from "./form-01-valid-fields.js";

export function createForm02ValidFields(
	projectName: string,
): Form01ValidFields {
	return {
		...createForm01ValidFields(),
		// A new UUID is generated for every invocation, including Playwright retries.
		email: `form02-${projectName}-${fakerEN_CA.string.uuid()}@gmail.com`,
	};
}
