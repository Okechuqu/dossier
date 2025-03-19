"use client";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "./hooks/use-outside-click";
import { IconGridPattern } from "@tabler/icons-react";
import Image from "next/image";
import { client } from "../client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import CustomPortableText from "../lib/customs";

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
  portfolio_stack: string;
  portfolio_description: any;
  portfolio_link: string;
  portfolio_image?: Array<{ asset: { url: string } }>;
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
    images: string[];
    ctaText: string;
    ctaLink: string;
    content: () => JSX.Element;
  } | null>(null);

  // Fetch data once on mount
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

  // Build cards from fetched portfolio data
  const cards = portfolioData.map((doc) => {
    const images =
      doc.portfolio_image && doc.portfolio_image.length > 0
        ? doc.portfolio_image.map((img) => urlFor(img)?.url() || img.asset.url)
        : ["/dp.JPG"];
    return {
      title: doc.portfolio_stack,
      images,
      ctaText: "Visit",
      ctaLink: doc.portfolio_link,
      content: () => (
        <div>
          <CustomPortableText value={doc.portfolio_description} />
        </div>
      ),
    };
  });

  // Handle Escape key to close modal
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
        className="flex flex-col lg:max-w-[52rem] w-full lg:ml-[26rem] lg:mx-auto px-6 lg:px-0 animate-fade-down text-white my-[2rem]"
      >
        <div className="flex flex-row justify-between text-white mb-[40px] lg:mb-[88px]">
          <div className="bg-slate-800 no-underline group relative shadow-2xl shadow-zinc-900 rounded-full p-px leading-6 text-white inline-block">
            <div className="relative flex space-x-2 items-center z-10 rounded-full bg-gray-900 py-2 px-4 ring-1 ring-white/10">
              <IconGridPattern />
              <p></p>
              <span className="uppercase text-xs">Portfolio</span>
            </div>
          </div>
        </div>
        <div>
          <h1 className="md:text-5xl text-xl mb-2 md:mb-6">
            Featured <span className="text-green-500">Projects</span>
          </h1>
        </div>
        <AnimatePresence>
          {active && (
            <div className="fixed inset-0 grid place-items-center z-[100]">
              <motion.div
                layoutId={`card-${active.title}-${id}`}
                ref={ref}
                className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col glass dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
              >
                <motion.div layoutId={`image-${active.title}-${id}`}>
                  <Image
                    priority
                    width={200}
                    height={200}
                    // If a second image exists, show it; otherwise, use the first image.
                    src={active.images[1] ? active.images[1] : active.images[0]}
                    alt={active.title}
                    className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                  />
                </motion.div>
                <div>
                  <div className="flex justify-between items-start p-4">
                    <div>
                      <motion.h3
                        layoutId={`title-${active.title}-${id}`}
                        className="font-medium text-neutral-100 dark:text-neutral-200 text-base"
                      >
                        {active.title}
                      </motion.h3>
                    </div>
                    <motion.a
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      href={active.ctaLink}
                      target="_blank"
                      className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                    >
                      {active.ctaText}
                    </motion.a>
                  </div>
                  <div className="pt-4 relative px-4">
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-neutral-100 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                    >
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
        <ul className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4">
          {cards.map((card, index) => (
            <motion.div
              layoutId={`card-${card.title}-${id}`}
              key={index}
              onClick={() => setActive(card)}
              className="p-4 flex flex-col glass hover:border-green-500 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
            >
              <div className="flex gap-4 flex-col w-full">
                <motion.div layoutId={`image-${card.title}-${id}`}>
                  <Image
                    width={100}
                    height={100}
                    // Always show the first image in the list view.
                    src={card.images[0]}
                    alt={card.title}
                    className="h-60 w-full rounded-lg object-cover object-top"
                  />
                </motion.div>
                <div className="flex justify-center items-center flex-row absolute top-52">
                  <motion.h3
                    layoutId={`title-${card.title}-${id}`}
                    className="font-medium border rounded-full p-1 mx-2 text-neutral-100 bg-gray-800 dark:text-neutral-200 text-center md:text-left text-base"
                  >
                    {card.title}
                  </motion.h3>
                </div>
              </div>
            </motion.div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Portfolio;
