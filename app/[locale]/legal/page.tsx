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
    en: "Legal Notice | Flowko - Business Registration & Company Information",
    sl: "Pravno Obvestilo | Flowko - Registracija Podjetja in Informacije o Družbi"
  };

  const descriptions = {
    en: "Legal notice and business registration information for Flowko. Official company details and regulatory compliance information.",
    sl: "Pravno obvestilo in informacije o registraciji podjetja za Flowko. Uradne podrobnosti podjetja in informacije o skladnosti s predpisi."
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://flowko.io/${locale}/legal`,
      languages: {
        'en': 'https://flowko.io/en/legal',
        'sl': 'https://flowko.io/sl/legal',
      },
    },
  };
}

// Multilingual content
const getContent = (locale: string) => {
  if (locale === 'sl') {
    return {
      title: "Pravno obvestilo",
      subtitle: "Informacije v skladu z zahtevami EU",
      sections: {
        business: {
          title: "Poslovne informacije",
          items: [
            { label: "Ime podjetja", value: "Flowko" },
            { label: "Vrsta podjetja", value: "Storitve avtomatizacije in spletnega razvoja" },
            { label: "Lokacija", value: "Murska Sobota, Slovenija" },
            { label: "Država", value: "Republika Slovenija" }
          ]
        },
        contact: {
          title: "Kontaktne informacije",
          primary: { label: "Glavna e-pošta", value: "info@flowko.io" },
          business: { label: "Poslovni kontakt", value: "david.vojvodic@flowko.io" },
          support: { label: "Podpora", value: "support@flowko.io" },
          legal: { label: "Pravne zadeve", value: "info@flowko.io" },
          website: { label: "Spletna stran", value: "flowko.io" },
          altDomains: {
            label: "Alternativne domene",
            values: ["flowkoautomation.com", "flowkosolutions.com"]
          }
        },
        representative: {
          title: "Pooblaščeni predstavnik",
          items: [
            { label: "Ime", value: "David Vojvodic" },
            { label: "Vloga", value: "Ustanovitelj in izvršni direktor" },
            { label: "Odgovornosti", value: "Poslovne operacije, pooblaščenec za varstvo podatkov" },
            { label: "Kontakt", value: "david.vojvodic@flowko.io" }
          ]
        },
        services: {
          title: "Ponujene storitve",
          items: [
            {
              title: "Avtomatizacija poslovnih procesov",
              description: "Razvoj delovnih tokov po meri z uporabo n8n, Make in drugih platform za avtomatizacijo"
            },
            {
              title: "Paket spletne strani + avtomatizacija",
              description: "Profesionalno ustvarjanje spletnih strani z integriranimi avtomatiziranimi delovnimi tokovi"
            },
            {
              title: "Rešitve z umetno inteligenco",
              description: "Večagentski delovni tokovi, inteligenca dokumentov in napovedni analitika"
            },
            {
              title: "Svetovanje in usposabljanje",
              description: "Strategija avtomatizacije, navodila za implementacijo in usposabljanje ekipe"
            },
            {
              title: "Upravljane storitve",
              description: "24/7 spremljanje, vzdrževanje in stalna optimizacija sistemov avtomatizacije"
            }
          ]
        },
        compliance: {
          title: "Skladnost s predpisi",
          items: [
            {
              title: "Varstvo podatkov",
              description: "Popolnoma skladno z EU Splošno uredbo o varstvu podatkov (GDPR) in slovenskimi zakoni o varstvu podatkov."
            },
            {
              title: "Registracija podjetja",
              description: "Registrirana poslovni subjekt v Republiki Sloveniji z vsemi potrebnimi dovoljenji za digitalne storitve."
            },
            {
              title: "Skladnost z davki",
              description: "Za DDV registriran subjekt, ki zagotavlja storitve v EU. Vsa fakturiranja so v skladu z davčnimi predpisi EU."
            }
          ]
        },
        contact_legal: {
          title: "Kontakt za pravne zadeve",
          content: "Za pravne poizvedbe, vprašanja o skladnosti ali uradno korespondenco:",
          items: [
            { label: "E-pošta:", value: "info@flowko.io" },
            { label: "Varstvo podatkov:", value: "info@flowko.io" },
            { label: "Poslovne poizvedbe:", value: "info@flowko.io" }
          ],
          footer: "To pravno obvestilo je bilo nazadnje posodobljeno dne {date} in je v skladu z zahtevami EU glede preglednosti."
        }
      }
    };
  } 
  // Temporarily disabled Croatian locale
  /* else if (locale === 'hr') {
    return {
      title: "Pravna obavijest",
      subtitle: "Informacije u skladu s EU zahtjevima",
      sections: {
        business: {
          title: "Poslovne informacije",
          items: [
            { label: "Naziv tvrtke", value: "Flowko" },
            { label: "Vrsta poslovanja", value: "Usluge automatizacije i web razvoja" },
            { label: "Lokacija", value: "Murska Sobota, Slovenija" },
            { label: "Država", value: "Republika Slovenija" }
          ]
        },
        contact: {
          title: "Kontaktne informacije",
          primary: { label: "Glavni e-mail", value: "info@flowko.io" },
          business: { label: "Poslovni kontakt", value: "david.vojvodic@flowko.io" },
          support: { label: "Podrška", value: "support@flowko.io" },
          legal: { label: "Pravni upiti", value: "info@flowko.io" },
          website: { label: "Web stranica", value: "flowko.io" },
          altDomains: {
            label: "Alternativne domene",
            values: ["flowkoautomation.com", "flowkosolutions.com"]
          }
        },
        representative: {
          title: "Ovlašteni predstavnik",
          items: [
            { label: "Ime", value: "David Vojvodic" },
            { label: "Uloga", value: "Osnivač i izvršni direktor" },
            { label: "Odgovornosti", value: "Poslovne operacije, službenik za zaštitu podataka" },
            { label: "Kontakt", value: "david.vojvodic@flowko.io" }
          ]
        },
        services: {
          title: "Ponuđene usluge",
          items: [
            {
              title: "Automatizacija poslovnih procesa",
              description: "Prilagođeni razvoj radnih tokova koristeći n8n, Make i druge platforme za automatizaciju"
            },
            {
              title: "Paket web stranice + automatizacija",
              description: "Profesionalno stvaranje web stranica s integriranim automatiziranim radnim tokovima"
            },
            {
              title: "Rješenja s umjetnom inteligencijom",
              description: "Višeagentski radni tokovi, inteligencija dokumenata i prediktivna analitika"
            },
            {
              title: "Savjetovanje i obuka",
              description: "Strategija automatizacije, vodiči za implementaciju i obuka tima"
            },
            {
              title: "Upravljane usluge",
              description: "24/7 praćenje, održavanje i kontinuirana optimizacija sustava automatizacije"
            }
          ]
        },
        compliance: {
          title: "Usklađenost s propisima",
          items: [
            {
              title: "Zaštita podataka",
              description: "Potpuno u skladu s EU Općom uredbom o zaštiti podataka (GDPR) i slovenskim zakonima o zaštiti podataka."
            },
            {
              title: "Registracija tvrtke",
              description: "Registrirani poslovni subjekt u Republici Sloveniji sa svim potrebnim dozvolama za digitalne usluge."
            },
            {
              title: "Porezna usklađenost",
              description: "Za PDV registrirani subjekt koji pruža usluge unutar EU. Sva fakturiranja su u skladu s EU poreznim propisima."
            }
          ]
        },
        contact_legal: {
          title: "Kontakt za pravne stvari",
          content: "Za pravne upite, pitanja o usklađenosti ili službenu korespondencu:",
          items: [
            { label: "E-mail:", value: "info@flowko.io" },
            { label: "Zaštita podataka:", value: "info@flowko.io" },
            { label: "Poslovni upiti:", value: "info@flowko.io" }
          ],
          footer: "Ova pravna obavijest je zadnji put ažurirana {date} i u skladu je s EU zahtjevima za transparentnost."
        }
      }
    };
  */ 
  else {
    // English (default)
    return {
      title: "Legal Notice / Imprint",
      subtitle: "Information according to EU requirements",
      sections: {
        business: {
          title: "Business Information",
          items: [
            { label: "Company Name", value: "Flowko" },
            { label: "Business Type", value: "Automation & Web Development Services" },
            { label: "Location", value: "Murska Sobota, Slovenia" },
            { label: "Country", value: "Republic of Slovenia" }
          ]
        },
        contact: {
          title: "Contact Information",
          primary: { label: "Primary Email", value: "info@flowko.io" },
          business: { label: "Business Contact", value: "david.vojvodic@flowko.io" },
          support: { label: "Support", value: "support@flowko.io" },
          legal: { label: "Legal Inquiries", value: "info@flowko.io" },
          website: { label: "Website", value: "flowko.io" },
          altDomains: {
            label: "Alternative Domains",
            values: ["flowkoautomation.com", "flowkosolutions.com"]
          }
        },
        representative: {
          title: "Authorized Representative",
          items: [
            { label: "Name", value: "David Vojvodic" },
            { label: "Role", value: "Founder & CEO" },
            { label: "Responsibilities", value: "Business Operations, Data Protection Officer" },
            { label: "Contact", value: "david.vojvodic@flowko.io" }
          ]
        },
        services: {
          title: "Services Offered",
          items: [
            {
              title: "Business Process Automation",
              description: "Custom workflow development using n8n, Make, and other automation platforms"
            },
            {
              title: "Website + Automation Bundle",
              description: "Professional website creation with integrated automation workflows"
            },
            {
              title: "AI-Powered Solutions",
              description: "Multi-agent workflows, document intelligence, and predictive analytics"
            },
            {
              title: "Consulting & Training",
              description: "Automation strategy, implementation guidance, and team training"
            },
            {
              title: "Managed Services",
              description: "24/7 monitoring, maintenance, and continuous optimization of automation systems"
            }
          ]
        },
        compliance: {
          title: "Regulatory Compliance",
          items: [
            {
              title: "Data Protection",
              description: "Fully compliant with EU General Data Protection Regulation (GDPR) and Slovenian data protection laws."
            },
            {
              title: "Business Registration",
              description: "Registered business entity in the Republic of Slovenia with all required permits for digital services."
            },
            {
              title: "Tax Compliance",
              description: "VAT registered entity providing services within the EU. All invoicing complies with EU tax regulations."
            }
          ]
        },
        contact_legal: {
          title: "Contact for Legal Matters",
          content: "For legal inquiries, compliance questions, or official correspondence:",
          items: [
            { label: "Email:", value: "info@flowko.io" },
            { label: "Data Protection:", value: "info@flowko.io" },
            { label: "Business Inquiries:", value: "info@flowko.io" }
          ],
          footer: "This legal notice was last updated on {date} and complies with EU transparency requirements."
        }
      }
    };
  }
};

