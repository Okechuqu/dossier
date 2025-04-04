"use client";

import React, { useState } from "react";
import { FloatingDock } from "./ui/floating-dock";
import {
  IconBrandInstagramFilled,
  IconBrandFacebookFilled,
  IconBrandTiktokFilled,
  IconBrandXFilled,
  IconCube3dSphere,
  IconHeartDollar,
  IconBriefcase,
  IconTerminal2,
  IconGridDots,
  IconMenuDeep,
  IconMessage,
  IconHome,
  IconMail,
  IconUser,
  IconX,
} from "@tabler/icons-react";
import { client } from "../client";
import { SanityDocument } from "next-sanity";

const PROFILE_QUERY = `*[
  _type == "profile"
] {
  ...,
  socials->,
  } | order(_createdAt desc) [0]`;

const options = { next: { revalidate: 30 } };

const links = [
  {
    title: "Home",
    icon: (
      <IconHome className="w-full text-neutral-500 dark:text-neutral-300 hover:text-green-500" />
    ),
    href: "#hero",
  },
  {
    title: "About",
    icon: (
      <IconUser className="w-full text-neutral-500 dark:text-neutral-300 hover:text-green-500" />
    ),
    href: "#about",
  },
  {
    title: "Resume",
    icon: (
      <IconBriefcase className="w-full text-neutral-500 dark:text-neutral-300 hover:text-green-500" />
    ),
    href: "#resume",
  },

  {
    title: "Services",
    icon: (
      <IconTerminal2 className="w-full text-neutral-500 dark:text-neutral-300 hover:text-green-500" />
    ),
    href: "#services",
  },

  {
    title: "Skills",
    icon: (
      <IconCube3dSphere className="w-full text-neutral-500 dark:text-neutral-300 hover:text-green-500" />
    ),
    href: "#skills",
  },
  {
    title: "Portfolio",
    icon: (
      <IconGridDots className="w-full text-neutral-500 dark:text-neutral-300 hover:text-green-500" />
    ),
    href: "#portfolio",
  },
  {
    title: "Testimonial",
    icon: (
      <IconMessage className="w-full text-neutral-500 dark:text-neutral-300 hover:text-green-500" />
    ),
    href: "#testimonial",
  },
  {
    title: "Contact",
    icon: (
      <IconMail className="w-full text-neutral-500 dark:text-neutral-300 hover:text-green-500" />
    ),
    href: "#contact",
  },
];

const Navigation = () => {
  return (
    <nav className="fixed right-[4rem] top-1/2 -translate-y-1/2 m-4">
      <FloatingDock items={links} />
    </nav>
  );
};

export function Sidebar() {
  const [socialDetail, setSocialDetail] = useState<SanityDocument | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  React.useEffect(() => {
    const fetchSocialDetail = async () => {
      const data = await client.fetch<SanityDocument>(
        PROFILE_QUERY,
        {},
        options
      );
      setSocialDetail(data);
    };
    fetchSocialDetail();
  }, []);

  return (
    <div className="relative">
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-50 hover:text-green-500"
        aria-label="Open sidebar"
      >
        <IconMenuDeep size={28} />
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-100 z-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[20rem] bg-gray-800 shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        {/* Sidebar Header */}
        <div className="p-4 mt-8 flex justify-between ml-12 items-center border-b">
          <h2 className="text-lg text-white font-semibold">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-50 hover:text-gray-500"
            aria-label="Close sidebar"
          >
            <IconX size={35} />
          </button>
        </div>

        {/* Sidebar Content */}
        <nav className="p-4 ml-12">
          <ul className="space-y-4">
            {links.map((link, i) => (
              <li key={i} className="flex flex-row">
                <p className="pr-3">{link.icon}</p>
                <a
                  href={link.href}
                  className="block text-gray-50 hover:text-green-500"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default anchor behavior
                    const target = document.querySelector(link.href);
                    if (target) {
                      target.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>

          {/* Sidebar Social Icons */}
          <div className="flex flex-col justify-center gap-2 mt-16">
            <p className="text-lg">Socials</p>
            {socialDetail?.socials && (
              <div className="flex flex-row">
                <a
                  href={socialDetail?.socials?.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  <IconBrandFacebookFilled size={20} />
                </a>
                <a
                  href={socialDetail?.socials?.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 ml-4"
                >
                  <IconBrandInstagramFilled size={20} />
                </a>
                <a
                  href={socialDetail?.socials?.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white ml-4"
                >
                  <IconBrandTiktokFilled size={20} />
                </a>
                <a
                  href={socialDetail?.socials?.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 ml-4"
                >
                  <IconBrandXFilled size={20} />
                </a>
              </div>
            )}
          </div>
          {/* Sidebar Footer */}
          <div className="flex flex-col justify-end p-4 bottom-0 absolute">
            <p className="text-gray-500 flex gap-2 text-sm">
              Designed and developed with
              <IconHeartDollar size={15} className="text-red-500" /> by{" "}
            </p>
            <a
              href={socialDetail?.socials?.upwork}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-gray-500 text-end font-semibold text-base"
            >
              {socialDetail?.title}
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navigation;
