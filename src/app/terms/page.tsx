import type { Metadata } from 'next';
import { translate } from '@/config/translate.setup';
import { Configuration } from '@/config/settings.config';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: await translate('terms.meta.title', {
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
						<h1 className="mb-4">Termeni și Condiții</h1>
						<p className="text-muted-foreground text-lg">
							Ultima actualizare: Ianuarie 2026
						</p>
					</div>
				</div>
			</section>

			<section className="section-padding bg-background">
				<div className="section-container">
					<div className="max-w-3xl mx-auto prose prose-lg">
						<div className="space-y-12">
							<div>
								<h2 className="text-2xl font-semibold text-foreground mb-4">
									1. Acceptarea Termenilor
								</h2>
								<p className="text-muted-foreground leading-relaxed">
									Prin accesarea și utilizarea serviciilor
									oferite de {Configuration.get('app.name')}{' '}
									(„Compania", „noi" sau „nostru"), acceptați
									și sunteți de acord să fiți obligat de
									termenii și prevederile acestui acord. Dacă
									nu sunteți de acord să respectați cele de
									mai sus, vă rugăm să nu utilizați acest
									serviciu.
								</p>
							</div>

							<div>
								<h2 className="text-2xl font-semibold text-foreground mb-4">
									2. Servicii Oferite
								</h2>
								<p className="text-muted-foreground leading-relaxed mb-4">
									{Configuration.get('app.name')} oferă
									servicii de terapie prin masaj la sediul
									clienților corporativi. Serviciile noastre
									includ, dar nu se limitează la:
								</p>
								<ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
									<li>Sesiuni de masaj pe scaun</li>
									<li>
										Workshop-uri de ergonomie și stretching
									</li>
									<li>Programe de wellness corporativ</li>
									<li>Servicii de masaj pentru evenimente</li>
									<li>Consultanță wellness</li>
								</ul>
							</div>

							<div>
								<h2 className="text-2xl font-semibold text-foreground mb-4">
									3. Rezervări și Anulări
								</h2>
								<p className="text-muted-foreground leading-relaxed mb-4">
									<strong className="text-foreground">
										Rezervare:
									</strong>{' '}
									Toate rezervările trebuie făcute cu cel
									puțin 48 de ore în avans. Vom confirma
									rezervarea prin email în termen de 24 de ore
									de la primirea cererii dumneavoastră.
								</p>
								<p className="text-muted-foreground leading-relaxed mb-4">
									<strong className="text-foreground">
										Anulare:
									</strong>{' '}
									Anulările făcute cu mai mult de 24 de ore
									înainte de programarea stabilită vor primi
									rambursare integrală. Anulările făcute în
									termen de 24 de ore de la programarea
									stabilită vor fi taxate cu 50% din taxa de
									serviciu.
								</p>
								<p className="text-muted-foreground leading-relaxed">
									<strong className="text-foreground">
										Neprezentări:
									</strong>{' '}
									Neprezentarea la ora programată fără
									notificare prealabilă va duce la taxarea
									integrală a serviciului.
								</p>
							</div>

							<div>
								<h2 className="text-2xl font-semibold text-foreground mb-4">
									4. Sănătate și Siguranță
								</h2>
								<p className="text-muted-foreground leading-relaxed mb-4">
									Toate serviciile de terapie prin masaj sunt
									oferite de terapeuți licențiați și
									asigurați. Cu toate acestea, terapia prin
									masaj nu este un substitut pentru îngrijirea
									medicală. Recomandăm consultarea unui
									furnizor de servicii medicale înainte de a
									primi terapie prin masaj dacă aveți
									afecțiuni medicale.
								</p>
								<p className="text-muted-foreground leading-relaxed">
									Participanții trebuie să informeze
									terapeutul despre orice afecțiuni de
									sănătate, leziuni sau zone de îngrijorare
									înainte de începerea sesiunii.{' '}
									{Configuration.get('app.name')} își rezervă
									dreptul de a refuza serviciul dacă
									considerăm că nu este în interesul sănătății
									participantului.
								</p>
							</div>

							<div>
								<h2 className="text-2xl font-semibold text-foreground mb-4">
									5. Termeni de Plată
								</h2>
								<p className="text-muted-foreground leading-relaxed mb-4">
									Plata pentru servicii este datorată conform
									termenilor specificați în contractul de
									servicii. Pentru evenimente unice, plata
									este de obicei datorată în termen de 30 de
									zile de la data facturii. Pentru programele
									continue, termenii de plată vor fi
									specificați în contractul de servicii.
								</p>
								<p className="text-muted-foreground leading-relaxed">
									Acceptăm plata prin card de credit, transfer
									bancar sau cec de companie. Plățile
									întârziate pot genera taxe suplimentare așa
									cum este specificat în contractul de
									servicii.
								</p>
							</div>

							<div>
								<h2 className="text-2xl font-semibold text-foreground mb-4">
									6. Răspundere
								</h2>
								<p className="text-muted-foreground leading-relaxed">
									Deși luăm toate precauțiile pentru a asigura
									siguranța și bunăstarea clienților noștri,{' '}
									{Configuration.get('app.name')}
									nu va fi răspunzătoare pentru nicio
									vătămare, pierdere sau daună rezultată din
									utilizarea serviciilor noastre, cu excepția
									cazurilor în care o astfel de răspundere nu
									poate fi exclusă prin lege. Clienții
									participă la serviciile de masaj pe propria
									răspundere și sunt încurajați să comunice
									orice disconfort în timpul sesiunilor.
								</p>
							</div>

							<div id="privacy-policy">
								<h2 className="text-2xl font-semibold text-foreground mb-4">
									7. Politica de Confidențialitate
								</h2>
								<p className="text-muted-foreground leading-relaxed mb-4">
									Respectăm confidențialitatea dumneavoastră
									și ne angajăm să protejăm informațiile
									dumneavoastră personale. Orice date
									personale colectate vor fi utilizate
									exclusiv în scopul furnizării și
									îmbunătățirii serviciilor noastre.
								</p>
								<p className="text-muted-foreground leading-relaxed">
									Nu vindem, nu comercializăm și nu transferăm
									în alt mod informațiile dumneavoastră
									personale către terți fără consimțământul
									dumneavoastră, cu excepția cazurilor
									prevăzute de lege sau necesare pentru
									îndeplinirea obligațiilor de servicii.
								</p>
							</div>

							<div>
								<h2 className="text-2xl font-semibold text-foreground mb-4">
									8. Proprietate Intelectuală
								</h2>
								<p className="text-muted-foreground leading-relaxed">
									Tot conținutul de pe acest site, inclusiv
									text, grafică, logo-uri și imagini, este
									proprietatea
									{Configuration.get('app.name')} și este
									protejat de legile dreptului de autor și
									alte legi privind proprietatea intelectuală.
									Nu puteți reproduce, distribui sau utiliza
									niciun conținut fără consimțământul nostru
									prealabil în scris.
								</p>
							</div>

							<div>
								<h2 className="text-2xl font-semibold text-foreground mb-4">
									9. Modificări ale Termenilor
								</h2>
								<p className="text-muted-foreground leading-relaxed">
									{Configuration.get('app.name')} își rezervă
									dreptul de a modifica acești termeni și
									condiții în orice moment. Modificările vor
									intra în vigoare imediat după postarea pe
									site-ul nostru. Utilizarea continuă a
									serviciilor noastre după orice modificări
									indică acceptarea noilor termeni.
								</p>
							</div>

							<div>
								<h2 className="text-2xl font-semibold text-foreground mb-4">
									10. Informații de Contact
								</h2>
								<p className="text-muted-foreground leading-relaxed">
									Dacă aveți întrebări despre acești Termeni
									și Condiții, vă rugăm să ne contactați la:
								</p>
								<div className="mt-4 wellness-card bg-muted">
									<p className="text-foreground font-medium">
										{Configuration.get('app.name')}
									</p>
									<p className="text-muted-foreground">
										Email: office@s-life.ro
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
