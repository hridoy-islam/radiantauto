"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Cookie, Check } from "lucide-react";
import { Button } from "../../components/ui/button";

const COOKIE_CONSENT_KEY = "radiant_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const handleDismiss = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "dismissed");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="mx-auto max-w-5xl animate-in slide-in-from-bottom-4 fade-in duration-500">
        <div className="relative bg-white border border-gray-200 rounded-2xl shadow-2xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 p-1 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Cookie className="w-5 h-5 text-primary" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 mb-1">
              We Value Your Privacy
            </p>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
              This website uses cookies and similar technologies to enhance your
              browsing experience, analyze site traffic, and serve personalized
              content. By clicking &ldquo;Accept&rdquo;, you consent to our use of
              cookies. You can learn more in our{" "}
              <Link
                href="/privacy-policy"
                className="text-primary hover:underline font-medium"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto">
            <Button
              onClick={handleDismiss}
              variant="outline"
              size="sm"
              className="rounded-full text-xs px-5 h-10 flex-1 md:flex-none"
            >
              Decline
            </Button>
            <Button
              onClick={handleAccept}
              size="sm"
              className="rounded-full text-xs px-5 h-10 flex-1 md:flex-none"
            >
              <Check className="w-3.5 h-3.5 mr-1.5" />
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
