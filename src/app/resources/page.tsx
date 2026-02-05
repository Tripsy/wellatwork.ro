import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
// import Image from 'next/image';
import Link from 'next/link';
import { translate } from '@/config/lang';
import { Configuration } from '@/config/settings.config';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: await translate('resources.meta.title', {
			app_name: Configuration.get('app.name') as string,
		}),
	};
}

const articles = [
	{
		id: 'gestionarea-stresului-la-birou',
		title: '5 Strategii Eficiente pentru Gestionarea Stresului la Birou',
		description:
			'Descoperă tehnici dovedite pentru a ajuta angajații să facă față presiunilor zilnice de la locul de muncă și să mențină performanța maximă.',
		image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=600&h=400&fit=crop',
	},
	{
		id: 'beneficiile-masajului-pe-scaun',
		title: 'Știința din Spatele Beneficiilor Masajului pe Scaun',
		description:
			'Află cum doar 15 minute de masaj pe scaun pot reduce semnificativ nivelurile de cortizol și pot crește productivitatea angajaților.',
		image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop',
	},
	{
		id: 'roi-programe-wellness',
		title: 'Calcularea ROI-ului Programelor de Wellness Corporativ',
		description:
			'Un ghid complet pentru măsurarea randamentelor financiare și culturale ale investiției în inițiativele de bunăstare a angajaților.',
		image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
	},
	{
		id: 'ergonomie-si-masaj',
		title: 'Cum Terapia prin Masaj Completează Ergonomia la Birou',
		description:
			'Înțelege sinergia dintre configurarea corectă a stației de lucru și terapia regulată prin masaj pentru sănătatea optimă a angajaților.',
		image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
	},
	{
		id: 'sanatatea-mentala-la-birou',
		title: 'Sprijinirea Sănătății Mentale la Locul de Muncă Modern',
		description:
			'Explorează abordări holistice pentru crearea unui mediu de lucru sănătos din punct de vedere mental care susține toți angajații.',
		image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
	},
	{
		id: 'team-building-wellness',
		title: 'Evenimentele de Wellness ca Oportunități de Team Building',
		description:
			'Cum să folosești zilele de wellness corporativ pentru a consolida legăturile de echipă promovând în același timp sănătatea individuală.',
		image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&h=400&fit=crop',
	},
];

export default function Page() {
	return (
		<>
			{/* Hero Section */}
			<section className="hero-gradient section-padding">
				<div className="section-container">
					<div className="text-center max-w-3xl mx-auto">
						<h1 className="mb-6">Resurse de Wellness</h1>
						<p className="text-lg md:text-xl text-muted-foreground">
							Perspective expert despre bunăstarea la locul de
							muncă, beneficiile terapiei prin masaj și crearea
							unui mediu de lucru mai sănătos și mai productiv.
						</p>
					</div>
				</div>
			</section>

			{/* Articles Grid */}
			<section className="section-padding bg-background">
				<div className="section-container">
					<div className="grid md:grid-cols-2 gap-8">
						{articles.map((article) => (
							<Link
								key={article.id}
								href="#"
								className="group wellness-card p-0 overflow-hidden"
							>
								{/*<div className="aspect-[16/10] overflow-hidden">*/}
								{/*	<Image*/}
								{/*		src={article.image}*/}
								{/*		alt={article.title}*/}
								{/*		className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"*/}
								{/*	/>*/}
								{/*</div>*/}
								<div className="p-6 md:p-8">
									<h3 className="mb-3 group-hover:text-primary transition-colors">
										{article.title}
									</h3>
									<p className="text-muted-foreground mb-4 line-clamp-2">
										{article.description}
									</p>
									<span className="inline-flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
										Citește mai mult
										<ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
									</span>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
