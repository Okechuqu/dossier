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
    <>
      <div className="flex flex-col sm:flex-row justify-between text-white mb-6 lg:w-full">
        <div className="no-underline group relative rounded-full p-px leading-6 text-white inline-block mb-4 sm:mb-0">
          <div className="relative flex space-x-2 ml-5 lg:ml-[-1rem] xl:ml-[1rem] items-center z-10 rounded-full bg-gray-950 py-2 px-4 ring-1 ring-[#d4bd89] w-[9rem]">
            <IconUser />
            <span className="uppercase text-xs">About</span>
          </div>
        </div>
      </div>
      <div
        id="about"
        className="flex flex-col w-full lg:max-w-[38rem] xl:max-w-[52rem] 2xl:max-w-[99rem] mx-auto px-6 lg:px-0 animate-fade-down text-white mb-[3rem]"
      >
        <div>
          <h1 className="md:text-6xl text-xl mb-6">
            {data.about_title ?? "Untitled"}
            <span className="text-[#a37735]"> better story</span>
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
    </>
  );
};

export default About;
