import { type NextRequest, NextResponse } from 'next/server';
import { contactValidate } from '@/app/contact/contact.action';
import type { ContactFormFieldsType } from '@/app/contact/contact.definition';
import { Configuration } from '@/config/settings.config';
import { translate } from '@/config/translate.setup';
import { accumulateZodErrors } from '@/helpers/form.helper';
import {
	getEmailService,
	prepareEmailContent,
} from '@/services/email/email.service';
import type { EmailAddressType, EmailContent } from '@/types/email.type';

const ContactEmailContent: EmailContent = {
	subject: `Contact | ${Configuration.get('app.name')}`,
	text: `
        Name: {{ name }}
        Email: {{ email }}
        Company: {{ company }}
        
        Message:
        {{ message }}
    `.trim(),
	html: `
            <p>Name: {{ name }}</p>
            <p>Email: {{ email }}</p>
            <p>Company: {{ company }}</p>
            <p>Message:</p>
            <p>
                {{ message }}
            </p>
        `,
	layout: 'layout-default',
};

export async function POST(request: NextRequest) {
	const result = {
		success: false,
		errors: {},
		message: '',
	};

	try {
		const values = await request.json();

		const validated = contactValidate(values);

		if (!validated.success) {
			return NextResponse.json({
				...result,
				message: await translate('contact.message.error'),
				errors: accumulateZodErrors<ContactFormFieldsType>(
					validated.error,
				),
			});
		}

		const emailContent: EmailContent = prepareEmailContent({
			language: Configuration.get('app.language') as string,
			content: ContactEmailContent,
			vars: values,
		});

		const emailService = getEmailService();

		await emailService
			.sendEmail(
				emailContent,
				Configuration.get('mail.from') as EmailAddressType,
				{
					address: Configuration.get('contact.email') as string,
					name: Configuration.get('app.name') as string,
				},
				{
					address: validated.data.email,
					name: validated.data.name,
				},
			)
			.catch((error) => {
				throw error;
			});

		return NextResponse.json({
			...result,
			success: true,
			message: await translate('contact.message.success'),
		});
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : 'Unknown error';

		console.error(`Failed to send email: ${errorMessage}`);

		return NextResponse.json({
			...result,
			message: await translate('contact.message.error'),
		});
	}
}

export const dynamic = 'force-dynamic'; // Ensure this route is never statically optimized
