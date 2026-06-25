import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "../components/ui/toaster";
import AdminRedirectGuard from "../components/shared/AdminRedirectGuard";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Radiant Auto - Buy, Sell & Trade-In Vehicles in Saskatoon",
    template: "%s | Radiant Auto",
  },
  description:
    "Radiant Auto is Saskatoon's trusted auto dealer. Buy quality used cars, sell your vehicle, or trade-in with confidence. No-haggle pricing, 90-day warranty, and free home delivery across Saskatchewan.",
  metadataBase: new URL("https://radiant-auto.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Radiant Auto - Buy, Sell & Trade-In Vehicles in Saskatoon",
    description:
      "Radiant Auto is Saskatoon's trusted auto dealer. Buy quality used cars, sell your vehicle, or trade-in with confidence. No-haggle pricing, 90-day warranty, and free home delivery across Saskatchewan.",
    url: "https://radiant-auto.com",
    siteName: "Radiant Auto",
    images: [
      {
        url: "https://radiant-auto.com/images/titlebg.jpeg",
        width: 1200,
        height: 630,
        alt: "Radiant Auto - Your Trusted Auto Dealer in Saskatoon",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Radiant Auto - Buy, Sell & Trade-In Vehicles in Saskatoon",
    description:
      "Saskatoon's trusted auto dealer. Buy used cars, sell your vehicle, or trade-in with confidence.",
    images: ["https://radiant-auto.com/images/titlebg.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: "Radiant Auto",
  description:
    "Saskatoon's trusted auto dealer offering quality used cars, no-haggle pricing, 90-day warranty, and free home delivery.",
  url: "https://radiant-auto.com",
  image: "https://radiant-auto.com/images/titlebg.jpeg",
  telephone: "+1 306 261 4800",
  email: "info@radiant-auto.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "213 33rd St W",
    addressLocality: "Saskatoon",
    addressRegion: "SK",
    postalCode: "S7L 0V2",
    addressCountry: "CA",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "09:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "09:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "09:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "09:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "09:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "16:00" },
  ],
  sameAs: [
    "https://www.facebook.com/radiantauto",
    "https://www.instagram.com/radiantauto",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <AdminRedirectGuard>
            <main className="flex-1">{children}</main>
          </AdminRedirectGuard>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
