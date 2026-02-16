import { z } from 'zod';
import { translateBatch } from '@/config/translate.setup';

const translations = await translateBatch([
	'contact.validation.name_invalid',
	'contact.validation.email_invalid',
	'contact.validation.message_invalid',
]);

export const ContactSchema = z.object({
	name: z
		.string()
		.nonempty({
			message: translations['contact.validation.name_invalid'],
		})
		.trim(),
	email: z
		.email({
			message: translations['contact.validation.email_invalid'],
		})
		.trim(),
	company: z.string().trim().optional(),
	message: z
		.string()
		.nonempty({
			message: translations['contact.validation.message_invalid'],
		})
		.trim(),
});

export type ContactFormInput = z.input<typeof ContactSchema>;

export type ContactSituation = 'success' | 'error' | 'csrf_error' | null;

export type ContactState = {
	values: ContactFormInput;
	errors: Partial<Record<keyof ContactFormInput, string[]>>;
	message: string | null;
	situation: ContactSituation;
};

export const ContactDefaultState: ContactState = {
	values: {
		name: '',
		email: '',
		company: '',
		message: '',
	},
	errors: {},
	message: null,
	situation: null,
};
