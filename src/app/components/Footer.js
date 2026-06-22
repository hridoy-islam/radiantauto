"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    if (!footerRef.current) return;
    gsap.fromTo(
      footerRef.current.querySelectorAll(".gsap-footer"),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      },
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-white border-t border-gray-100 pt-16 pb-8 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-4 gsap-footer">
            <Link href="/" className="inline-block mb-5">
              <img src="/images/logo.png" alt="logo" className="h-10 w-auto" />
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-gray-800 max-w-xs">
              We offer a comprehensive range of services designed to meet all
              your automotive needs — from buying to selling and everything in
              between.
            </p>
            <div className="flex items-center gap-3">
              {[
                { href: "https://www.facebook.com/share/1FeaE3rXsY/?mibextid=wwXIfr", icon: FaFacebookF, label: "Facebook" },
                { href: "https://www.instagram.com/radiant.aar?igsh=NjZoYXcwcXhkZ2gz", icon: FaInstagram, label: "YouTube" },
              ].map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-700 transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
                  aria-label={social.label}
                >
                  <social.icon className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-6 gsap-footer">
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-gray-900">
              Resources
            </h4>
            <ul className="space-y-3">
              <FooterLink href="/trade-in" label="Trade In Your Car" />
              <FooterLink href="/sell-your-car" label="Sell Your Car" />
              <FooterLink href="/finance" label="Finance Application" />
              <FooterLink
                href="/payment-calculator"
                label="Payment Calculator"
              />
            </ul>
          </div>

          <div className="lg:col-span-2 gsap-footer">
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-gray-900">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <FooterLink href="/faq" label="FAQ" />
              <FooterLink href="/contact" label="Contact" />
              <FooterLink href="/search" label="Search Cars" />
              <FooterLink href="/compare" label="Compare Cars" />
              <FooterLink href="/about" label="About Us" />
            </ul>
          </div>

          <div className="lg:col-span-3 gsap-footer">
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-gray-900">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-gray-800">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
                <span>
                  213 33rd St WSaskatoon <br />
                  SK S7L 0V2, Canada
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
                <span>+1 306 261 4800</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
                <span>sales@radiant-auto.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 gsap-footer">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-700">
              &copy; {new Date().getFullYear()} Radiant Auto. All rights
              reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy-policy"
                className="text-sm text-gray-700 transition-colors hover:text-primary"
              >
                Privacy Policy
              </Link>
              {/* <Link href="/faq" className="text-sm text-gray-700 transition-colors hover:text-primary">
                Terms of Service
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const FooterLink = ({ href, label }) => (
  <li>
    <Link
      href={href}
      className="inline-block text-sm text-gray-800 transition-all duration-200 hover:text-primary hover:translate-x-1"
    >
      {label}
    </Link>
  </li>
);
