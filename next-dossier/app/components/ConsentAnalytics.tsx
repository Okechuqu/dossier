"use client";

import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "okechuqu-analytics-consent";
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

type Consent = "granted" | "denied";

const readConsent = (): Consent | null => {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "granted" || value === "denied" ? value : null;
};

const ensureGtag = () => {
  if (!GA_ID || document.getElementById("gtag-js")) return;

  const script = document.createElement("script");
  script.id = "gtag-js";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      const dataLayer = window.dataLayer || [];
      dataLayer.push(args);
      window.dataLayer = dataLayer;
    };

  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { anonymize_ip: true });
};

const pushEvent = (name: string, params: Record<string, unknown> = {}) => {
  if (!GA_ID || typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", name, params);
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function ConsentAnalytics() {
  const pathname = usePathname();
  const consent = useMemo(() => readConsent(), []);

  useEffect(() => {
    const currentConsent = readConsent();
    if (currentConsent !== "granted") return;

    ensureGtag();
    pushEvent("page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  useEffect(() => {
    const onPreferenceChange = (event: Event) => {
      const detail = (event as CustomEvent<{ consent?: Consent }>).detail;
      if (detail?.consent === "granted") {
        ensureGtag();
        pushEvent("consent_granted", { source: "site" });
      }
      if (detail?.consent === "denied") {
        pushEvent("consent_withdrawn", { source: "site" });
      }
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const trigger = target?.closest<HTMLElement>("[data-analytics-event]");
      if (!trigger) return;

      const eventName = trigger.dataset.analyticsEvent;
      if (!eventName) return;

      pushEvent("cta_click", {
        cta_name: eventName,
        cta_text: trigger.textContent?.trim().slice(0, 80),
        page_path: window.location.pathname,
      });
    };

    const onContactSubmission = (event: Event) => {
      const detail = (event as CustomEvent<Record<string, unknown>>).detail ?? {};
      pushEvent("contact_submit", {
        page_path: window.location.pathname,
        ...detail,
      });
    };

    window.addEventListener("site-analytics-preference-change", onPreferenceChange);
    window.addEventListener("click", onClick, true);
    window.addEventListener("site-contact-submitted", onContactSubmission);

    return () => {
      window.removeEventListener(
        "site-analytics-preference-change",
        onPreferenceChange,
      );
      window.removeEventListener("click", onClick, true);
      window.removeEventListener("site-contact-submitted", onContactSubmission);
    };
  }, []);

  if (consent !== "granted") return null;

  return null;
}
