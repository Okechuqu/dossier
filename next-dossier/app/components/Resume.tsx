import { IconBriefcase } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import { Timeline } from "./ui/timeline";
import { client } from "../client";
import CustomPortableText from "../lib/customs";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import { PortableTextBlock } from "next-sanity";

// Query that fetches the resume document with its timeline references dereferenced
const RESUME_QUERY = `*[
  _type == "resume"
] {
  timeline_title,
  timeline[]->{
    timeline_role,
    timeline_organization,
    timeline_content,
    timeline_image[] {
      asset-> { url }
    }
  }
} | order(_createdAt desc)`;

const TITLE_QUERY = `*[
  _type == "title"
] | order(_createdAt desc) [0]`;

const options = { next: { revalidate: 30 } };

interface TitleDataDocument {
  resume_title: string;
  resume_title_span: string;
}

interface ResumeDataDocument {
  timeline_title: string; // This is from the resume document itself
  timeline: Array<{
    timeline_role: string;
    timeline_organization: string;
    timeline_content: PortableTextBlock[];
    timeline_image?: Array<{ asset: { url: string } }>;
  }>;
}

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const Resume = async () => {
  // Fetch both the resume data and the title document concurrently
  const [resumeDataResponse, titleDataResponse] = await Promise.all([
    client.fetch<ResumeDataDocument[]>(RESUME_QUERY, {}, options),
    client.fetch<TitleDataDocument>(TITLE_QUERY, {}, options),
  ]);
  if (!resumeDataResponse || resumeDataResponse.length === 0) {
    return "";
  }

  // For each resume document, use its timeline_title and map over its timeline array.
  // Since the timeline field is an array of referenced resumeData documents, we can display each one.
  const timelineData = resumeDataResponse.map((doc) => ({
    title: doc.timeline_title,
    content: (
      <div className="ml-[5rem]">
        {doc.timeline?.map((item, index) => (
          <div key={index}>
            {item.timeline_role && (
              <h1 className="md:text-3xl text-base font-normal mb-2 capitalize">
                {item.timeline_role}
              </h1>
            )}
            {item.timeline_organization && (
              <p className="text-sm font-normal mb-8 text-gray-400 capitalize">
                {item.timeline_organization}
              </p>
            )}
            <div className="text-sm font-normal mb-8 text-gray-400">
              {item.timeline_content ? (
                <CustomPortableText value={item.timeline_content} />
              ) : null}
            </div>
            {item.timeline_image && item.timeline_image.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {item.timeline_image.map((image, imgIndex) => {
                  const imageUrl = urlFor(image)?.url() || image.asset.url;
                  return (
                    <Image
                      key={imgIndex}
                      src={imageUrl}
                      alt={`Timeline Image ${imgIndex + 1}`}
                      width={500}
                      height={500}
                      className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset"
                    />
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    ),
  }));

  return (
    <div
      id="resume"
      className="flex flex-col lg:max-w-[50rem] w-full lg:ml-[26rem] lg:mx-auto px-6 lg:px-0 animate-fade-down text-white my-[3rem]"
    >
      <div className="flex flex-row justify-between text-white mb-[40px] lg:mb-[88px]">
        <div className="bg-slate-800 no-underline group relative shadow-2xl shadow-zinc-900 rounded-full p-px leading-6 text-white inline-block">
          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-gray-900 py-2 px-4 ring-1 ring-white/10">
            <IconBriefcase />
            <p></p>
            <span className="uppercase text-xs">Resume</span>
          </div>
        </div>
      </div>
      <h1 className="md:text-5xl text-xl my-2 md:mb-6">
        {titleDataResponse.resume_title}{" "}
        <span className="text-green-500">
          {titleDataResponse.resume_title_span}
        </span>
      </h1>
      <Timeline data={timelineData} />
    </div>
  );
};

export default Resume;
