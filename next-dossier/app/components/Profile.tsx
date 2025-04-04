import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandUpwork,
  IconBrandX,
  IconMessage2Bolt,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { client } from "../client";
import { type SanityDocument } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import SmoothScrollLink from "../lib/smooth-scroll-link";

// Replace with your Sanity project ID and dataset

const PROFILE_QUERY = `*[
  _type == "profile"
] {
  ...,
  socials->,
  } | order(_createdAt desc) [0]`;

const options = { next: { revalidate: 30 } };

interface SanityFileAsset {
  asset: {
    _ref: string;
  };
}

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const buildFileUrl = (
  fileAsset: SanityFileAsset | null | undefined
): string | null => {
  if (!fileAsset?.asset?._ref) return null;
  const ref = fileAsset.asset._ref;
  const parts = ref.split("-");
  if (parts.length !== 3) return null;
  const assetId = parts[1];
  const extension = parts[2];
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${assetId}.${extension}`;
};

const Profile = async () => {
  const detail = await client.fetch<SanityDocument>(PROFILE_QUERY, {}, options);
  const postImageUrl = detail?.image ? urlFor(detail.image)?.url() : null;

  // Ensure detail exists before rendering
  if (!detail) return "";

  return (
    <div className="lg:fixed lg:left-8 lg:top-1/2 lg:transform lg:-translate-y-1/2 h-[41rem] lg:w-[22rem] w-screen glass rounded-3xl p-8 mb-8 flex flex-col items-center justify-center animate-fade-up inset-0">
      <div className="flex flex-row gap-8 text-white items-center w-full justify-between mb-5">
        <h1 className="relative text-3xl text-start font-bold">
          {detail.title}
          <span className="absolute top-0 right-[-3] text-xs">®</span>
        </h1>
        <p className="text-sm font-medium text-end">{detail.skill}</p>
      </div>

      {/* Image */}
      <div className="relative w-[15rem] h-[15rem] rounded-[25px] overflow-hidden mb-8">
        {postImageUrl && (
          <Image
            src={postImageUrl}
            width={180}
            height={180}
            alt={detail.title || "Profile"}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
      </div>

      {/* Profile Details */}
      <div className="text-center text-white">
        <h2 className="text-base font-bold">{detail.name}</h2>
        <p className="text-white/60">{detail.location}</p>
      </div>

      {/* CV */}
      {detail.cv && (
        <Link
          href={buildFileUrl(detail.cv) || ""}
          download={`${detail.name}'s CV`}
          target="_blank"
          className="text-sm text-white/60 my-[1.5rem]"
        >
          {detail.cv ? "Download My CV" : ""}
        </Link>
      )}

      {/* Social Links */}
      <div className="flex flex-row gap-2 text-center">
        {detail.socials?.github && (
          <Link
            href={detail.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center h-[2.5rem] w-[2.5rem] justify-center gap-2 text-white/60 hover:text-gray-900 border-gray-300 rounded-full glass"
          >
            <IconBrandGithub />
          </Link>
        )}
        {detail.socials?.linkedin && (
          <Link
            href={detail.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center h-[2.5rem] w-[2.5rem] justify-center gap-2 text-white/60 hover:text-blue-500 border-blue-500 rounded-full glass"
          >
            <IconBrandLinkedin />
          </Link>
        )}
        {detail.socials?.upwork && (
          <Link
            href={detail.socials.upwork}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center h-[2.5rem] w-[2.5rem] justify-center gap-2 text-white/60 hover:text-green-500 border-green-500 rounded-full glass"
          >
            <IconBrandUpwork />
          </Link>
        )}
        {detail.socials?.x && (
          <Link
            href={detail.socials.x}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center h-[2.5rem] w-[2.5rem] justify-center gap-2 text-white/60 hover:text-gray-900 border-gray-900 rounded-full glass"
          >
            <IconBrandX />
          </Link>
        )}
      </div>

      {/* Hire Me Button */}
      <SmoothScrollLink href="#contact">
        <button className="flex flex-row items-center justify-center gap-2 bg-gradient-to-br uppercase relative group/btn from-green-600 to-green-200 w-[15rem] text-black rounded-3xl h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mt-8">
          <IconMessage2Bolt />
          Hire me!
        </button>
      </SmoothScrollLink>
    </div>
  );
};

export default Profile;
