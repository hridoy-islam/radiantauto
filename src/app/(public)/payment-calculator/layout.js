export const metadata = {
  title: "Payment Calculator",
  description:
    "Calculate your monthly car payments with Radiant Auto's payment calculator. Estimate financing costs for your next vehicle.",
  alternates: {
    canonical: "/payment-calculator",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Payment Calculator - Radiant Auto",
    description:
      "Payment Calculator at Radiant Auto is powered by partnerships with multiple lenders, ensuring you receive the best rates and quick approvals.",
    url: "https://radiant-auto.com/payment-calculator",
    siteName: "Radiant Auto",
    images: [
      {
        url: "https://radiant-auto.com/images/titlebg.jpeg",
        width: 1200,
        height: 630,
        alt: "Payment Calculator - Radiant Auto",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Payment Calculator - Radiant Auto",
    description:
      "Calculate your monthly car payments with Radiant Auto's easy-to-use payment calculator.",
    images: ["https://radiant-auto.com/images/titlebg.jpeg"],
  },
};

export default function PaymentCalculatorLayout({ children }) {
  return <>{children}</>;
}