interface LegalNoticeProps {
  params: Promise<{ locale: string }>;
}

export default async function LegalNotice({ params }: LegalNoticeProps) {
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
          <p className="body-2 text-n-4 mb-8">{content.subtitle}</p>
          
          <div className="space-y-8">
            <section>
              <h2 className="h3 mb-4">{content.sections.business.title}</h2>
              <div className="bg-n-7 p-6 rounded-lg space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {content.sections.business.items.map((item, index) => (
                    <div key={index}>
                      <p className="body-2 text-n-4 mb-1">{item.label}</p>
                      <p className="body-1 font-semibold">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <h2 className="h3 mb-4">{content.sections.contact.title}</h2>
              <div className="bg-n-7 p-6 rounded-lg space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="body-2 text-n-4 mb-1">{content.sections.contact.primary.label}</p>
                    <p className="body-1">
                      <a href={`mailto:${content.sections.contact.primary.value}`} className="text-color-1 hover:underline">
                        {content.sections.contact.primary.value}
                      </a>
                    </p>
                  </div>
                  <div>
                    <p className="body-2 text-n-4 mb-1">{content.sections.contact.business.label}</p>
                    <p className="body-1">
                      <a href={`mailto:${content.sections.contact.business.value}`} className="text-color-1 hover:underline">
                        {content.sections.contact.business.value}
                      </a>
                    </p>
                  </div>
                  <div>
                    <p className="body-2 text-n-4 mb-1">{content.sections.contact.support.label}</p>
                    <p className="body-1">
                      <a href={`mailto:${content.sections.contact.support.value}`} className="text-color-1 hover:underline">
                        {content.sections.contact.support.value}
                      </a>
                    </p>
                  </div>
                  <div>
                    <p className="body-2 text-n-4 mb-1">{content.sections.contact.legal.label}</p>
                    <p className="body-1">
                      <a href={`mailto:${content.sections.contact.legal.value}`} className="text-color-1 hover:underline">
                        {content.sections.contact.legal.value}
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-n-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="body-2 text-n-4 mb-1">{content.sections.contact.website.label}</p>
                      <p className="body-1">
                        <a href={`https://${content.sections.contact.website.value}`} className="text-color-1 hover:underline">
                          {content.sections.contact.website.value}
                        </a>
                      </p>
                    </div>
                    <div>
                      <p className="body-2 text-n-4 mb-1">{content.sections.contact.altDomains.label}</p>
                      <div className="space-y-1">
                        {content.sections.contact.altDomains.values.map((domain, index) => (
                          <p key={index} className="body-1">
                            <a href={`https://${domain}`} className="text-color-1 hover:underline">
                              {domain}
                            </a>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="h3 mb-4">{content.sections.representative.title}</h2>
              <div className="bg-n-7 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {content.sections.representative.items.map((item, index) => (
                    <div key={index}>
                      <p className="body-2 text-n-4 mb-1">{item.label}</p>
                      <p className="body-1 font-semibold">
                        {item.label === "Contact" ? (
                          <a href={`mailto:${item.value}`} className="text-color-1 hover:underline">
                            {item.value}
                          </a>
                        ) : (
                          item.value
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <h2 className="h3 mb-4">{content.sections.services.title}</h2>
              <div className="bg-n-7 p-6 rounded-lg">
                <ul className="space-y-3">
                  {content.sections.services.items.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-color-1 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <div>
                        <p className="body-1 font-semibold">{item.title}</p>
                        <p className="body-2 text-n-4">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section>
              <h2 className="h3 mb-4">{content.sections.compliance.title}</h2>
              <div className="bg-n-7 p-6 rounded-lg space-y-4">
                {content.sections.compliance.items.map((item, index) => (
                  <div key={index}>
                    <p className="body-1 font-semibold mb-2">{item.title}</p>
                    <p className="body-2 text-n-4">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="h3 mb-4">{content.sections.contact_legal.title}</h2>
              <div className="bg-n-7 p-6 rounded-lg">
                <p className="body-1 mb-4">{content.sections.contact_legal.content}</p>
                <div className="space-y-2">
                  {content.sections.contact_legal.items.map((item, index) => (
                    <p key={index} className="body-1">
                      <strong>{item.label}</strong> <a href={`mailto:${item.value}`} className="text-color-1 hover:underline">{item.value}</a>
                    </p>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <p className="body-2 text-n-4 text-center border-t border-n-6 pt-6">
                {content.sections.contact_legal.footer.replace('{date}', new Date().toLocaleDateString())}
              </p>
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