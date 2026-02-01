export type EmailContent = {
	subject: string;
	text?: string;
	html: string;
	layout?: string;
};

export type TemplateVars = Record<
	string,
	string | number | boolean | string[] | Record<string, string>
>;

export type EmailTemplate = {
	language: string;
	content: EmailContent;
	vars?: TemplateVars;
};
