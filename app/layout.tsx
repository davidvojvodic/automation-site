import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flowko - Increase Revenue with AI Automation | Sales & Lead Generation Systems",
  description: "Accelerate revenue growth with intelligent automation. Increase sales conversion rates, generate more qualified leads, save time. Proven systems for European SMBs.",
  keywords: ["increase revenue", "sales automation", "lead generation automation", "business growth automation", "AI revenue systems", "accelerate sales", "n8n automation", "European SMB", "Slovenia business automation", "automated lead generation", "CRM automation"],
  authors: [{ name: "Flowko" }],
  creator: "Flowko",
  publisher: "Flowko",
  metadataBase: new URL("https://flowko.io"),
  openGraph: {
    title: "Increase Revenue with Intelligent AI Automation",
    description: "Accelerate sales, generate qualified leads, increase conversion rates. Professional automation systems for European SMBs. Save time while growing revenue.",
    url: "https://flowko.io",
    siteName: "Flowko",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Flowko - Increase Revenue with AI Business Automation"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Flowko - Revenue-Focused AI Automation",
    description: "Increase sales & lead generation | Measurable growth | European SMB specialists",
    images: ["/assets/og-image.jpg"],
    creator: "@flowko"
  },
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
  verification: {
    google: undefined, // Add your Google Search Console verification code here if you have one
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}