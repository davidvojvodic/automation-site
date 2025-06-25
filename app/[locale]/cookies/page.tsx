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
    en: "Cookie Policy | Flowko - Website Tracking & Data Collection",
    sl: "Pravilnik o Piškotkih | Flowko - Sledenje Spletni Strani in Zbiranje Podatkov"
  };

  const descriptions = {
    en: "Cookie Policy and tracking information for Flowko website and automation services. Learn how we use cookies to improve your experience.",
    sl: "Pravilnik o piškotkih in informacije o sledenju za Flowko spletno stran in storitve avtomatizacije. Spoznajte, kako uporabljamo piškotke za izboljšanje vaše izkušnje."
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://flowko.io/${locale}/cookies`,
      languages: {
        'en': 'https://flowko.io/en/cookies',
        'sl': 'https://flowko.io/sl/cookies',
      },
    },
  };
}

// Multilingual content
const getContent = (locale: string) => {
  if (locale === 'sl') {
    return {
      title: "Pravilnik o piškotkih",
      lastUpdated: "Zadnjič posodobljeno:",
      sections: {
        intro: {
          title: "1. Kaj so piškotki",
          content: [
            "Piškotki so majhne besedilne datoteke, ki se shranijo v vašo napravo, ko obiščete našo spletno stran. Pomagajo nam vam nuditi boljšo izkušnjo z zapomnjenjem vaših nastavitev in analizo uporabe naše strani.",
            "Ta pravilnik o piškotkih pojasnjuje, kako Flowko uporablja piškotke in podobne tehnologije sledenja na flowko.io in povezanih domenah."
          ]
        },
        types: {
          title: "2. Vrste piškotkov, ki jih uporabljamo",
          essential: {
            title: "2.1 Bistveni piškotki",
            description: "Ti piškotki so potrebni za pravilno delovanje spletne strani in jih ni mogoče onemogočiti.",
            items: [
              { name: "NEXT_LOCALE", purpose: "Shranjuje jezikovno nastavitev", duration: "1 leto" },
              { name: "cookie-consent", purpose: "Zapomni si vaše nastavitve piškotkov", duration: "1 leto" }
            ]
          },
          analytics: {
            title: "2.2 Analitični piškotki",
            description: "Ti piškotki nam pomagajo razumeti, kako obiskovalci uporabljajo našo spletno stran.",
            items: [
              { name: "_ga", provider: "Google Analytics", purpose: "Razlikuje edinstvene uporabnike", duration: "2 leti" },
              { name: "_gid", provider: "Google Analytics", purpose: "Razlikuje edinstvene uporabnike", duration: "24 ur" }
            ]
          }
        },
        thirdParty: {
          title: "3. Piškotki tretjih oseb",
          content: [
            "Nekateri piškotki na naši spletni strani jih postavijo storitve tretjih oseb, ki se prikazujejo na naših straneh.",
            "Ti ponudniki tretjih oseb imajo lastne pravilnike o zasebnosti in piškotkih. Priporočamo, da si jih preberete."
          ],
          services: [
            { name: "Google Analytics", purpose: "Analitika spletne strani", website: "policies.google.com" },
            { name: "Google Fonts", purpose: "Spletne pisave", website: "policies.google.com" }
          ]
        },
        usage: {
          title: "4. Kako uporabljamo piškotke",
          purposes: [
            {
              title: "4.1 Zagotavljanje funkcionalnosti",
              items: [
                "Ohranjanje vaših jezikovnih nastavitev",
                "Zapomniti si vaše nastavitve piškotkov",
                "Zagotavljanje varnosti spletne strani"
              ]
            },
            {
              title: "4.2 Analiza in izboljšave",
              items: [
                "Merjenje obiska in uporabe spletne strani",
                "Razumevanje, katere vsebine so najbolj koristne",
                "Odkrivanje tehničnih težav in njihovo odpravljanje"
              ]
            },
            {
              title: "4.3 Komunikacija in trženje",
              items: [
                "Prilagajanje sporočil glede na vaše interese",
                "Merjenje uspešnosti trženjskih kampanj",
                "Zagotavljanje relevantne vsebine"
              ]
            }
          ]
        },
        retention: {
          title: "6. Hranjenje piškotkov",
          content: [
            "Različni piškotki se hranijo za različne časovne periode:",
            "Seja piškotki se izbrišejo, ko zaprete brskalnik. Trajni piškotki ostanejo shranjeni za določeno obdobje ali dokler jih ne izbrišete."
          ],
          periods: [
            { type: "Bistveni piškotki", duration: "Do 1 leta" },
            { type: "Analitični piškotki", duration: "Do 2 leti" },
            { type: "Funkcijski piškotki", duration: "Do 1 leta" }
          ]
        },
        updates: {
          title: "7. Posodobitve tega pravilnika",
          content: [
            "Občasno lahko posodobimo ta pravilnik o piškotkih, da odražajo spremembe v naših praksah ali iz drugih operacijskih, pravnih ali regulativnih razlogov.",
            "Večje spremembe bomo objavili na naši spletni strani in po potrebi vam pošljemo obvestilo po e-pošti.",
            "Redno preverite ta pravilnik za najnovejše informacije o naši uporabi piškotkov."
          ]
        },
        legal: {
          title: "8. Pravna osnova za obdelavo",
          content: "Naša pravna osnova za uporabo piškotkov temelji na:",
          bases: [
            { type: "Privolitev", description: "Za analitične in trženjske piškotke" },
            { type: "Upravičen interes", description: "Za izboljšanje naših storitev in varnost" },
            { type: "Izvršitev pogodbe", description: "Za piškotke, potrebne za delovanje storitve" }
          ]
        },
        transfers: {
          title: "10. Mednarodni prenosi",
          content: [
            "Nekateri naši ponudniki storitev tretjih oseb (kot je Google Analytics) lahko obdelujejo podatke iz piškotkov zunaj Evropskega gospodarskega prostora (EGP).",
            "Ti prenosi se izvajajo v skladu z ustreznimi zaščitnimi ukrepi, kot so:"
          ],
          safeguards: [
            "Sklepne določbe EU o ustreznosti",
            "Standardne pogodbene klavzule",
            "Certifikacijski programi, kot je Privacy Shield"
          ]
        },
        management: {
          title: "5. Upravljanje nastavitev piškotkov",
          subtitle1: "5.1 Pasica za piškotke",
          content1: "Ko prvič obiščete našo spletno stran, boste videli pasico za piškotke, kjer lahko:",
          items1: [
            "Sprejmete vse piškotke",
            "Sprejmete samo bistvene piškotke", 
            "Prilagodite svoje nastavitve po kategorijah",
            "Oglejte si podrobne informacije o vsaki vrsti piškotkov"
          ],
          subtitle2: "5.2 Spreminjanje nastavitev",
          content2: "Svoje nastavitve piškotkov lahko kadarkoli spremenite:",
          items2: [
            "S klikom na povezavo \"Nastavitve piškotkov\" v nogi strani",
            "Z uporabo nastavitev za upravljanje piškotkov v vašem brskalniku",
            "S kontaktiranjem na info@flowko.io"
          ]
        },
        rights: {
          title: "9. Vaše pravice",
          content: "Pod GDPR imate pravico:",
          items: [
            "Umakniti privolitev za uporabo piškotkov kadarkoli",
            "Dostopati do podatkov, zbranih preko piškotkov",
            "Zahtevati izbris podatkov, povezanih s piškotki",
            "Ugovarjati obdelavi za trženjske namene"
          ]
        },
        contact: {
          title: "11. Kontaktirajte nas",
          content: "Za vprašanja o naši uporabi piškotkov:",
          email: "E-pošta:",
          general: "Splošni kontakt:",
          dpo: "Pooblaščenec za varstvo podatkov: David Vojvodic"
        }
      }
    };
  } 
  // Temporarily disabled Croatian locale
  /* else if (locale === 'hr') {
    return {
      title: "Pravila o kolačićima",
      lastUpdated: "Zadnje ažuriranje:",
      sections: {
        intro: {
          title: "1. Što su kolačići",
          content: [
            "Kolačići su male tekstualne datoteke koje se pohranjuju na vašem uređaju kada posjećujete našu web stranicu. Pomažu nam pružiti vam bolje iskustvo pamćenjem vaših postavki i analizom kako koristite našu stranicu.",
            "Ova pravila o kolačićima objašnjavaju kako Flowko koristi kolačiće i slične tehnologije praćenja na flowko.io i povezanim domenama."
          ]
        },
        types: {
          title: "2. Vrste kolačića koje koristimo",
          essential: {
            title: "2.1 Osnovni kolačići",
            description: "Ovi kolačići su potrebni za funkcioniranje web stranice i ne mogu se onemogućiti.",
            items: [
              { name: "NEXT_LOCALE", purpose: "Pohranjuje jezičnu postavku", duration: "1 godina" },
              { name: "cookie-consent", purpose: "Pamti vaše postavke kolačića", duration: "1 godina" }
            ]
          },
          analytics: {
            title: "2.2 Analitički kolačići",
            description: "Ovi kolačići nam pomažu razumjeti kako posjetitelji koriste našu web stranicu.",
            items: [
              { name: "_ga", provider: "Google Analytics", purpose: "Razlikuje jedinstvene korisnike", duration: "2 godine" },
              { name: "_gid", provider: "Google Analytics", purpose: "Razlikuje jedinstvene korisnike", duration: "24 sata" }
            ]
          }
        },
        thirdParty: {
          title: "3. Kolačići trećih strana",
          content: [
            "Neki kolačići na našoj web stranici postavljaju ih usluge trećih strana koje se prikazuju na našim stranicama.",
            "Ovi pružatelji trećih strana imaju vlastite pravilnike privatnosti i kolačića. Preporučujemo da ih pročitate."
          ],
          services: [
            { name: "Google Analytics", purpose: "Analitika web stranice", website: "policies.google.com" },
            { name: "Google Fonts", purpose: "Web fontovi", website: "policies.google.com" }
          ]
        },
        usage: {
          title: "4. Kako koristimo kolačiće",
          purposes: [
            {
              title: "4.1 Osiguravanje funkcionalnosti",
              items: [
                "Očuvanje vaših jezikovnih postavki",
                "Pamti vaše postavke kolačića",
                "Osiguravanje sigurnosti web stranice"
              ]
            },
            {
              title: "4.2 Analiza i poboljšanja",
              items: [
                "Mjerenje posjeta i korištenja web stranice",
                "Razumijevanje koji sadržaj je najkorisniji",
                "Otkrivanje tehničkih problema i njihovo rješavanje"
              ]
            },
            {
              title: "4.3 Komunikacija i marketing",
              items: [
                "Prilagodba poruka prema vašim interesima",
                "Mjerenje uspjeha marketinških kampanja",
                "Pružanje relevantnog sadržaja"
              ]
            }
          ]
        },
        retention: {
          title: "6. Čuvanje kolačića",
          content: [
            "Različiti kolačići se čuvaju za različite vremenske periode:",
            "Sesijski kolačići se brišu kada zatvorite preglednik. Trajni kolačići ostaju pohranjeni određeno razdoblje ili dokler ih ne obrišete."
          ],
          periods: [
            { type: "Osnovni kolačići", duration: "Do 1 godine" },
            { type: "Analitički kolačići", duration: "Do 2 godine" },
            { type: "Funkcijski kolačići", duration: "Do 1 godine" }
          ]
        },
        updates: {
          title: "7. Ažuriranja ovog pravilnika",
          content: [
            "Povišasno možemo ažurirati ovaj pravilnik o kolačićima kako bi odrazili promjene u našim praksama ili iz drugih operacijskih, pravnih ili regulatornih razloga.",
            "Veće promjene objavit ćemo na našoj web stranici i po potrebi poslati vam obaviješt po e-mailu.",
            "Redovito provjerite ovaj pravilnik za najnovije informacije o našoj upotrebi kolačića."
          ]
        },
        legal: {
          title: "8. Pravni temelj za obradu",
          content: "Naš pravni temelj za upotrebu kolačića temelji se na:",
          bases: [
            { type: "Pristanak", description: "Za analitičke i marketinške kolačiće" },
            { type: "Legitimni interes", description: "Za poboljšanje naših usluga i sigurnost" },
            { type: "Izvršavanje ugovora", description: "Za kolačiće potrebne za funkcioniranje usluge" }
          ]
        },
        transfers: {
          title: "10. Međunarodni prijenosi",
          content: [
            "Neki naši pružatelji usluga trećih strana (kao što je Google Analytics) mogu obraditi podatke iz kolačića izvan Europskog gospodarskog prostora (EGP).",
            "Ovi prijenosi se izvršavaju u skladu s odgovarajućim zaštitnim mjerama, kao što su:"
          ],
          safeguards: [
            "EU odluke o prikladnosti",
            "Standardne ugovorne klauzule",
            "Certifikacijski programi poput Privacy Shield"
          ]
        },
        management: {
          title: "5. Upravljanje postavkama kolačića",
          subtitle1: "5.1 Traka za kolačiće",
          content1: "Kada prvi put posjećujete našu web stranicu, vidjet ćete traku za kolačiće gdje možete:",
          items1: [
            "Prihvatiti sve kolačiće",
            "Prihvatiti samo osnovne kolačiće",
            "Prilagoditi postavke po kategorijama", 
            "Pregledati detaljne informacije o svakoj vrsti kolačića"
          ],
          subtitle2: "5.2 Mijenjanje postavki",
          content2: "Možete promijeniti postavke kolačića u bilo koje vrijeme:",
          items2: [
            "Klikom na poveznicu \"Postavke kolačića\" u podnožju stranice",
            "Korištenjem postavki za upravljanje kolačićima u vašem pregledniku",
            "Kontaktiranjem na info@flowko.io"
          ]
        },
        rights: {
          title: "9. Vaša prava",
          content: "Pod GDPR-om imate pravo:",
          items: [
            "Povući pristanak za korištenje kolačića u bilo koje vrijeme",
            "Pristupiti podacima prikupljenim preko kolačića",
            "Zatražiti brisanje podataka povezanih s kolačićima",
            "Prigovoriti obradi u marketinške svrhe"
          ]
        },
        contact: {
          title: "11. Kontaktirajte nas",
          content: "Za pitanja o našoj upotrebi kolačića:",
          email: "E-mail:",
          general: "Opći kontakt:",
          dpo: "Službenik za zaštitu podataka: David Vojvodic"
        }
      }
    };
  */ 
  else {
    // English (default)
    return {
      title: "Cookie Policy",
      lastUpdated: "Last updated:",
      sections: {
        intro: {
          title: "1. What Are Cookies",
          content: [
            "Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and analyzing how you use our site.",
            "This Cookie Policy explains how Flowko uses cookies and similar tracking technologies on flowko.io and related domains."
          ]
        },
        types: {
          title: "2. Types of Cookies We Use",
          essential: {
            title: "2.1 Essential Cookies",
            description: "These cookies are necessary for the website to function properly and cannot be disabled.",
            items: [
              { name: "NEXT_LOCALE", purpose: "Stores language preference", duration: "1 year" },
              { name: "cookie-consent", purpose: "Remembers your cookie preferences", duration: "1 year" }
            ]
          },
          analytics: {
            title: "2.2 Analytics Cookies",
            description: "These cookies help us understand how visitors interact with our website.",
            items: [
              { name: "_ga", provider: "Google Analytics", purpose: "Distinguishes unique users", duration: "2 years" },
              { name: "_gid", provider: "Google Analytics", purpose: "Distinguishes unique users", duration: "24 hours" }
            ]
          }
        },
        thirdParty: {
          title: "3. Third-Party Cookies",
          content: [
            "Some cookies on our website are set by third-party services that appear on our pages.",
            "These third-party providers have their own privacy and cookie policies. We recommend reading them."
          ],
          services: [
            { name: "Google Analytics", purpose: "Website analytics", website: "policies.google.com" },
            { name: "Google Fonts", purpose: "Web fonts", website: "policies.google.com" }
          ]
        },
        usage: {
          title: "4. How We Use Cookies",
          purposes: [
            {
              title: "4.1 Providing Functionality",
              items: [
                "Maintaining your language preferences",
                "Remembering your cookie preferences",
                "Ensuring website security"
              ]
            },
            {
              title: "4.2 Analysis and Improvements",
              items: [
                "Measuring website visits and usage",
                "Understanding which content is most useful",
                "Identifying technical issues and resolving them"
              ]
            },
            {
              title: "4.3 Communication and Marketing",
              items: [
                "Customizing messages based on your interests",
                "Measuring marketing campaign success",
                "Providing relevant content"
              ]
            }
          ]
        },
        retention: {
          title: "6. Cookie Retention",
          content: [
            "Different cookies are stored for different time periods:",
            "Session cookies are deleted when you close your browser. Persistent cookies remain stored for a specific period or until you delete them."
          ],
          periods: [
            { type: "Essential cookies", duration: "Up to 1 year" },
            { type: "Analytics cookies", duration: "Up to 2 years" },
            { type: "Functional cookies", duration: "Up to 1 year" }
          ]
        },
        updates: {
          title: "7. Updates to This Policy",
          content: [
            "We may occasionally update this Cookie Policy to reflect changes in our practices or for other operational, legal, or regulatory reasons.",
            "We will post any major changes on our website and, where necessary, notify you by email.",
            "Please check this policy regularly for the latest information about our use of cookies."
          ]
        },
        legal: {
          title: "8. Legal Basis for Processing",
          content: "Our legal basis for using cookies is based on:",
          bases: [
            { type: "Consent", description: "For analytics and marketing cookies" },
            { type: "Legitimate Interest", description: "For improving our services and security" },
            { type: "Contract Performance", description: "For cookies necessary for service operation" }
          ]
        },
        transfers: {
          title: "10. International Transfers",
          content: [
            "Some of our third-party service providers (such as Google Analytics) may process cookie data outside the European Economic Area (EEA).",
            "These transfers are carried out with appropriate safeguards, such as:"
          ],
          safeguards: [
            "EU adequacy decisions",
            "Standard contractual clauses",
            "Certification schemes such as Privacy Shield"
          ]
        },
        management: {
          title: "5. Managing Your Cookie Preferences",
          subtitle1: "5.1 Cookie Banner",
          content1: "When you first visit our website, you'll see a cookie banner where you can:",
          items1: [
            "Accept all cookies",
            "Accept only essential cookies",
            "Customize your preferences by category",
            "View detailed information about each cookie type"
          ],
          subtitle2: "5.2 Changing Preferences",
          content2: "You can change your cookie preferences at any time by:",
          items2: [
            "Clicking the \"Cookie Settings\" link in our footer",
            "Using your browser's cookie management settings",
            "Contacting us at info@flowko.io"
          ]
        },
        rights: {
          title: "9. Your Rights",
          content: "Under GDPR, you have the right to:",
          items: [
            "Withdraw consent for cookie use at any time",
            "Access data collected through cookies",
            "Request deletion of cookie-related data",
            "Object to processing for marketing purposes"
          ]
        },
        contact: {
          title: "11. Contact Us",
          content: "For questions about our use of cookies:",
          email: "Email:",
          general: "General Contact:",
          dpo: "Data Protection Officer: David Vojvodic"
        }
      }
    };
  }
};

