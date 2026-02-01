import clsx from 'clsx';
import type { JSX } from 'react';
import { ErrorIcon } from '@/components/error.component';
import { FormPart } from '@/components/form/form-part.component';

export const FormError = ({
	message,
	className,
}: {
	message: string;
	className?: string;
}): JSX.Element | null => (
	<FormPart>
		<div className={clsx('form-error', className)}>
			<ErrorIcon className="text-error" /> {message}
		</div>
	</FormPart>
);
