import React from "react";
import Section from "@/components/Section";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ButtonGradient from "@/public/assets/svg/ButtonGradient";
import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>
}): Promise<Metadata> {
  const {locale} = await params;
  
  const titles = {
    en: "Terms of Service | Flowko - Business Automation Service Agreement",
    sl: "Pogoji Storitev | Flowko - Sporazum o Storitvah Poslovne Avtomatizacije"
  };

  const descriptions = {
    en: "Terms of Service for Flowko's AI business automation and website development services. Clear service agreements for European businesses.",
    sl: "Pogoji storitev za Flowko-jeve storitve AI poslovne avtomatizacije in razvoja spletnih strani. Jasni sporazumi o storitvah za evropska podjetja."
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://flowko.io/${locale}/terms`,
      languages: {
        'en': 'https://flowko.io/en/terms',
        'sl': 'https://flowko.io/sl/terms',
      },
    },
  };
}

// Multilingual content
const getContent = (locale: string) => {
  if (locale === 'sl') {
    return {
      title: "Pogoji uporabe",
      lastUpdated: "Zadnjič posodobljeno:",
      headerInfo: {
        name: "David Vojvodić s.p., Flowko",
        address: "Ulica Daneta Šumenjaka 2A",
        city: "9000 Murska Sobota",
        country: "Slovenija",
        email: "E-pošta: info@flowko.io"
      },
      sections: {
        acceptance: {
          title: "1. Sprejem pogojev",
          content: [
            "Z dostopom in uporabo storitev Flowko se strinjate in zavezujete, da boste upoštevali pogoje in določila te pogodbe. Ti pogoji uporabe (\"Pogoji\") urejajo vašo uporabo naših avtomatizacijskih in spletnih razvojnih storitev.",
            "Če se ne strinjate s tem, kar je navedeno zgoraj, ne uporabljajte te storitve."
          ]
        },
        company: {
          title: "2. Podatki o podjetju",
          items: [
            { label: "Podjetje:", value: "Flowko" },
            { label: "Lokacija:", value: "Murska Sobota, Slovenija" },
            { label: "E-pošta:", value: "info@flowko.io" },
            { label: "Spletna stran:", value: "flowko.io" },
            { label: "Veljavno pravo:", value: "Republika Slovenija" }
          ]
        },
        services: {
          title: "3. Ponujene storitve",
          content: "Flowko zagotavlja naslednje storitve:",
          items: [
            "Avtomatizacija poslovnih procesov z uporabo n8n in drugih platform",
            "Razvoj delovnih tokov z umetno inteligenco",
            "Razvoj spletnih strani z integrirano avtomatizacijo",
            "Svetovanje in strategija avtomatizacije",
            "Storitve vzdrževanja in podpore",
            "Usposabljanje in dokumentacija"
          ]
        },
        userObligations: {
          title: "4. Obveznosti strank",
          content: "Z uporabo naših storitev se strinjate, da boste:",
          items: [
            "Zagotovili točne in popolne informacije",
            "Spoštovali vse veljavne zakone in predpise",
            "Ne uporabljali storitev za nezakonite namene",
            "Zaščitili svoje pristopne podatke",
            "Pravočasno plačevali za storitve",
            "Sodelovali pri implementaciji projektov"
          ]
        },
        payment: {
          title: "5. Plačilni pogoji",
          subtitle1: "5.1 Plačila projektov",
          items1: [
            "Vse cene so navedene v EUR brez DDV",
            "Projekti pod €2,000: plačilo zapadlo v 15 dneh po zaključku",
            "Projekti nad €2,000: 50% akontacija, stanje zapadlo ob zaključku",
            "Poslovni projekti: plačila po doseženih mejnikih po dogovoru"
          ],
          subtitle2: "5.2 Ponavljajoče storitve",
          items2: [
            "Mesečni stroški upravljanja zaračunani vnaprej",
            "Delo na uro: €140/ura zaračunano mesečno",
            "Plačila zapadla v 15 dneh od datuma računa",
            "Za zamude pri plačilu se zaračuna 1,5% mesečnih obresti"
          ]
        },
        intellectualProperty: {
          title: "6. Intelektualna lastnina",
          content: "Vsa intelektualna lastnina, razvita v okviru naših storitev:",
          ownership: [
            {
              title: "6.1 Lastništvo Flowko",
              items: [
                "Programska oprema in orodja, ki jih uporabljamo",
                "Naše metodologije in procesi",
                "Predloge in standardni delovni tokovi",
                "Znanje in izkušnje naše ekipe"
              ]
            },
            {
              title: "6.2 Lastništvo stranke",
              items: [
                "Poslovni podatki in procesi stranke",
                "Specifične avtomatizacije, narejene po meri",
                "Rezultati projektov po plačilu",
                "Domensko znanje in vsebina stranke"
              ]
            }
          ]
        },
        warranties: {
          title: "7. Jamstva in izjave",
          content: [
            "Naše storitve zagotavljamo 'kot so' z naslednjimi jamstvi:",
            "Storitve bodo opravljene s strokovno skrbnostjo in v skladu z industrijskimi standardi."
          ],
          limitations: [
            "Ne jamčimo specifičnih poslovnih rezultatov",
            "Ne odgovarjamo za motnje tretjih platform",
            "Jamstvo velja 30 dni po zaključku projekta"
          ]
        },
        privacy: {
          title: "8. Zasebnost",
          content: [
            "Vaši podatki se obravnavajo v skladu z našim Pravilnikom o zasebnosti.",
            "Za podrobnosti o obdelavi podatkov si oglejte našo Privacy Policy."
          ]
        },
        liability: {
          title: "9. Omejitev odgovornosti",
          content: [
            "Naša skupna odgovornost za kakršno koli terjatev, ki izhaja iz naših storitev, ne sme presegati skupnega zneska, ki ga je stranka plačala za določen projekt ali storitev.",
            "Ne odgovarjamo za posredne, naključne, posebne ali posledične škode, vključno z izgubo dobička ali prekinitvijo poslovanja."
          ]
        },
        forceMajeure: {
          title: "10. Višja sila",
          content: [
            "Nismo odgovorni za zamude ali neizpolnjevanje obveznosti zaradi dogodkov zunaj našega nadzora, vključno z:",
            "Naravnimi nesrečami, vojnami, terorističnimi napadi, pandemijami, vladnimi ukrepi ali tehničnimi motnjami tretjih oseb."
          ]
        },
        governing: {
          title: "11. Veljavno pravo",
          content: [
            "Ti pogoji se urejajo in razlagajo v skladu z zakonodajo Republike Slovenije.",
            "Za reševanje sporov je pristojno sodišče v Ljubljani, Slovenija."
          ]
        },
        termination: {
          title: "12. Prenehanje",
          subtitle1: "12.1 Prenehanje projekta",
          content1: "Katera koli stranka lahko prekine projekt s 30-dnevnim pisnim obvestilom. Stranka je odgovorna za plačilo dela, opravljenega do sedaj.",
          subtitle2: "12.2 Tekoče storitve",
          content2: "Mesečne storitve je mogoče odpovedati z 30-dnevnim obvestilom. Letne pogodbe zahtevajo 90-dnevno obvestilo za odpoved."
        },
        modifications: {
          title: "13. Spremembe pogojev",
          content: [
            "Te pogoje lahko spremenimo kadarkoli. O pomembnih spremembah vas bomo obvestili po e-pošti ali z obvestilom na spletni strani.",
            "Nadaljevanje uporabe storitev po objavi sprememb pomeni sprejem novih pogojev."
          ]
        },
        severability: {
          title: "14. Ločljivost",
          content: [
            "Če se katera koli določba teh pogojev izkaže za neveljavno ali neizvodljivo, ostale določbe ostanejo v polni veljavi.",
            "Neveljavna določba se nadomesti z veljavno določbo, ki najbolj približno ustreza prvotni nameri."
          ]
        },
        entire: {
          title: "15. Celotni sporazum",
          content: [
            "Ti pogoji skupaj z našim Pravilnikom o zasebnosti predstavljajo celotni sporazum med vami in Flowko.",
            "Vsi predhodni sporazumi, pogajanja ali izjave se nadomestijo s temi pogoji."
          ]
        },
        contact: {
          title: "16. Kontaktni podatki",
          content: "Za vprašanja o teh pogojih uporabe:",
          items: [
            { label: "E-pošta:", value: "info@flowko.io" },
            { label: "Splošni kontakt:", value: "hello@flowko.io" },
            { label: "Podpora:", value: "support@flowko.io" }
          ]
        }
      }
    };
  } 
  // Temporarily disabled Croatian locale
  /* else if (locale === 'hr') {
    return {
      title: "Uvjeti korištenja",
      lastUpdated: "Zadnje ažuriranje:",
      sections: {
        acceptance: {
          title: "1. Prihvaćanje uvjeta",
          content: [
            "Pristupom i korištenjem usluga Flowko prihvaćate i pristajete biti obvezani uvjetima i odredbama ovog sporazuma. Ovi uvjeti korištenja (\"Uvjeti\") reguliraju vašu upotrebu naših usluga automatizacije i web razvoja.",
            "Ako se ne slažete s navedenim, molimo ne koristite ovu uslugu."
          ]
        },
        company: {
          title: "2. Informacije o tvrtki",
          items: [
            { label: "Tvrtka:", value: "Flowko" },
            { label: "Lokacija:", value: "Murska Sobota, Slovenija" },
            { label: "E-mail:", value: "info@flowko.io" },
            { label: "Web stranica:", value: "flowko.io" },
            { label: "Mjerodavno pravo:", value: "Republika Slovenija" }
          ]
        },
        services: {
          title: "3. Ponuđene usluge",
          content: "Flowko pruža sljedeće usluge:",
          items: [
            "Automatizacija poslovnih procesa koristeći n8n i druge platforme",
            "Razvoj radnih tokova s umjetnom inteligencijom",
            "Razvoj web stranica s integriranom automatizacijom",
            "Savjetovanje i strategija automatizacije",
            "Usluge održavanja i podrške",
            "Obuka i dokumentacija"
          ]
        },
        userObligations: {
          title: "4. Obveze korisnika",
          content: "Korištenjem naših usluga prihvaćate da ćete:",
          items: [
            "Pružiti točne i potpune informacije",
            "Poštovati sve važeće zakone i propise",
            "Ne koristiti usluge u nezakonite svrhe",
            "Zaštititi svoje pristupne podatke",
            "Pravovremeno plaćati za usluge",
            "Surađivati pri implementaciji projekata"
          ]
        },
        payment: {
          title: "5. Uvjeti plaćanja",
          subtitle1: "5.1 Plaćanja projekata",
          items1: [
            "Sve cijene su navedene u EUR bez PDV-a",
            "Projekti ispod €2,000: plaćanje dospijeva u 15 dana nakon završetka",
            "Projekti iznad €2,000: 50% akontacija, ostatak dospijeva pri završetku",
            "Poslovni projekti: plaćanja po postignućima prema dogovoru"
          ],
          subtitle2: "5.2 Ponavljajuće usluge",
          items2: [
            "Mjesečni troškovi upravljanja naplaćuju se unaprijed",
            "Rad po satu: €140/sat naplaćuje se mjesečno",
            "Plaćanja dospijevaju u 15 dana od datuma računa",
            "Za kašnjenja u plaćanju naplaćuje se 1,5% mjesečnih kamata"
          ]
        },
        intellectualProperty: {
          title: "6. Intelektualno vlasništvo",
          content: "Sve intelektualno vlasništvo razvijeno u sklopu naših usluga:",
          ownership: [
            {
              title: "6.1 Vlasništvo Flowko",
              items: [
                "Softver i alati koje koristimo",
                "Naše metodologije i procesi",
                "Predlošci i standardni radni tokovi",
                "Znanje i iskustvo našeg tima"
              ]
            },
            {
              title: "6.2 Vlasništvo klijenta",
              items: [
                "Poslovni podaci i procesi klijenta",
                "Specifične automatizacije izrađene po mjeri",
                "Rezultati projekata nakon plaćanja",
                "Domensko znanje i sadržaj klijenta"
              ]
            }
          ]
        },
        warranties: {
          title: "7. Jamstva i izjave",
          content: [
            "Naše usluge pružamo 'kako jesu' s následujícím jamstvima:",
            "Usluge će biti obavljene s profesionalnom pažnjom i u skladu s industrijskim standardima."
          ],
          limitations: [
            "Ne jamčimo specifične poslovne rezultate",
            "Ne odgovaramo za smetnje platforma trećih strana",
            "Jamstvo vrijedi 30 dana nakon završetka projekta"
          ]
        },
        privacy: {
          title: "8. Privatnost",
          content: [
            "Vaši podaci se obrađuju u skladu s našim Pravilima privatnosti.",
            "Za detalje o obradi podataka pogledajte našu Privacy Policy."
          ]
        },
        liability: {
          title: "9. Ograničenje odgovornosti",
          content: [
            "Naša ukupna odgovornost za bilo koju tužbu koja proizlazi iz naših usluga neće premašiti ukupnu svotu koju je klijent platio za određeni projekt ili uslugu.",
            "Nećemo biti odgovorni za indirektne, slučajne, posebne ili posljedične štete, uključujući izgubljenu dobit ili prekid poslovanja."
          ]
        },
        forceMajeure: {
          title: "10. Viša sila",
          content: [
            "Nismo odgovorni za kašnjenja ili neispunjavanje obveza zbog događaja izvan naše kontrole, uključujući:",
            "Prirodne katastrofe, ratove, terorističke napade, pandemije, vladine mjere ili tehničke smetnje trećih strana."
          ]
        },
        governing: {
          title: "11. Mjerodavno pravo",
          content: [
            "Ovi uvjeti se uređuju i tumače u skladu sa zakonodavstvom Republike Slovenije.",
            "Za rješavanje sporova nadležan je sud u Ljubljani, Slovenija."
          ]
        },
        termination: {
          title: "12. Prestanak",
          subtitle1: "12.1 Prestanak projekta",
          content1: "Bilo koja strana može prekinuti projekt s 30-dnevnom pisanom obavijesti. Klijent je odgovoran za plaćanje rada obavljenog do tog trenutka.",
          subtitle2: "12.2 Tekuće usluge",
          content2: "Mjesečne usluge mogu se otkazati s 30-dnevnom obavijesti. Godišnji ugovori zahtijevaju 90-dnevnu obavijest za otkazivanje."
        },
        modifications: {
          title: "13. Promjene uvjeta",
          content: [
            "Ove uvjete možemo promijeniti u bilo koje vrijeme. O važnim promjenama obavijestit ćemo vas putem e-maila ili obavijesti na web stranici.",
            "Nastavak korištenja usluga nakon objave promjena znači prihvaćanje novih uvjeta."
          ]
        },
        severability: {
          title: "14. Razdvojivost",
          content: [
            "Ako se bilo koja odredba ovih uvjeta pokaže nevažećom ili neprovodljivom, ostale odredbe ostaju na punoj snazi.",
            "Nevažeća odredba zamjenjuje se važećom odredbom koja najbliže odgovara izvornoj namjeri."
          ]
        },
        entire: {
          title: "15. Cjelovit sporazum",
          content: [
            "Ovi uvjeti zajedno s našim Pravilima privatnosti predstavljaju cjelovit sporazum između vas i Flowko.",
            "Svi prethodni sporazumi, pregovori ili izjave zamjenjuju se ovim uvjetima."
          ]
        },
        contact: {
          title: "16. Kontaktne informacije",
          content: "Za pitanja o ovim uvjetima korištenja:",
          items: [
            { label: "E-mail:", value: "info@flowko.io" },
            { label: "Opći kontakt:", value: "hello@flowko.io" },
            { label: "Podrška:", value: "support@flowko.io" }
          ]
        }
      }
    };
  */ 
  else {
    // English (default)
    return {
      title: "Terms of Service",
      lastUpdated: "Last updated:",
      headerInfo: {
        name: "David Vojvodić s.p., Flowko",
        address: "Ulica Daneta Šumenjaka 2A",
        city: "9000 Murska Sobota",
        country: "Slovenia",
        email: "Email: info@flowko.io"
      },
      sections: {
        acceptance: {
          title: "1. Acceptance of Terms",
          content: [
            "By accessing and using Flowko's services, you accept and agree to be bound by the terms and provision of this agreement. These Terms of Service (\"Terms\") govern your use of our automation and website development services.",
            "If you do not agree to abide by the above, please do not use this service."
          ]
        },
        company: {
          title: "2. Company Information",
          items: [
            { label: "Company:", value: "Flowko" },
            { label: "Location:", value: "Murska Sobota, Slovenia" },
            { label: "Email:", value: "info@flowko.io" },
            { label: "Website:", value: "flowko.io" },
            { label: "Governing Law:", value: "Republic of Slovenia" }
          ]
        },
        services: {
          title: "3. Services Offered",
          content: "Flowko provides the following services:",
          items: [
            "Business process automation using n8n and other platforms",
            "AI-powered workflow development",
            "Website development with integrated automation",
            "Automation consulting and strategy",
            "Ongoing maintenance and support services",
            "Training and documentation"
          ]
        },
        userObligations: {
          title: "4. User Obligations",
          content: "By using our services, you agree to:",
          items: [
            "Provide accurate and complete information",
            "Comply with all applicable laws and regulations",
            "Not use services for illegal purposes",
            "Protect your access credentials",
            "Pay for services on time",
            "Cooperate in project implementation"
          ]
        },
        payment: {
          title: "5. Payment Terms",
          subtitle1: "5.1 Project Payments",
          items1: [
            "All prices quoted in EUR excluding VAT",
            "Projects under €2,000: payment due within 15 days of completion",
            "Projects over €2,000: 50% deposit, balance due upon completion",
            "Enterprise projects: milestone-based payments as agreed"
          ],
          subtitle2: "5.2 Recurring Services",
          items2: [
            "Monthly management fees billed in advance",
            "À la carte hourly work: €140/hour billed monthly",
            "Payments due within 15 days of invoice date",
            "Late payments subject to 1.5% monthly interest charge"
          ]
        },
        intellectualProperty: {
          title: "6. Intellectual Property",
          content: "All intellectual property developed as part of our services:",
          ownership: [
            {
              title: "6.1 Flowko Ownership",
              items: [
                "Software and tools we use",
                "Our methodologies and processes",
                "Templates and standard workflows",
                "Knowledge and expertise of our team"
              ]
            },
            {
              title: "6.2 Client Ownership",
              items: [
                "Client business data and processes",
                "Custom-built automations",
                "Project results after payment",
                "Domain knowledge and client content"
              ]
            }
          ]
        },
        warranties: {
          title: "7. Warranties and Representations",
          content: [
            "We provide our services 'as is' with the following warranties:",
            "Services will be performed with professional care and in accordance with industry standards."
          ],
          limitations: [
            "We do not guarantee specific business results",
            "We are not responsible for third-party platform disruptions",
            "Warranty period is 30 days after project completion"
          ]
        },
        privacy: {
          title: "8. Privacy",
          content: [
            "Your data is handled in accordance with our Privacy Policy.",
            "For details on data processing, please see our Privacy Policy."
          ]
        },
        liability: {
          title: "9. Limitation of Liability",
          content: [
            "Our total liability for any claim arising from our services shall not exceed the total amount paid by the client for the specific project or service in question.",
            "We shall not be liable for indirect, incidental, special, or consequential damages, including lost profits or business interruption."
          ]
        },
        forceMajeure: {
          title: "10. Force Majeure",
          content: [
            "We are not responsible for delays or failure to perform due to events beyond our control, including:",
            "Natural disasters, wars, terrorist attacks, pandemics, government actions, or third-party technical disruptions."
          ]
        },
        governing: {
          title: "11. Governing Law",
          content: [
            "These terms are governed by and construed in accordance with the laws of the Republic of Slovenia.",
            "For dispute resolution, the courts of Ljubljana, Slovenia have jurisdiction."
          ]
        },
        termination: {
          title: "12. Termination",
          subtitle1: "12.1 Project Termination",
          content1: "Either party may terminate a project with 30 days written notice. Client responsible for payment of work completed to date.",
          subtitle2: "12.2 Ongoing Services",
          content2: "Monthly services may be cancelled with 30 days notice. Annual contracts require 90 days notice for cancellation."
        },
        modifications: {
          title: "13. Terms Modifications",
          content: [
            "We may modify these terms at any time. We will notify you of material changes via email or website notice.",
            "Continued use of services after changes are posted constitutes acceptance of new terms."
          ]
        },
        severability: {
          title: "14. Severability",
          content: [
            "If any provision of these terms proves invalid or unenforceable, the remaining provisions remain in full force.",
            "Invalid provisions will be replaced with valid provisions that most closely match the original intent."
          ]
        },
        entire: {
          title: "15. Entire Agreement",
          content: [
            "These terms together with our Privacy Policy constitute the entire agreement between you and Flowko.",
            "All prior agreements, negotiations, or representations are superseded by these terms."
          ]
        },
        contact: {
          title: "16. Contact Information",
          content: "For questions about these Terms of Service:",
          items: [
            { label: "Email:", value: "info@flowko.io" },
            { label: "General Contact:", value: "hello@flowko.io" },
            { label: "Support:", value: "support@flowko.io" }
          ]
        }
      }
    };
  }
};

