"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Cta from "../../components/Cta";
import FinanceApplication from "../../components/FinanceApplication";
import FinanceWork from "../../components/FinanceWork";
import PageTitle from "../../components/PageTitle";

gsap.registerPlugin(ScrollTrigger);

function CountUp({ end, suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: end,
          duration: 2,
          ease: "power3.out",
          onUpdate: () => {
            if (ref.current)
              ref.current.textContent = obj.val.toFixed(decimals) + suffix;
          },
        });
      },
    });
  }, [end, suffix, decimals]);
  return <span ref={ref}>0{suffix}</span>;
}

const benefits = [
  {
    title: "Lowest Rates Guaranteed",
    desc: "We work with multiple lenders to secure you the most competitive rates available.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  },
  {
    title: "Fast Approval Process",
    desc: "Get pre-approved in minutes with our streamlined digital application.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
        />
      </svg>
    ),
  },
  {
    title: "No Hidden Fees",
    desc: "Transparent pricing with no surprises. What you see is what you get.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
        />
      </svg>
    ),
  },
  {
    title: "Flexible Terms",
    desc: "Customize your payment plan with terms that fit your budget and lifestyle.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
        />
      </svg>
    ),
  },
];

export default function Finance() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current?.querySelectorAll(".gsap-fade"),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      },
    );
  }, []);

  return (
    <>
      <PageTitle
        slogan={"Finance your next car"}
        title={"Auto Financing"}
        text={
          "Radiant Auto and Repair has teamed up with multiple lenders to ensure you get the best rates and fast approval. Our team guides you through each step, ensuring you make informed decisions. Simply fill out the form below, and a Finance Manager will contact you shortly to assist with your auto financing needs."
        }
      />

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {[
              { end: 99, suffix: "%", label: "Approval Rate" },
              { end: 50, suffix: "+", label: "Lending Partners" },
              { end: 15, suffix: " min", label: "Fast Approval" },
              { end: 4.9, suffix: "%", label: "Starting APR" },
            ].map((stat, i) => (
              <div key={i} className="py-10 px-8 text-center">
                <span className="block text-4xl font-bold text-primary">
                  <CountUp
                    end={stat.end}
                    suffix={stat.suffix}
                    decimals={stat.suffix === "%" && stat.end < 10 ? 1 : 0}
                  />
                </span>
                <span className="mt-2 block text-sm text-gray-500">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section ref={sectionRef} className="py-20 lg:py-28 bg-gray-50">
        <div className="container mx-auto">
          <div className="mx-auto mb-14 max-w-2xl text-center gsap-fade">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
              Why Finance With Us
            </span>
            <h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">
              Smart Financing, <span className="text-primary">Simplified</span>
            </h2>
            <p className="text-gray-500">
              We partner with Canada&apos;s top lenders to bring you the best
              rates and most flexible terms.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item, i) => (
              <div
                key={i}
                className="gsap-fade rounded-2xl bg-white border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinanceWork />
      <FinanceApplication />

      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24 lg:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE4YzAtMS4xLS45LTItMi0ycy0yIC45LTIgMiAuOSAyIDIgMiAyLS45IDItMnptLTI0IDBjMC0xLjEtLjktMi0yLTJzLTIgLjktMiAyIC45IDIgMiAyIDItLjkgMi0yem0yNCAyNGMwLTEuMS0uOS0yLTItMnMtMiAuOS0yIDIgLjkgMiAyIDIgMi0uOSAyLTJ6bS0yNCAwYzAtMS4xLS45LTItMi0ycy0yIC45LTIgMiAuOSAyIDIgMiAyLS45IDItMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        <div className="container mx-auto  text-center relative z-10">
          <div className="mx-auto max-w-5xl space-y-8">
            <h2 className="text-4xl font-bold text-white lg:text-5xl">
              Finance your next car. We will find the best rates and get you
              approved in minutes.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/payment-calculator"
                className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-primary to-primary/90 px-10 py-5 text-lg font-semibold text-white shadow-2xl shadow-primary/30 transition-all hover:shadow-primary/50 hover:-translate-y-0.5"
              >
                Calculate Payments
                <svg
                  className="h-6 w-6 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
