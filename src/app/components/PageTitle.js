"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const PageTitle = ({ title, text, slogan, image = "" }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const decorRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".gsap-title-item"),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );

      gsap.to(sectionRef.current.querySelector(".gsap-title-bg"), {
        scale: 1.1,
        duration: 6,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current.querySelectorAll(".title-word"),
          { opacity: 0, x: -30, rotateX: 20 },
          { opacity: 1, x: 0, rotateX: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" }
        );
      }

      if (decorRef.current) {
        gsap.fromTo(
          decorRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: "power3.inOut", delay: 0.6 }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const words = title.split(" ");

  return (
    <div ref={sectionRef} className="relative overflow-hidden bg-gray-900 min-h-[38vh] lg:min-h-[42vh] flex items-center">
      <img
        src={image || "/images/titlebg.jpeg"}
        alt=""
        className="gsap-title-bg absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/75 to-gray-900/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-gray-900/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 via-transparent to-transparent" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 right-[20%] w-72 h-72 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 left-[10%] w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/2 right-[5%] w-1 h-1 rounded-full bg-primary/40 shadow-[0_0_8px_2px_rgba(255,102,0,0.3)]" />
        <div className="absolute top-[30%] right-[12%] w-0.5 h-0.5 rounded-full bg-primary/30 shadow-[0_0_6px_1px_rgba(255,102,0,0.2)]" />
        <div className="absolute top-[60%] right-[8%] w-0.5 h-0.5 rounded-full bg-white/20" />
      </div>

      <div className="container mx-auto relative z-10 py-20 lg:pt-36">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-5xl">
            {slogan && (
              <span className="gsap-title-item mb-5 inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                {slogan}
              </span>
            )}
            <h1
              ref={titleRef}
              className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
            >
              {words.map((word, i) => (
                <span key={i} className="title-word inline-block mr-[0.3em]">
                  {word === words[words.length - 1] && words.length > 1 ? (
                    <>
                      <span className="text-primary">{word}</span>
                    </>
                  ) : (
                    word
                  )}
                </span>
              ))}
            </h1>
            <div
              ref={decorRef}
              className="h-1 w-16 rounded-full bg-primary origin-left mb-6"
            />
            {text && (
              <p className="text-base leading-relaxed text-gray-300 md:text-lg max-w-5xl">
                {text}
              </p>
            )}
            <div className="gsap-title-item mt-8 flex flex-wrap gap-3">
              <Link
                href="/search"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:shadow-primary/40"
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2">
                  Browse Inventory
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-primary/50"
              >
                Contact Us
              </Link>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
