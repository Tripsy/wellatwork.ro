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

export type ContactFormFieldsType = {
	name: string;
	email: string;
	company?: string;
	message: string;
};

export type ContactSituationType = 'success' | 'error' | 'csrf_error' | null;

export type ContactStateType = {
	values: ContactFormFieldsType;
	errors: Partial<Record<keyof ContactFormFieldsType, string[]>>;
	message: string | null;
	situation: ContactSituationType;
};

export const ContactState: ContactStateType = {
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
