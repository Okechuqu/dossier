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
    <>
      <div className="flex flex-col sm:flex-row justify-between text-white mb-6 lg:w-full">
        <div className="no-underline group relative rounded-full p-px leading-6 text-white inline-block mb-4 sm:mb-0">
          <div className="relative flex space-x-2 ml-5 lg:ml-[-1rem] xl:ml-[1rem] items-center z-10 rounded-full bg-gray-950 py-2 px-4 ring-1 ring-[#d4bd89] w-[9rem]">
            <IconMessage />
            <span className="uppercase text-xs">Testimonial</span>
          </div>
        </div>
      </div>
      <div
        id="testimonial"
        className="flex flex-col w-full lg:max-w-[38rem] xl:max-w-[52rem] 2xl:max-w-[99rem] mx-auto px-6 lg:px-0 animate-fade-down text-white"
      >
        <h1 className="md:text-5xl text-xl mb-2 md:mb-6">
          {titleDataResponse.testimonial_title}{" "}
          <span className="text-[#a37735]">
            {titleDataResponse.testimonial_title_span}
          </span>
        </h1>
        <AnimatedTestimonials testimonials={response} />
      </div>
    </>
  );
};

export default Testimonial;
