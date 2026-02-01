'use client';

import { Leaf, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import Routes from '@/config/routes.setup';
import { Configuration } from '@/config/settings.config';
import { toKebabCase } from '@/helpers/string.helper';

const navLinks = [
	{ name: 'Despre Noi', path: Routes.get('home'), hash: 'despre-noi' },
	{ name: 'Servicii', path: Routes.get('home'), hash: 'servicii' },
	{ name: 'Beneficii', path: Routes.get('home'), hash: 'beneficii' },
	{ name: 'Resurse', path: Routes.get('resources') },
	{ name: 'Contact', path: Routes.get('contact') },
];

export const Header = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const pathname = usePathname();
	const homePath = Routes.get('home');
	const [activeHash, setActiveHash] = useState('');
	const observerRef = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		if (pathname !== homePath) {
			if (activeHash) {
				setActiveHash('');
			}

			return;
		}

		// Disconnect existing observer
		if (observerRef.current) {
			observerRef.current.disconnect();
		}

		observerRef.current = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveHash(entry.target.id);
					}
				});
			},
			{ rootMargin: '-20% 0% -70% 0%' },
		);

		// Observe all target elements
		const observer = observerRef.current;

		navLinks.forEach((d) => {
			const element = document.querySelector(`#${d.hash}`);

			if (element) {
				observer.observe(element);
			}
		});

		// Add delay to ensure DOM is ready
		setTimeout(() => {
			navLinks.forEach((d) => {
				const element = document.querySelector(`#${d.hash}`);

				if (element) {
					observer.observe(element);
				}
			});
		}, 100);

		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, [pathname, homePath, activeHash]);

	const isActive = (path: string, hash?: string) => {
		if (pathname !== path) {
			return false;
		}

		if (hash) {
			return activeHash === hash;
		}

		return true;
	};

	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
			<div className="section-container">
				<div className="flex items-center justify-between h-16 md:h-20">
					{/* Logo */}
					<Link
						href="/"
						className="flex items-center gap-2 text-xl font-semibold text-foreground hover:text-primary transition-colors"
					>
						<div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
							<Leaf className="w-5 h-5 text-primary-foreground" />
						</div>
						<span>{Configuration.get('app.name')}</span>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center gap-1">
						{navLinks.map((link) => (
							<Link
								key={toKebabCase(link.name)}
								href={{
									pathname: link.path,
									hash: link.hash,
								}}
								className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
									isActive(link.path, link.hash)
										? 'bg-primary-light text-primary'
										: 'text-muted-foreground hover:text-foreground hover:bg-muted'
								}`}
							>
								{link.name}
							</Link>
						))}
					</nav>

					{/* CTA Button - Desktop */}
					<div className="hidden md:block">
						<Button asChild>
							<Link href="/contact">Rezervă o Sesiune</Link>
						</Button>
					</div>

					{/* Mobile Menu Toggle */}
					<button
						type="button"
						className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
						onClick={() => setIsMobileMenuOpen((prev) => !prev)}
						aria-label="Comută meniul"
					>
						{isMobileMenuOpen ? (
							<X className="w-6 h-6 text-foreground" />
						) : (
							<Menu className="w-6 h-6 text-foreground" />
						)}
					</button>
				</div>

				{/* Mobile Menu */}
				{isMobileMenuOpen && (
					<div className="md:hidden py-4 border-t border-border animate-fade-in">
						<nav className="flex flex-col gap-1">
							{navLinks.map((link) => (
								<Link
									key={toKebabCase(link.name)}
									href={{
										pathname: link.path,
										hash: link.hash,
									}}
									onClick={() => setIsMobileMenuOpen(false)}
									className={`px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
										isActive(link.path, link.hash)
											? 'bg-primary-light text-primary'
											: 'text-muted-foreground hover:text-foreground hover:bg-muted'
									}`}
								>
									{link.name}
								</Link>
							))}

							<div className="pt-4 px-4">
								<Button asChild className="w-full">
									<Link
										href="/contact"
										onClick={() =>
											setIsMobileMenuOpen(false)
										}
									>
										Rezervă o Sesiune
									</Link>
								</Button>
							</div>
						</nav>
					</div>
				)}
			</div>
		</header>
	);
};
