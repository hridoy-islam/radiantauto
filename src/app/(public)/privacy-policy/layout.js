export const metadata = {
  title: "Privacy Policy",
  description:
    "Read Radiant Auto's privacy policy to understand how we collect, use, and protect your personal information.",
  alternates: {
    canonical: "/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Privacy Policy - Radiant Auto",
    description:
      "Read Radiant Auto's privacy policy to understand how we collect, use, and protect your personal information.",
    url: "https://radiant-auto.com/privacy-policy",
    siteName: "Radiant Auto",
    images: [
      {
        url: "https://radiant-auto.com/images/titlebg.jpeg",
        width: 1200,
        height: 630,
        alt: "Privacy Policy - Radiant Auto",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - Radiant Auto",
    description:
      "Read Radiant Auto's privacy policy to understand how we collect, use, and protect your personal information.",
    images: ["https://radiant-auto.com/images/titlebg.jpeg"],
  },
};

export default function PrivacyPolicyLayout({ children }) {
  return <>{children}</>;
}