interface CookiePolicyProps {
  params: Promise<{ locale: string }>;
}

export default async function CookiePolicy({ params }: CookiePolicyProps) {
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
              <h2 className="h3 mb-4">{content.sections.intro.title}</h2>
              {content.sections.intro.content.map((paragraph, index) => (
                <p key={index} className="body-1 mb-4">{paragraph}</p>
              ))}
            </section>

            <section>
              <h2 className="h3 mb-4">{content.sections.types.title}</h2>
              
              <h3 className="h4 mb-3">{content.sections.types.essential.title}</h3>
              <p className="body-1 mb-3">{content.sections.types.essential.description}</p>
              <div className="bg-n-7 p-4 rounded-lg">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-n-6">
                      <th className="text-left py-2">Cookie Name</th>
                      <th className="text-left py-2">Purpose</th>
                      <th className="text-left py-2">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.sections.types.essential.items.map((item, index) => (
                      <tr key={index} className="border-b border-n-8">
                        <td className="py-2 font-medium">{item.name}</td>
                        <td className="py-2">{item.purpose}</td>
                        <td className="py-2">{item.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="h4 mb-3 mt-6">{content.sections.types.analytics.title}</h3>
              <p className="body-1 mb-3">{content.sections.types.analytics.description}</p>
              <div className="bg-n-7 p-4 rounded-lg">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-n-6">
                      <th className="text-left py-2">Cookie Name</th>
                      <th className="text-left py-2">Provider</th>
                      <th className="text-left py-2">Purpose</th>
                      <th className="text-left py-2">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.sections.types.analytics.items.map((item, index) => (
                      <tr key={index} className="border-b border-n-8">
                        <td className="py-2 font-medium">{item.name}</td>
                        <td className="py-2">{item.provider}</td>
                        <td className="py-2">{item.purpose}</td>
                        <td className="py-2">{item.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="h3 mb-4">{content.sections.thirdParty.title}</h2>
              {content.sections.thirdParty.content.map((paragraph, index) => (
                <p key={index} className="body-1 mb-4">{paragraph}</p>
              ))}
              <div className="bg-n-7 p-4 rounded-lg">
                <div className="space-y-3">
                  {content.sections.thirdParty.services.map((service, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="body-1 font-medium">{service.name}</p>
                        <p className="body-2 text-n-4">{service.purpose}</p>
                      </div>
                      <a href={`https://${service.website}`} className="text-color-1 hover:underline text-sm">
                        {service.website}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <h2 className="h3 mb-4">{content.sections.usage.title}</h2>
              {content.sections.usage.purposes.map((purpose, index) => (
                <div key={index} className="mb-6">
                  <h3 className="h4 mb-3">{purpose.title}</h3>
                  <ul className="body-1 space-y-2 list-disc list-inside ml-4">
                    {purpose.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            <section>
              <h2 className="h3 mb-4">{content.sections.management.title}</h2>
              
              <h3 className="h4 mb-3">{content.sections.management.subtitle1}</h3>
              <p className="body-1 mb-4">{content.sections.management.content1}</p>
              <ul className="body-1 space-y-2 list-disc list-inside ml-4 mb-4">
                {content.sections.management.items1.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h3 className="h4 mb-3">{content.sections.management.subtitle2}</h3>
              <p className="body-1 mb-4">{content.sections.management.content2}</p>
              <ul className="body-1 space-y-2 list-disc list-inside ml-4">
                {content.sections.management.items2.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="h3 mb-4">{content.sections.retention.title}</h2>
              {content.sections.retention.content.map((paragraph, index) => (
                <p key={index} className="body-1 mb-4">{paragraph}</p>
              ))}
              <div className="bg-n-7 p-4 rounded-lg">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-n-6">
                      <th className="text-left py-2">Cookie Type</th>
                      <th className="text-left py-2">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.sections.retention.periods.map((period, index) => (
                      <tr key={index} className="border-b border-n-8">
                        <td className="py-2 font-medium">{period.type}</td>
                        <td className="py-2">{period.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="h3 mb-4">{content.sections.updates.title}</h2>
              {content.sections.updates.content.map((paragraph, index) => (
                <p key={index} className="body-1 mb-4">{paragraph}</p>
              ))}
            </section>

            <section>
              <h2 className="h3 mb-4">{content.sections.legal.title}</h2>
              <p className="body-1 mb-4">{content.sections.legal.content}</p>
              <div className="bg-n-7 p-4 rounded-lg space-y-3">
                {content.sections.legal.bases.map((basis, index) => (
                  <div key={index}>
                    <p className="body-1 font-medium">{basis.type}</p>
                    <p className="body-2 text-n-4">{basis.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="h3 mb-4">{content.sections.rights.title}</h2>
              <p className="body-1 mb-4">{content.sections.rights.content}</p>
              <ul className="body-1 space-y-2 list-disc list-inside ml-4">
                {content.sections.rights.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="h3 mb-4">{content.sections.transfers.title}</h2>
              {content.sections.transfers.content.map((paragraph, index) => (
                <p key={index} className="body-1 mb-4">{paragraph}</p>
              ))}
              <ul className="body-1 space-y-2 list-disc list-inside ml-4">
                {content.sections.transfers.safeguards.map((safeguard, index) => (
                  <li key={index}>{safeguard}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="h3 mb-4">{content.sections.contact.title}</h2>
              <p className="body-1 mb-4">{content.sections.contact.content}</p>
              <div className="body-1 space-y-2">
                <p><strong>{content.sections.contact.email}</strong> <a href="mailto:info@flowko.io" className="text-color-1 hover:underline">info@flowko.io</a></p>
                <p><strong>{content.sections.contact.general}</strong> <a href="mailto:info@flowko.io" className="text-color-1 hover:underline">info@flowko.io</a></p>
                <p><strong>{content.sections.contact.dpo}</strong></p>
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