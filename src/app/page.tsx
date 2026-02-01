import {
	Armchair,
	ArrowRight,
	Building,
	Clock,
	GraduationCap,
	Heart,
	Shield,
	Smile,
	Sparkles,
	Timer,
	TrendingUp,
	Users,
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { translate } from '@/config/lang';
import Routes from '@/config/routes.setup';
import { Configuration } from '@/config/settings.config';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: await translate('home.meta.title', {
			app_name: Configuration.get('app.name') as string,
		}),
	};
}

const services = [
	{
		id: 'chairMassage',
		icon: Armchair,
		title: 'Masaj pe Scaun',
		description:
			'Sesiuni rapide și eficiente realizate pe un scaun de masaj specializat. Perfect pentru zilele aglomerate—fără uleiuri, fără dezbrăcare.',
	},
	{
		id: 'expressSession',
		icon: Timer,
		title: 'Sesiuni Express',
		description:
			'Sesiuni de 15-20 minute concentrate pe gât, umeri și spate. Relaxare maximă în timp minim.',
	},
	{
		id: 'workshops',
		icon: GraduationCap,
		title: 'Workshop-uri',
		description:
			'Workshop-uri educaționale despre ergonomie și postură, stretching și aliniere posturală pentru o sănătate mai bună la birou.',
	},
];

const benefits = [
	{
		id: 'wellness',
		icon: TrendingUp,
		title: 'Creșterea Productivității',
		description:
			'Studiile arată că masajul regulat reduce stresul și crește concentrarea, ducând la performanțe mai bune la locul de muncă.',
	},
	{
		id: 'relaxation',
		icon: Heart,
		title: 'Reducerea Stresului',
		description:
			'Combate tensiunea și anxietatea de la locul de muncă. Niveluri mai scăzute de cortizol înseamnă angajați mai fericiți și mai sănătoși.',
	},
	{
		id: 'wellbeing',
		icon: Smile,
		title: 'Îmbunătățirea Moralului',
		description:
			'Arătați echipei că vă pasă. Beneficiile de wellness cresc satisfacția la locul de muncă și retenția angajaților.',
	},
	{
		id: 'safety',
		icon: Shield,
		title: 'Prevenirea Accidentărilor',
		description:
			'Masajul regulat ajută la prevenirea leziunilor de efort repetitiv și reduce zilele de concediu medical.',
	},
];

