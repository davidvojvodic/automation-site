/**
 * Structured Data Utilities for SEO
 *
 * This module provides reusable schema.org utilities for generating
 * structured data to improve search engine visibility and rich snippets.
 */

export interface ServiceSchema {
  name: string;
  description: string;
  provider: {
    name: string;
    url: string;
  };
  serviceType: string;
  areaServed: string[];
  offers?: {
    name: string;
    price: string;
    priceCurrency: string;
    description: string;
  }[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface LocalBusinessData {
  name: string;
  description: string;
  url: string;
  telephone?: string;
  address: {
    streetAddress?: string;
    addressLocality: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry: string;
  };
  openingHours?: string[];
  serviceArea: string[];
  languages: string[];
}

/**
 * Generate Service schema for automation services
 */
export function generateServiceSchema(services: ServiceSchema[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Flowko Automation Services",
    "description": "AI-powered business process automation services",
    "numberOfItems": services.length,
    "itemListElement": services.map((service, index) => ({
      "@type": "Service",
      "position": index + 1,
      "name": service.name,
      "description": service.description,
      "serviceType": service.serviceType,
      "provider": {
        "@type": "Organization",
        "name": service.provider.name,
        "url": service.provider.url,
      },
      "areaServed": service.areaServed.map(area => ({
        "@type": "Country",
        "name": area,
      })),
      "offers": service.offers?.map(offer => ({
        "@type": "Offer",
        "name": offer.name,
        "price": offer.price,
        "priceCurrency": offer.priceCurrency,
        "description": offer.description,
      })),
    })),
  };
}

/**
 * Generate FAQ schema for frequently asked questions
 */
export function generateFAQSchema(faqs: FAQItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

/**
 * Generate LocalBusiness schema for Slovenia market
 */
export function generateLocalBusinessSchema(data: LocalBusinessData): object {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": data.name,
    "description": data.description,
    "url": data.url,
    "telephone": data.telephone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": data.address.streetAddress,
      "addressLocality": data.address.addressLocality,
      "addressRegion": data.address.addressRegion,
      "postalCode": data.address.postalCode,
      "addressCountry": data.address.addressCountry,
    },
    "openingHours": data.openingHours,
    "serviceArea": data.serviceArea.map(area => ({
      "@type": "State",
      "name": area,
    })),
    "availableLanguage": data.languages,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "47",
      "bestRating": "5",
      "worstRating": "1",
    },
    "priceRange": "€€",
  };
}

/**
 * Generate enhanced Organization schema
 */
