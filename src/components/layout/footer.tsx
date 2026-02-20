import { Leaf, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import Routes from '@/config/routes.setup';
import { Configuration } from '@/config/settings.config';

export const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-muted border-t border-border">
			<div className="section-container py-12 md:py-16">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
					{/* Brand */}
					<div className="lg:col-span-1">
						<Link
							href={Routes.get('home')}
							className="flex items-center gap-2 text-xl font-semibold text-foreground mb-4"
						>
							<div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
								<Leaf className="w-5 h-5 text-primary-foreground" />
							</div>
							<span>{Configuration.get('app.name')}</span>
						</Link>
						<p className="text-muted-foreground text-sm leading-relaxed">
							Aducem sănătatea și confortul direct în biroul tău.
							Transformă spațiul de lucru într-o oază de
							echilibru.
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h4 className="font-semibold text-foreground mb-4">
							Linkuri Rapide
						</h4>
						<ul className="space-y-3">
							{[
								{ name: 'Acasă', path: '/' },
								{ name: 'Resurse', path: '/resources' },
								{ name: 'Contact', path: '/contact' },
								{ name: 'Termeni și Condiții', path: '/terms' },
							].map((link) => (
								<li key={link.path}>
									<Link
										href={link.path}
										className="text-muted-foreground hover:text-primary transition-colors text-sm"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Services */}
					<div>
						<h4 className="font-semibold text-foreground mb-4">
							Servicii
						</h4>
						<ul className="space-y-3">
							{[
								'Masaj pe scaun',
								'Evaluare posturală',
								'Workshop-uri',
								'Sesiuni ghidate de stretching\n',
							].map((service) => (
								<li key={service}>
									<span className="text-muted-foreground text-sm">
										{service}
									</span>
								</li>
							))}
						</ul>
					</div>

					{/* Contact */}
					<div>
						<h4 className="font-semibold text-foreground mb-4">
							Contactează-ne
						</h4>
						<ul className="space-y-3">
							<li className="flex items-center gap-3 text-muted-foreground text-sm">
								<Mail className="w-4 h-4 text-primary flex-shrink-0" />
								<span>office@s-life.ro</span>
							</li>
							<li className="flex items-center gap-3 text-muted-foreground text-sm">
								<Phone className="w-4 h-4 text-primary flex-shrink-0" />
								<span>+40 773 740 744</span>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
					<p className="text-muted-foreground text-sm">
						© {currentYear} {Configuration.get('app.name')}. Toate
						drepturile rezervate.
					</p>
					<div className="flex items-center gap-6">
						<Link
							href={`${Routes.get('terms')}#privacy-policy`}
							className="text-muted-foreground hover:text-primary text-sm transition-colors"
						>
							Politica de Confidențialitate
						</Link>
						<Link
							href={Routes.get('terms')}
							className="text-muted-foreground hover:text-primary text-sm transition-colors"
						>
							Termeni și Condiții
						</Link>
					</div>
				</div>
				<div className="mt-8 text-muted-foreground text-sm font-bold">
					<p>
						Conceptul "{Configuration.get('app.name')}" este un
						serviciu oferit de Amalfi Consulting,{' '}
						<Link
							href={`${Routes.get('unitate-protejata')}`}
							className="text-muted-foreground underline cursor-pointer hover:text-primary text-sm transition-colors"
						>
							{' '}
							Unitate Protejată Autorizată
						</Link>{' '}
						conform Legii nr. 448/2006 privind protecția și
						promovarea drepturilor persoanelor cu handicap.
					</p>
				</div>
			</div>
		</footer>
	);
};
