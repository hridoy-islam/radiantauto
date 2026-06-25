"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [isFinanceOpen, setIsFinanceOpen] = useState(false);
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });

    gsap.fromTo(
      headerRef.current?.querySelectorAll(".nav-item"),
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" }
    );

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuRef.current) return;
    
    if (open) {
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
      
      gsap.set(mobileMenuRef.current, { display: "flex" });
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: "power3.out" }
      );
      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll(".mobile-nav-item"),
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.06, ease: "power3.out" }
      );
    } else {
      // Restore body scroll
      document.body.style.overflow = '';
      
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => gsap.set(mobileMenuRef.current, { display: "none" }),
      });
    }
    
    // Cleanup: restore scroll on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const toggleSubmenu = () => setIsSubmenuOpen(!isSubmenuOpen);
  const toggleFinanceMenu = () => setIsFinanceOpen(!isFinanceOpen);
  const closeMobile = () => setOpen(false);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg" : "bg-white"
      }`}
    >
      {/* Top bar */}
      <div className="hidden lg:block bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-9">
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                +1 306 261 4800
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                info@radiant-auto.com
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                213 33rd St WSaskatoon, SK S7L 0V2, Canada
              </span>
            </div>
            
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex-shrink-0">
              <img src="/images/logo.png" alt="logo" className="h-8 lg:h-10 w-auto" />
            </Link>

            <button
              onClick={() => setOpen(!open)}
              className="relative z-50 flex flex-col items-center justify-center w-10 h-10 lg:hidden"
              aria-label="Toggle menu"
            >
              {open ? (
                // Cross (X) icon
                <svg 
                  className="w-6 h-6 text-gray-800" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger icon
                <>
                  <span className="block h-0.5 w-6 bg-gray-800 rounded transition-all duration-300" />
                  <span className="block h-0.5 w-6 bg-gray-800 rounded transition-all duration-300 mt-[5px]" />
                  <span className="block h-0.5 w-6 bg-gray-800 rounded transition-all duration-300 mt-[5px]" />
                </>
              )}
            </button>

            <nav ref={navRef} className="hidden lg:flex items-center gap-0.5">
              <NavItem href="/" label="Home" />
              <NavItem href="/search" label="Search Cars" />
              <div className="group relative nav-item">
                <button className="flex items-center gap-1 px-4 py-2.5 text-sm font-medium text-gray-700 rounded-lg transition-all duration-300 group-hover:bg-primary/5 group-hover:text-primary">
                  Sell or Trade
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2 w-52">
                    <DropdownLink href="/trade-in" label="Trade in Your Car" />
                    <DropdownLink href="/sell-your-car" label="Sell Your Car" />
                  </div>
                </div>
              </div>
              <div className="group relative nav-item">
                <button className="flex items-center gap-1 px-4 py-2.5 text-sm font-medium text-gray-700 rounded-lg transition-all duration-300 group-hover:bg-primary/5 group-hover:text-primary">
                  Finance
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2 w-56">
                    <DropdownLink href="/finance" label="Finance Application" />
                    <DropdownLink href="/payment-calculator" label="Payment Calculator" />
                  </div>
                </div>
              </div>
              <NavItem href="/about" label="About" />
              <NavItem href="/contact" label="Contact" />
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile menu - Full height */}
      <div
        ref={mobileMenuRef}
        className="lg:hidden fixed inset-0 top-[65px] bg-white overflow-y-auto"
        style={{ display: "none" }}
      >
        <div className="flex flex-col min-h-full p-6 space-y-2">
          <MobileNavItem href="/" label="Home" onClick={closeMobile} />
          <MobileNavItem href="/search" label="Search Cars" onClick={closeMobile} />
          
          <div className="mobile-nav-item">
            <button
              onClick={toggleSubmenu}
              className="flex items-center justify-between w-full px-4 py-3.5 text-base font-medium text-gray-800 rounded-xl hover:bg-primary/5 hover:text-primary transition-all border border-transparent hover:border-primary/10"
            >
              Sell or Trade
              <svg className={`w-5 h-5 transition-transform duration-300 ${isSubmenuOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isSubmenuOpen ? "max-h-40" : "max-h-0"}`}>
              <div className="pl-6 py-2 space-y-1">
                <MobileDropdownLink href="/trade-in" label="Trade in Your Car" onClick={closeMobile} />
                <MobileDropdownLink href="/sell-your-car" label="Sell Your Car" onClick={closeMobile} />
              </div>
            </div>
          </div>

          <div className="mobile-nav-item">
            <button
              onClick={toggleFinanceMenu}
              className="flex items-center justify-between w-full px-4 py-3.5 text-base font-medium text-gray-800 rounded-xl hover:bg-primary/5 hover:text-primary transition-all border border-transparent hover:border-primary/10"
            >
              Finance
              <svg className={`w-5 h-5 transition-transform duration-300 ${isFinanceOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isFinanceOpen ? "max-h-40" : "max-h-0"}`}>
              <div className="pl-6 py-2 space-y-1">
                <MobileDropdownLink href="/finance" label="Finance Application" onClick={closeMobile} />
                <MobileDropdownLink href="/payment-calculator" label="Payment Calculator" onClick={closeMobile} />
              </div>
            </div>
          </div>

          <MobileNavItem href="/about" label="About" onClick={closeMobile} />
          <MobileNavItem href="/contact" label="Contact" onClick={closeMobile} />

          
        </div>
      </div>
    </header>
  );
}

const NavItem = ({ href, label }) => (
  <Link
    href={href}
    className="nav-item px-4 py-2.5 text-sm font-medium text-gray-700 rounded-lg transition-all duration-300 hover:bg-primary/5 hover:text-primary"
  >
    {label}
  </Link>
);

const DropdownLink = ({ href, label }) => (
  <Link
    href={href}
    className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-gray-600 rounded-lg transition-all duration-200 hover:bg-primary/5 hover:text-primary"
  >
    {label}
  </Link>
);

const MobileNavItem = ({ href, label, onClick }) => (
  <Link
    href={href}
    onClick={onClick}
    className="mobile-nav-item block px-4 py-3.5 text-base font-medium text-gray-800 rounded-xl hover:bg-primary/5 hover:text-primary transition-all border border-transparent hover:border-primary/10"
  >
    {label}
  </Link>
);

const MobileDropdownLink = ({ href, label, onClick }) => (
  <Link
    href={href}
    onClick={onClick}
    className="block px-4 py-3 text-base text-gray-600 rounded-xl hover:bg-primary/5 hover:text-primary transition-all"
  >
    {label}
  </Link>
);