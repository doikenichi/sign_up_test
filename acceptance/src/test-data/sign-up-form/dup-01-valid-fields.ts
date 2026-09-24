import { fakerEN_CA } from "@faker-js/faker";
import {
	createForm01ValidFields,
	type Form01ValidFields,
} from "./form-01-valid-fields.js";

/** Creates valid, isolated data for the two completed DUP-01 registrations. */
export function createDup01ValidFields(): Form01ValidFields {
	const randomMailbox = `${fakerEN_CA.string.alpha({ length: 10 }).toLowerCase()}${fakerEN_CA.string.uuid().replaceAll("-", "").slice(0, 12)}`;

	return {
		...createForm01ValidFields(),
		email: `${randomMailbox}@gmail.com`,
	};
}
