import React from "react";
import { cn } from "@/lib/utils";
import { IconTerminal } from "@tabler/icons-react";
import { client } from "../client";
import CustomPortableText from "../lib/customs";
import { PortableTextBlock } from "next-sanity";

const TITLE_QUERY = `*[
  _type == "title"
] | order(_createdAt desc) [0]`;

const SERVICES_QUERY = `*[
  _type == "service"
] | order(_createdAt desc)`;

const options = { next: { revalidate: 30 } };

interface TitleDataDocument {
  services_title: string;
  services_title_span: string;
}

interface ServicesDataDocument {
  heading: string;
  description: PortableTextBlock[];
}

const Services = async () => {
  // Fetch both data sets concurrently
  const [servicesDataResponse, titleDataResponse] = await Promise.all([
    client.fetch<ServicesDataDocument[]>(SERVICES_QUERY, {}, options),
    client.fetch<TitleDataDocument>(TITLE_QUERY, {}, options),
  ]);
  if (!servicesDataResponse || servicesDataResponse.length === 0) {
    return "";
  }

  const features = servicesDataResponse.map((service) => ({
    heading: service.heading,
    description: service.description,
  }));

  return (
    <div
      id="services"
      className="flex flex-col lg:max-w-[49rem] w-full lg:ml-[26rem] lg:mx-auto px-6 lg:px-0 animate-fade-down text-white my-[3rem]"
    >
      <div className="flex flex-row justify-between text-white mb-[40px] lg:mb-[88px]">
        <div className="bg-slate-800 no-underline group  relative shadow-2xl shadow-zinc-900 rounded-full p-px leading-6  text-white inline-block">
          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-gray-900  py-2 px-4 ring-1 ring-white/10 ">
            <IconTerminal />
            <p></p>
            <span className="uppercase text-xs">Services</span>
          </div>
        </div>
      </div>
      <h1 className="md:text-5xl text-xl mb-2 md:mb-6">
        {titleDataResponse.services_title}{" "}
        <span className="text-green-500">
          {titleDataResponse.services_title_span}
        </span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  relative z-10 py-10 max-w-7xl mx-auto">
        {features
          .slice()
          .reverse()
          .map((feature, index) => (
            <Feature key={feature.heading} {...feature} index={index} />
          ))}
      </div>
    </div>
  );
};

const Feature = ({
  heading,
  description,
  index,
}: {
  heading: string;
  description: PortableTextBlock[];
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-green-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-green-800 dark:text-neutral-100">
          {heading}
        </span>
      </div>
      <div className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        <CustomPortableText value={description} />
      </div>
    </div>
  );
};

export default Services;
