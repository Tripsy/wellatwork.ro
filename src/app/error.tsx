'use client';

import { useEffect } from 'react';
import { ErrorComponent } from '@/components/error.component';

export default function ErrorBoundary({ error }: { error: Error }) {
	useEffect(() => {
		console.error('Error:', error);
	}, [error]);

	return <ErrorComponent text={error.message} />;
}
