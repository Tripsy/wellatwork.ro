import clsx from 'clsx';
import type { JSX } from 'react';

type LoadingProps = {
	text: string;
	className?: string;
};

export const LoadingIcon = ({
	className,
}: {
	className?: string;
}): JSX.Element => (
	<span
		className={clsx(
			'inline-block animate-spin rounded-full border-4 border-current border-t-transparent mr-2',
			className,
		)}
	/>
);

export function LoadingComponent({
	text,
	className = 'flex min-h-screen items-center justify-center bg-muted',
}: LoadingProps) {
	return (
		<div className={className}>
			<div className="text-center">
				<h1 className="mb-4 text-4xl font-bold">
					<LoadingIcon className="h-6 w-6" />
					{text}
				</h1>
			</div>
		</div>
	);
}
