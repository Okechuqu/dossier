"use client";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { IconMessage2 } from "@tabler/icons-react";
import Link from "next/link";

const form_control =
  "flex h-10 w-full border-none bg-black text-white rounded-xl  dark:bg-zinc-800  shadow-input  px-3 py-2 text-sm  file:border-0 file:bg-transparent  file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600        disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] group-hover/input:shadow-none transition duration-400";

const ContactForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div
      id="contact"
      className="flex flex-col lg:max-w-[52rem] w-full lg:ml-[26rem] lg:mx-auto px-6 lg:px-0 animate-fade-down text-white lg:mt-[3rem] mt-[32rem]"
    >
      <div className="flex flex-row justify-between text-white mb-[40px] lg:mb-[88px]">
        <div className="bg-slate-800 no-underline group  relative shadow-2xl shadow-zinc-900 rounded-full p-px leading-6  text-white inline-block">
          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-gray-900  py-2 px-4 ring-1 ring-white/10 ">
            <IconMessage2 />
            <p></p>
            <span className="uppercase text-xs">Contact</span>
          </div>
        </div>
      </div>
      <div className="">
        <h1 className="md:text-5xl text-xl mb-2 md:mb-6">
          Let's Work <span className="text-green-500">Together!</span>
        </h1>
        <div className="w-full mx-auto rounded-none md:rounded-2xl px-4">
          <Link
            href="mailto:myemail@mail.com"
            className="text-2xl max-w-sm mt-2 text-neutral-400"
          >
            myemail@mail.com
          </Link>
          <form className="my-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 space-y-0 mb-4">
              <LabelInputContainer>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="Tyler" type="text" />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  placeholder="projectmayhem@fc.com"
                  type="email"
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input
                  id="phone"
                  placeholder="Your phone number"
                  type="number"
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="subject">Subject</Label>
                <select className={`${form_control}`}>
                  <option value="tutoring">Tutoring</option>
                  <option value="web_development">Web Development</option>
                  <option value="ai/ml">AI/ML</option>
                  <option value="marketing">Marketing</option>
                  <option value="other">Other</option>
                </select>
              </LabelInputContainer>
            </div>
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />
            <div className="space-y-2">
              <LabelInputContainer>
                <Label htmlFor="budget">Your Budget (Optional)</Label>
                <Input
                  id="budget"
                  placeholder="A range budget for your project"
                  type="number"
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="message">Message</Label>
                <textarea
                  id="message"
                  className={`${form_control} w-full h-[8rem]`}
                  placeholder="Write your message here..."
                />
              </LabelInputContainer>
            </div>

            <button
              className="bg-gradient-to-br uppercase relative group/btn from-green-600 to-green-200 block w-[15rem] text-black rounded-3xl h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] my-8"
              type="submit"
            >
              Send message
              <BottomGradient />
            </button>
          </form>
        </div>
      </div>
    </div>
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
