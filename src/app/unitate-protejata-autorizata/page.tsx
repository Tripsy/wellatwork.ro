import type { Metadata } from 'next';
import { translate } from '@/config/translate.setup';
import { Configuration } from '@/config/settings.config';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: await translate('unitate-protejata.meta.title', {
			app_name: Configuration.get('app.name') as string,
		}),
	};
}

export default function Page() {
	return (
		<>
			<section className="hero-gradient py-16 md:py-24">
				<div className="section-container">
					<div className="max-w-3xl">
						<h1 className="mb-4">Unitate Protejata Autorizata</h1>
                        <p>Amalfi Consulting - 484/14.02.2025</p>
					</div>
				</div>
			</section>

			<section className="section-padding bg-background">
				<div className="section-container">
					<div className="max-w-3xl mx-auto prose prose-lg">
						<div className="space-y-6">
                            <p>Well at Work este un concept susținut de Amalfi Consulting, Unitate Protejată Autorizată conform Legii nr. 448/2006 privind protecția și promovarea drepturilor persoanelor cu handicap.</p>

                            <p>Amalfi Consulting deține Autorizația nr. 484/14.02.2025, emisă în conformitate cu prevederile legale în vigoare.</p>

                            <p>În calitate de unitate protejată autorizată:</p>
                            <ul className="list-disc ml-12">
                                <li>Susținem integrarea profesională a persoanelor cu dizabilități</li>
                                <li>Oferim servicii specializate prin kinetoterapeuți și asistenți medicali  balneofizikinetoterapie si recuperare medicala calificați</li>
                                <li>
                                    Permitem companiilor să colaboreze cu noi în condițiile prevăzute de art. 78 din Legea 448/2006
                                </li>
                            </ul>
                            <p>
                                Prin această colaborare, organizațiile îmbină responsabilitatea socială cu investiția reală în sănătatea angajaților.
                            </p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
