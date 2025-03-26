import { IconUser } from "@tabler/icons-react";
import React from "react";
import { client } from "../client";
import { type SanityDocument } from "next-sanity";
import CustomPortableText from "../lib/customs";

const DATA_QUERY = `*[
  _type == "about"
] | order(_createdAt desc) [0]`;

const options = { next: { revalidate: 30 } };

const About = async () => {
  const data = await client.fetch<SanityDocument>(DATA_QUERY, {}, options);

  // Ensure data exists before rendering
  if (!data) return "";
  return (
    <div
      id="about"
      className="flex flex-col lg:max-w-[52rem] w-full lg:ml-[26rem] lg:mx-auto px-6 lg:px-0 animate-fade-down text-white my-[3rem]"
    >
      <div className="justify-between text-white mb-[40px] lg:mb-[88px]">
        <div className="bg-slate-800 no-underline group  relative shadow-2xl shadow-zinc-900 rounded-full p-px leading-6  text-white inline-block">
          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-gray-900  py-2 px-4 ring-1 ring-white/10 ">
            <IconUser />
            <span className="uppercase text-xs">About</span>
          </div>
        </div>
      </div>
      <div className="">
        <h1 className="md:text-6xl text-xl mb-6">
          {data.about_title ?? "Untitled"}
          <span className="text-green-500"> better story</span>
        </h1>
        <div className="text-base text-white/80">
          {data.body ? (
            <CustomPortableText value={data.body} />
          ) : (
            "No content available."
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