interface TermsOfServiceProps {
  params: Promise<{ locale: string }>;
}

export default async function TermsOfService({ params }: TermsOfServiceProps) {
  const { locale } = await params;
  const content = getContent(locale);

  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header locale={locale} />
        <Section className="pt-[8rem] -mt-[5.25rem]" crosses crossesOffset="lg:translate-y-[5.25rem]">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h1 className="h1 mb-6">{content.title}</h1>
          <p className="mb-2">{content.headerInfo.name}</p>
          <p className="mb-2">{content.headerInfo.address}</p>
          <p className="mb-2">{content.headerInfo.city}</p>
          <p className="mb-2">{content.headerInfo.country}</p>
          <p className="mb-2">{content.headerInfo.email}</p>
          <p className="body-2 text-n-4 mb-8">{content.lastUpdated} {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-8">
            <section>
              <h2 className="h3 mb-4">{content.sections.acceptance.title}</h2>
              {content.sections.acceptance.content.map((paragraph, index) => (
                <p key={index} className="body-1 mb-4">{paragraph}</p>
              ))}
            </section>

            <section>
              <h2 className="h3 mb-4">{content.sections.company.title}</h2>
              <div className="body-1 space-y-2">
                {content.sections.company.items.map((item, index) => (
                  <p key={index}>
                    <strong>{item.label}</strong> {item.value}
                  </p>
                ))}
              </div>
            </section>

            <section>
              <h2 className="h3 mb-4">{content.sections.services.title}</h2>
              <p className="body-1 mb-4">{content.sections.services.content}</p>
              <ul className="body-1 space-y-2 list-disc list-inside ml-4">
                {content.sections.services.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="h3 mb-4">{content.sections.userObligations.title}</h2>
              <p className="body-1 mb-4">{content.sections.userObligations.content}</p>
              <ul className="body-1 space-y-2 list-disc list-inside ml-4">
                {content.sections.userObligations.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="h3 mb-4">{content.sections.payment.title}</h2>
              
              <h3 className="h4 mb-3">{content.sections.payment.subtitle1}</h3>
              <ul className="body-1 space-y-2 list-disc list-inside ml-4">
                {content.sections.payment.items1.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h3 className="h4 mb-3 mt-6">{content.sections.payment.subtitle2}</h3>
              <ul className="body-1 space-y-2 list-disc list-inside ml-4">
                {content.sections.payment.items2.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="h3 mb-4">{content.sections.intellectualProperty.title}</h2>
              <p className="body-1 mb-4">{content.sections.intellectualProperty.content}</p>
              {content.sections.intellectualProperty.ownership.map((ownership, index) => (
                <div key={index} className="mb-6">
                  <h3 className="h4 mb-3">{ownership.title}</h3>
                  <ul className="body-1 space-y-2 list-disc list-inside ml-4">
                    {ownership.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            <section>
              <h2 className="h3 mb-4">{content.sections.warranties.title}</h2>
              {content.sections.warranties.content.map((paragraph, index) => (
                <p key={index} className="body-1 mb-4">{paragraph}</p>
              ))}
              <p className="body-1 mb-4">Limitations:</p>
              <ul className="body-1 space-y-2 list-disc list-inside ml-4">
                {content.sections.warranties.limitations.map((limitation, index) => (
                  <li key={index}>{limitation}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="h3 mb-4">{content.sections.privacy.title}</h2>
              {content.sections.privacy.content.map((paragraph, index) => (
                <p key={index} className="body-1 mb-4">{paragraph}</p>
              ))}
            </section>

            <section>
              <h2 className="h3 mb-4">{content.sections.liability.title}</h2>
              {content.sections.liability.content.map((paragraph, index) => (
                <p key={index} className="body-1 mb-4">{paragraph}</p>
              ))}
            </section>

            <section>
              <h2 className="h3 mb-4">{content.sections.forceMajeure.title}</h2>
              {content.sections.forceMajeure.content.map((paragraph, index) => (
                <p key={index} className="body-1 mb-4">{paragraph}</p>
              ))}
            </section>

            <section>
              <h2 className="h3 mb-4">{content.sections.governing.title}</h2>
              {content.sections.governing.content.map((paragraph, index) => (
                <p key={index} className="body-1 mb-4">{paragraph}</p>
              ))}
            </section>

            <section>
              <h2 className="h3 mb-4">{content.sections.termination.title}</h2>
              
              <h3 className="h4 mb-3">{content.sections.termination.subtitle1}</h3>
              <p className="body-1 mb-4">{content.sections.termination.content1}</p>

              <h3 className="h4 mb-3">{content.sections.termination.subtitle2}</h3>
              <p className="body-1">{content.sections.termination.content2}</p>
            </section>

            <section>
              <h2 className="h3 mb-4">{content.sections.modifications.title}</h2>
              {content.sections.modifications.content.map((paragraph, index) => (
                <p key={index} className="body-1 mb-4">{paragraph}</p>
              ))}
            </section>

            <section>
              <h2 className="h3 mb-4">{content.sections.severability.title}</h2>
              {content.sections.severability.content.map((paragraph, index) => (
                <p key={index} className="body-1 mb-4">{paragraph}</p>
              ))}
            </section>

            <section>
              <h2 className="h3 mb-4">{content.sections.entire.title}</h2>
              {content.sections.entire.content.map((paragraph, index) => (
                <p key={index} className="body-1 mb-4">{paragraph}</p>
              ))}
            </section>

            <section>
              <h2 className="h3 mb-4">{content.sections.contact.title}</h2>
              <p className="body-1 mb-4">{content.sections.contact.content}</p>
              <div className="body-1 space-y-2">
                {content.sections.contact.items.map((item, index) => (
                  <p key={index}>
                    <strong>{item.label}</strong> <a href={`mailto:${item.value}`} className="text-color-1 hover:underline">{item.value}</a>
                  </p>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
        </Section>
        <Footer />
      </div>
      <ButtonGradient />
    </>
  );
}