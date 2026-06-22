export const metadata = {
  title: {
    default: "Vehicle Details - Radiant Auto",
    template: "%s - Radiant Auto",
  },
  description:
    "Browse detailed information, specs, and pricing on this vehicle at Radiant Auto.",
  openGraph: {
    title: "Vehicle Details - Radiant Auto",
    description:
      "Browse detailed information, specs, and pricing on this vehicle at Radiant Auto.",
    url: "https://radiant-auto.com/car",
    siteName: "Radiant Auto",
    images: [
      {
        url: "https://radiant-auto.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vehicle Details - Radiant Auto",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vehicle Details - Radiant Auto",
    description:
      "Browse detailed information, specs, and pricing on this vehicle at Radiant Auto.",
    images: ["https://radiant-auto.com/images/og-image.jpg"],
  },
};

export default function CarLayout({ children }) {
  return <>{children}</>;
}
