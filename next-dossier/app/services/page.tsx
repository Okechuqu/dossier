import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "../components/SiteFooter";
import { services } from "./data";

const SITE_URL = "https://okechuqu.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Services | Okechuqu",
  description:
    "Next.js development, Django development, API development, technical SEO, and tutoring services.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-14">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d7b874]">
            Services
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Practical delivery for teams that need a polished web presence.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-300 sm:text-base">
            These services are written to be easy to scan on mobile and detailed
            enough for a deeper read on desktop. Each page focuses on the
            outcome, the process, and the next step.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.slug}
              className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/20 backdrop-blur-sm sm:p-6"
            >
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-400">
                {service.eyebrow}
              </p>
              <h2 className="mt-3 text-2xl font-semibold">{service.title}</h2>
              <p className="mt-3 text-sm leading-7 text-neutral-300">
                {service.summary}
              </p>
              <ul className="mt-5 space-y-2 text-sm text-neutral-200">
                {service.outcomes.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {service.deliverables.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#d4bd89]/40 px-3 py-1 text-xs text-[#f0e2be]"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between gap-3">
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center justify-center rounded-full border border-[#d4bd89] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#d4bd89] hover:text-black"
                >
                  View details
                </Link>
                <Link
                  href={service.nextStepHref}
                  data-analytics-event={`service_cta_${service.slug}`}
                  className="text-sm font-medium text-[#d7b874] underline decoration-transparent underline-offset-4 transition hover:decoration-current"
                >
                  {service.nextStepLabel}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
