import {
	type ContactFormFieldsType,
	ContactSchema,
	type ContactStateType,
} from '@/app/contact/contact.definition';
import { Configuration } from '@/config/settings.config';
import { translate } from '@/config/translate.setup';
import { accumulateZodErrors } from '@/helpers/form.helper';
import { isValidCsrfToken } from '@/helpers/session.helper';
import { contactProcess } from '@/services/contact.service';

export function contactFormValues(formData: FormData): ContactFormFieldsType {
	return {
		name: formData.get('name') as string,
		email: formData.get('email') as string,
		company: formData.get('company') as string,
		message: formData.get('message') as string,
	};
}

export function contactValidate(values: ContactFormFieldsType) {
	return ContactSchema.safeParse(values);
}

export async function contactAction(
	state: ContactStateType,
	formData: FormData,
): Promise<ContactStateType> {
	const values = contactFormValues(formData);
	const validated = contactValidate(values);

	const result: ContactStateType = {
		...state, // Spread existing state
		values, // Override with new values
		message: null,
		situation: null,
	};

	// Check CSRF token
	const csrfToken = formData.get(
		Configuration.get('csrf.inputName') as string,
	) as string;

	if (!(await isValidCsrfToken(csrfToken))) {
		return {
			...result,
			message: await translate('app.error.csrf'),
			situation: 'csrf_error',
		};
	}

	if (!validated.success) {
		return {
			...result,
			situation: 'error',
			errors: accumulateZodErrors<ContactFormFieldsType>(validated.error),
		};
	}

	try {
		const fetchResponse = await contactProcess(validated.data);

		return {
			...result,
			errors: {},
			message: fetchResponse?.message || '',
			situation: fetchResponse?.success ? 'success' : 'error',
		};
	} catch {
		return {
			...result,
			errors: {},
			message: await translate('app.error.form'),
			situation: 'error',
		};
	}
}
