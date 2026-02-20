'use client';

import React, { useActionState } from 'react';
import { contactAction, contactValidate } from '@/app/contact/contact.action';
import {
	type ContactFormFieldsType,
	ContactState,
} from '@/app/contact/contact.definition';
import { FormCsrf } from '@/components/form/form-csrf';
import {
	FormComponentInput,
	FormComponentSubmit,
	FormComponentTextarea,
} from '@/components/form/form-element.component';
import { FormError } from '@/components/form/form-error.component';
import { FormWrapperComponent } from '@/components/form/form-wrapper';
import { Icons } from '@/components/icon.component';
import { SuccessContent } from '@/components/status.component';
import { createHandleChange } from '@/helpers/form.helper';
import { useElementIds, useFormValidation, useFormValues } from '@/hooks';

export default function ContactForm() {
	const [state, action, pending] = useActionState(
		contactAction,
		ContactState,
	);

	const [formValues, setFormValues] = useFormValues<ContactFormFieldsType>(
		state.values,
	);

	const { errors, submitted, markSubmit, markFieldAsTouched } =
		useFormValidation({
			formValues: formValues,
			validate: contactValidate,
			debounceDelay: 800,
		});

	const handleChange = createHandleChange(setFormValues, markFieldAsTouched);

	const elementIds = useElementIds(['name', 'email', 'company', 'message']);

	if (state.situation === 'csrf_error') {
		throw new Error(state.message as string);
	}

	if (state.situation === 'success') {
		return (
			<SuccessContent
				title="Mulțumim!"
				description="Mesajul tău a fost trimis; îți vom răspunde în curând."
			/>
		);
	}

	return (
		<FormWrapperComponent title="Trimite-ne un mesaj">
			<p className="text-muted-foreground mb-8">
				Completează formularul de mai jos și te vom contacta cât mai
				curând posibil.
			</p>
			<form
				action={action}
				onSubmit={markSubmit}
				className="form-section"
			>
				<FormCsrf />

				<div className="grid sm:grid-cols-2 gap-6">
					<FormComponentInput<ContactFormFieldsType>
						id={elementIds.name}
						labelText="Nume"
						fieldName="name"
						fieldValue={formValues.name}
						isRequired={true}
						className="pl-8"
						placeholderText="Marin Razvan"
						disabled={pending}
						onChange={(e) => handleChange('name', e.target.value)}
						error={errors.name}
						icons={{
							left: (
								<Icons.User className="opacity-40 h-4.5 w-4.5" />
							),
						}}
					/>

					<FormComponentInput<ContactFormFieldsType>
						id={elementIds.email}
						labelText="Adresa de email"
						fieldName="email"
						fieldValue={formValues.email}
						isRequired={true}
						className="pl-8"
						placeholderText="marin.razvan@companie.ro"
						disabled={pending}
						onChange={(e) => handleChange('email', e.target.value)}
						error={errors.email}
						icons={{
							left: (
								<Icons.Email className="opacity-40 h-4.5 w-4.5" />
							),
						}}
					/>
				</div>

				<FormComponentInput<ContactFormFieldsType>
					id={elementIds.company}
					labelText="Numele companiei"
					fieldName="company"
					fieldValue={formValues.company ?? ''}
					className="pl-8"
					placeholderText="Compania Ta SRL"
					disabled={pending}
					onChange={(e) => handleChange('company', e.target.value)}
					error={errors.company}
					icons={{
						left: (
							<Icons.Company className="opacity-40 h-4.5 w-4.5" />
						),
					}}
				/>

				<FormComponentTextarea<ContactFormFieldsType>
					id={elementIds.message}
					labelText="Mesaj"
					fieldName="message"
					fieldValue={formValues.message}
					isRequired={true}
					placeholderText="Spune-ne despre compania ta și ce anume iti doresti"
					disabled={pending}
					onChange={(e) => handleChange('message', e.target.value)}
					error={errors.message}
					rows={8}
				/>

				<FormComponentSubmit
					pending={pending}
					submitted={submitted}
					errors={errors}
					button={{
						label: 'Trimite mesaj',
						icon: Icons.Action.Send,
					}}
				/>

				{state.situation === 'error' && state.message && (
					<FormError>
						<React.Fragment key="error-content">
							<Icons.Status.Error />
							<div>{state.message}</div>
						</React.Fragment>
					</FormError>
				)}
			</form>
		</FormWrapperComponent>
	);
}
