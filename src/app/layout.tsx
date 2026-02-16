import type { ReactNode } from 'react';
import '@/app/globals.css';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { getLanguage } from '@/config/translate.setup';

export default async function Layout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	const language = await getLanguage();

	return (
		<html lang={language}>
			<body>
				<div className="min-h-screen flex flex-col">
					<Header />
					<main className="flex-1 pt-16 md:pt-20">{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
