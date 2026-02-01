import { Mail, MapPin, Phone } from 'lucide-react';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import ContactForm from '@/app/contact/contact-form.component';
import { LoadingComponent } from '@/components/loading.component';
import { translate } from '@/config/lang';
import { Configuration } from '@/config/settings.config';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: await translate('contact.meta.title', {
			app_name: Configuration.get('app.name') as string,
		}),
	};
}

const Page = async () => {
	return (
		<>
			<section className="hero-gradient section-padding">
				<div className="section-container">
					<div className="text-center max-w-3xl mx-auto">
						<h1 className="mb-6">Contactează-ne</h1>
						<p className="text-lg md:text-xl text-muted-foreground">
							Ești gata să aduci bunăstarea la locul tău de muncă?
							Ne-ar plăcea să auzim de la tine. Hai să discutăm
							cum putem sprijini bunăstarea echipei tale.
						</p>
					</div>
				</div>
			</section>
			<section className="section-padding bg-background">
				<div className="section-container">
					<div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
						<div className="lg:col-span-3">
							<div className="wellness-card">
								<Suspense
									fallback={
										<LoadingComponent text="Te rugam sa astepti ..." />
									}
								>
									<ContactForm />
								</Suspense>
							</div>
						</div>

						<div className="lg:col-span-2">
							<div className="space-y-8">
								<div>
									<h3 className="text-xl font-semibold mb-6">
										Informații de Contact
									</h3>
									<div className="space-y-6">
										<div className="flex items-start gap-4">
											<div className="icon-circle flex-shrink-0">
												<Mail />
											</div>
											<div>
												<p className="font-medium text-foreground">
													Email
												</p>
												<a
													href="mailto:contact@serenitytouch.ro"
													className="text-muted-foreground hover:text-primary transition-colors"
												>
													contact@serenitytouch.ro
												</a>
											</div>
										</div>

										<div className="flex items-start gap-4">
											<div className="icon-circle flex-shrink-0">
												<Phone />
											</div>
											<div>
												<p className="font-medium text-foreground">
													Telefon
												</p>
												<a
													href="tel:+40123456789"
													className="text-muted-foreground hover:text-primary transition-colors"
												>
													+40 123 456 789
												</a>
											</div>
										</div>

										<div className="flex items-start gap-4">
											<div className="icon-circle flex-shrink-0">
												<MapPin />
											</div>
											<div>
												<p className="font-medium text-foreground">
													Zonă de Acoperire
												</p>
												<p className="text-muted-foreground">
													Deservim birouri în întreaga
													zonă metropolitană și
													regiunile învecinate.
												</p>
											</div>
										</div>
									</div>
								</div>

								<div className="wellness-card bg-primary-light">
									<h4 className="font-semibold text-foreground mb-3">
										La Ce Să Te Aștepți
									</h4>
									<ul className="space-y-3 text-sm text-muted-foreground">
										<li className="flex items-start gap-2">
											<span className="text-primary font-medium">
												1.
											</span>
											<span>
												Îți vom răspunde în 24 de ore
												pentru a discuta nevoile tale
											</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="text-primary font-medium">
												2.
											</span>
											<span>
												Programează un apel de
												consultanță gratuit
											</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="text-primary font-medium">
												3.
											</span>
											<span>
												Primește o propunere
												personalizată pentru locul tău
												de muncă
											</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="text-primary font-medium">
												4.
											</span>
											<span>
												Începe să aduci bunăstarea
												echipei tale!
											</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Page;
