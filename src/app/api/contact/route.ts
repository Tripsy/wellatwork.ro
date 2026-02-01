import { type NextRequest, NextResponse } from 'next/server';
import { contactValidate } from '@/app/contact/contact.action';
import type { ContactFormInput } from '@/app/contact/contact.definition';
import { translate } from '@/config/lang';
import { Configuration } from '@/config/settings.config';
import { accumulateZodErrors } from '@/helpers/form.helper';
import { prepareEmailContent, sendEmail } from '@/services/email.service';
import type { EmailContent } from '@/types/template.type';

const ContactEmailContent: EmailContent = {
	subject: `Contact | ${Configuration.get('app.name')}`,
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
				errors: accumulateZodErrors<ContactFormInput>(validated.error),
			});
		}

		const emailContent: EmailContent = prepareEmailContent({
			language: Configuration.get('app.language') as string,
			content: ContactEmailContent,
			vars: values,
		});

		await sendEmail(
			emailContent,
			{
				address: Configuration.get('contact.email') as string,
				name: Configuration.get('app.name') as string,
			},
			{
				address: validated.data.email,
				name: validated.data.name,
			},
		);

		return NextResponse.json({
			...result,
			success: true,
			message: await translate('contact.message.success'),
		});
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : 'Eroare necunoscuta';

		console.error(`Failed to send email: ${errorMessage}`);

		return NextResponse.json({
			...result,
			message: await translate('contact.message.error'),
		});
	}
}

export const dynamic = 'force-dynamic'; // Ensure this route is never statically optimized
