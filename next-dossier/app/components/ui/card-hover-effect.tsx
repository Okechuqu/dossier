"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    header: string;
    description: string;
    features: string | React.ReactNode;
    amount: string | React.ReactNode;
    link: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 py-1",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={idx}
          className="relative group block p-1 md:p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={(e) => {
            e.preventDefault();
            const target = document.querySelector(item?.link);
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-2xl md:rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-2 md:gap-4">
              <CardTitle className="flex-1">{item.header}</CardTitle>
              <CardDescription className="flex-1 whitespace-pre-line">
                {item.description}
              </CardDescription>
            </div>
            <CardAmount>{item.amount}</CardAmount>
            <CardFeatures>{item.features}</CardFeatures>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-xl md:rounded-2xl h-full w-full p-3 md:p-4 overflow-hidden bg-gray-900 border border-green-500 dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50 flex flex-col">
        <div className="p-2 md:p-4">{children}</div>
        <button
          type="button"
          className="bg-green-500 text-black hover:text-gray-700 uppercase rounded-2xl md:rounded-3xl py-2 px-3 md:p-2 mt-4 md:mt-[3rem] text-sm md:text-base"
        >
          Pick this package
        </button>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "text-zinc-100 text-xl md:text-3xl tracking-wide",
        className
      )}
    >
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "text-zinc-400 tracking-wide leading-relaxed text-end text-xs md:text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};

export const CardAmount = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "text-zinc-100 tracking-wide mt-2 md:mt-4 text-sm md:text-base",
        className
      )}
    >
      {children}
      <hr className="my-2 md:my-3" />
    </div>
  );
};

const CardFeatures = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mt-4 md:mt-8 text-zinc-400 tracking-wide leading-relaxed text-xs md:text-sm",
        className
      )}
    >
      {children}
    </div>
  );
};