export default function Page() {
	return (
		<>
			<section className="relative overflow-hidden">
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{
						backgroundImage: `url('/images/wellness-bg.jpg')`,
					}}
				>
					<div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
				</div>

				<div className="relative section-container py-24 md:py-32 lg:py-40">
					<div className="max-w-3xl">
						<div className="inline-flex items-center gap-2 bg-primary-light text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
							<Sparkles className="w-4 h-4" />
							<span>Soluții de Wellness Corporativ</span>
						</div>

						<h1 className="mb-6 animate-fade-in-up">
							Aducem Bunăstarea{' '}
							<span className="text-primary">Direct</span> la
							Locul Tău de Muncă
						</h1>

						<p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl animate-fade-in-up">
							Transformă biroul într-o oază de calm. Terapeuții
							noștri certificați vin la tine, ajutând echipa să se
							simtă revigorată, concentrată și apreciată.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up">
							<Button size="lg" asChild className="text-base">
								<Link href={Routes.get('contact')}>
									Programează o Consultație
									<ArrowRight className="w-4 h-4 ml-2" />
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>
			<section id="despre-noi" className="section-padding bg-background">
				<div className="section-container">
					<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
						<div>
							<span className="text-primary font-medium text-sm uppercase tracking-wider">
								Despre Noi
							</span>
							<h2 className="mt-3 mb-6">
								Dedicați Bunăstării la Locul de Muncă
							</h2>
							<p className="text-muted-foreground text-lg mb-6">
								La {Configuration.get('app.name')}, credem că
								bunăstarea angajaților este fundamentul unui loc
								de muncă prosper. Din 2015, aducem terapia de
								masaj profesională direct la birouri, ajutând
								companiile să investească în cel mai valoros
								activ al lor—oamenii.
							</p>
							<p className="text-muted-foreground mb-8">
								Terapeuții noștri certificați sunt instruiți să
								lucreze în medii de birou, oferind servicii
								discrete și profesionale care se integrează
								perfect în programul de lucru. Fie că este vorba
								de o zi de wellness lunară sau sesiuni
								săptămânale regulate, adaptăm abordarea la
								nevoile unice ale companiei tale.
							</p>
							<Button asChild>
								<Link href={Routes.get('contact')}>
									Începe Acum
									<ArrowRight className="w-4 h-4 ml-2" />
								</Link>
							</Button>
						</div>

						<div className="relative">
							<div className="wellness-card bg-wellness-sage-light/50 p-8 md:p-10">
								<div className="space-y-6">
									{[
										{
											id: '1',
											label: 'Licențiați și Asigurați',
											desc: 'Toți terapeuții sunt pe deplin certificați',
										},
										{
											id: '2',
											label: 'Program Flexibil',
											desc: 'Ne adaptăm la programul biroului tău',
										},
										{
											id: '3',
											label: 'Zero Configurare Necesară',
											desc: 'Aducem tot ce avem nevoie',
										},
									].map((item) => (
										<div
											key={item.id}
											className="flex items-start gap-4"
										>
											<div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
												<svg
													role="img"
													aria-label="Check"
													className="w-3 h-3 text-primary-foreground"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={3}
														d="M5 13l4 4L19 7"
													/>
												</svg>
											</div>
											<div>
												<p className="font-semibold text-foreground">
													{item.label}
												</p>
												<p className="text-sm text-muted-foreground">
													{item.desc}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section id="servicii" className="section-padding bg-muted/50">
				<div className="section-container">
					<div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
						<span className="text-primary font-medium text-sm uppercase tracking-wider">
							Serviciile Noastre
						</span>
						<h2 className="mt-3 mb-4">
							Opțiuni de Masaj pentru Orice Nevoie
						</h2>
						<p className="text-muted-foreground text-lg">
							De la sesiuni rapide de relaxare la experiențe
							complete de wellness, oferim opțiuni flexibile
							adaptate culturii locului tău de muncă.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-6 lg:gap-8">
						{services.map((service) => (
							<div
								key={service.id}
								className="wellness-card group"
							>
								<div className="icon-circle mb-6 group-hover:scale-110 transition-transform duration-300">
									<service.icon />
								</div>
								<h3 className="mb-3">{service.title}</h3>
								<p className="text-muted-foreground">
									{service.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section id="beneficii" className="section-padding bg-background">
				<div className="section-container">
					<div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
						<span className="text-primary font-medium text-sm uppercase tracking-wider">
							Beneficii
						</span>
						<h2 className="mt-3 mb-4">De Ce Ne Aleg Companiile</h2>
						<p className="text-muted-foreground text-lg">
							Investiția în bunăstarea angajaților nu este doar
							corectă—este și inteligentă din punct de vedere al
							afacerilor. Iată cum masajul la birou beneficiază
							organizația ta.
						</p>
					</div>

					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
						{benefits.map((benefit) => (
							<div key={benefit.id} className="text-center group">
								<div className="icon-circle mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
									<benefit.icon />
								</div>
								<h3 className="text-lg mb-2">
									{benefit.title}
								</h3>
								<p className="text-muted-foreground text-sm">
									{benefit.description}
								</p>
							</div>
						))}
					</div>

					<div className="mt-16 text-center">
						<div className="wellness-card inline-block bg-primary-light max-w-2xl">
							<h3 className="mb-3">
								Gata să Transformi Locul Tău de Muncă?
							</h3>
							<p className="text-muted-foreground mb-6">
								Alătură-te sutelor de companii care au făcut din
								bunăstarea angajaților o prioritate. Hai să
								discutăm cum putem ajuta echipa ta să prospere.
							</p>
							<Button asChild size="lg">
								<Link href={Routes.get('contact')}>
									Programează o Consultație Gratuită
									<ArrowRight className="w-4 h-4 ml-2" />
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>

			<section className="section-padding bg-muted/50">
				<div className="section-container">
					<div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
						<div className="flex items-center gap-3">
							<div className="icon-circle">
								<Building className="w-5 h-5" />
							</div>
							<div>
								<p className="font-semibold text-foreground text-xl">
									50+
								</p>
								<p className="text-sm text-muted-foreground">
									Companii inrolate
								</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<div className="icon-circle">
								<Clock className="w-5 h-5" />
							</div>
							<div>
								<p className="font-semibold text-foreground text-xl">
									3.000+
								</p>
								<p className="text-sm text-muted-foreground">
									Sesiuni livrate
								</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<div className="icon-circle">
								<Users className="w-5 h-5" />
							</div>
							<div>
								<p className="font-semibold text-foreground text-xl">
									4.000+
								</p>
								<p className="text-sm text-muted-foreground">
									Angajati multumiti
								</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<div className="icon-circle">
								<Heart className="w-5 h-5" />
							</div>
							<div>
								<p className="font-semibold text-foreground text-xl">
									98%
								</p>
								<p className="text-sm text-muted-foreground">
									Rată de satisfacție
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
