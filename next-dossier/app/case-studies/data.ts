export type CaseStudySlug = "reelsdraft" | "portfolio-refresh";

export interface CaseStudyItem {
  slug: CaseStudySlug;
  title: string;
  client: string;
  category: string;
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  stack: string[];
  metaDescription: string;
}

export const caseStudies: CaseStudyItem[] = [
  {
    slug: "reelsdraft",
    title: "ReelsDraft",
    client: "Creator-led brand",
    category: "Content workflow and presentation",
    summary:
      "A focused case study template for a short-form content brand that needs clearer presentation, faster enquiry flow, and a site that feels strong on mobile first.",
    challenge:
      "The main goal was to make the offer easier to understand at a glance and keep the call to action visible on phones without overwhelming the page.",
    approach:
      "I used a compact section structure, clearer hierarchy, and stronger page-level signals so the story is easy to scan and the next step is obvious.",
    outcome:
      "The result is a cleaner structure that can be expanded with approved metrics, visuals, and testimonials as soon as those assets are available.",
    stack: ["Next.js", "Tailwind CSS", "Sanity", "Mobile-first layout"],
    metaDescription:
      "ReelsDraft case study template showing a mobile-first presentation and enquiry flow.",
  },
  {
    slug: "portfolio-refresh",
    title: "Portfolio Refresh",
    client: "Okechuqu",
    category: "SEO and conversion polish",
    summary:
      "A practical case study describing the portfolio cleanup work: better crawlability, clearer service pages, and a faster route from discovery to contact.",
    challenge:
      "The site needed stronger search signals, a cleaner information architecture, and fewer barriers between a visitor and the enquiry form.",
    approach:
      "I added dedicated service and case-study routes, aligned metadata and canonical signals, and gave mobile visitors a shorter path to the contact action.",
    outcome:
      "The portfolio now has a clearer structure for expansion, with supporting pages that can carry future service and case-study content without reworking the whole site.",
    stack: ["Next.js", "SEO", "Consent-aware analytics", "Sanity"],
    metaDescription:
      "Portfolio refresh case study covering SEO, mobile navigation, and enquiry-flow improvements.",
  },
];

export const caseStudyBySlug = Object.fromEntries(
  caseStudies.map((study) => [study.slug, study]),
) as Record<CaseStudySlug, CaseStudyItem>;
