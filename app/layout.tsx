import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://sinova26.vercel.app"),

  title: {
    default: "SINOVA26",
    template: "%s | SINOVA26",
  },

  description:
    "SINOVA26 - 24 Hour National Level Hackathon at SCMS School of Technology and Management.",

  applicationName: "SINOVA26",

  keywords: [
    "SINOVA26",
    "Hackathon",
    "SCMS",
    "24 Hour Hackathon",
    "National Level Hackathon",
  ],

  authors: [{ name: "SINOVA26 Team" }],
  creator: "SINOVA26",
  publisher: "SINOVA26",

  verification: {
    google: "2iVMdTIg4mu4Rkei4ivAGFaByxpf4b0k9BzAnP0Wu90",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },

  openGraph: {
    title: "SINOVA26",
    description:
      "24 Hour National Level Hackathon at SCMS School of Technology and Management",
    url: "https://sinova26.vercel.app",
    siteName: "SINOVA26",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SINOVA26 Hackathon",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "SINOVA26",
    description: "24 Hour National Level Hackathon",
    images: ["/og-image.png"],
  },

  alternates: {
    canonical: "https://sinova26.vercel.app",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "SINOVA26",
              url: "https://sinova26.vercel.app",
              logo: "https://sinova26.vercel.app/sinova-logo.png",
            }),
          }}
        />
      </body>
    </html>
  );
}
