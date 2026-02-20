import type React from 'react';

type FormWrapperProps = {
	children: React.ReactNode;
	title: string;
};

export function FormWrapperComponent({ children, title }: FormWrapperProps) {
	return (
		<>
			<h2 className="text-2xl mb-2">{title}</h2>
			{children}
		</>
	);
}
