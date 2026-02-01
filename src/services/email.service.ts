import nodemailer, { type Transporter } from 'nodemailer';
import type Mail from 'nodemailer/lib/mailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import { translate } from '@/config/lang';
import templates from '@/config/nunjucks.config';
import { Configuration } from '@/config/settings.config';
import { getErrorMessage } from '@/helpers/system.helper';
import type { EmailContent, EmailTemplate } from '@/types/template.type';

let emailTransporter: Transporter<SMTPTransport.SentMessageInfo> | null = null;

export function getEmailTransporter(): Transporter<SMTPTransport.SentMessageInfo> {
	if (!emailTransporter) {
		emailTransporter = nodemailer.createTransport({
			host: Configuration.get('mail.host'),
			port: Configuration.get('mail.port'),
			secure: Configuration.get('mail.encryption') === 'ssl',
			auth: {
				user: Configuration.get('mail.username'),
				pass: Configuration.get('mail.password'),
			},
		} as SMTPTransport.Options);
	}

	return emailTransporter;
}

export function prepareEmailContent(template: EmailTemplate): EmailContent {
	try {
		const emailSubject = templates.renderString(
			template.content.subject,
			template.vars || {},
		);
		const emailContent = templates.renderString(
			template.content.html,
			template.vars || {},
		);

		return {
			subject: emailSubject,
			// text: emailContent.text ? templates.renderString(emailContent.text, vars) : undefined,
			html: template.content.layout
				? templates.render(`emails/${template.content.layout}.html`, {
						language: template.language,
						emailSubject: emailSubject,
						emailContent: emailContent,
					})
				: emailContent,
		};
	} catch (error: unknown) {
		console.error(error);

		throw new Error('Template render error');
	}
}

export async function sendEmail(
	content: EmailContent,
	to: Mail.Address,
	from: Mail.Address,
): Promise<void> {
	try {
		await getEmailTransporter().sendMail({
			to: to,
			from: from,
			subject: content.subject,
			text: content.text,
			html: content.html,
		});

		console.debug(
			await translate('email.sent_success', {
				subject: content.subject,
				to: to.address,
			}),
		);
	} catch (error: unknown) {
		console.error(
			error,
			await translate('email.sent_error', {
				subject: content.subject,
				to: to.address,
				error: getErrorMessage(error),
			}),
		);

		// Re-throw the error so calling code can handle it too
		throw error;
	}
}
