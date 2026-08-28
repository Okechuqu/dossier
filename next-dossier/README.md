# Dossier Frontend

The public Next.js 14 portfolio for `https://okechuqu.com`. Content is read from Sanity, while contact submissions are validated by a server-only API route before being stored in Sanity. The frontend now includes dedicated service pages, case-study pages, a privacy policy, and consent-aware analytics hooks.

See the [repository README](../README.md) for the complete architecture, CMS workflow, deployment instructions, security checklist, and troubleshooting guidance.

## Setup

```bash
npm ci
```

Create `.env.local` with a newly issued, least-privilege Sanity write token:

```dotenv
SANITY_API_TOKEN=your_server_only_sanity_token
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_google_search_console_token
NEXT_PUBLIC_BING_SITE_VERIFICATION=your_bing_webmaster_token
```

Never use a `NEXT_PUBLIC_` prefix for this credential.

Start the application:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Important Routes

- `/` — portfolio homepage
- `/services` — services index
- `/services/[slug]` — dedicated service detail pages
- `/case-studies` — selected work index
- `/case-studies/[slug]` — dedicated case-study pages
- `/api/contact` — validated server-side contact submission
- `/privacy-policy` — privacy notice
- `/robots.txt` — crawler directives for `okechuqu.com`
- `/sitemap.xml` — canonical indexable URLs

## Production

Set the deployment root to `next-dossier` and configure `SANITY_API_TOKEN` as a server-only secret. After deployment, verify canonical metadata and permanent redirects from `www.okechuqu.com` and `dossier-oec.vercel.app` to the apex domain.

If you use analytics, keep the measurement ID server-safe, and only expect tracking after the visitor opts in through the consent banner or footer preference toggle.
