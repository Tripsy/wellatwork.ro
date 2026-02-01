import { useCallback, useState } from 'react';
import type { ZodSafeParseError, ZodSafeParseSuccess } from 'zod';
import { accumulateZodErrors } from '@/helpers/form.helper';
import { useDebouncedEffect } from '@/hooks/use-debounced-effect.hook';

export type ValidationReturnType<K> =
	| ZodSafeParseSuccess<K>
	| ZodSafeParseError<K>;

interface UseFormValidationProps<K> {
	formValues: K;
	validate: (values: K) => ValidationReturnType<K>;
	debounceDelay?: number;
}

export function useFormValidation<T>({
	formValues,
	validate,
	debounceDelay = 800,
}: UseFormValidationProps<T>) {
	const [errors, setErrors] = useState<Partial<Record<keyof T, string[]>>>(
		{},
	);
	const [touchedFields, setTouchedFields] = useState<
		Partial<Record<keyof T, boolean>>
	>({});
	const [submitted, setSubmitted] = useState(false);

	const markFieldAsTouched = useCallback((field: keyof T) => {
		setTouchedFields((prev) =>
			prev[field] ? prev : { ...prev, [field]: true },
		);
	}, []);

	const markSubmit = useCallback(() => {
		setSubmitted(true);
	}, []);

	useDebouncedEffect(
		() => {
			const shouldValidate =
				submitted || Object.keys(touchedFields).length > 0;

			if (!shouldValidate) {
				return;
			}

			const result = validate(formValues);

			if (result.success) {
				setErrors({});
				return;
			}

			const allErrors = accumulateZodErrors<T>(result.error);

			if (submitted) {
				setErrors(allErrors);
				return;
			}

			const visibleErrors: Partial<Record<keyof T, string[]>> = {};

			for (const key of Object.keys(touchedFields) as (keyof T)[]) {
				if (touchedFields[key] && allErrors[key]) {
					visibleErrors[key] = allErrors[key];
				}
			}

			setErrors(visibleErrors);
		},
		[formValues, touchedFields, submitted, validate],
		debounceDelay,
	);

	return {
		errors,
		setErrors,
		touchedFields,
		markFieldAsTouched,
		submitted,
		markSubmit,
	};
}
