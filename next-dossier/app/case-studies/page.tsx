import type { Metadata } from "next";
import Link from "next/link";
// SiteFooter is rendered globally in RootLayout
import { caseStudies } from "./data";

const SITE_URL = "https://okechuqu.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Case Studies | Okechuqu",
  description:
    "Selected case studies showing mobile-first presentation, SEO improvements, and clearer enquiry flows.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-full bg-gray-950 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-14">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d7b874]">
            Case studies
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            A small set of projects with a clear story and a clear next step.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-300 sm:text-base">
            These pages are built to explain the work without hiding the
            important details behind a dense wall of text. They are also easy to
            scan on mobile, where most first visits happen.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {caseStudies.map((study) => (
            <article
              key={study.slug}
              className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/20 backdrop-blur-sm sm:p-6"
            >
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-400">
                {study.category}
              </p>
              <h2 className="mt-3 text-2xl font-semibold">{study.title}</h2>
              <p className="mt-1 text-sm text-[#d7b874]">{study.client}</p>
              <p className="mt-4 text-sm leading-7 text-neutral-300">
                {study.summary}
              </p>
              <ul className="mt-5 space-y-2 text-sm text-neutral-200">
                {study.stack.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={`/case-studies/${study.slug}`}
                className="mt-6 inline-flex w-fit items-center justify-center rounded-full border border-[#d4bd89] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#d4bd89] hover:text-black"
              >
                Read case study
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
