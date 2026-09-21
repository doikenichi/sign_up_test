import { enCA } from "./en-CA.js";
import { frCA } from "./fr-CA.js";
import type {
	LocaleContent,
	SupportedLocale,
} from "./types.js";

const locales = {
	"en-CA": enCA,
	"fr-CA": frCA,
} satisfies Record<SupportedLocale, LocaleContent>;

export function getLocaleContent(locale: string | undefined): LocaleContent {
	if (locale !== "en-CA" && locale !== "fr-CA") {
		throw new Error(`Unsupported test locale: ${locale}`);
	}

	return locales[locale];
}
