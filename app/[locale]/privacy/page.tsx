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
    en: "Privacy Policy | Flowko - Data Protection & GDPR Compliance",
    sl: "Pravilnik o Zasebnosti | Flowko - Varstvo Podatkov in GDPR Skladnost"
  };

  const descriptions = {
    en: "Learn how Flowko protects your data and ensures GDPR compliance in our business automation services. Transparent privacy practices for EU businesses.",
    sl: "Spoznajte, kako Flowko varuje vaše podatke in zagotavlja skladnost z GDPR pri naših storitvah poslovne avtomatizacije. Transparentne prakse zasebnosti za EU podjetja."
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://flowko.io/${locale}/privacy`,
      languages: {
        'en': 'https://flowko.io/en/privacy',
        'sl': 'https://flowko.io/sl/privacy',
      },
    },
  };
}

interface PrivacyPolicyProps {
  params: Promise<{ locale: string }>;
}

// Multilingual content
const getContent = (locale: string) => {
  if (locale === 'sl') {
    return {
      title: "Pravilnik o zasebnosti",
      lastUpdated: "Zadnjič posodobljeno:",
      sections: {
        introduction: {
          title: "1. Uvod",
          content: [
            "Flowko (\"mi\", \"naš\" ali \"nas\") je zavezano varovanju vaše zasebnosti. Ta pravilnik o zasebnosti pojasnjuje, kako zbiramo, uporabljamo, razkrivamo in varujemo vaše informacije, ko obiščete našo spletno stran flowko.io in uporabljate naše storitve avtomatizacije.",
            "Ta pravilnik je skladen s Splošno uredbo EU o varstvu podatkov (GDPR) in velja za vse osebne podatke, ki jih obdelujemo o vas."
          ]
        },
        dataController: {
          title: "2. Upravljavec podatkov",
          company: "Flowko",
          location: "Murska Sobota, Slovenija",
          email: "E-pošta:",
          contact: "Kontakt:",
          dpo: "Pooblaščenec za varstvo podatkov: David Vojvodic"
        },
        dataCollection: {
          title: "3. Informacije, ki jih zbiramo",
          providedInfo: {
            title: "3.1 Informacije, ki jih posredujete",
            items: [
              "Kontaktne informacije (ime, e-poštni naslov, telefonska številka)",
              "Podatki o podjetju (ime podjetja, industrija, velikost)",
              "Komunikacijske preference",
              "Tehnične zahteve in podrobnosti projekta",
              "Plačilne informacije (varno obdelane prek ponudnikov plačilnih storitev tretjih oseb)"
            ]
          },
          automaticInfo: {
            title: "3.2 Samodejno zbrane informacije",
            items: [
              "IP naslov in podatki o lokaciji",
              "Vrsta in različica brskalnika",
              "Informacije o napravi",
              "Vzorci uporabe spletne strani in analitika",
              "Piškotki in podobne sledilne tehnologije"
            ]
          }
        },
        dataUsage: {
          title: "4. Kako uporabljamo vaše informacije",
          serviceDelivery: {
            title: "4.1 Izvajanje storitev (pravna podlaga: izvajanje pogodbe)",
            items: [
              "Zagotavljanje svetovanja in razvojnih storitev avtomatizacije",
              "Upravljanje projektov in komunikacija",
              "Tehnična podpora in vzdrževanje",
              "Obračun in procesiranje plačil"
            ]
          },
          businessOps: {
            title: "4.2 Poslovne operacije (pravna podlaga: legitimni interes)",
            items: [
              "Analitika spletne strani in izboljšave",
              "Spremljanje varnosti in preprečevanje goljufij",
              "Poslovni razvoj in izboljšanje storitev"
            ]
          },
          marketing: {
            title: "4.3 Trženje (pravna podlaga: privolitev)",
            items: [
              "Pošiljanje novic in vpogledov v avtomatizacijo",
              "Promocija ustreznih storitev in študij primerov",
              "Vabila na dogodke in spletne seminarje"
            ]
          }
        },
        dataDisclosure: {
          title: "5. Razkritje podatkov",
          intro: "Vaših osebnih podatkov ne prodajamo, trgujemo ali kako drugače prenašamo tretjim osebam, razen:",
          serviceProviders: {
            title: "5.1 Ponudniki storitev",
            items: [
              "Gostovanje spletne strani (varno pri ponudnikih EU)",
              "Procesni plačil (samo za procesiranje plačil)",
              "Ponudniki e-pošte (za pošiljanje dogovorjenih komunikacij)",
              "Analitična orodja (Google Analytics z anonimizacijo IP)"
            ]
          },
          legalRequirements: {
            title: "5.2 Pravne zahteve",
            items: [
              "Ko to zahteva zakon",
              "Za zaščito naših pravic ali lastnine",
              "V dobri veri za preprečevanje kriminalne dejavnosti"
            ]
          }
        },
        dataSecurity: {
          title: "6. Varnost podatkov",
          intro: "Uvedli smo ustrezne tehnične in organizacijske ukrepe za zaščito vaših osebnih podatkov pred nepooblaščenim dostopom, spreminjanjem, razkritjem ali uničenjem.",
          measures: "Ti ukrepi vključujejo:",
          items: [
            "SSL enkripcija za vse spletne komunikacije",
            "Varno shranjevanje podatkov z enkripcijo",
            "Redne varnostne revizije in posodobitve",
            "Omejene pravice dostopa samo za pooblaščeno osebje",
            "Varnostni protokoli za ravnanje s podatki"
          ]
        },
        gdprRights: {
          title: "7. Vaše pravice po GDPR",
          intro: "Po GDPR imate naslednje pravice:",
          rights: [
            "Dostop: Zahtevajte kopije vaših osebnih podatkov",
            "Popravek: Popravite netočne ali nepopolne podatke",
            "Izbris: Zahtevajte izbris vaših podatkov (\"pravica do pozabe\")",
            "Omejitev: Omejite, kako obdelujemo vaše podatke",
            "Prenosljivost: Prejmite svoje podatke v strukturirani obliki",
            "Ugovor: Ugovarjajte obdelavi na podlagi legitimnih interesov",
            "Umik privolitve: Za trženjske komunikacije kadarkoli"
          ],
          exercise: "Za uveljavljanje teh pravic nas kontaktirajte na info@flowko.io. Odgovorili bomo v 30 dneh."
        },
        dataRetention: {
          title: "8. Hranjenje podatkov",
          intro: "Vaše osebne podatke hranimo samo toliko časa, kolikor je potrebno za namene, navedene v tem pravilniku:",
          table: {
            headers: ["Vrsta podatkov", "Obdobje hranjenja"],
            rows: [
              ["Kontaktne informacije", "3 leta po zadnjem stiku"],
              ["Podatki o projektu", "7 let (davčne zahteve)"],
              ["Analitični podatki", "26 mesecev (Google Analytics)"],
              ["Piškotki", "V skladu s pravilnikom o piškotkih"]
            ]
          }
        },
        internationalTransfers: {
          title: "9. Mednarodni prenosi",
          content: [
            "Vaši podatki se obdelujejo predvsem znotraj EU. V primerih, ko uporabljamo storitve tretjih oseb iz tretjih držav (npr. Google Analytics), zagotavljamo ustrezne zaščitne ukrepe:",
            "Vsi prenosi se izvajajo v skladu z GDPR in slovenskim zakonom o varstvu podatkov."
          ],
          safeguards: [
            "Standardne pogodbene klavzule EU",
            "Sklepi EU o ustreznosti",
            "Certifikacijske sheme (nasledniki Privacy Shield)"
          ]
        },
        automatedDecisions: {
          title: "10. Avtomatizirano odločanje",
          content: [
            "Ne izvajamo avtomatiziranega odločanja ali profiliranja, ki bi lahko pomembno vplivalo na vas.",
            "Vse pomembne odločitve se sprejemajo z neposredno človeško udeležbo."
          ]
        },
        policyUpdates: {
          title: "11. Posodobitve pravilnika",
          content: [
            "Ta pravilnik lahko občasno posodobimo. O pomembnih spremembah vas bomo obvestili po e-pošti ali z obvestilom na spletni strani.",
            "Redno pregledujte ta pravilnik za najnovejše informacije o naših praksah varovanja podatkov."
          ]
        },
        contact: {
          title: "12. Kontaktirajte nas",
          intro: "Za vprašanja v zvezi z zasebnostjo ali za uveljavljanje vaših pravic:",
          email: "E-pošta:",
          general: "Splošni kontakt:",
          support: "Podpora:",
          dpo: "Pooblaščenec za varstvo podatkov:",
          complaint: "Prav tako imate pravico vložiti pritožbo pri pristojnem nadzornem organu, če menite, da so bile kršene vaše pravice do varstva podatkov."
        }
      }
    };
  } 
  // Temporarily disabled Croatian locale
  /* else if (locale === 'hr') {
    return {
      title: "Pravila privatnosti",
      lastUpdated: "Zadnje ažuriranje:",
      sections: {
        introduction: {
          title: "1. Uvod",
          content: [
            "Flowko (\"mi\", \"naš\" ili \"nas\") je posvećen zaštiti vaše privatnosti. Ova pravila privatnosti objašnjavaju kako prikupljamo, koristimo, otkrivamo i čuvamo vaše informacije kada posjetite našu web stranicu flowko.io i koristite naše usluge automatizacije.",
            "Ova pravila su u skladu s Općom uredbom EU o zaštiti podataka (GDPR) i primjenjuju se na sve osobne podatke koje obrađujemo o vama."
          ]
        },
        dataController: {
          title: "2. Voditelj obrade podataka",
          company: "Flowko",
          location: "Murska Sobota, Slovenija",
          email: "E-mail:",
          contact: "Kontakt:",
          dpo: "Službenik za zaštitu podataka: David Vojvodic"
        },
        dataCollection: {
          title: "3. Informacije koje prikupljamo",
          providedInfo: {
            title: "3.1 Informacije koje pružate",
            items: [
              "Kontaktne informacije (ime, adresa e-pošte, broj telefona)",
              "Informacije o tvrtki (naziv tvrtke, industrija, veličina)",
              "Komunikacijske preference",
              "Tehničke zahtjeve i detalje projekta",
              "Informacije o plaćanju (sigurno obrađene putem pružatelja usluga plaćanja trećih strana)"
            ]
          },
          automaticInfo: {
            title: "3.2 Automatski prikupljene informacije",
            items: [
              "IP adresa i podaci o lokaciji",
              "Vrsta i verzija preglednika",
              "Informacije o uređaju",
              "Obrasci korištenja web stranice i analitika",
              "Kolačići i slične tehnologije praćenja"
            ]
          }
        },
        dataUsage: {
          title: "4. Kako koristimo vaše informacije",
          serviceDelivery: {
            title: "4.1 Pružanje usluga (pravna osnova: izvršavanje ugovora)",
            items: [
              "Pružanje savjetovanja i razvojnih usluga automatizacije",
              "Upravljanje projektima i komunikacija",
              "Tehnička podrška i održavanje",
              "Naplata i obrada plaćanja"
            ]
          },
          businessOps: {
            title: "4.2 Poslovne operacije (pravna osnova: legitimni interes)",
            items: [
              "Analitika web stranice i poboljšanja",
              "Praćenje sigurnosti i sprječavanje prijevara",
              "Poslovni razvoj i poboljšanje usluga"
            ]
          },
          marketing: {
            title: "4.3 Marketing (pravna osnova: pristanak)",
            items: [
              "Slanje biltena i uvida u automatizaciju",
              "Promoviranje relevantnih usluga i studija slučaja",
              "Pozivnice za događaje i webinare"
            ]
          }
        },
        dataDisclosure: {
          title: "5. Otkrivanje podataka",
          intro: "Ne prodajemo, trgujemo ili na drugi način prenosimo vaše osobne podatke trećim stranama osim:",
          serviceProviders: {
            title: "5.1 Pružatelji usluga",
            items: [
              "Web hosting (sigurno s pružateljima EU)",
              "Procesori plaćanja (samo za obradu plaćanja)",
              "Pružatelji e-pošte (za slanje dogovorenih komunikacija)",
              "Analitički alati (Google Analytics s anonimizacijom IP-a)"
            ]
          },
          legalRequirements: {
            title: "5.2 Pravni zahtjevi",
            items: [
              "Kada to zahtijeva zakon",
              "Za zaštitu naših prava ili imovine",
              "U dobroj vjeri za sprječavanje kriminalnih aktivnosti"
            ]
          }
        },
        dataSecurity: {
          title: "6. Sigurnost podataka",
          intro: "Implementirali smo odgovarajuće tehničke i organizacijske mjere za zaštitu vaših osobnih podataka od neovlaštenog pristupa, izmjene, otkrivanja ili uništenja.",
          measures: "Ove mjere uključuju:",
          items: [
            "SSL enkripcija za sve web komunikacije",
            "Sigurno pohranjivanje podataka s enkripcijom",
            "Redovite sigurnosne revizije i ažuriranja",
            "Ograničena prava pristupa samo ovlaštenom osoblju",
            "Sigurnosni protokoli za rukovanje podacima"
          ]
        },
        gdprRights: {
          title: "7. Vaša prava prema GDPR-u",
          intro: "Prema GDPR-u imate sljedeća prava:",
          rights: [
            "Pristup: Zatražite kopije vaših osobnih podataka",
            "Ispravak: Ispravite netočne ili nepotpune podatke",
            "Brisanje: Zatražite brisanje vaših podataka (\"pravo na zaborav\")",
            "Ograničenje: Ograničite kako obrađujemo vaše podatke",
            "Prenosivost: Primite svoje podatke u strukturiranom formatu",
            "Prigovor: Prigovorite obradi na temelju legitimnih interesa",
            "Povlačenje pristanka: Za marketinške komunikacije u bilo koje vrijeme"
          ],
          exercise: "Za ostvarivanje ovih prava kontaktirajte nas na info@flowko.io. Odgovorit ćemo u roku od 30 dana."
        },
        dataRetention: {
          title: "8. Čuvanje podataka",
          intro: "Vaše osobne podatke čuvamo samo onoliko dugo koliko je potrebno za svrhe navedene u ovim pravilima:",
          table: {
            headers: ["Vrsta podataka", "Razdoblje čuvanja"],
            rows: [
              ["Kontaktne informacije", "3 godine nakon zadnjeg kontakta"],
              ["Podaci o projektu", "7 godina (porezni zahtjevi)"],
              ["Analitički podaci", "26 mjeseci (Google Analytics)"],
              ["Kolačići", "Prema pravilima o kolačićima"]
            ]
          }
        },
        internationalTransfers: {
          title: "9. Međunarodni prijenosi",
          content: [
            "Vaši podaci se primarno obrađuju unutar EU. U slučajevima kada koristimo usluge trećih strana iz trećih zemalja (npr. Google Analytics), osiguravamo odgovarajuće zaštitne mjere:",
            "Svi prijenosi se provode u skladu s GDPR-om i slovenskim zakonom o zaštiti podataka."
          ],
          safeguards: [
            "Standardne ugovorne klauzule EU",
            "Odluke EU o prikladnosti",
            "Certifikacijske sheme (nasljednici Privacy Shield)"
          ]
        },
        automatedDecisions: {
          title: "10. Automatizirano donošenje odluka",
          content: [
            "Ne bavimo se automatiziranim donošenjem odluka ili profiliranjem koje bi moglo značajno utjecati na vas.",
            "Sve važne odluke donose se uz izravno ljudsko sudjelovanje."
          ]
        },
        policyUpdates: {
          title: "11. Ažuriranja pravila",
          content: [
            "Povremeno možemo ažurirati ova pravila. O značajnim promjenama obavijestit ćemo vas putem e-pošte ili obavijesti na web stranici.",
            "Redovito pregledavajte ova pravila za najnovije informacije o našim praksama zaštite podataka."
          ]
        },
        contact: {
          title: "12. Kontaktirajte nas",
          intro: "Za pitanja vezana uz privatnost ili za ostvarivanje vaših prava:",
          email: "E-mail:",
          general: "Opći kontakt:",
          support: "Podrška:",
          dpo: "Službenik za zaštitu podataka:",
          complaint: "Također imate pravo podnijeti pritužbu relevantnom nadzornom tijelu ako vjerujete da su vaša prava na zaštitu podataka prekršena."
        }
      }
    };
  */ 
  else {
    // English (default)
    return {
      title: "Privacy Policy",
      lastUpdated: "Last updated:",
      sections: {
        introduction: {
          title: "1. Introduction",
          content: [
            "Flowko (\"we,\" \"our,\" or \"us\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website flowko.io and use our automation services.",
            "This policy complies with the EU General Data Protection Regulation (GDPR) and applies to all personal data we process about you."
          ]
        },
        dataController: {
          title: "2. Data Controller",
          company: "Flowko",
          location: "Murska Sobota, Slovenia",
          email: "Email:",
          contact: "Contact:",
          dpo: "Data Protection Officer: David Vojvodic"
        },
        dataCollection: {
          title: "3. Information We Collect",
          providedInfo: {
            title: "3.1 Information You Provide",
            items: [
              "Contact information (name, email address, phone number)",
              "Company information (business name, industry, size)",
              "Communication preferences",
              "Technical requirements and project details",
              "Payment information (processed securely through third-party processors)"
            ]
          },
          automaticInfo: {
            title: "3.2 Information Automatically Collected",
            items: [
              "IP address and location data",
              "Browser type and version",
              "Device information",
              "Website usage patterns and analytics",
              "Cookies and similar tracking technologies"
            ]
          }
        },
        dataUsage: {
          title: "4. How We Use Your Information",
          serviceDelivery: {
            title: "4.1 Service Delivery (Legal Basis: Contract Performance)",
            items: [
              "Providing automation consultations and development services",
              "Project management and communication",
              "Technical support and maintenance",
              "Billing and payment processing"
            ]
          },
          businessOps: {
            title: "4.2 Business Operations (Legal Basis: Legitimate Interest)",
            items: [
              "Website analytics and improvement",
              "Security monitoring and fraud prevention",
              "Business development and service enhancement"
            ]
          },
          marketing: {
            title: "4.3 Marketing (Legal Basis: Consent)",
            items: [
              "Sending newsletters and automation insights",
              "Promoting relevant services and case studies",
              "Event invitations and webinars"
            ]
          }
        },
        dataDisclosure: {
          title: "5. Data Disclosure",
          intro: "We do not sell, trade, or otherwise transfer your personal information to third parties except:",
          serviceProviders: {
            title: "5.1 Service Providers",
            items: [
              "Website hosting (securely with EU providers)",
              "Payment processors (for payment processing only)",
              "Email providers (for sending agreed communications)",
              "Analytics tools (Google Analytics with IP anonymization)"
            ]
          },
          legalRequirements: {
            title: "5.2 Legal Requirements",
            items: [
              "When required by law",
              "To protect our rights or property",
              "In good faith to prevent criminal activity"
            ]
          }
        },
        dataSecurity: {
          title: "6. Data Security",
          intro: "We have implemented appropriate technical and organizational measures to safeguard your personal data against unauthorized access, alteration, disclosure, or destruction.",
          measures: "These measures include:",
          items: [
            "SSL encryption for all web communications",
            "Secure data storage with encryption",
            "Regular security audits and updates",
            "Limited access rights to authorized personnel only",
            "Security protocols for data handling"
          ]
        },
        gdprRights: {
          title: "7. Your GDPR Rights",
          intro: "Under GDPR, you have the following rights:",
          rights: [
            "Access: Request copies of your personal data",
            "Rectification: Correct inaccurate or incomplete data",
            "Erasure: Request deletion of your data (\"right to be forgotten\")",
            "Restriction: Limit how we process your data",
            "Portability: Receive your data in a structured format",
            "Objection: Object to processing based on legitimate interests",
            "Withdraw consent: For marketing communications at any time"
          ],
          exercise: "To exercise these rights, contact us at info@flowko.io. We will respond within 30 days."
        },
        dataRetention: {
          title: "8. Data Retention",
          intro: "We retain your personal data only as long as necessary for the purposes outlined in this policy:",
          table: {
            headers: ["Data Type", "Retention Period"],
            rows: [
              ["Contact information", "3 years after last contact"],
              ["Project data", "7 years (tax requirements)"],
              ["Analytics data", "26 months (Google Analytics)"],
              ["Cookies", "According to Cookie Policy"]
            ]
          }
        },
        internationalTransfers: {
          title: "9. International Transfers",
          content: [
            "Your data is primarily processed within the EU. In cases where we use third-party services from third countries (e.g., Google Analytics), we ensure appropriate safeguards:",
            "All transfers are conducted in compliance with GDPR and Slovenian data protection law."
          ],
          safeguards: [
            "EU Standard Contractual Clauses",
            "EU Adequacy Decisions",
            "Certification schemes (Privacy Shield successors)"
          ]
        },
        automatedDecisions: {
          title: "10. Automated Decision Making",
          content: [
            "We do not engage in automated decision-making or profiling that could significantly affect you.",
            "All important decisions are made with direct human involvement."
          ]
        },
        policyUpdates: {
          title: "11. Policy Updates",
          content: [
            "We may update this policy occasionally. We will notify you of material changes via email or website notice.",
            "Please review this policy regularly for the latest information on our data protection practices."
          ]
        },
        contact: {
          title: "12. Contact Us",
          intro: "For privacy-related questions or to exercise your rights:",
          email: "Email:",
          general: "General Contact:",
          support: "Support:",
          dpo: "Data Protection Officer:",
          complaint: "You also have the right to lodge a complaint with the relevant supervisory authority if you believe your data protection rights have been violated."
        }
      }
    };
  }
};

