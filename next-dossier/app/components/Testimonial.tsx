import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { AnimatedTestimonials } from "./ui/animated-testimonials";
import { IconMessage } from "@tabler/icons-react";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../client";
import React from "react";

const TITLE_QUERY = `*[
  _type == "title"
] | order(_createdAt desc) [0]`;

const TESTIMONIAL_QUERY = `*[
  _type == "testimonial"
] | order(_createdAt desc){
  "quote": testimonial_quote,
  "name": testimonial_author_name,
  "designation": testimonial_author_designation,
  "src": testimonial_author_image
}`;

const options = { next: { revalidate: 30 } };

interface TitleDataDocument {
  testimonial_title: string;
  testimonial_title_span: string;
}

interface TestimonialDataDocument {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const Testimonial = async () => {
  // Fetch both data sets concurrently
  const [testimonialDataResponse, titleDataResponse] = await Promise.all([
    client.fetch<TestimonialDataDocument[]>(TESTIMONIAL_QUERY, {}, options),
    client.fetch<TitleDataDocument>(TITLE_QUERY, {}, options),
  ]);

  const response = testimonialDataResponse.map((doc) => {
    const imageUrl = doc.src ? urlFor(doc.src)?.url() || "" : ""; // Fallback to empty string if image is missing

    return {
      quote: doc.quote, // Ensure it's a string
      name: doc.name,
      designation: doc.designation,
      src: imageUrl,
    };
  });

  // Ensure data exists before rendering
  if (!testimonialDataResponse || testimonialDataResponse.length === 0)
    return "";

  return (
    <div
      id="testimonial"
      className="flex flex-col lg:max-w-[50rem] w-full lg:ml-[26rem] lg:mx-auto px-6 lg:px-0 animate-fade-down text-white my-[3rem]"
    >
      <div className="flex flex-row justify-between text-white mb-[40px] lg:mb-[88px]">
        <div className="bg-slate-800 no-underline group  relative shadow-2xl shadow-zinc-900 rounded-full p-px  leading-6  text-white inline-block">
          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-gray-900  py-2 px-4 ring-1 ring-white/10 ">
            <IconMessage />
            <span className="uppercase text-xs">Testimonial</span>
          </div>
        </div>
      </div>
      <h1 className="md:text-5xl text-xl mb-2 md:mb-6">
        {titleDataResponse.testimonial_title}{" "}
        <span className="text-green-500">
          {titleDataResponse.testimonial_title_span}
        </span>
      </h1>
      <AnimatedTestimonials testimonials={response} />
    </div>
  );
};

export default Testimonial;
