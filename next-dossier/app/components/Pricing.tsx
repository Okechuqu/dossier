import React from "react";
import { HoverEffect } from "./ui/card-hover-effect";
import { IconMessage } from "@tabler/icons-react";

const projects = [
  {
    title: "Basic",
    description: `Have design ready to build? \nor small budget`,
    amount: <Amount />,
    features: <Features />,
    link: "#contact",
  },
  {
    title: "Premuim",
    description: "Not have any design? \nLeave its for me",
    amount: <Amount />,
    features: <Features />,
    link: "#contacts",
  },
];

const Pricing = () => {
  return (
    <div className="flex flex-col lg:max-w-[52rem] w-full lg:ml-[26rem] lg:mx-auto px-6 lg:px-0 animate-fade-down text-white my-[3rem]">
      {/* Pricing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-between text-white mb-[40px] lg:mb-[88px]">
        <div className="bg-slate-800 no-underline group w-[8rem] relative shadow-2xl shadow-zinc-900 rounded-full p-px  leading-6  text-white inline-block">
          <div className="relative flex space-x-2 items-center z-10  rounded-full bg-gray-900  py-2 px-4 ring-1 ring-white/10 ">
            <IconMessage />
            <p></p>
            <span className="uppercase text-xs">Pricing</span>
          </div>
        </div>
      </div>
      <h1 className="md:text-5xl text-xl mb-2 md:mb-6">
        My <span className="text-green-500">Pricing</span>
      </h1>
      <HoverEffect items={projects} className="h-[33rem]" />
    </div>
  );
};

function Features() {
  return (
    <div>
      <ul className="list-none  mt-2">
        <Step title="Need your wireframe" />
        <Step title="Design with Figma, Framer" />
        <Step title="Implement with Webflow, React, WordPress, Laravel/PHP" />
        <Step title="Remote/Online" />
        <Step title="Work in business days, no weekend." />
        <Step title="Support 6 months" />
      </ul>
    </div>
  );
}

function Amount() {
  return (
    <div className="mt-[3rem]">
      <h1 className="text-4xl text-green-500 mb-1 mt-2">
        $35 <span className="text-gray-500">/hour</span>
      </h1>
    </div>
  );
}

const Step = ({ title }: { title: string }) => {
  return (
    <li className="flex gap-2 items-start">
      <CheckIcon />
      <p className="text-white">{title}</p>
    </li>
  );
};

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0"
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
