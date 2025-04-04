"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { IconMessage2, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { client } from "../client";

const TITLE_QUERY = `*[
  _type == "title"
] | order(_createdAt desc) [0]`;

const PROFILE_QUERY = `*[
  _type == "profile"
] | order(_createdAt desc) [0]`;

const options = { next: { revalidate: 30 } };

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
  phone: string;
  subject: string;
  budget: number;
  message: string;
}

// Style constants
const FORM_CONTROL_STYLES =
  "flex h-10 w-full border-none bg-black text-white rounded-xl dark:bg-zinc-800 shadow-input px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] group-hover/input:shadow-none transition duration-400";

const BUTTON_GRADIENT =
  "bg-gradient-to-br uppercase relative group/btn from-green-600 to-green-200";

const ContactForm: React.FC = () => {
  const [profileDataResponse, setProfileDataResponse] =
    useState<ProfileDataDocument | null>(null);
  const [titleDataResponse, setTitleDataResponse] =
    useState<TitleDataDocument | null>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    budget: 0,
    message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, titleData] = await Promise.all([
          client.fetch<ProfileDataDocument>(PROFILE_QUERY, {}, options),
          client.fetch<TitleDataDocument>(TITLE_QUERY, {}, options),
        ]);
        setProfileDataResponse(profileData);
        setTitleDataResponse(titleData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []);
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
        45
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
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "budget" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    try {
      await client.create({
        _type: "contactMe",
        ...formData,
      });
      setAlert({ message: "Message sent successfully!", type: "success" });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        budget: 0,
        message: "",
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
  if (!profileDataResponse) return "";

  return (
    <section
      id="contact"
      className="flex flex-col w-full lg:max-w-[49rem] lg:ml-[26rem] lg:mx-auto px-6 lg:px-0 animate-fade-down text-white lg:mt-12 sm:mt-[50rem] md:mt-36"
    >
      <div className="flex justify-between items-center mb-10 lg:mb-22">
        <div className="bg-slate-800 no-underline group relative shadow-2xl shadow-zinc-900 rounded-full p-px leading-6 text-white inline-block">
          <div className="relative flex items-center gap-2 z-10 rounded-full bg-gray-900 py-2 px-4 ring-1 ring-white/10">
            <IconMessage2 size={18} />
            <span className="uppercase text-xs">Contact</span>
          </div>
        </div>
      </div>

      <div className="w-full">
        <h1 className="text-2xl md:text-5xl mb-2 md:mb-6">
          {titleDataResponse && (
            <>
              {titleDataResponse.contact_title}{" "}
              <span className="text-green-500">
                {titleDataResponse.contact_title_span}{" "}
              </span>
            </>
          )}
        </h1>

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
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="Your phone number"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="subject">Subject</Label>
              <select
                id="subject"
                name="subject"
                className={FORM_CONTROL_STYLES}
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="">Select a subject</option>
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
              <Label htmlFor="budget">Your Budget (Optional)</Label>
              <div className="relative">
                <span className="absolute left-3 top-[2rem] transform -translate-y-1/2 text-gray-100 font-semibold">
                  $
                </span>
              </div>

              <Input
                id="budget"
                name="budget"
                placeholder={
                  formData.budget === 0 ? "Budget for your project" : ""
                }
                type="number"
                value={formData.budget === 0 ? "" : formData.budget}
                onChange={handleChange}
                className="pl-6"
              />
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
          </div>

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
            } ${alert.type === "success" ? "bg-green-500" : "bg-red-600"}`}
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
