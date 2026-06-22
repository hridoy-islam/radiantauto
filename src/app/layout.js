import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers"; 
import { Toaster } from "../components/ui/toaster";
import AdminRedirectGuard from "../components/shared/AdminRedirectGuard";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Radiant Auto",
  description:
    "We offer a comprehensive range of services designed to meet all your automotive needs.",
  schemaOrg: {
    "@context": "http://schema.org",
    "@type": "AutoBodyShop",
    name: "Radiant Auto",
    description:
      "Radiant Auto offers top-notch car care services with a focus on customer experience and professional workmanship.",
    url: "https://radiant-auto.com/",
    image: "https://radiant-auto.com/images/titlebg.jpeg",
    telephone: "+1 306 261 4800",
    address: {
      "@type": "PostalAddress",
      streetAddress: "213 33rd St",
      addressLocality: "WSaskatoon",
      addressRegion: "SK",
      postalCode: "S7L 0V2",
      addressCountry: "CA",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
