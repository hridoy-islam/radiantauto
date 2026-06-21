"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import PageTitle from "../../components/PageTitle";

const Section = ({ title, children, index = 0 }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [index]);
  return (
    <div ref={ref} className="mb-10">
      <h2 className="mb-4 text-2xl font-bold text-gray-900">{title}</h2>
      {children}
    </div>
  );
};

export default function PrivacyPolicy() {
  return (
    <>
      <PageTitle
        slogan="Legal"
        title="Privacy Policy"
        text="How we collect, use, and protect your personal information."
      />

      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto">
          <div className="mx-auto max-w-3xl">
            <p className="mb-12 text-base leading-relaxed text-gray-500">
              At <strong className="text-gray-900">Radiant Auto</strong>, we take your privacy seriously. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you visit our website or use our services. Please read this policy carefully.
            </p>

            <Section title="1. Information We Collect" index={0}>
              <p className="mb-4 text-gray-600 leading-relaxed">
                We may collect the following types of information when you interact with us:
              </p>
              <ul className="space-y-3 text-gray-600">
                {[
                  ["Personal Identification Information", "Name, email address, phone number, mailing address, and driver's license details when you fill out forms, schedule test drives, or apply for financing."],
                  ["Vehicle Information", "Details about your current vehicle, trade-in inquiries, and vehicle preferences."],
                  ["Financial Information", "Income details, credit history, and other financial data when applying for financing or leasing."],
                  ["Technical Data", "IP address, browser type, device information, and browsing behavior through cookies and analytics tools."],
                ].map(([title, desc], i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                    <div>
                      <strong className="text-gray-900">{title}:</strong> {desc}
                    </div>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="2. How We Use Your Information" index={1}>
              <p className="mb-4 text-gray-600 leading-relaxed">
                We use the information we collect for the following purposes:
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Process vehicle purchases, sales, and trade-ins",
                  "Facilitate financing and lease applications",
                  "Schedule and confirm service appointments",
                  "Respond to your inquiries and requests",
                  "Send updates about inventory and promotions",
                  "Improve our website and customer experience",
                  "Comply with legal and regulatory obligations",
                  "Detect and prevent fraudulent activities",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
                    <svg className="h-5 w-5 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span className="text-sm text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="3. Information Sharing" index={2}>
              <p className="mb-4 text-gray-600 leading-relaxed">
                We do not sell your personal information. We may share your data with:
              </p>
              <ul className="space-y-3 text-gray-600">
                {[
                  ["Financial Institutions", "Banks and lending partners to process financing and lease applications."],
                  ["Service Providers", "Third-party vendors who assist with website hosting, analytics, and customer support."],
                  ["Legal Authorities", "When required by law or to protect our rights and safety."],
                  ["Business Transfers", "In the event of a merger, acquisition, or sale of assets."],
                ].map(([title, desc], i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">{title}:</strong> {desc}
                    </div>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="4. Data Security" index={3}>
              <p className="text-gray-600 leading-relaxed">
                We implement industry-standard security measures including SSL encryption, 
                firewalls, and secure server infrastructure to protect your personal information. 
                However, no method of transmission over the internet is 100% secure, and we 
                cannot guarantee absolute security.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: "🔒", title: "Encryption", desc: "SSL/TLS encryption for all data transmissions" },
                  { icon: "🛡️", title: "Firewall Protection", desc: "Advanced firewall systems to prevent unauthorized access" },
                  { icon: "📋", title: "Regular Audits", desc: "Periodic security assessments and compliance checks" },
                ].map((item, i) => (
                  <div key={i} className="rounded-xl border border-gray-100 bg-gray-50 p-5 text-center">
                    <span className="text-2xl">{item.icon}</span>
                    <h3 className="mt-3 text-sm font-semibold text-gray-900">{item.title}</h3>
                    <p className="mt-1 text-xs text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="5. Cookies" index={4}>
              <p className="text-gray-600 leading-relaxed">
                Our website uses cookies to enhance your browsing experience, analyze site traffic, 
                and serve personalized content. You can control cookie preferences through your 
                browser settings. Disabling cookies may affect certain features of our website.
              </p>
            </Section>

            <Section title="6. Your Rights" index={5}>
              <p className="mb-4 text-gray-600 leading-relaxed">
                Depending on your jurisdiction, you may have the following rights regarding your personal data:
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Right to access your personal data",
                  "Right to rectify inaccurate data",
                  "Right to delete your data",
                  "Right to restrict processing",
                  "Right to data portability",
                  "Right to withdraw consent",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
                    <svg className="h-4 w-4 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span className="text-sm text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="7. Third-Party Links" index={6}>
              <p className="text-gray-600 leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for 
                the privacy practices or content of these external sites. We encourage you to review 
                their privacy policies before providing any personal information.
              </p>
            </Section>

            <Section title="8. Changes to This Policy" index={7}>
              <p className="text-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time. Changes will be posted on this 
                page with an updated effective date. We encourage you to review this policy periodically 
                to stay informed about how we protect your information.
              </p>
            </Section>

            <Section title="9. Contact Us" index={8}>
              <p className="mb-6 text-gray-600 leading-relaxed">
                If you have any questions, concerns, or requests regarding this Privacy Policy or 
                how we handle your data, please contact us:
              </p>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-8">
                <div className="grid gap-6 sm:grid-cols-3">
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">Phone</p>
                    <p className="text-sm text-gray-500">+1 306 261 4800</p>
                  </div>
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">Email</p>
                    <p className="text-sm text-gray-500">info@radiantauto.com</p>
                  </div>
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">Address</p>
                    <p className="text-sm text-gray-500">77 Highfield Road, London</p>
                  </div>
                </div>
              </div>
            </Section>

            <p className="mt-12 text-center text-sm text-gray-400">
              Last updated: January 1, 2024
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