export default async function PrivacyPolicy({ params }: PrivacyPolicyProps) {
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
              <p className="body-2 text-n-4 mb-8">{content.lastUpdated} {new Date().toLocaleDateString()}</p>
              
              <div className="space-y-8">
                <section>
                  <h2 className="h3 mb-4">{content.sections.introduction.title}</h2>
                  {content.sections.introduction.content.map((paragraph, index) => (
                    <p key={index} className="body-1 mb-4">{paragraph}</p>
                  ))}
                </section>

                <section>
                  <h2 className="h3 mb-4">{content.sections.dataController.title}</h2>
                  <div className="body-1 space-y-2">
                    <p><strong>{content.sections.dataController.company}</strong></p>
                    <p>{content.sections.dataController.location}</p>
                    <p>{content.sections.dataController.email} <a href="mailto:info@flowko.io" className="text-color-1 hover:underline">info@flowko.io</a></p>
                    <p>{content.sections.dataController.contact} <a href="mailto:hello@flowko.io" className="text-color-1 hover:underline">hello@flowko.io</a></p>
                    <p>{content.sections.dataController.dpo}</p>
                  </div>
                </section>

                <section>
                  <h2 className="h3 mb-4">{content.sections.dataCollection.title}</h2>
                  
                  <h3 className="h4 mb-3">{content.sections.dataCollection.providedInfo.title}</h3>
                  <ul className="body-1 space-y-2 list-disc list-inside ml-4">
                    {content.sections.dataCollection.providedInfo.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>

                  <h3 className="h4 mb-3 mt-6">{content.sections.dataCollection.automaticInfo.title}</h3>
                  <ul className="body-1 space-y-2 list-disc list-inside ml-4">
                    {content.sections.dataCollection.automaticInfo.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="h3 mb-4">{content.sections.dataUsage.title}</h2>
                  
                  <h3 className="h4 mb-3">{content.sections.dataUsage.serviceDelivery.title}</h3>
                  <ul className="body-1 space-y-2 list-disc list-inside ml-4">
                    {content.sections.dataUsage.serviceDelivery.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>

                  <h3 className="h4 mb-3 mt-6">{content.sections.dataUsage.businessOps.title}</h3>
                  <ul className="body-1 space-y-2 list-disc list-inside ml-4">
                    {content.sections.dataUsage.businessOps.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>

                  <h3 className="h4 mb-3 mt-6">{content.sections.dataUsage.marketing.title}</h3>
                  <ul className="body-1 space-y-2 list-disc list-inside ml-4">
                    {content.sections.dataUsage.marketing.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="h3 mb-4">{content.sections.dataDisclosure.title}</h2>
                  <p className="body-1 mb-4">{content.sections.dataDisclosure.intro}</p>
                  
                  <h3 className="h4 mb-3">{content.sections.dataDisclosure.serviceProviders.title}</h3>
                  <ul className="body-1 space-y-2 list-disc list-inside ml-4">
                    {content.sections.dataDisclosure.serviceProviders.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>

                  <h3 className="h4 mb-3 mt-6">{content.sections.dataDisclosure.legalRequirements.title}</h3>
                  <ul className="body-1 space-y-2 list-disc list-inside ml-4">
                    {content.sections.dataDisclosure.legalRequirements.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="h3 mb-4">{content.sections.dataSecurity.title}</h2>
                  <p className="body-1 mb-4">{content.sections.dataSecurity.intro}</p>
                  <p className="body-1 mb-4">{content.sections.dataSecurity.measures}</p>
                  <ul className="body-1 space-y-2 list-disc list-inside ml-4">
                    {content.sections.dataSecurity.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="h3 mb-4">{content.sections.gdprRights.title}</h2>
                  <p className="body-1 mb-4">{content.sections.gdprRights.intro}</p>
                  <ul className="body-1 space-y-2 list-disc list-inside ml-4">
                    {content.sections.gdprRights.rights.map((right, index) => (
                      <li key={index}>{right}</li>
                    ))}
                  </ul>
                  <p className="body-1 mt-4">{content.sections.gdprRights.exercise}</p>
                </section>

                <section>
                  <h2 className="h3 mb-4">{content.sections.dataRetention.title}</h2>
                  <p className="body-1 mb-4">{content.sections.dataRetention.intro}</p>
                  <div className="bg-n-7 p-4 rounded-lg">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-n-6">
                          <th className="text-left py-2">{content.sections.dataRetention.table.headers[0]}</th>
                          <th className="text-left py-2">{content.sections.dataRetention.table.headers[1]}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {content.sections.dataRetention.table.rows.map((row, index) => (
                          <tr key={index} className="border-b border-n-8">
                            <td className="py-2 font-medium">{row[0]}</td>
                            <td className="py-2">{row[1]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section>
                  <h2 className="h3 mb-4">{content.sections.internationalTransfers.title}</h2>
                  {content.sections.internationalTransfers.content.map((paragraph, index) => (
                    <p key={index} className="body-1 mb-4">{paragraph}</p>
                  ))}
                  <ul className="body-1 space-y-2 list-disc list-inside ml-4">
                    {content.sections.internationalTransfers.safeguards.map((safeguard, index) => (
                      <li key={index}>{safeguard}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="h3 mb-4">{content.sections.automatedDecisions.title}</h2>
                  {content.sections.automatedDecisions.content.map((paragraph, index) => (
                    <p key={index} className="body-1 mb-4">{paragraph}</p>
                  ))}
                </section>

                <section>
                  <h2 className="h3 mb-4">{content.sections.policyUpdates.title}</h2>
                  {content.sections.policyUpdates.content.map((paragraph, index) => (
                    <p key={index} className="body-1 mb-4">{paragraph}</p>
                  ))}
                </section>

                <section>
                  <h2 className="h3 mb-4">{content.sections.contact.title}</h2>
                  <p className="body-1 mb-4">{content.sections.contact.intro}</p>
                  <div className="body-1 space-y-2">
                    <p><strong>{content.sections.contact.email}</strong> <a href="mailto:info@flowko.io" className="text-color-1 hover:underline">info@flowko.io</a></p>
                    <p><strong>{content.sections.contact.general}</strong> <a href="mailto:hello@flowko.io" className="text-color-1 hover:underline">hello@flowko.io</a></p>
                    <p><strong>{content.sections.contact.support}</strong> <a href="mailto:support@flowko.io" className="text-color-1 hover:underline">support@flowko.io</a></p>
                    <p><strong>{content.sections.contact.dpo}</strong> David Vojvodic</p>
                  </div>
                  <p className="body-1 mt-4">{content.sections.contact.complaint}</p>
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