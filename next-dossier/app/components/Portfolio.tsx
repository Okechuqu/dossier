"use client";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "./hooks/use-outside-click";
import { IconGridPattern } from "@tabler/icons-react";
import Image from "next/image";
import { client } from "../client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import CustomPortableText from "../lib/customs";
import { PortableTextBlock } from "next-sanity";

const PORTFOLIO_QUERY = `*[
  _type == "portfolio"
] | order(_createdAt desc)`;
const TITLE_QUERY = `*[
  _type == "title"
] | order(_createdAt desc) [0]`;

const options = { next: { revalidate: 30 } };

interface TitleDataDocument {
  portfolio_title: string;
  portfolio_title_span: string;
}

interface PortfolioDataDocument {
  portfolio_stack: string[];
  portfolio_description: PortableTextBlock[];
  portfolio_link: string;
  portfolio_image?: Array<{ asset: { url: string } }>;
  portfolio_title: string;
}

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const Portfolio = () => {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const [portfolioData, setPortfolioData] = useState<PortfolioDataDocument[]>(
    []
  );
  const [titleData, setTitleData] = useState<TitleDataDocument | null>(null);
  const [active, setActive] = useState<{
    title: string;
    stack: string[];
    images: string[];
    ctaText: string;
    ctaLink: string;
    content: () => JSX.Element;
  } | null>(null);

  useEffect(() => {
    async function fetchData() {
      const portfolioRes = await client.fetch<PortfolioDataDocument[]>(
        PORTFOLIO_QUERY,
        {},
        options
      );
      const titleRes = await client.fetch<TitleDataDocument>(
        TITLE_QUERY,
        {},
        options
      );
      setPortfolioData(portfolioRes);
      setTitleData(titleRes);
    }
    fetchData();
  }, []);

  const cards = portfolioData.map((doc) => {
    const images =
      doc.portfolio_image && doc.portfolio_image.length > 0
        ? doc.portfolio_image.map((img) => urlFor(img)?.url() || img.asset.url)
        : ["/dp.JPG"];
    return {
      stack: doc.portfolio_stack,
      images,
      ctaText: "Visit",
      ctaLink: doc.portfolio_link,
      content: () => (
        <div>
          <CustomPortableText value={doc.portfolio_description} />
        </div>
      ),
      title: doc.portfolio_title,
    };
  });

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }
    document.body.style.overflow = active ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  // Ensure portfolio data exists before rendering
  if (!portfolioData || portfolioData.length === 0) return "";

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <div
        id="portfolio"
        className="flex flex-col lg:max-w-[50rem] w-full lg:ml-[26rem] lg:mx-auto px-4 md:px-6 lg:px-0 animate-fade-down text-white my-8 md:my-[2rem]"
      >
        <div className="flex flex-row justify-between text-white mb-8 md:mb-[40px] lg:mb-[88px]">
          <div className="bg-slate-800 no-underline group relative shadow-2xl shadow-zinc-900 rounded-full p-px leading-6 text-white inline-block">
            <div className="relative flex space-x-2 items-center z-10 rounded-full bg-gray-900 py-2 px-4 ring-1 ring-white/10">
              <IconGridPattern />
              <span className="uppercase text-xs">Portfolio</span>
            </div>
          </div>
        </div>
        <div>
          {titleData && (
            <h1 className="text-3xl md:text-5xl mb-4 md:mb-6">
              {titleData.portfolio_title}{" "}
              <span className="text-green-500">
                {titleData.portfolio_title_span}
              </span>
            </h1>
          )}
        </div>
        <AnimatePresence>
          {active && (
            <div className="fixed inset-0 flex items-center justify-center p-4 z-[100] overflow-y-auto">
              <motion.div
                layoutId={`card-${active.title}-${id}`}
                ref={ref}
                className="w-full max-w-[95vw] md:max-w-[500px] max-h-[85vh] flex flex-col glass dark:bg-neutral-900 rounded-3xl overflow-hidden"
              >
                <motion.div
                  layoutId={`image-${active.title}-${id}`}
                  className="flex-shrink-0"
                >
                  <Image
                    priority
                    width={500}
                    height={300}
                    src={active.images[1] ? active.images[1] : active.images[0]}
                    alt={active.title}
                    className="w-full h-40 md:h-48 object-cover object-top"
                  />
                </motion.div>

                <div className="flex flex-col flex-grow overflow-hidden">
                  <div className="flex justify-between items-start p-4">
                    <div className="flex gap-2 flex-wrap">
                      {active.stack.map((stack: string) => (
                        <motion.h3
                          layoutId={`stack-${stack}-${id}`}
                          className="font-medium border rounded-full px-2 py-1 text-xs md:text-sm text-neutral-100 bg-gray-800"
                          key={stack}
                        >
                          {stack}
                        </motion.h3>
                      ))}
                    </div>
                    <motion.a
                      href={active.ctaLink}
                      target="_blank"
                      className="px-3 py-2 text-xs md:text-sm rounded-full font-bold bg-green-500 text-white whitespace-nowrap"
                    >
                      {active.ctaText}
                    </motion.a>
                  </div>

                  <div className="px-4 pb-4 flex-grow overflow-y-auto">
                    <motion.div className="text-neutral-100 text-sm md:text-base flex flex-col gap-3 dark:text-neutral-400">
                      {typeof active.content === "function"
                        ? active.content()
                        : active.content}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        <ul className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4 md:gap-6">
          {cards
            .slice()
            .reverse()
            .map((card, index) => (
              <div className="flex flex-col relative" key={index}>
                <motion.div
                  layoutId={`card-${card.stack}-${id}`}
                  key={index}
                  onClick={() => setActive(card)}
                  className="p-4 flex flex-col glass hover:border-green-500 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
                >
                  <div className="flex gap-4 flex-col w-full">
                    <motion.div layoutId={`image-${card.stack}-${id}`}>
                      <Image
                        width={100}
                        height={100}
                        src={card.images[0]}
                        alt={card.title}
                        className="h-48 md:h-60 w-full rounded-lg object-cover object-top"
                      />
                    </motion.div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {card.stack.map((stack: string) => (
                        <motion.h3
                          layoutId={`stack-${stack}-${id}`}
                          className="font-medium border rounded-full px-3 text-neutral-100 bg-gray-800 dark:text-neutral-200 text-center md:text-left text-sm md:text-base"
                          key={stack}
                        >
                          {stack}
                        </motion.h3>
                      ))}
                    </div>
                  </div>
                </motion.div>
                <p className="mt-2 text-lg md:text-2xl hover:underline uppercase">
                  {card.title}
                </p>
              </div>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Portfolio;
