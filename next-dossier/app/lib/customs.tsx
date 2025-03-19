import React from "react";
import { PortableText, PortableTextComponents } from "next-sanity";
import Link from "next/link";

// Define a type for the code block value
interface CodeValue {
  code: string;
}

// Optionally define a type for your custom PortableText props
interface CustomPortableTextProps {
  value: any;
}

const customComponents: PortableTextComponents = {
  // Custom rendering for custom object types
  types: {
    code: ({ value }: { value: CodeValue }) => {
      return (
        <pre className="bg-gray-800 text-white p-4 rounded my-4">
          <code>{value.code}</code>
        </pre>
      );
    },
    // For images or other types, follow a similar pattern.
  },

  // Custom block serializers for various block types.
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => {
      const content = typeof children === "string" ? children.trim() : children;
      return (
        <p className={`text-base leading-relaxed ${content ? "my-2" : "my-0"}`}>
          {content}
        </p>
      );
    },

    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="text-4xl font-bold my-4">{children}</h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-3xl font-bold my-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-2xl font-bold my-4">{children}</h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="text-xl font-bold my-4">{children}</h4>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-gray-500 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  },

  // Custom inline marks such as links, strong, em, etc.
  marks: {
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode;
      value?: { href: string };
    }) => {
      // Handle if value is not defined
      if (!value?.href) {
        return <span>{children}</span>;
      }
      return (
        <Link href={value.href} className="text-blue-500 hover:underline">
          {children}
        </Link>
      );
    },
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    underline: ({ children }: { children?: React.ReactNode }) => (
      <span className="underline">{children}</span>
    ),
  },

  // Custom list rendering for bullet and numbered lists
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc ml-6 my-2">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal ml-6 my-2">{children}</ol>
    ),
  },

  // Custom list item rendering
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="mb-2">{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="mb-2">{children}</li>
    ),
  },
};

const CustomPortableText: React.FC<CustomPortableTextProps> = ({ value }) => {
  return <PortableText value={value} components={customComponents} />;
};

export default CustomPortableText;
