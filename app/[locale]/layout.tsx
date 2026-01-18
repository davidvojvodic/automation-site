import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import CookieBanner from "@/components/CookieBanner";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Dynamic metadata generation based on locale
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const titles = {
    en: "Flowko - Increase Revenue with AI Automation | Sales, Lead Gen & Web Development",
    sl: "Flowko - Povečajte Prihodke z AI Avtomatizacijo | Prodaja, Lead Gen in Spletni Razvoj",
  };

  const descriptions = {
    en: "Grow revenue with intelligent automation systems. Lead generation, sales automation, voice AI agents, custom web development. Increase conversion rates while saving time. European SMB specialists.",
    sl: "Povečajte prihodke z inteligentno avtomatizacijo. Generiranje vodilnih strank, avtomatizacija prodaje, glasovni AI agenti. Povečajte konverzije in prihranite čas. Slovenski specialisti za evropska MSP.",
  };

  const title = titles[locale as keyof typeof titles] || titles.en;
  const description =
    descriptions[locale as keyof typeof descriptions] || descriptions.en;

  return {
    metadataBase: new URL("https://flowko.io"),
    title,
    description,
    keywords: [
      locale === "sl"
        ? "povečanje prihodkov, AI avtomatizacija, spletni razvoj, e-trgovina, lead generation, prodajna avtomatizacija, glasovni AI agenti, avtomatizacija poslovanja, poslovni procesi, digitalna transformacija, AI rešitve, ROI avtomatizacija"
        : "increase revenue, AI automation, web development, e-commerce, lead generation, sales automation, voice AI agents, business automation, business processes, digital transformation, AI solutions, automation ROI",
    ],
    authors: [{ name: "Flowko" }],
    creator: "Flowko",
    publisher: "Flowko",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "sl" ? "sl_SI" : "en_US",
      url: `https://flowko.io/${locale}`,
      siteName: "Flowko",
      title,
      description,
      images: [
        {
          url: "/assets/og-image.jpg",
          width: 1200,
          height: 630,
          alt:
            locale === "sl"
              ? "Flowko - AI Avtomatizacija Procesov"
              : "Flowko - AI Business Automation",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@flowko_io",
      creator: "@flowko_io",
      title,
      description,
      images: ["/assets/og-image.jpg"],
    },
    alternates: {
      canonical: `https://flowko.io/${locale}`,
      languages: {
        en: "https://flowko.io/en",
        sl: "https://flowko.io/sl",
      },
    },
    verification: {
      google: "96ITbG23XR1L0CAls79sEL4fAcQPQ4lHSWEuyK49O-A",
    },
    category: "Business Automation",
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
      other: [
        {
          rel: "icon",
          url: "/favicon-48x48.png",
          sizes: "48x48",
          type: "image/png",
        },
        {
          rel: "icon",
          url: "/favicon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          rel: "icon",
          url: "/favicon-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Ensure that the incoming locale is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  // Generate LocalBusiness structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://flowko.io",
    name: "Flowko",
    alternateName:
      locale === "sl" ? "Flowko - AI Avtomatizacija" : "Flowko - AI Automation",
    url: "https://flowko.io",
    logo: "https://flowko.io/favicon-512x512.png",
    image: "https://flowko.io/assets/og-image.jpg",
    description:
      locale === "sl"
        ? "Strokovni partner za AI avtomatizacijo ki povečuje prihodke in produktivnost. Dosežite hitrejši ROI z našimi n8n rešitvami."
        : "Expert AI automation partner that increases revenue and productivity. Achieve faster ROI with our n8n solutions.",
    foundingDate: "2025",
    keywords:
      locale === "sl"
        ? "povečanje prihodkov, AI avtomatizacija, ROI avtomatizacija, prodajna produktivnost, n8n"
        : "increase revenue, AI automation, automation ROI, sales productivity, n8n",
    slogan:
      locale === "sl"
        ? "Avtomatizirajte svoje poslovanje z AI"
        : "Automate Your Business with AI",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ulica Daneta Šumenjaka 2A",
      addressLocality: "Murska Sobota",
      addressRegion: "Pomurska",
      postalCode: "9000",
      addressCountry: "SI",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 46.6611,
      longitude: 16.1697,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "info@flowko.io",
        contactType: "customer service",
        areaServed: ["SI", "AT", "HR"],
        availableLanguage: ["en", "sl", "de", "hr"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "17:00",
        },
      },
    ],
    sameAs: [
      "https://linkedin.com/company/flowko",
      "https://twitter.com/flowko_io",
    ],
    areaServed: [
      {
        "@type": "Country",
        name: "Slovenia",
        alternateName: "SI",
      },
      {
        "@type": "Country",
        name: "Austria",
        alternateName: "AT",
      },
      {
        "@type": "Country",
        name: "Croatia",
        alternateName: "HR",
      },
    ],
    serviceType:
      locale === "sl"
        ? "Avtomatizacija poslovnih procesov"
        : "Business Process Automation",
    priceRange: "€€€",
    currenciesAccepted: "EUR",
    paymentAccepted: ["Credit Card", "Bank Transfer", "PayPal"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name:
        locale === "sl"
          ? "AI Avtomatizacijske storitve"
          : "AI Automation Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name:
              locale === "sl"
                ? "Generiranje vodilnih strank"
                : "Lead Generation Automation",
            description:
              locale === "sl"
                ? "Avtomatizirana identifikacija in kvalifikacija perspektiv"
                : "Automated prospect identification and qualification",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name:
              locale === "sl"
                ? "Avtomatizacija prodajnih procesov"
                : "Sales Process Automation",
            description:
              locale === "sl"
                ? "Popolna avtomatizacija prodajnih procesov z AI"
                : "Complete sales process automation with AI",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: locale === "sl" ? "Glasovni AI agenti" : "Voice AI Agents",
            description:
              locale === "sl"
                ? "24/7 AI glasovni agenti z večjezično podporo"
                : "24/7 AI voice agents with multilingual support",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "47",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <html lang={locale}>
      <head>
        {/* Google Analytics */}

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <NextIntlClientProvider messages={messages}>
          <PerformanceMonitor />
          {children}
          <CookieBanner />
          <Toaster position="bottom-right" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
