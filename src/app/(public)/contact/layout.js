export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Radiant Auto. Visit our dealership, call us, or send us a message. We're here to help with all your automotive needs.",
  openGraph: {
    title: "Contact Us - Radiant Auto",
    description:
      "Get in touch with Radiant Auto. Visit our dealership, call us, or send us a message. We're here to help with all your automotive needs.",
    url: "https://radiant-auto.com/contact",
    siteName: "Radiant Auto",
    images: [
      {
        url: "https://radiant-auto.com/images/titlebg.jpeg",
        width: 1200,
        height: 630,
        alt: "Contact Radiant Auto",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - Radiant Auto",
    description:
      "Get in touch with Radiant Auto. Visit our dealership, call us, or send us a message.",
    images: ["https://radiant-auto.com/images/titlebg.jpeg"],
  },
};

export default function ContactLayout({ children }) {
  return <>{children}</>;
}
