"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { IconMessage2, IconX } from "@tabler/icons-react";
import Link from "next/link";

interface TitleDataDocument {
  contact_title: string;
  contact_title_span: string;
}

interface ProfileDataDocument {
  email: string;
}

interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  budgetRange: string;
  message: string;
  website: string;
}

// Style constants
const FORM_CONTROL_STYLES =
  "flex h-10 w-full border-none bg-black text-white rounded-xl dark:bg-zinc-800 shadow-input px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] group-hover/input:shadow-none transition duration-400";

const BUTTON_GRADIENT =
  "bg-gradient-to-br uppercase relative group/btn from-[#a37735] to-[#d7b874]";

interface ContactFormProps {
  profileDataResponse: ProfileDataDocument | null;
  titleDataResponse: TitleDataDocument | null;
}

const ContactForm: React.FC<ContactFormProps> = ({
  profileDataResponse,
  titleDataResponse,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    projectType: "",
    budgetRange: "",
    message: "",
    website: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(90);

  useEffect(() => {
    if (alert) {
      setFadeOut(false);
      setProgress(100);
      const fadeTimer = setTimeout(() => setFadeOut(true), 4500);
      const removeTimer = setTimeout(() => setAlert(null), 5000);
      const progressInterval = setInterval(
        () => setProgress((prev) => Math.max(prev - 1, 0)),
        45,
      );

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
        clearInterval(progressInterval);
      };
    }
  }, [alert]);

  const closeAlert = () => {
    setFadeOut(true);
    setTimeout(() => setAlert(null), 500);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Contact request failed");
      setAlert({ message: "Message sent successfully!", type: "success" });
      setFormData({
        name: "",
        email: "",
        projectType: "",
        budgetRange: "",
        message: "",
        website: "",
      });
    } catch (err) {
      console.error("Failed to send contact form", err);
      setAlert({
        message: "Failed to send message, please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Ensure Profile data exists before rendering
  // Render a minimal placeholder section with the id so `#contact` works in production.
  if (!profileDataResponse)
    return <section id="contact" className="w-full px-6 lg:px-0 py-8" />;

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between text-white mb-6 lg:w-full">
        <div className="no-underline group relative rounded-full p-px leading-6 text-white inline-block mb-4 sm:mb-0 lg:mt-[15rem] xl:mt-40 sm:mt-[50rem] md:mt-36">
          <div className="relative flex space-x-2 ml-5 lg:ml-[-1rem] xl:ml-[1rem] items-center z-10 rounded-full bg-gray-950 py-2 px-4 ring-1 ring-[#d4bd89] w-[9rem]">
            <IconMessage2 size={18} />
            <span className="uppercase text-xs">Contact</span>
          </div>
        </div>
      </div>
      <section
        id="contact"
        className="flex flex-col w-full lg:max-w-[38rem] xl:max-w-[52rem] 2xl:max-w-[99rem] mx-auto px-6 lg:px-0 animate-fade-down text-white"
      >
        <div className="w-full">
          <h2 className="text-2xl md:text-5xl mb-2 md:mb-6">
            {titleDataResponse && (
              <>
                {titleDataResponse.contact_title}{" "}
                <span className="text-[#a37735]">
                  {titleDataResponse.contact_title_span}{" "}
                </span>
              </>
            )}
          </h2>
          {profileDataResponse && profileDataResponse?.email && (
            <Link
              href={`mailto:${profileDataResponse.email}`}
              className="text-lg md:text-2xl text-neutral-400 hover:text-neutral-300 transition-colors"
            >
              {profileDataResponse.email}
            </Link>
          )}
          <form className="my-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <LabelInputContainer>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Tyler"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="example@mail.com"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="projectType">Project type</Label>
                <select
                  id="projectType"
                  name="projectType"
                  title="Project type"
                  className={FORM_CONTROL_STYLES}
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a project type</option>
                  <option value="tutoring">Tutoring</option>
                  <option value="web_development">Web Development</option>
                  <option value="ai/ml">AI/ML</option>
                  <option value="marketing">Marketing</option>
                  <option value="other">Other</option>
                </select>
              </LabelInputContainer>
            </div>
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-6 h-px w-full" />
            <div className="space-y-4">
              <LabelInputContainer>
                <Label htmlFor="budgetRange">Budget range (optional)</Label>
                <select
                  id="budgetRange"
                  name="budgetRange"
                  className={FORM_CONTROL_STYLES}
                  value={formData.budgetRange}
                  onChange={handleChange}
                >
                  <option value="">Prefer not to say</option>
                  <option value="under-1000">Under $1,000</option>
                  <option value="1000-5000">$1,000–$5,000</option>
                  <option value="5000-10000">$5,000–$10,000</option>
                  <option value="over-10000">Over $10,000</option>
                </select>
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="message">Message</Label>
                <textarea
                  id="message"
                  name="message"
                  className={`${FORM_CONTROL_STYLES} min-h-[8rem] resize-y`}
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </LabelInputContainer>
              <div className="hidden" aria-hidden="true">
                <Label htmlFor="website">Website</Label>
                <Input id="website" name="website" tabIndex={-1} autoComplete="off" value={formData.website} onChange={handleChange} />
              </div>
            </div>
            <p className="mt-6 max-w-2xl text-sm text-neutral-400">
              By submitting, you agree that I may use these details to respond
              to your enquiry. See the{" "}
              <Link href="/privacy-policy" className="text-[#d7b874] underline">
                Privacy Policy
              </Link>{" "}
              for retention, service providers, transfers, and your rights.
            </p>
            <button
              className={`${BUTTON_GRADIENT} w-full max-w-[15rem] text-black rounded-3xl h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mt-8 transition-opacity hover:opacity-90 disabled:opacity-70`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
              <BottomGradient />
            </button>
          </form>
          {/* Alert Notification */}
          {alert && (
            <div
              className={`fixed top-5 right-5 w-80 px-4 py-3 rounded-lg text-white shadow-lg transition-opacity duration-300 ${
                fadeOut ? "opacity-0" : "opacity-100"
              } ${alert.type === "success" ? "bg-[#a37735]" : "bg-red-600"}`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">{alert.message}</span>
                <button
                  onClick={closeAlert}
                  className="text-white hover:text-gray-200 transition-colors"
                  aria-label="Close alert"
                >
                  <IconX size={18} />
                </button>
              </div>
              <div className="w-full h-1 bg-white/30 rounded overflow-hidden">
                <div
                  className="h-full bg-gray-500 transition-transform duration-75 ease-linear"
                  style={{
                    transform: `scaleX(${progress / 90})`,
                    transformOrigin: "right",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default ContactForm;
