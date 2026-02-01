import clsx from 'clsx';
import { CircleX } from 'lucide-react';
import Link from 'next/link';
import type { JSX } from 'react';
import Routes from '@/config/routes.setup';

type ErrorProps = {
	text: string;
	className?: string;
};

export const ErrorIcon = ({
	className,
}: {
	className?: string;
}): JSX.Element => <CircleX className={clsx('inline-block', className)} />;

export function ErrorComponent({
	text,
	className = 'flex min-h-screen items-center justify-center bg-muted',
}: ErrorProps) {
	return (
		<div className={className}>
			<div className="text-center">
				<h1 className="mb-4 text-4xl font-bold flex items-center gap-2">
					<ErrorIcon className="w-10 h-10" />
					Eroare
				</h1>
				<p className="mb-4 text-xl text-muted-foreground">{text}</p>
				<Link
					href={Routes.get('home')}
					className="text-primary underline hover:text-primary/90"
				>
					Mergi la pagina de start
				</Link>
			</div>
		</div>
	);
}
