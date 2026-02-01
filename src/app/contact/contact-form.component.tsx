'use client';
import { CheckCircle, CircleX, Send } from 'lucide-react';
import { useActionState } from 'react';
import { contactAction, contactValidate } from '@/app/contact/contact.action';
import {
	ContactDefaultState,
	type ContactFormInput,
} from '@/app/contact/contact.definition';
import { FormCsrf } from '@/components/form/form-csrf';
import {
	FormComponentInput,
	FormComponentSubmit,
	FormComponentTextarea,
} from '@/components/form/form-element.component';
import { FormError } from '@/components/form/form-error.component';
import { Configuration } from '@/config/settings.config';
import { useFormValidation, useFormValues } from '@/hooks';

export default function ContactForm() {
	const [state, action, pending] = useActionState(
		contactAction,
		ContactDefaultState,
	);

	const [formValues, setFormValues] = useFormValues<ContactFormInput>(
		state.values,
	);

	const { errors, submitted, markSubmit, markFieldAsTouched } =
		useFormValidation({
			formValues: formValues,
			validate: contactValidate,
			debounceDelay: 800,
		});

	const handleChange = (
		name: keyof ContactFormInput,
		value: string | boolean,
	) => {
		setFormValues((prev) => ({ ...prev, [name]: value }));
		markFieldAsTouched(name);
	};

	if (state?.situation === 'success') {
		return (
			<div className="form-section text-center py-12">
				<div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mx-auto">
					<CheckCircle className="w-8 h-8 text-primary" />
				</div>
				<h3>Mulțumim!</h3>
				<p>Mesajul tău a fost trimis; îți vom răspunde în curând.</p>
			</div>
		);
	}

	if (state?.situation === 'csrf_error') {
		return (
			<div className="form-section text-center py-12">
				<div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mx-auto">
					<CircleX className="w-8 h-8 text-error" />
				</div>
				<h3>Eroare!</h3>
				<p>{state.message}</p>
			</div>
		);
	}

	return (
		<>
			<h2 className="text-2xl mb-2">Trimite-ne un mesaj</h2>
			<p className="text-muted-foreground mb-8">
				Completează formularul de mai jos și te vom contacta cât mai
				curând posibil.
			</p>
			<form
				action={action}
				onSubmit={markSubmit}
				className="form-section"
			>
				<FormCsrf
					inputName={Configuration.get('csrf.inputName') as string}
				/>

				<div className="grid sm:grid-cols-2 gap-6">
					<FormComponentInput
						labelText="Nume *"
						id="name"
						fieldName="name"
						fieldValue={formValues.name ?? ''}
						autoComplete={'name'}
						placeholderText="Marin Razvan"
						disabled={pending}
						onChange={(e) => handleChange('name', e.target.value)}
						error={errors.name}
					/>

					<FormComponentInput
						labelText="Adresa de email *"
						id="email"
						fieldType="email"
						fieldName="email"
						fieldValue={formValues.email ?? ''}
						autoComplete={'email'}
						placeholderText="marin.razvan@companie.ro"
						disabled={pending}
						onChange={(e) => handleChange('email', e.target.value)}
						error={errors.email}
					/>
				</div>

				<FormComponentInput
					labelText="Numele companiei"
					id="company"
					fieldName="company"
					fieldValue={formValues.company ?? ''}
					autoComplete={'organization'}
					placeholderText="Compania Ta SRL"
					disabled={pending}
					onChange={(e) => handleChange('company', e.target.value)}
					error={errors.company}
				/>

				<FormComponentTextarea
					labelText="Mesaj *"
					id="message"
					fieldName="message"
					fieldValue={formValues.message ?? ''}
					placeholderText="Spune-ne despre compania ta și ce cauți"
					disabled={pending}
					onChange={(e) => handleChange('message', e.target.value)}
					error={errors.message}
				/>

				<FormComponentSubmit
					pending={pending}
					submitted={submitted}
					errors={errors}
					buttonLabel="Trimite mesaj"
					buttonIcon={<Send />}
				/>

				{state?.situation === 'error' && state.message && (
					<FormError message={state.message} />
				)}
			</form>
		</>
	);
}
