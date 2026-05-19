// "use client";
import React from "react";
import { IconCube3dSphere } from "@tabler/icons-react";
import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "../client";
import imageUrlBuilder from "@sanity/image-url";

const TITLE_QUERY = `*[
  _type == "title"
] | order(_createdAt desc) [0]`;

const SKILL_QUERY = `*[
  _type == "skill"
] | order(_createdAt desc)`;

const options = { next: { revalidate: 30 } };

interface TitleDataDocument {
  skill_title: string;
  skill_title_span: string;
}

interface SkillDataDocument {
  skill_rate: number;
  skill_title: string;
  skill_image?: { asset: { url: string } };
}

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const Skill = async () => {
  // Fetch both data sets concurrently
  const [skillDataResponse, titleDataResponse] = await Promise.all([
    client.fetch<SkillDataDocument[]>(SKILL_QUERY, {}, options),
    client.fetch<TitleDataDocument>(TITLE_QUERY, {}, options),
  ]);

  // Ensure skill data exists before rendering
  if (!skillDataResponse || skillDataResponse.length === 0) return "";

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between text-white mb-6 lg:w-full">
        <div className="no-underline group relative rounded-full p-px leading-6 text-white inline-block mb-4 sm:mb-0">
          <div className="relative flex space-x-2 ml-5 lg:ml-[-1rem] xl:ml-[1rem] items-center z-10 rounded-full bg-gray-900 py-2 px-4 ring-1 ring-white/10 w-[9rem]">
            <IconCube3dSphere />
            <p></p>
            <span className="uppercase text-xs">My Skill</span>
          </div>
        </div>
      </div>
      <div
        id="skills"
        className="flex flex-col w-full lg:max-w-[38rem] xl:max-w-[52rem] 2xl:max-w-[99rem] mx-auto px-6 lg:px-0 animate-fade-down text-white"
      >
        <h1 className="md:text-5xl text-xl mb-2 md:mb-6">
          {titleDataResponse.skill_title}{" "}
          <span className="text-green-500">
            {" "}
            {titleDataResponse.skill_title_span}
          </span>
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pb-5">
          {skillDataResponse
            .slice()
            .reverse()
            .map((skill, i) => {
              const skillImage = skill.skill_image
                ? urlFor(skill.skill_image)?.url() ||
                  skill.skill_image.asset.url
                : null;
              return (
                <div
                  key={i}
                  className="flex flex-col gap-2 items-center justify-center"
                >
                  <div className="glass items-center justify-center flex flex-col text-white rounded-full h-48 w-36 md:h-[15rem] md:w-[12rem] border border-slate-800 hover:border-green-500">
                    {skillImage && (
                      <Image
                        src={skillImage}
                        width={80}
                        height={80}
                        alt={skill.skill_title}
                        className="mb-6 rounded-3xl"
                      />
                    )}
                    <p className="text-green-500 text-4xl mt-2">
                      {skill.skill_rate}%
                    </p>
                  </div>
                  <p className="text-white capitalize">{skill.skill_title}</p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Skill;
