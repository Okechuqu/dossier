import React from "react";
import { TextRevealCard, TextRevealCardTitle } from "./ui/text-reveal-card";
import { IconArrowDownToArc, IconHome2 } from "@tabler/icons-react";
// import { Sidebar } from "./Navigation";
import { client } from "../client";
import { SanityDocument } from "next-sanity";
import CustomPortableText from "../lib/customs";
import SmoothScrollLink from "../lib/smooth-scroll-link";

const HERO_QUERY = `*[
  _type == "hero"
] | order(_createdAt desc) [0]`;

const options = { next: { revalidate: 30 } };

const Hero = async () => {
  const data = await client.fetch<SanityDocument>(HERO_QUERY, {}, options);

  // Ensure data exists before rendering
  if (!data) return "";

  return (
    <>
      <div className="flex flex-col lg:ml-[26rem] sm:flex-row justify-between text-white mb-6 lg:w-[63rem] -mr-[3rem]">
        <div className="no-underline group relative shadow-2xl shadow-zinc-900 rounded-full p-px leading-6 text-white inline-block mb-4 sm:mb-0">
          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-gray-900 py-2 px-4 ring-1 ring-white/10 w-[9rem]">
            <IconHome2 />
            <span className="uppercase text-xs">Introduce</span>
          </div>
        </div>
        {/* <div className="hidden lg:flex fixed top-8 right-8 no-underline group cursor-pointer  shadow-2xl shadow-zinc-900 rounded-full p-px text-xs leading-6 text-white">
          <div className="relative flex space-x-2 items-center hover:ring-green-500 z-10 rounded-full bg-gray-900 py-2 px-4 ring-1 ring-white/10">
            <Sidebar />
          </div>
        </div> */}
      </div>
      <div
        id="hero"
        className="flex flex-col lg:max-w-[50rem] w-full lg:ml-[26rem] lg:mx-auto px-6 lg:px-0 animate-fade-down text-white mr-[3rem]"
      >
        <TextRevealCard
          text={`${data.hero_text}`}
          revealText={`${data.hero_reveal_text}`}
          className="sm:max-w-[560rem]"
        >
          <TextRevealCardTitle className="text-4xl sm:text-5xl md:text-6xl mb-6">
            {data.hero_title}
          </TextRevealCardTitle>
        </TextRevealCard>
        <div className="text-lg sm:text-xl text-white/80 text-center sm:text-left mb-8">
          {data.hero_description ? (
            <CustomPortableText value={data.hero_description} />
          ) : (
            "No content available."
          )}
        </div>
        <div className="m-8">
          {/* "My Projects" Floating to End */}
          <div className="flex justify-center sm:justify-end mb-8">
            <SmoothScrollLink
              className="relative w-32 h-32 md:w-[10rem] md:h-[10rem] rounded-full border border-gray-700 flex items-center justify-center"
              href={"#portfolio"}
            >
              <IconArrowDownToArc />
              <div className="absolute inset-0 animate-spin">
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  <defs>
                    <path
                      id="circlePath"
                      d="M100,100
                       m-80,0
                       a80,80 0 1,1 160,0
                       a80,80 0 1,1 -160,0"
                    />
                  </defs>
                  <text
                    fill="white"
                    textAnchor="middle"
                    className="text-[23px]"
                  >
                    <textPath href="#circlePath" startOffset="50%">
                      MY PROJECTS • MY PROJECTS • MY PROJECTS •
                    </textPath>
                  </text>
                </svg>
              </div>
            </SmoothScrollLink>
          </div>
          {/* Statistics Section Responsive */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center sm:items-start">
            <div className="text-center sm:text-left">
              <h1 className="text-green-500 text-4xl sm:text-5xl">
                {data.hero_years_of_experience}+
              </h1>
              <p className="uppercase text-gray-100 text-sm sm:text-base">
                years of experience
              </p>
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-green-500 text-4xl sm:text-5xl">
                {data.hero_completed_projects}+
              </h1>
              <p className="uppercase text-gray-100 text-sm sm:text-base">
                total projects completed
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
