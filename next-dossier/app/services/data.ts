export type ServiceSlug =
  | "nextjs-development"
  | "django-development"
  | "api-development"
  | "technical-seo"
  | "tutoring";

export interface ServiceItem {
  slug: ServiceSlug;
  title: string;
  eyebrow: string;
  summary: string;
  overview: string;
  outcomes: string[];
  deliverables: string[];
  nextStepLabel: string;
  nextStepHref: string;
  metaDescription: string;
}

export const services: ServiceItem[] = [
  {
    slug: "nextjs-development",
    title: "Next.js Development",
    eyebrow: "Fast websites and app frontends",
    summary:
      "Responsive, SEO-friendly interfaces built for launch speed, maintainability, and strong mobile performance.",
    overview:
      "I build content-rich marketing sites, portfolio systems, and app frontends with a mobile-first layout, clean navigation, and measurable performance goals.",
    outcomes: [
      "Mobile-first layouts that stay readable on small screens.",
      "Reusable sections that scale as the site grows.",
      "Structured metadata and crawl-friendly routes.",
    ],
    deliverables: [
      "App Router implementation",
      "Component system and responsive styling",
      "Metadata, sitemap, and canonical setup",
    ],
    nextStepLabel: "Discuss a Next.js build",
    nextStepHref: "/#contact",
    metaDescription:
      "Next.js development for mobile-first marketing sites, portfolios, and app frontends.",
  },
  {
    slug: "django-development",
    title: "Django Development",
    eyebrow: "Secure backends and admin workflows",
    summary:
      "Backoffice tools, authenticated workflows, and Python backends that support real business operations.",
    overview:
      "Ideal for teams that need a secure, maintainable backend with clear models, admin tooling, and well-structured APIs behind the scenes.",
    outcomes: [
      "Clear data models and maintainable business logic.",
      "Reliable admin tooling for internal teams.",
      "A backend that can power dashboards, portals, or integrations.",
    ],
    deliverables: [
      "Models, views, and API endpoints",
      "Admin configuration and content workflows",
      "Deployment-ready project structure",
    ],
    nextStepLabel: "Plan a Django project",
    nextStepHref: "/#contact",
    metaDescription:
      "Django development for secure backends, admin tools, and maintainable business workflows.",
  },
  {
    slug: "api-development",
    title: "API Development",
    eyebrow: "Integrations and data exchange",
    summary:
      "REST endpoints, form pipelines, and third-party integrations that keep products and teams connected.",
    overview:
      "From enquiry forms to internal services, I build APIs with validation, predictable responses, and sensible security boundaries.",
    outcomes: [
      "Server-side validation for sensitive submissions.",
      "Endpoints that are easy to document and maintain.",
      "Integration points for CRM, analytics, or automation tools.",
    ],
    deliverables: [
      "REST endpoints and validation",
      "Error handling and logging",
      "Webhook and integration support",
    ],
    nextStepLabel: "Scope an API",
    nextStepHref: "/#contact",
    metaDescription:
      "API development for validation-heavy workflows, integrations, and server-side automation.",
  },
  {
    slug: "technical-seo",
    title: "Technical SEO",
    eyebrow: "Crawlability and search signals",
    summary:
      "Canonical tags, sitemap structure, metadata, structured data, and performance tuning for search visibility.",
    overview:
      "I focus on the technical foundations search engines need: clear URLs, strong metadata, crawlable content, and faster mobile rendering.",
    outcomes: [
      "Cleaner indexation and stronger site signals.",
      "Schema markup and metadata improvements.",
      "Mobile performance fixes that support better user experience.",
    ],
    deliverables: [
      "Metadata and canonical audits",
      "Robots and sitemap cleanup",
      "Structured data and internal link review",
    ],
    nextStepLabel: "Book a technical SEO review",
    nextStepHref: "/#contact",
    metaDescription:
      "Technical SEO audits covering canonical tags, sitemap structure, schema, and performance.",
  },
  {
    slug: "tutoring",
    title: "Tutoring",
    eyebrow: "One-to-one learning support",
    summary:
      "Practical tutoring for developers who want clearer explanations, project help, or a steadier learning path.",
    overview:
      "Sessions are tailored to your current level and goals, whether that means reviewing code, understanding fundamentals, or making progress on a live project.",
    outcomes: [
      "A focused learning plan based on your current blockers.",
      "Code review and guided problem solving.",
      "Actionable next steps after every session.",
    ],
    deliverables: [
      "Live Q&A and screen sharing",
      "Project walkthroughs and debugging support",
      "Recap notes and follow-up guidance",
    ],
    nextStepLabel: "Schedule a tutoring session",
    nextStepHref: "/#contact",
    metaDescription:
      "Tutoring for developers who want clearer explanations, code review, and guided project support.",
  },
];

export const serviceBySlug = Object.fromEntries(
  services.map((service) => [service.slug, service]),
) as Record<ServiceSlug, ServiceItem>;
