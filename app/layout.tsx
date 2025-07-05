import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flowko - AI Automation Solutions for European SMBs",
  description: "Save 15+ hours weekly with intelligent workflow automation. Eliminate repetitive tasks, reduce costs by 90%, and unlock capacity for growth.",
  keywords: ["AI automation", "workflow automation", "business process automation", "n8n", "European SMB", "Slovenia"],
  authors: [{ name: "Flowko" }],
  creator: "Flowko",
  publisher: "Flowko",
  metadataBase: new URL("https://flowko.io"),
  openGraph: {
    title: "Flowko - AI Automation Solutions for European SMBs",
    description: "Save 15+ hours weekly with intelligent workflow automation. Eliminate repetitive tasks, reduce costs by 90%, and unlock capacity for growth.",
    url: "https://flowko.io",
    siteName: "Flowko",
    images: [
      {
        url: "/favicon-512x512.png",
        width: 512,
        height: 512,
        alt: "Flowko - AI Automation Solutions"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Flowko - AI Automation Solutions",
    description: "Save 15+ hours weekly with intelligent workflow automation",
    images: ["/favicon-512x512.png"],
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