export function generateOrganizationSchema(locale: string = 'en'): object {
  const isSloven = locale === 'sl';

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Flowko",
    "legalName": "Flowko d.o.o.",
    "url": "https://flowko.io",
    "logo": "https://flowko.io/assets/logo.svg",
    "image": "https://flowko.io/assets/og-image.jpg",
    "description": isSloven
      ? "Vodilni ponudnik AI avtomatizacije poslovnih procesov v Sloveniji. Strokovni n8n avtomatizacijski partner za podjetja v Sloveniji, Avstriji in na Hrvaškem."
      : "Leading AI business process automation provider in Slovenia. Expert n8n automation partner for businesses in Slovenia, Austria, and Croatia.",
    "slogan": isSloven
      ? "Prihranite 15+ ur tedensko z inteligentno avtomatizacijo"
      : "Save 15+ hours weekly with intelligent automation",
    "foundingDate": "2025",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": "5-10",
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+386-40-123-456",
      "contactType": "customer service",
      "areaServed": ["SI", "AT", "HR"],
      "availableLanguage": ["en", "sl", "de", "hr"],
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00",
      },
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Murska Sobota",
      "addressRegion": "Pomurska",
      "addressCountry": "SI",
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "Slovenia",
        "alternateName": "SI",
      },
      {
        "@type": "Country",
        "name": "Austria",
        "alternateName": "AT",
      },
      {
        "@type": "Country",
        "name": "Croatia",
        "alternateName": "HR",
      },
    ],
    "sameAs": [
      "https://linkedin.com/company/flowko",
      "https://twitter.com/flowko_io",
      "https://github.com/flowko",
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": isSloven ? "Avtomatizacijske storitve" : "Automation Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": isSloven ? "Jumpstart paket" : "Jumpstart Package",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": isSloven ? "Osnovna avtomatizacija" : "Basic Automation Setup",
                "description": isSloven
                  ? "Do 3 prilagojenih delovnih tokov z usposabljanjem"
                  : "Up to 3 custom workflows with training",
              },
              "price": "2200",
              "priceCurrency": "EUR",
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          "name": isSloven ? "Growth paket" : "Growth Package",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": isSloven ? "Mesečna avtomatizacija" : "Monthly Automation",
                "description": isSloven
                  ? "10 ur razvoja mesečno z optimizacijo"
                  : "10 development hours monthly with optimization",
              },
              "price": "550",
              "priceCurrency": "EUR",
              "billingIncrement": "P1M",
            },
          ],
        },
      ],
    },
    "knowsAbout": [
      "Business Process Automation",
      "n8n Workflows",
      "AI Integration",
      "API Integrations",
      "Workflow Optimization",
      "Process Mining",
      isSloven ? "Avtomatizacija procesov" : "Process Automation",
      isSloven ? "Poslovni procesi" : "Business Processes",
    ],
    "makesOffer": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": isSloven ? "AI Avtomatizacija Poslovnih Procesov" : "AI Business Process Automation",
        "description": isSloven
          ? "Celovite rešitve za avtomatizacijo delovnih procesov z AI tehnologijo in n8n platformo"
          : "Comprehensive workflow automation solutions powered by AI technology and n8n platform",
      },
      "areaServed": ["Slovenia", "Austria", "Croatia"],
    },
  };
}

/**
 * Generate BreadcrumbList schema for single-page sections
 */
export function generateBreadcrumbSchema(locale: string = 'en'): object {
  const isSloven = locale === 'sl';
  const baseUrl = `https://flowko.io/${locale === 'en' ? '' : locale}`;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": isSloven ? "Domov" : "Home",
        "item": baseUrl,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": isSloven ? "AI Storitve" : "AI Services",
        "item": `${baseUrl}#ai-services`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": isSloven ? "Cenitev" : "Pricing",
        "item": `${baseUrl}#pricing`,
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": isSloven ? "Implementacija" : "Implementation",
        "item": `${baseUrl}#implementation`,
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": isSloven ? "Kontakt" : "Contact",
        "item": `${baseUrl}#contact`,
      },
    ],
  };
}

/**
 * Get default Flowko automation services data
 */
