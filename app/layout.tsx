import type { Metadata } from "next";
import { Space_Grotesk, Montserrat, Inter } from "next/font/google";
import { EVENT } from "@/lib/constants";
import { absoluteUrl } from "@/lib/utils";
import AnalyticsScripts from "@/components/AnalyticsScripts";
import LoadingScreen from "@/components/ui/LoadingScreen";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
  display: "swap",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["600", "700", "800"],
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const title = `${EVENT.series} — ${EVENT.name} | ${EVENT.host.name}`;
const description = EVENT.description;
const ogImage = absoluteUrl("/og-image.jpg");

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title,
  description,
  keywords: [
    "Jobbyist webinar",
    "South Africa digital labour market",
    "remote jobs South Africa",
    "AI jobseeker tools",
    "career webinar South Africa",
    "Jobbyist Pro",
  ],
  authors: [{ name: EVENT.host.name, url: EVENT.host.url }],
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/"),
    siteName: EVENT.host.name,
    images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
  robots: { index: true, follow: true },
};

function eventJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${EVENT.series} — ${EVENT.name}`,
    description: EVENT.description,
    startDate: EVENT.startISO,
    endDate: EVENT.endISO,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "VirtualLocation",
      url: absoluteUrl("/"),
    },
    image: [ogImage],
    organizer: {
      "@type": "Organization",
      name: EVENT.host.name,
      url: EVENT.host.url,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "ZAR",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/"),
      validFrom: new Date().toISOString(),
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-ZA"
      className={`${spaceGrotesk.variable} ${montserrat.variable} ${inter.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd()) }}
        />
      </head>
      <body>
        <LoadingScreen />
        {children}
        <AnalyticsScripts />
      </body>
    </html>
  );
}
