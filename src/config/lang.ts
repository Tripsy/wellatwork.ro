import { Configuration } from '@/config/settings.config';
import { getObjectValue } from '@/helpers/objects.helper';
import { replaceVars } from '@/helpers/string.helper';

type TranslationValue = string | { [key: string]: TranslationValue };
type TranslationResource = Record<string, TranslationValue>;

const languageResources: Record<string, TranslationResource> = {};

export async function getLanguage(): Promise<string> {
	return Configuration.get('app.language') as string;
}

async function loadLanguageResource(
	language: string,
): Promise<TranslationResource> {
	if (languageResources[language]) {
		return languageResources[language];
	}

	languageResources[language] = (
		await import(`@/locales/${language}`)
	).default;

	return languageResources[language];
}

/**
 * Utility function used to get the translated string from the resource.
 * Always returns `string` (Note: if the returned object value is not string, it returns the key)
 */
export const getTranslatedString = (
	resource: TranslationResource,
	key: string,
) => {
	const objectValue = getObjectValue(resource, key);

	return typeof objectValue === 'string' ? objectValue : key;
};

/**
 * Translate a key with optional replacements.
 * The key should be in the format `namespace.key`.
 */
export const translate = async (
	key: string,
	replacements: Record<string, string> = {},
): Promise<string> => {
	const languageSelected = await getLanguage();
	const languageResource = await loadLanguageResource(languageSelected);

	const value = getTranslatedString(languageResource, key);

	if (value !== key && replacements) {
		return replaceVars(value, replacements);
	}

	return value;
};

/**
 * Translate multiple keys with optional replacements.
 *
 * @example translateBatch([
 *     { key: "user.create" },
 *     { key: "user.edit", vars: { "user.id": 1 } },
 *     { key: "user.delete" }
 * ])
 */
export const translateBatch = async (
	requests: (
		| string
		| {
				key: string;
				vars?: Record<string, string>;
		  }
	)[],
): Promise<Record<string, string>> => {
	const language = await getLanguage();
	const resource = await loadLanguageResource(language);

	const result: Record<string, string> = {};

	for (const request of requests) {
		if (typeof request === 'string') {
			result[request] = getTranslatedString(resource, request);
		} else {
			const value = getTranslatedString(resource, request.key);

			if (request.vars) {
				result[request.key] = replaceVars(value, request.vars);
			} else {
				result[request.key] = value;
			}
		}
	}

	return result;
};
