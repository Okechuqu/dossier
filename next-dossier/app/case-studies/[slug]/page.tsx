import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
// SiteFooter is rendered globally in RootLayout
import { caseStudyBySlug, caseStudies, type CaseStudySlug } from "../data";

const SITE_URL = "https://okechuqu.com";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const study = caseStudyBySlug[params.slug as CaseStudySlug];

  if (!study) {
    return {
      metadataBase: new URL(SITE_URL),
      title: "Case Study | Okechuqu",
      description: "Case study details from Okechuqu.",
    };
  }

  return {
    metadataBase: new URL(SITE_URL),
    title: `${study.title} Case Study | Okechuqu`,
    description: study.metaDescription,
    alternates: { canonical: `/case-studies/${study.slug}` },
  };
}

export default function CaseStudyDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const study = caseStudyBySlug[params.slug as CaseStudySlug];

  if (!study) notFound();

  return (
    <main className="min-h-full bg-gray-950 text-white">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-14">
        <Link
          href="/case-studies"
          className="inline-flex w-fit items-center rounded-full border border-white/10 px-4 py-2 text-sm text-neutral-200 transition hover:border-[#d4bd89] hover:text-white"
        >
          ← Back to case studies
        </Link>

        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d7b874]">
            {study.category}
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {study.title}
          </h1>
          <p className="mt-2 text-sm text-[#d7b874]">{study.client}</p>
          <p className="mt-4 text-sm leading-7 text-neutral-300 sm:text-base">
            {study.summary}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6">
            <h2 className="text-xl font-semibold">Challenge</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-300">
              {study.challenge}
            </p>
          </section>
          <section className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6">
            <h2 className="text-xl font-semibold">Approach</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-300">
              {study.approach}
            </p>
          </section>
        </div>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6">
          <h2 className="text-xl font-semibold">Outcome</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-300">
            {study.outcome}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {study.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#d4bd89]/40 px-3 py-1 text-xs text-[#f0e2be]"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-[#d4bd89]/30 bg-[#d4bd89]/10 p-5 sm:p-6">
          <h2 className="text-xl font-semibold">Want a similar result?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-200">
            Send the rough brief, your timeline, and the page or product you
            want to improve. I can help shape the page structure, performance,
            and conversion path from there.
          </p>
          <Link
            href="/#contact"
            data-analytics-event={`case_study_cta_${study.slug}`}
            className="mt-5 inline-flex items-center justify-center rounded-full bg-[#d7b874] px-5 py-3 text-sm font-semibold text-black transition hover:bg-white"
          >
            Start a project
          </Link>
        </section>
      </section>
    </main>
  );
}
