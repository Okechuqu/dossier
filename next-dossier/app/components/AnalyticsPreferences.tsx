"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "okechuqu-analytics-consent";

type Consent = "granted" | "denied";

const readConsent = (): Consent | null => {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "granted" || value === "denied" ? value : null;
};

const AnalyticsPreferences = () => {
  const [consent, setConsent] = useState<Consent | null>(null);

  useEffect(() => {
    setConsent(readConsent());
  }, []);

  const updateConsent = (nextConsent: Consent) => {
    window.localStorage.setItem(STORAGE_KEY, nextConsent);
    setConsent(nextConsent);
    window.dispatchEvent(
      new CustomEvent("site-analytics-preference-change", {
        detail: { consent: nextConsent },
      }),
    );
  };

  return (
    <button
      type="button"
      onClick={() =>
        updateConsent(consent === "granted" ? "denied" : "granted")
      }
      className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-neutral-200 transition hover:border-[#d4bd89] hover:text-white"
      aria-pressed={consent === "granted"}
    >
      {consent === "granted" ? "Analytics: on" : "Enable analytics"}
    </button>
  );
};

export default AnalyticsPreferences;
