import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "../components/SiteFooter";
import AnalyticsPreferences from "../components/AnalyticsPreferences";

export const metadata: Metadata = {
  title: "Privacy Policy | Okechuqu",
  description: "How personal data submitted through okechuqu.com is handled.",
  alternates: { canonical: "/privacy-policy" },
};

const sections = [
  [
    "Information collected",
    "When you use the contact form, I collect your name, email address, project type, message, and any optional budget range you provide. I also receive limited technical logs needed to operate and secure the website.",
  ],
  [
    "Why it is used",
    "I use this information to reply to your enquiry, discuss requested services, prevent abuse, and keep necessary business records. I do not sell your personal information or use contact-form details for unrelated marketing.",
  ],
  [
    "Legal basis",
    "The information is processed to take steps at your request before entering a contract and, where applicable, for legitimate interests in communicating with prospective clients and protecting this service.",
  ],
  [
    "Service providers and transfers",
    "Form submissions are stored using Sanity, a service provider that may process data outside your country. Hosting and security providers may also process limited request logs. Appropriate contractual and legal safeguards are relied upon where international transfers require them.",
  ],
  [
    "Retention",
    "Unsuccessful enquiries are normally deleted within 12 months. Records connected with a client engagement may be retained longer where needed for the relationship, legal obligations, dispute resolution, or accounting requirements.",
  ],
  [
    "Your rights",
    "Depending on where you live, you may ask to access, correct, delete, restrict, or receive a copy of your personal data, or object to its processing. You may also complain to your local data-protection authority.",
  ],
];

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <article className="mx-auto max-w-3xl">
        <div className="px-4 py-8 sm:px-6 lg:px-8 lg:py-14">
          <Link href="/" className="text-[#d7b874] underline">
            ← Back home
          </Link>
          <h1 className="mt-8 text-4xl font-bold md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-neutral-400">
            Effective 27 August 2026
          </p>
          <p className="mt-8 leading-7 text-neutral-300">
            This policy explains how Okechuqu, the operator of okechuqu.com,
            handles information you send through this website.
          </p>
          {sections.map(([title, content]) => (
            <section key={title} className="mt-10">
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="mt-3 leading-7 text-neutral-300">{content}</p>
            </section>
          ))}
          <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6">
            <h2 className="text-2xl font-semibold">Manage preferences</h2>
            <p className="mt-3 max-w-2xl leading-7 text-neutral-300">
              If you change your mind about analytics, you can update your
              preference here without filling in another form.
            </p>
            <div className="mt-4">
              <AnalyticsPreferences />
            </div>
          </section>
          <section className="mt-10">
            <h2 className="text-2xl font-semibold">Contact</h2>
            <p className="mt-3 leading-7 text-neutral-300">
              To make a privacy request or ask a question, use the contact
              details on the homepage and clearly mark your message “Privacy
              request.”
            </p>
          </section>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
