import React from "react";
import { HoverEffect } from "./ui/card-hover-effect";
import { IconMessage } from "@tabler/icons-react";
import { client } from "../client";

const PRICING_QUERY = `*[
  _type == "pricing"
] | order(_createdAt desc)`;

const TITLE_QUERY = `*[
  _type == "title"
] | order(_createdAt desc) [0]`;

const options = { next: { revalidate: 30 } };

interface TitleDataDocument {
  pricing_title: string;
  pricing_title_span: string;
}

interface PricingDataDocument {
  price_header: string;
  price_info: string;
  price_per_hour: string;
  price_features: string[];
  price_link: string;
}

const Pricing = async () => {
  // Fetch pricing and title data concurrently
  const [pricingDataResponse, titleDataResponse] = await Promise.all([
    client.fetch<PricingDataDocument[]>(PRICING_QUERY, {}, options),
    client.fetch<TitleDataDocument>(TITLE_QUERY, {}, options),
  ]);

  if (!pricingDataResponse || pricingDataResponse.length === 0) return null;

  const projects = pricingDataResponse
    .slice()
    .reverse()
    .map((doc) => ({
      header: doc.price_header,
      description: doc.price_info,
      features: <FeaturesSync features={doc.price_features} />,
      amount: <AmountSync amount={doc.price_per_hour} />,
      link: `#${doc.price_link}`,
    }));

  return (
    <div className="flex flex-col lg:max-w-[50rem] w-full lg:ml-[26rem] lg:mx-auto px-4 md:px-6 lg:px-0 animate-fade-down text-white my-8 md:my-12">
      {/* Pricing Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-between text-white mb-8 md:mb-12 lg:mb-[88px]">
        <div className="bg-slate-800 no-underline group w-[8rem] relative shadow-2xl shadow-zinc-900 rounded-full p-px leading-6 text-white inline-block">
          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-gray-900 py-2 px-4 ring-1 ring-white/10">
            <IconMessage size={18} />
            <span className="uppercase text-xs">Pricing</span>
          </div>
        </div>
      </div>

      <h1 className="text-3xl md:text-5xl mb-4 md:mb-6">
        {titleDataResponse.pricing_title}{" "}
        <span className="text-green-500">
          {titleDataResponse.pricing_title_span}
        </span>
      </h1>

      <HoverEffect items={projects} className="h-auto md:h-[33rem]" />
    </div>
  );
};

// Synchronous Features component
const FeaturesSync = ({ features }: { features: string[] }) => {
  return (
    <div>
      <ul className="list-none space-y-2 mt-2">
        {features.map((feature, idx) => (
          <Step key={idx} title={feature} />
        ))}
      </ul>
    </div>
  );
};

// Synchronous Amount component
const AmountSync = ({ amount }: { amount: string }) => {
  return (
    <div className="mt-6 md:mt-[3rem]">
      <h1 className="text-2xl md:text-4xl text-green-500 mb-1">
        ${amount}
        <span className="text-gray-500 text-lg md:text-xl">/hour</span>
      </h1>
    </div>
  );
};

const Step = ({ title }: { title: string }) => {
  return (
    <li className="flex gap-2 items-start">
      <CheckIcon />
      <p className="text-white text-sm md:text-base">{title}</p>
    </li>
  );
};

// Optimized CheckIcon component
const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-blue-500 flex-shrink-0 mt-0.5"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
        fill="currentColor"
        strokeWidth="0"
      />
    </svg>
  );
};

export default Pricing;