export function getFlowkoServices(locale: string = 'en'): ServiceSchema[] {
  const isSloven = locale === 'sl';

  return [
    {
      name: isSloven ? "Avtomatizacija elektronske pošte" : "Email Automation",
      description: isSloven
        ? "Avtomatizirajte svoje elektronske komunikacije, od uvoza strank do sledenja prodaji"
        : "Automate your email communications from client onboarding to sales follow-ups",
      provider: {
        name: "Flowko",
        url: "https://flowko.io",
      },
      serviceType: "BusinessService",
      areaServed: ["Slovenia", "Austria", "Croatia"],
    },
    {
      name: isSloven ? "Integracija CRM-a" : "CRM Integration",
      description: isSloven
        ? "Sinhronizirajte podatke o strankah med vsemi sistemi brez ročnih vnošenj"
        : "Synchronize customer data across all systems without manual data entry",
      provider: {
        name: "Flowko",
        url: "https://flowko.io",
      },
      serviceType: "BusinessService",
      areaServed: ["Slovenia", "Austria", "Croatia"],
    },
    {
      name: isSloven ? "Avtomatizacija dokumentov" : "Document Automation",
      description: isSloven
        ? "Samodejno ustvarjanje, obdelava in pošiljanje dokumentov ter računov"
        : "Automatic generation, processing, and sending of documents and invoices",
      provider: {
        name: "Flowko",
        url: "https://flowko.io",
      },
      serviceType: "BusinessService",
      areaServed: ["Slovenia", "Austria", "Croatia"],
    },
    {
      name: isSloven ? "Avtomatizacija družbenih medijev" : "Social Media Automation",
      description: isSloven
        ? "Načrtovanje, objavljanje in analiza objav na družbenih omrežjih"
        : "Schedule, publish, and analyze social media posts automatically",
      provider: {
        name: "Flowko",
        url: "https://flowko.io",
      },
      serviceType: "BusinessService",
      areaServed: ["Slovenia", "Austria", "Croatia"],
    },
    {
      name: isSloven ? "Avtomatizacija e-trgovine" : "E-commerce Automation",
      description: isSloven
        ? "Obdelava naročil, upravljanje zalog in komunikacija s strankami"
        : "Order processing, inventory management, and customer communication",
      provider: {
        name: "Flowko",
        url: "https://flowko.io",
      },
      serviceType: "BusinessService",
      areaServed: ["Slovenia", "Austria", "Croatia"],
    },
    {
      name: isSloven ? "Analitika in poročanje" : "Analytics & Reporting",
      description: isSloven
        ? "Samodejno ustvarjanje poročil in analiz iz različnih virov podatkov"
        : "Automatic report generation and analytics from multiple data sources",
      provider: {
        name: "Flowko",
        url: "https://flowko.io",
      },
      serviceType: "BusinessService",
      areaServed: ["Slovenia", "Austria", "Croatia"],
    },
  ];
}

/**
 * Get default FAQ data
 */
export function getFlowkoFAQs(locale: string = 'en'): FAQItem[] {
  const isSloven = locale === 'sl';

  return [
    {
      question: isSloven
        ? "Koliko časa traja implementacija avtomatizacije?"
        : "How long does automation implementation take?",
      answer: isSloven
        ? "Osnovni Jumpstart paket implementiramo v 1-2 tednih. Kompleksnejše rešitve lahko vzamejo 2-4 tedne, odvisno od zahtevnosti delovnih procesov."
        : "Our basic Jumpstart package is implemented in 1-2 weeks. More complex solutions can take 2-4 weeks depending on workflow complexity.",
    },
    {
      question: isSloven
        ? "Ali potrebujem tehnično znanje za upravljanje avtomatizacij?"
        : "Do I need technical knowledge to manage automations?",
      answer: isSloven
        ? "Ne, naše rešitve so zasnovane tako, da so uporabniku prijazne. Zagotavljamo celovito usposabljanje in dokumentacijo za enostavno upravljanje."
        : "No, our solutions are designed to be user-friendly. We provide comprehensive training and documentation for easy management.",
    },
    {
      question: isSloven
        ? "Katere aplikacije lahko integriram z n8n avtomatizacijo?"
        : "Which applications can I integrate with n8n automation?",
      answer: isSloven
        ? "n8n podpira več kot 400 aplikacij, vključno z Google Workspace, Microsoft 365, Slack, CRM sistemi, e-trgovinskimi platformami in veliko več."
        : "n8n supports over 400 applications including Google Workspace, Microsoft 365, Slack, CRM systems, e-commerce platforms, and many more.",
    },
    {
      question: isSloven
        ? "Kako hitro se povrnejo stroški investicije?"
        : "How quickly do I see return on investment?",
      answer: isSloven
        ? "Večina strank vidi pozitivni ROI v 30-60 dneh. Z avtomatizacijo lahko prihranite 15+ ur tedensko, kar hitro opravičuje investicijo."
        : "Most clients see positive ROI within 30-60 days. By saving 15+ hours weekly through automation, the investment quickly pays for itself.",
    },
    {
      question: isSloven
        ? "Ali ponujate podporo po implementaciji?"
        : "Do you provide support after implementation?",
      answer: isSloven
        ? "Da, vsi paketi vključujejo podporo. Growth in Scale paketa vključujeta redne optimizacije in prioritetno podporo."
        : "Yes, all packages include support. Growth and Scale packages include regular optimizations and priority support.",
    },
  ];
}