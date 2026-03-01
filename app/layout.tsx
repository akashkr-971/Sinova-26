import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  metadataBase: new URL("https://sinova26.vercel.app"),

  title: {
    default:
      "SINOVA26 – 24 Hour National Level Hackathon | SCMS School of Technology and Management",
    template: "%s | SINOVA26",
  },

  description:
    "SINOVA26 is a 24 Hour National Level Hackathon organized by SCMS School of Technology and Management (SSTM), Kerala. Compete, innovate and Hack4Impact.",

  applicationName: "SINOVA26",

  keywords: [
    "SINOVA26 Hackathon",
    "SCMS Hackathon",
    "National Level Hackathon Kerala",
    "24 Hour Hackathon India",
    "SSTM Hackathon",
  ],

  authors: [{ name: "SINOVA26 Organizing Committee" }],
  creator: "SINOVA26",
  publisher: "SINOVA26",

  robots: {
    index: true,
    follow: true,
  },

  verification: {
    google: "2iVMdTIg4mu4Rkei4ivAGFaByxpf4b0k9BzAnP0Wu90",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },

  openGraph: {
    title:
      "SINOVA26 – 24 Hour National Level Hackathon | SCMS SSTM",
    description:
      "Join SINOVA26, a 24 Hour National Level Hackathon at SCMS School of Technology and Management, Kerala.",
    url: "https://sinova26.vercel.app",
    siteName: "SINOVA26",
    images: [
      {
        url: "https://sinova26.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "SINOVA26 Hackathon Banner",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "SINOVA26 – National Level Hackathon",
    description:
      "24 Hour National Level Hackathon at SCMS School of Technology and Management.",
    images: ["https://sinova26.vercel.app/og-image.png"],
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

        {/* Vercel Analytics */}
        <Analytics />
        <SpeedInsights />


        {/* Structured Data – Event Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: "SINOVA26 – 24 Hour National Level Hackathon",
              description:
                "SINOVA26 is a 24 Hour National Level Hackathon organized by SCMS School of Technology and Management (SSTM), Kerala.",
              startDate: "2026-03-17T10:00:00+05:30",
              endDate: "2026-03-18T10:00:00+05:30",
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode:
                "https://schema.org/OfflineEventAttendanceMode",

              image: [
                "https://sinova26.vercel.app/og-image.png"
              ],

              location: {
                "@type": "Place",
                name: "SCMS School of Technology and Management",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Prathap Nagar, Muttom",
                  addressLocality: "Aluva",
                  addressRegion: "Kerala",
                  postalCode: "683106",
                  addressCountry: "IN",
                },
              },

              organizer: {
                "@type": "Organization",
                name: "SINOVA26",
                url: "https://sinova26.vercel.app",
                logo: "https://sinova26.vercel.app/sinova-logo.png",
              },

              performer: {
                "@type": "Organization",
                name: "Department of Computer Applications – SCMS SSTM"
              },

              offers: {
                "@type": "Offer",
                url: "https://sinova26.vercel.app/register",
                price: "400",
                priceCurrency: "INR",
                availability: "https://schema.org/InStock",
                validFrom: "2025-12-01T00:00:00+05:30"
              }
            }),
          }}
        />
      </body>
    </html>
  );
}