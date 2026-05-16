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
  IconMenu2,
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
    <nav>
      {/* Mobile sidebar toggle button on the right */}
      <div className="fixed right-4 top-4 z-50 md:hidden">
        <Sidebar />
      </div>

      {/* Floating dock visible on tablet and desktop */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 m-4 hidden md:block">
        <FloatingDock items={links} />
      </div>
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
        options,
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
        className="p-2 text-gray-50 hover:text-green-500 hover:bg-gray-800 rounded-lg transition-colors"
        aria-label="Open menu"
      >
        <IconMenu2 size={28} />
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 shadow-2xl transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50 overflow-y-auto`}
      >
        {/* Sidebar Header */}
        <div className="p-4 mt-2 flex justify-between items-center border-b border-gray-700">
          <h2 className="text-lg text-white font-semibold">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-50 hover:text-green-500 transition-colors"
            aria-label="Close menu"
          >
            <IconX size={28} />
          </button>
        </div>

        {/* Sidebar Content */}
        <nav className="p-6">
          <ul className="space-y-3">
            {links.map((link, i) => (
              <li key={i} className="flex flex-row items-center gap-3">
                <span className="text-neutral-400 hover:text-green-500 transition-colors">
                  {link.icon}
                </span>
                <a
                  href={link.href}
                  className="block text-gray-50 hover:text-green-500 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.querySelector(link.href);
                    if (target) {
                      target.scrollIntoView({ behavior: "smooth" });
                    }
                    setIsOpen(false);
                  }}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>

          {/* Sidebar Social Icons */}
          <div className="flex flex-col justify-center gap-4 mt-12 pt-6 border-t border-gray-700">
            <p className="text-sm font-semibold text-gray-200">Connect</p>
            {socialDetail?.socials && (
              <div className="flex flex-row gap-4">
                {socialDetail?.socials?.facebook && (
                  <a
                    href={socialDetail?.socials?.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-400 transition-colors"
                    title="Facebook"
                  >
                    <IconBrandFacebookFilled size={24} />
                  </a>
                )}
                {socialDetail?.socials?.instagram && (
                  <a
                    href={socialDetail?.socials?.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:text-pink-400 transition-colors"
                    title="Instagram"
                  >
                    <IconBrandInstagramFilled size={24} />
                  </a>
                )}
                {socialDetail?.socials?.tiktok && (
                  <a
                    href={socialDetail?.socials?.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="TikTok"
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    <IconBrandTiktokFilled size={24} />
                  </a>
                )}
                {socialDetail?.socials?.x && (
                  <a
                    href={socialDetail?.socials?.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="X (Twitter)"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <IconBrandXFilled size={24} />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Sidebar Footer */}
          <div className="flex flex-col justify-end p-4 mt-12 pt-6 border-t border-gray-700 gap-2">
            <p className="text-gray-400 flex gap-2 text-sm">
              Designed with
              <IconHeartDollar size={16} className="text-red-500" />
            </p>
            <a
              href={socialDetail?.socials?.upwork}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-400 font-semibold text-sm transition-colors"
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
