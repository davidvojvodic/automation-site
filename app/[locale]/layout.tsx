import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import CookieBanner from '@/components/CookieBanner';

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
  params
}: {
  params: Promise<{locale: string}>
}): Promise<Metadata> {
  const {locale} = await params;
  
  // Validate locale
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  
  const titles = {
    en: "Flowko - AI Business Process Automation | Save 15+ Hours Weekly",
    sl: "Flowko - AI Avtomatizacija Poslovnih Procesov | Prihranite 15+ Ur Tedensko"
  };

  const descriptions = {
    en: "Transform your business with intelligent workflow automation. Save 15+ hours weekly with AI-powered solutions. Expert n8n automation partner serving Slovenia, Austria & Croatia.",
    sl: "Preobrazite svoje podjetje z inteligentno avtomatizacijo delovnih procesov. Prihranite 15+ ur tedensko z AI rešitvami. Strokovni n8n avtomatizacijski partner za Slovenijo, Avstrijo in Hrvaško."
  };

  const title = titles[locale as keyof typeof titles] || titles.en;
  const description = descriptions[locale as keyof typeof descriptions] || descriptions.en;

  return {
    title,
    description,
    keywords: [
      locale === 'sl' 
        ? "avtomatizacija procesov, AI, n8n, poslovna avtomatizacija, Slovenija, delovni procesi" 
        : "business automation, AI workflows, n8n, process automation, Slovenia, workflow automation"
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
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'sl' ? 'sl_SI' : 'en_US',
      url: `https://flowko.io/${locale}`,
      siteName: 'Flowko',
      title,
      description,
      images: [
        {
          url: '/assets/og-image.jpg',
          width: 1200,
          height: 630,
          alt: locale === 'sl' ? 'Flowko - AI Avtomatizacija Procesov' : 'Flowko - AI Business Automation',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@flowko_io',
      creator: '@flowko_io',
      title,
      description,
      images: ['/assets/og-image.jpg'],
    },
    alternates: {
      canonical: `https://flowko.io/${locale}`,
      languages: {
        'en': 'https://flowko.io/en',
        'sl': 'https://flowko.io/sl',
      },
    },
    verification: {
      google: '96ITbG23XR1L0CAls79sEL4fAcQPQ4lHSWEuyK49O-A',
    },
    category: 'Business Automation',
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      other: [
        { rel: 'icon', url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
        { rel: 'icon', url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
        { rel: 'icon', url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  // Ensure that the incoming locale is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  // Generate structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Flowko",
    "url": "https://flowko.io",
    "logo": "https://flowko.io/assets/logo.svg",
    "description": locale === 'sl' 
      ? "Strokovni partner za AI avtomatizacijo poslovnih procesov z n8n platformo. Služimo podjetjem v Sloveniji, Avstriji in na Hrvaškem."
      : "Expert AI business process automation partner using n8n platform. Serving businesses in Slovenia, Austria, and Croatia.",
    "foundingDate": "2025",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+386-XX-XXX-XXX",
      "contactType": "customer service",
      "areaServed": ["SI", "AT", "HR"],
      "availableLanguage": ["en", "sl", "de", "hr"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Murska Sobota",
      "addressCountry": "SI"
    },
    "sameAs": [
      "https://linkedin.com/company/flowko",
      "https://twitter.com/flowko_io"
    ],
    "serviceArea": {
      "@type": "Place",
      "name": locale === 'sl' ? "Slovenija, Avstrija, Hrvaška" : "Slovenia, Austria, Croatia"
    },
    "offers": {
      "@type": "Offer",
      "name": locale === 'sl' ? "AI Avtomatizacija Poslovnih Procesov" : "AI Business Process Automation",
      "description": locale === 'sl' 
        ? "Celovite rešitve za avtomatizacijo delovnih procesov z AI tehnologijo"
        : "Comprehensive workflow automation solutions powered by AI technology"
    }
  };

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
