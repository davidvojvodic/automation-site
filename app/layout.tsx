import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flowko",
  description: "AI Business Process Automation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}