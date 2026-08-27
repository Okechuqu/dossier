# Dossier

A modern, content-managed portfolio website built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and Sanity. Dossier presents a professional profile, experience, services, skills, projects, testimonials, pricing, and contact information through a responsive single-page interface.

The repository contains two applications:

- `next-dossier` — the public-facing Next.js portfolio
- `studio-dossier` — the Sanity Studio used to manage portfolio content

## Features

- Responsive, mobile-first portfolio layout
- Content managed through Sanity Studio
- Incremental content refresh with a 30-second revalidation interval
- Animated navigation, cards, modals, testimonials, and page transitions
- Project gallery with image support and newest-first ordering
- Resume and professional-experience timeline
- Services, skills, pricing, and testimonial sections
- Privacy-aware contact form with validated server-side Sanity submission
- Dynamic metadata, canonical URLs, social cards, and JSON-LD
- App Router sitemap and `robots.txt` using the canonical production domain
- Optimized images through Next.js
- Strongly typed React components and Sanity data models

## Technology Stack

| Area | Technology |
| --- | --- |
| Frontend | Next.js 14 App Router, React 18, TypeScript |
| Styling | Tailwind CSS, custom CSS |
| Animation | Framer Motion, Motion, Animate.css |
| UI | Radix UI, Aceternity-inspired components, Tabler and Lucide icons |
| CMS | Sanity Studio 3 |
| Content queries | GROQ through `next-sanity` |
| Image delivery | Sanity Image URL builder and Next.js Image |
| SEO | Next.js Metadata API and Metadata Routes |

## Repository Structure

```text
dossier/
├── next-dossier/                 # Public Next.js application
│   ├── app/
│   │   ├── api/contact/          # Server-only contact endpoint
│   │   ├── components/           # Portfolio sections and reusable UI
│   │   ├── lib/                  # Portable Text and navigation utilities
│   │   ├── privacy-policy/       # Public privacy notice
│   │   ├── client.ts             # Sanity client configuration
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout and metadata
│   │   ├── page.tsx              # Portfolio page composition and JSON-LD
│   │   ├── robots.ts             # Canonical crawler directives
│   │   └── sitemap.ts            # Canonical indexable URLs
│   ├── next.config.mjs           # Next.js and remote image settings
│   └── package.json
├── studio-dossier/               # Sanity content studio
│   ├── schemaTypes/              # Content schemas
│   ├── sanity.config.ts          # Studio configuration
│   ├── sanity.cli.ts             # Sanity CLI configuration
│   └── package.json
└── README.md
```

## Content Model

Sanity provides document types for the principal areas of the site:

| Schema | Purpose |
| --- | --- |
| `profile` | Personal details, profile image, email, and social information |
| `hero` | Introductory heading and hero content |
| `about` | Biography and supporting content |
| `resume` | Education and professional experience |
| `service` | Services offered |
| `skill` | Skills and technical capabilities |
| `portfolio` | Projects, technology stacks, links, descriptions, and images |
| `testimonial` | Client or collaborator testimonials |
| `pricing` | Service packages and included features |
| `title` | Shared section headings and SEO metadata |
| `contactMe` | Contact-form submissions |

Most single-record sections use the most recently created Sanity document. Collection sections are rendered from their corresponding document lists. Portfolio documents are queried by `_createdAt desc`, so newly added projects appear first.

## Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/) 18.17 or newer; Node.js 20 LTS is recommended
- npm 9 or newer
- A [Sanity](https://www.sanity.io/) account with access to the configured project

The applications currently use Sanity project `kx25p8c1` and the `production` dataset. Update the project ID and dataset in both applications if you are connecting the repository to a different Sanity project:

- `next-dossier/app/client.ts`
- `studio-dossier/sanity.config.ts`
- `studio-dossier/sanity.cli.ts`

## Installation

Clone the repository and install each application's dependencies:

```bash
git clone <repository-url>
cd dossier

cd next-dossier
npm ci

cd ../studio-dossier
npm ci
```

`npm ci` uses the committed lockfiles to produce repeatable installations. Use `npm install` instead when intentionally updating dependencies.

## Environment Configuration

Create `next-dossier/.env.local`:

```dotenv
SANITY_API_TOKEN=your_new_server_only_sanity_token
```

The public client reads published Sanity content without a token. Contact submissions go to `POST /api/contact`, are validated on the server, and are written using `SANITY_API_TOKEN`. Give this token only the minimum permission required to create `contactMe` documents.

> [!CAUTION]
> Never rename this variable to `NEXT_PUBLIC_SANITY_API_TOKEN`. Variables prefixed with `NEXT_PUBLIC_` are included in browser JavaScript. If a token was exposed there previously, revoke it, inspect Sanity activity and contact records, and issue a new least-privilege token.

Add the following origins to the Sanity project's CORS settings when needed:

- `http://localhost:3000` for local frontend development
- The production frontend domain
- Any preview deployment domains used by the team

Contact writes happen on the server and do not require credentialed browser CORS access. Only enable credentialed origins when another feature genuinely requires them.

## Running Locally

Run the frontend and Studio in separate terminals.

### Frontend

```bash
cd next-dossier
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Sanity Studio

```bash
cd studio-dossier
npm run dev
```

Sanity normally opens the Studio at [http://localhost:3333](http://localhost:3333). Sign in with an account that has access to the configured Sanity project.

Create and publish the relevant content documents in Studio. The frontend caches Sanity queries for up to 30 seconds, so published changes may not appear immediately.

## Available Scripts

### `next-dossier`

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create a production Next.js build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run the configured Next.js lint command |

### `studio-dossier`

| Command | Description |
| --- | --- |
| `npm run dev` | Start Sanity Studio in development mode |
| `npm run start` | Start the Studio |
| `npm run build` | Create a production Studio build |
| `npm run deploy` | Deploy the Studio to Sanity hosting |
| `npm run deploy-graphql` | Deploy Sanity's GraphQL API |

## Content Management Workflow

1. Start Sanity Studio and sign in.
2. Create or edit the appropriate document.
3. Complete all required fields and upload any necessary images.
4. Publish the document.
5. Allow up to 30 seconds for the frontend's cached query to refresh.

To add a project, create a `Portfolio` document with its title, description, technology stack, destination link, and images. The latest created project is displayed first.

Portfolio images are position-based:

1. The first image is displayed on the portfolio card.
2. The second image is displayed when the project modal opens.

The second image is optional. When a project has only one image, that image is used for both the card and modal. Additional images are currently stored by Sanity but are not displayed by the frontend. Image order can be changed by reordering the images in the Portfolio document.

Contact entries contain a name, email, project type, short message, and optional budget range. Treat them as personal data, restrict Studio access, and follow the privacy-policy retention period.

## Production Builds

Validate both applications before deployment:

```bash
cd next-dossier
npm run build

cd ../studio-dossier
npm run build
```

The frontend exposes `/robots.txt` and `/sitemap.xml` through Next.js Metadata Routes. Both use `https://okechuqu.com` as the canonical domain.

## Deployment

### Frontend

The Next.js application can be deployed to Vercel or any platform that supports Next.js:

1. Configure the deployment root directory as `next-dossier`.
2. Add the required environment variables.
3. Deploy the application.
4. Add the deployed URL to Sanity's allowed CORS origins for public reads.
5. Attach `okechuqu.com`, `www.okechuqu.com`, and the legacy Vercel hostname.
6. Confirm that `www` and `dossier-oec.vercel.app` permanently redirect to `https://okechuqu.com`.
7. Verify `/robots.txt`, `/sitemap.xml`, the homepage canonical, and `/privacy-policy`.

### Sanity Studio

Deploy the Studio with:

```bash
cd studio-dossier
npm run deploy
```

The configured Sanity Studio hostname is `dossier`. A different hostname can be set in `studio-dossier/sanity.cli.ts`.

## Customization

- Edit the page composition in `next-dossier/app/page.tsx`.
- Add or update sections in `next-dossier/app/components`.
- Change global colors, typography, and animations in `next-dossier/app/globals.css` and `tailwind.config.ts`.
- Update structured content definitions in `studio-dossier/schemaTypes`.
- Update metadata behavior in `next-dossier/app/layout.tsx`.
- Change canonical, sitemap, and robots URLs together in `app/layout.tsx`, `app/sitemap.ts`, and `app/robots.ts`.

When changing a schema, restart Sanity Studio and update the corresponding TypeScript interfaces and GROQ queries in the frontend.

## Troubleshooting

### Content does not appear

- Confirm the document has been published rather than left as a draft.
- Verify that the frontend and Studio use the same project ID and dataset.
- Wait at least 30 seconds for query revalidation.
- Check the browser and server consoles for Sanity query errors.

### Images fail to load

- Confirm that the image asset is published and referenced by its document.
- Review the remote image rules in `next-dossier/next.config.mjs`.
- Restart the frontend after changing Next.js configuration.

### Contact submissions fail

- Confirm that `SANITY_API_TOKEN` is present in the server environment.
- Verify that the token can create `contactMe` documents.
- Confirm that the deployed Studio schema includes `budgetRange`.
- Review the `/api/contact` response and server logs.

### Dependency commands are unavailable

Run `npm ci` in the application directory where the command is being executed. Each application has its own `package.json` and dependencies.

## Security Notes

- Do not commit `.env.local` or API tokens.
- Use least-privilege Sanity roles and tokens.
- Keep contact writes in the server endpoint and never expose its token.
- Preserve the contact field allow-list and length validation when changing the form.
- A honeypot provides basic abuse protection. Add durable rate limiting or CAPTCHA if abuse becomes material.
- Periodically review and remove contact submissions that are no longer needed.
- Restrict production CORS origins to trusted domains.

## Security and Privacy Deployment Checklist

1. Revoke the exposed Sanity token; removing it from source code does not invalidate it.
2. Review credential activity and existing `contactMe` records for unexpected access or submissions.
3. Create a new least-privilege token and store it only as `SANITY_API_TOKEN`.
4. Deploy the updated Studio schema, then deploy the frontend.
5. Submit a test enquiry and confirm no token appears in browser JavaScript or request payloads.
6. Review the privacy policy against actual processors, retention practices, transfer safeguards, and applicable law.

## Contributing

1. Create a branch for the change.
2. Make focused updates in the relevant application.
3. Run the appropriate build and lint checks.
4. Verify affected content flows through Sanity Studio and the frontend.
5. Submit a pull request describing the behavior and validation performed.

Keep schema and frontend changes synchronized whenever a content field is added, removed, or renamed.

## License

The Studio package is currently marked `UNLICENSED`, and no repository-level open-source license is included. All rights are reserved unless the project owner provides a separate license.
