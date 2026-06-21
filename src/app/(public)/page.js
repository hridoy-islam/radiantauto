"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

function CountUp({ end, suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref.current || hasAnimated) return;
    
    const element = ref.current;
    
    const st = ScrollTrigger.create({
      trigger: element,
      start: "top 90%",
      once: true,
      onEnter: () => {
        setHasAnimated(true);
        const obj = { val: 0 };
        
        gsap.to(obj, {
          val: end,
          duration: 5,
          ease: "power3.out",
          onUpdate: () => {
            if (element) {
              element.textContent = obj.val.toFixed(decimals) + suffix;
            }
          },
        });
      },
    });

    return () => {
      st.kill();
    };
  }, [end, suffix, decimals, hasAnimated]);

  return <span ref={ref}>0{suffix}</span>;
}

const FloatingShape = ({ className, children }) => (
  <div className={`absolute animate-float ${className}`}>{children}</div>
);

export default function Home() {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const tradeRef = useRef(null);
  const financeRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const sections = [heroRef, aboutRef, servicesRef, tradeRef, financeRef, ctaRef];
    sections.forEach((ref) => {
      if (!ref.current) return;
      gsap.fromTo(
        ref.current.querySelectorAll(".gsap-fade"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.fromTo(
      heroRef.current?.querySelector(".gsap-hero-title"),
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1 }
    )
      .fromTo(
        heroRef.current?.querySelectorAll(".gsap-hero-item"),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
        "-=0.4"
      )
      .fromTo(
        heroRef.current?.querySelectorAll(".gsap-float"),
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.8, stagger: 0.2 },
        "-=0.6"
      );

    gsap.to(heroRef.current?.querySelector(".gsap-hero-image"), {
      scale: 1.05,
      duration: 8,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-0.5deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .hero-gradient {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
        }
      `}</style>

      {/* Hero */}
      <section ref={heroRef} className="relative hero-gradient min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/car-showroom.jpg"
            alt=""
            className="gsap-hero-image h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-900/30" />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingShape className="top-[15%] left-[5%] w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
          <FloatingShape className="top-[60%] right-[10%] w-48 h-48 rounded-full bg-primary/5 blur-3xl animate-float-slow" />
          <FloatingShape className="gsap-float top-[20%] right-[15%] z-30 max-sm:hidden">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/10 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">500+</div>
                <div>
                  <p className="text-white text-xs font-semibold">Cars Available</p>
                  <p className="text-white/60 text-xs">Latest Models</p>
                </div>
              </div>
            </div>
          </FloatingShape>
          
        </div>

        <div className="container mx-auto relative z-10 pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="gsap-hero-item inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-2 mb-6">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-white/80">Premium Auto Dealer Since 2014</span>
              </div>
              <h1 className="gsap-hero-title text-3xl font-bold leading-tight text-white sm:text-5xl ">
                Drive Your{" "}
                <span className="text-primary">Dream Car</span>
                <br />
                Home Today
              </h1>
              <p className="gsap-hero-item mt-6 max-w-xl text-lg text-gray-300 leading-relaxed">
                Experience a seamless way to buy, sell, or trade your vehicle. 
                We offer premium inventory, certified service, and financing 
                solutions tailored to you.
              </p>
              <div className="gsap-hero-item mt-8 flex flex-wrap gap-4">
                <Link
                  href="/search"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-primary px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-primary/30 transition-all hover:shadow-primary/50"
                >
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center gap-2">
                    Browse Inventory
                    <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10 hover:border-primary/50"
                >
                  Schedule Test Drive
                </Link>
              </div>
              
            </div>
            <div className="hidden lg:block relative">
              <div className="gsap-hero-item relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/images/h1.jpg"
                    alt="Featured Car"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-2xl flex items-center gap-4">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Wide Selection</p>
                    <p className="text-xs text-gray-500">200+ Vehicles in Stock</p>
                  </div>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* About */}
      <section ref={aboutRef} className="bg-gray-50 py-24">
        <div className="container mx-auto">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative gsap-fade">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-2xl">
                    <img src="/images/happycustomer.jpg" alt="" className="w-full h-48 object-cover hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="overflow-hidden rounded-2xl">
                    <img src="/images/carsold.jpg" alt="" className="w-full h-64 object-cover hover:scale-110 transition-transform duration-700" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="overflow-hidden rounded-2xl">
                    <img src="/images/carsell.jpg" alt="" className="w-full h-64 object-cover hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="overflow-hidden rounded-2xl">
                    <img src="/images/whyraidantauto.jpeg" alt="" className="w-full h-48 object-cover hover:scale-110 transition-transform duration-700" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-5 shadow-2xl flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-primary text-white flex items-center justify-center text-2xl font-bold">10</div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Years of</p>
                  <p className="text-sm font-bold text-primary">Excellence</p>
                </div>
              </div>
            </div>
            <div className="gsap-fade">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                About Radiant Auto
              </span>
              <h2 className="mb-6 text-4xl font-bold leading-tight text-gray-900 lg:text-5xl">
                Your Trusted Partner for <span className="text-primary">Automotive Excellence</span>
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-gray-500">
                We offer a comprehensive range of services including certified maintenance, advanced diagnostics, 
                and flexible financing options. Our extensive inventory features new, pre-owned, certified pre-owned, 
                electric, hybrid, luxury, and commercial vehicles.
              </p>
              <div className="mb-8 space-y-4">
                {[
                  { title: "Certified Pre-Owned Vehicles", desc: "Every car undergoes a 150-point inspection" },
                  { title: "Hassle-Free Financing", desc: "Get pre-approved in minutes with competitive rates" },
                  { title: "Nationwide Delivery", desc: "We can deliver your vehicle anywhere in the country" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/40"
              >
                Get In Touch
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative bg-white border-b border-gray-100 ">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {[
              { end: 200, suffix: "+", label: "Vehicles in Stock" },
              { end: 500, suffix: "+", label: "Happy Customers" },
              { end: 10, suffix: "+", label: "Years Experience" },
              { end: 98, suffix: "%", label: "Satisfaction Rate" },
            ].map((stat, i) => (
              <div key={i} className="py-10 px-8 text-center gsap-fade">
                <span className="block text-4xl font-bold text-primary">
                  <CountUp end={stat.end} suffix={stat.suffix} />
                </span>
                <span className="mt-2 block text-sm text-gray-500">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="relative mt-12 z-10 pb-20">
        <div className="container mx-auto">
          <div className="grid gap-6 md:grid-cols-3">
            <Link
              href="/trade-in"
              className="group relative rounded-2xl bg-white p-8 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl gsap-fade overflow-hidden"
            >
              <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-primary/25 transition-all duration-500 group-hover:bg-primary/40 group-hancer:scale-110" />
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/30">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Trade In Your Car</h3>
              <p className="mb-5 text-gray-500">Get the best value for your current vehicle with our hassle-free trade-in program.</p>
              <span className="inline-flex items-center text-sm font-semibold text-primary group-hover:underline">
                Learn More
                <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>

            <Link
              href="/sell-your-car"
              className="group relative rounded-2xl bg-white p-8 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl gsap-fade overflow-hidden"
            >
              <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-primary/25 transition-all duration-500 group-hover:bg-primary/40 group-hancer:scale-110" />
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/30">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Sell Your Car</h3>
              <p className="mb-5 text-gray-500">Sell your car quickly and at the best price. We make the process simple and transparent.</p>
              <span className="inline-flex items-center text-sm font-semibold text-primary group-hover:underline">
                Learn More
                <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>

            <Link
              href="/finance"
              className="group relative rounded-2xl bg-white p-8 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl gsap-fade overflow-hidden"
            >
              <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-primary/25 transition-all duration-500 group-hover:bg-primary/40 group-hancer:scale-110" />
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/30">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Finance Application</h3>
              <p className="mb-5 text-gray-500">Explore flexible financing options tailored to your budget. Get pre-approved in minutes.</p>
              <span className="inline-flex items-center text-sm font-semibold text-primary group-hover:underline">
                Learn More
                <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

     

      {/* Services */}
      <section ref={servicesRef} className="bg-white py-24">
        <div className="container mx-auto">
          <div className="mx-auto mb-16 max-w-5xl text-center gsap-fade">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
              Our Services
            </span>
            <h2 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
              Everything Your Car <span className="text-primary">Needs</span>
            </h2>
            <p className="text-lg text-gray-500">
              From sales to service, we provide complete automotive solutions under one roof.
            </p>
          </div>
       <div className="grid gap-8 md:grid-cols-3">
  {[
    {
      title: "Wide Range of Collection",
      desc: "A variety of cars to meet your specific requirements — from family SUVs to powerful trucks.",
      img: "/images/car-showroom.jpg",
      link: "/search",
    },
    {
      title: "Finance Solutions",
      desc: "Flexible financing options including personal, business, and specialty vehicle financing.",
      img: "/images/buycar.jpeg",
      link: "/finance",
    },
    {
      title: "Exclusively Online",
      desc: "Buy, schedule delivery, and manage everything from the comfort of your home.",
      img: "/images/buywithconfidance.jpeg",
      link: "/search",
    },
  ].map((service, i) => (
    <Link
      key={i}
      href={service.link}
      className="group relative rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl gsap-fade"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={service.img} 
          alt="" 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
      </div>
      {/* Black overlay - consistent for all cards */}
      <div className="absolute inset-0 bg-black/60" />
      {/* Content container */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        {/* Animated content wrapper */}
        <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="mb-2 text-xl font-bold text-white">{service.title}</h3>
          <p className="mb-4 text-sm text-white/80 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-500 overflow-hidden">
            {service.desc}
          </p>
          <span className="inline-flex items-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            Learn More
            <svg 
              className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" 
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
          </span>
        </div>
      </div>
    </Link>
  ))}
</div>
        </div>
      </section>

      {/* Trade In & Sell Your Car */}
      <section ref={tradeRef} className="bg-gray-50 py-24">
        <div className="container mx-auto">
          <div className="mx-auto mb-16 max-w-4xl text-center gsap-fade">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
              Trade or Sell
            </span>
            <h2 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
              Ready to <span className="text-primary">Upgrade</span>?
            </h2>
            <p className="text-lg text-gray-500">
              Whether you want to trade in your current vehicle or sell it outright, we make it easy.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {[
              {
                title: "Trade In Your Car",
                desc: "Get the best value for your current vehicle. Our hassle-free trade-in process makes upgrading to your next car simple and rewarding.",
                img: "/images/carsold.jpg",
                link: "/trade-in",
                cta: "Trade In Now",
                features: ["Free vehicle appraisal", "Instant offer", "Easy paperwork", "Same-day processing"],
              },
              {
                title: "Sell Your Car",
                desc: "Sell your car quickly and at the best possible price. We handle all the details so you can focus on what matters most.",
                img: "/images/carsell.jpg",
                link: "/sell-your-car",
                cta: "Sell Your Car",
                features: ["Free market evaluation", "No hidden fees", "Fast payment", "Free pickup"],
              },
            ].map((item, i) => (
              <div key={i} className="relative overflow-hidden rounded-2xl bg-white shadow-xl gsap-fade group">
                <div className="h-48 overflow-hidden">
                  <img src={item.img} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-8">
                  <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-primary/5" />
                  <h3 className="mb-4 text-2xl font-bold text-gray-900">{item.title}</h3>
                  <p className="mb-6 text-gray-500">{item.desc}</p>
                  <ul className="mb-8 space-y-3">
                    {item.features.map((f, j) => (
                      <li key={j} className="flex items-center text-gray-600">
                        <svg className="mr-3 h-5 w-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={item.link}
                    className="inline-flex items-center rounded-xl bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/40"
                  >
                    {item.cta}
                    <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Finance & Payment Calculator */}
      <section ref={financeRef} className="bg-white py-24">
        <div className="container mx-auto">
          <div className="mx-auto mb-16 max-w-5xl text-center gsap-fade">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
              Finance & Payments
            </span>
            <h2 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
              Smart <span className="text-primary">Financing</span> Made Simple
            </h2>
            <p className="text-lg text-gray-500">
              Explore our financing options and calculate your monthly payments with ease.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-100 bg-white p-10 shadow-xl hover:shadow-2xl transition-shadow gsap-fade">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/30">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">Finance Application</h3>
              <p className="mb-6 text-gray-500">
                Get pre-approved in minutes with our streamlined application process. 
                We work with top lenders to find you the best rates.
              </p>
              <Link
                href="/finance"
                className="inline-flex items-center rounded-xl bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/40"
              >
                Apply Now
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-10 shadow-xl hover:shadow-2xl transition-shadow gsap-fade">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/30">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
                </svg>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">Payment Calculator</h3>
              <p className="mb-6 text-gray-500">
                Plan your budget with our easy-to-use payment calculator. Estimate monthly payments 
                based on price, down payment, and interest rate.
              </p>
              <Link
                href="/payment-calculator"
                className="inline-flex items-center rounded-xl bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/40"
              >
                Calculate Payment
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="relative bg-gray-900 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/car-showroom.jpg" alt="" className="h-full w-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-gray-900" />
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingShape className="top-[20%] right-[10%] w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
          <FloatingShape className="bottom-[20%] left-[10%] w-48 h-48 rounded-full bg-primary/5 blur-3xl animate-float-slow" />
        </div>
        <div className="container mx-auto relative z-10">
          <div className="mx-auto max-w-3xl text-center gsap-fade">
            <span className="mb-4 inline-block rounded-full bg-primary/10 border border-primary/20 px-5 py-2 text-sm font-semibold text-primary">
              Get Started Today
            </span>
            <h2 className="mb-6 text-4xl font-bold text-white lg:text-5xl">
              Ready to Find Your <span className="text-primary">Perfect Car</span>?
            </h2>
            <p className="mb-10 text-lg text-gray-300">
              Visit us today or schedule a test drive. Our team is ready to help you 
              find the perfect vehicle for your needs and budget.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/search"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-primary px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-primary/30 transition-all hover:shadow-primary/50"
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2">
                  Browse Inventory
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/5 hover:border-primary/50"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
