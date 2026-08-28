import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SiteFooter from "../../components/SiteFooter";
import { serviceBySlug, services, type ServiceSlug } from "../data";

const SITE_URL = "https://okechuqu.com";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const service = serviceBySlug[params.slug as ServiceSlug];

  if (!service) {
    return {
      metadataBase: new URL(SITE_URL),
      title: "Service | Okechuqu",
      description: "Service details from Okechuqu.",
    };
  }

  return {
    metadataBase: new URL(SITE_URL),
    title: `${service.title} | Okechuqu`,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = serviceBySlug[params.slug as ServiceSlug];

  if (!service) notFound();

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-14">
        <Link
          href="/services"
          className="inline-flex w-fit items-center rounded-full border border-white/10 px-4 py-2 text-sm text-neutral-200 transition hover:border-[#d4bd89] hover:text-white"
        >
          ← Back to services
        </Link>

        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d7b874]">
            {service.eyebrow}
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {service.title}
          </h1>
          <p className="mt-4 text-sm leading-7 text-neutral-300 sm:text-base">
            {service.overview}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6">
            <h2 className="text-xl font-semibold">What this service covers</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-neutral-300">
              {service.outcomes.map((item) => (
                <li key={item} className="rounded-2xl bg-black/20 px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6">
            <h2 className="text-xl font-semibold">Typical deliverables</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-neutral-300">
              {service.deliverables.map((item) => (
                <li key={item} className="rounded-2xl bg-black/20 px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="rounded-3xl border border-[#d4bd89]/30 bg-[#d4bd89]/10 p-5 sm:p-6">
          <h2 className="text-xl font-semibold">Best next step</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-200">
            If this looks like the right fit, send a short note with your
            timeline, budget range, and current site or product context. I’ll
            reply with the most useful next step.
          </p>
          <Link
            href={service.nextStepHref}
            data-analytics-event={`service_detail_cta_${service.slug}`}
            className="mt-5 inline-flex items-center justify-center rounded-full bg-[#d7b874] px-5 py-3 text-sm font-semibold text-black transition hover:bg-white"
          >
            {service.nextStepLabel}
          </Link>
        </section>
      </section>
      <SiteFooter />
    </main>
  );
}
