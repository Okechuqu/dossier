import Link from "next/link";
import AnalyticsPreferences from "./AnalyticsPreferences";

const SiteFooter = () => {
  return (
    <footer className="border-t border-white/10 bg-black/20 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="max-w-md">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#d7b874]">
            Okechuqu
          </p>
          <p className="mt-3 text-sm leading-7 text-neutral-300">
            Mobile-first Next.js builds, technical SEO clean-up, and practical
            tutoring for teams that want a site to feel easier to use and easier
            to find.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
            Explore
          </h2>
          <nav className="mt-4 flex flex-col gap-3 text-sm text-neutral-200">
            <Link href="/services" className="transition hover:text-[#d7b874]">
              Services
            </Link>
            <Link
              href="/case-studies"
              className="transition hover:text-[#d7b874]"
            >
              Case studies
            </Link>
            <Link href="/privacy-policy" className="transition hover:text-[#d7b874]">
              Privacy policy
            </Link>
          </nav>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
            Preferences
          </h2>
          <div className="mt-4 flex flex-col gap-3">
            <AnalyticsPreferences />
            <Link
              href="/#contact"
              data-analytics-event="footer_contact_cta"
              className="inline-flex w-fit items-center justify-center rounded-full bg-[#d7b874] px-4 py-2 text-sm font-semibold text-black transition hover:bg-white"
            >
              Start a project
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
