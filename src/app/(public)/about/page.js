"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageTitle from "../../components/PageTitle";
import Testimonial from "../../components/Testimonial";
import Team from "../../components/Team";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRefs = useRef([]);
  const statsRef = useRef(null);
  const featuresRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Animate sections on scroll
    sectionRefs.current.forEach((section, index) => {
      if (section) {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    // Animate stats counter
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current.querySelectorAll(".stat-item"),
        {
          opacity: 0,
          scale: 0.5,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Animate feature cards
    if (featuresRef.current.length > 0) {
      featuresRef.current.forEach((feature, index) => {
        if (feature) {
          gsap.fromTo(
            feature,
            {
              opacity: 0,
              y: 50,
              rotateX: 10,
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.6,
              delay: index * 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: feature,
                start: "top 85%",
              },
            }
          );
        }
      });
    }

    // Animate CTA section
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        {
          opacity: 0,
          scale: 0.9,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="space-y-16 ">
      <PageTitle
        slogan={"WHY RADIANT AUTO"}
        title={`Life is stressful. Car shopping shouldn't be.`}
        text={`That's why we created Radiant Auto. A completely digital car buying experience that puts you in the driver's seat.`}
      />

      {/* Our Story Section */}
      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        className="py-16 "
      >
        <div className="container mx-auto ">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-primary">
                  Our Story
                </span>
                <h2 className="text-4xl font-bold leading-tight text-gray-900 lg:text-5xl">
                  Redefining the way{" "}
                  <span className="text-primary">you buy a car</span>
                </h2>
              </div>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed text-gray-600">
                  Radiant Auto was built on a simple belief — car shopping should
                  fit around your life, not the other way around. We eliminated the
                  hassle of traditional dealerships so you can browse, finance, and
                  purchase your next vehicle entirely from home.
                </p>
                <p className="text-lg leading-relaxed text-gray-600">
                  Every vehicle in our inventory undergoes a rigorous inspection
                  and comes with a 90-day complimentary warranty. With free
                  at-home delivery, transparent pricing, and a 10-day money-back
                  guarantee, we make sure you drive away with complete confidence.
                </p>
              </div>
              <div
                ref={statsRef}
                className="grid grid-cols-3 gap-8 border-t border-gray-200 pt-8"
              >
                {[
                  { number: "500+", label: "Vehicles Sold" },
                  { number: "98%", label: "Satisfaction Rate" },
                  { number: "10yr", label: "Experience" },
                ].map((stat, i) => (
                  <div key={i} className="stat-item text-center">
                    <p className="text-3xl font-bold text-primary lg:text-4xl">
                      {stat.number}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="/images/whyraidantauto.jpeg"
                  alt="Radiant Auto showroom"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-6 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <svg
                      className="h-5 w-5 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Premium Dealership
                    </p>
                    <p className="text-sm text-gray-500">
                      Serving customers across Canada
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Technology Section */}
      <section
        ref={(el) => (sectionRefs.current[1] = el)}
        className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 lg:py-24"
      >
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="relative lg:order-2">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800&q=80"
                  alt="Smart technology"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -top-6 -right-6 rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-5 shadow-2xl">
                <svg
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                  />
                </svg>
              </div>
            </div>
            <div className="space-y-8 lg:order-1">
              <div className="space-y-4">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-primary">
                  Smart Technology
                </span>
                <h2 className="text-4xl font-bold leading-tight text-gray-900 lg:text-5xl">
                  Our technology,{" "}
                  <span className="text-primary">working for you</span>
                </h2>
              </div>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed text-gray-600">
                  From trade-in valuation to financing and delivery, our platform
                  puts everything at your fingertips. Value your trade, browse
                  our full inventory, get approved — all without leaving home.
                </p>
                <p className="text-lg leading-relaxed text-gray-600">
                  We use a soft credit pull that never impacts your score, and our
                  comprehensive vehicle inspection system grades every car against
                  global industry standards. Transparency isn't just a promise —
                  it's built into everything we do.
                </p>
              </div>
              <Link
                href="/search"
                className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-primary to-primary/90 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-primary/30 transition-all hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-0.5"
              >
                Browse Inventory
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
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

      {/* Why Choose Us Section */}
      <section
        ref={(el) => (sectionRefs.current[2] = el)}
        className="py-16 lg:py-24"
      >
        <div className="container mx-auto ">
          <div className="mx-auto mb-16 max-w-5xl text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-primary">
              Why Choose Us
            </span>
            <h2 className="mt-6 text-4xl font-bold text-gray-900 lg:text-5xl">
              Built around you,{" "}
              <span className="text-primary">from start to finish</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Every decision we make is guided by one question: does this make
              the experience better for our customers?
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Free At-Home Delivery",
                desc: "We bring your new car straight to your door, anywhere in our service area, at no extra cost.",
                gradient: "from-blue-500 to-blue-600",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                ),
              },
              {
                title: "10-Day Money-Back",
                desc: "Not the right fit? Return it within 10 days for a full refund — no questions asked.",
                gradient: "from-green-500 to-green-600",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                ),
              },
              {
                title: "90-Day Warranty",
                desc: "Every vehicle comes with a complimentary warranty for added peace of mind after your purchase.",
                gradient: "from-purple-500 to-purple-600",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                  />
                ),
              },
              {
                title: "Transparent Pricing",
                desc: "What you see is what you pay. No hidden fees, no last-minute surprises, no negotiation games.",
                gradient: "from-orange-500 to-orange-600",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 0 3 6h.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v9.25m-1.5-9H3.375c-.621 0-1.125.504-1.125 1.125v9.25c0 .621.504 1.125 1.125 1.125h15.75c.621 0 1.125-.504 1.125-1.125V6.375c0-.621-.504-1.125-1.125-1.125Z"
                  />
                ),
              },
            ].map((item, i) => (
              <div
                key={i}
                ref={(el) => (featuresRef.current[i] = el)}
                className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-transparent"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-10`}
                />
                <div
                  className={`relative z-10 mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}
                >
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    {item.icon}
                  </svg>
                </div>
                <h3 className="relative z-10 mb-3 text-xl font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="relative z-10 text-base leading-relaxed text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={(el) => (sectionRefs.current[3] = el)}
        className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24 lg:py-32"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE4YzAtMS4xLS45LTItMi0ycy0yIC45LTIgMiAuOSAyIDIgMiAyLS45IDItMnptLTI0IDBjMC0xLjEtLjktMi0yLTJzLTIgLjktMiAyIC45IDIgMiAyIDItLjkgMi0yem0yNCAyNGMwLTEuMS0uOS0yLTItMnMtMiAuOS0yIDIgLjkgMiAyIDIgMi0uOSAyLTJ6bS0yNCAwYzAtMS4xLS45LTItMi0ycy0yIC45LTIgMiAuOSAyIDIgMiAyLS45IDItMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div ref={ctaRef} className="mx-auto max-w-3xl space-y-8">
            <span className="inline-block rounded-full bg-primary/20 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-primary">
              Get Started
            </span>
            <h2 className="text-4xl font-bold text-white lg:text-5xl">
              Ready to find your{" "}
              <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                perfect car
              </span>
              ?
            </h2>
            <p className="text-xl leading-relaxed text-gray-300">
              Join thousands of satisfied customers who made their car buying
              experience simple, transparent, and entirely online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/search"
                className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-primary to-primary/90 px-10 py-5 text-lg font-semibold text-white shadow-2xl shadow-primary/30 transition-all hover:shadow-primary/50 hover:-translate-y-0.5"
              >
                Browse Inventory
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
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-2xl border-2 border-gray-600 px-10 py-5 text-lg font-semibold text-white transition-all hover:border-primary hover:bg-primary/10 hover:-translate-y-0.5"
              >
                Contact Us
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* <Testimonial /> */}
      <Team />
    </div>
  );
}