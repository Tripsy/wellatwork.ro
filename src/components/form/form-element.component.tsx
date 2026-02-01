import clsx from 'clsx';
import { type JSX, useMemo } from 'react';
import { ErrorIcon } from '@/components/error.component';
import { FormElementError } from '@/components/form/form-element-error.component';
import { FormPart } from '@/components/form/form-part.component';
import { LoadingIcon } from '@/components/loading.component';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from '@/hooks';

export const FormElement = ({
	children,
	labelText,
	labelFor,
	className,
}: {
	children: JSX.Element;
	className?: string;
	labelText?: string;
	labelFor?: string;
}): JSX.Element | null => (
	<div className={clsx('form-element', className)}>
		{labelText &&
			(labelFor ? (
				<Label htmlFor={labelFor}>{labelText}</Label>
			) : (
				<div>{labelText}</div>
			))}
		{children}
	</div>
);

export type OnChangeType = (
	e: React.ChangeEvent<
		HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
	>,
) => void;

export type FormComponentProps = {
	labelText: string;
	id: string;
	fieldType?: 'text' | 'password' | 'email' | 'number';
	fieldName: string;
	fieldValue: string;
	className?: string;
	placeholderText?: string;
	disabled: boolean;
	autoComplete?:
		| 'current-password'
		| 'new-password'
		| 'name'
		| 'email'
		| 'organization';
	onChange: OnChangeType;
	error?: string[];
};

export const FormComponentInput = ({
	labelText,
	id,
	fieldType = 'text',
	fieldName,
	fieldValue,
	className = 'h-12',
	placeholderText,
	disabled,
	autoComplete,
	onChange,
	error,
}: FormComponentProps) => (
	<FormPart>
		<FormElement labelText={labelText} labelFor={id}>
			<div>
				<Input
					type={fieldType}
					id={id}
					name={fieldName}
					value={fieldValue}
					className={className}
					placeholder={placeholderText}
					autoComplete={autoComplete}
					disabled={disabled}
					aria-invalid={!!error}
					onChange={onChange}
				/>
				<FormElementError messages={error} />
			</div>
		</FormElement>
	</FormPart>
);

export const FormComponentTextarea = ({
	labelText,
	id,
	fieldName,
	fieldValue,
	className = 'resize-none',
	placeholderText,
	disabled,
	autoComplete,
	onChange,
	error,
}: FormComponentProps) => (
	<FormPart>
		<FormElement labelText={labelText} labelFor={id}>
			<div>
				<Textarea
					id={id}
					name={fieldName}
					value={fieldValue}
					className={className}
					placeholder={placeholderText}
					autoComplete={autoComplete}
					disabled={disabled}
					aria-invalid={!!error}
					onChange={onChange}
					rows={6}
				/>
				<FormElementError messages={error} />
			</div>
		</FormElement>
	</FormPart>
);

export const FormComponentSubmit = ({
	pending,
	submitted,
	errors,
	buttonLabel,
	buttonIcon,
}: {
	pending: boolean;
	submitted: boolean;
	errors: Record<string, string[]>;
	buttonLabel: string;
	buttonIcon?: React.JSX.Element;
}) => {
	const translationsKeys = useMemo(
		() => ['app.text.please_wait'] as const,
		[],
	);

	const { translations } = useTranslation(translationsKeys);

	return (
		<FormPart>
			<Button
				type="submit"
				size="lg"
				className="w-full sm:w-auto cursor-pointer"
				disabled={
					pending || (submitted && Object.keys(errors).length > 0)
				}
				aria-busy={pending}
			>
				{pending ? (
					<span className="flex items-center gap-1.5">
						<LoadingIcon />
						{translations['app.text.please_wait']}
					</span>
				) : submitted && Object.keys(errors).length > 0 ? (
					<span className="flex items-center gap-1.5">
						<ErrorIcon />
						{buttonLabel}
					</span>
				) : (
					<span className="flex items-center gap-1.5">
						{buttonIcon} {buttonLabel}
					</span>
				)}
			</Button>
		</FormPart>
	);
};
