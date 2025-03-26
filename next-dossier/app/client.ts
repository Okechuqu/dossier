import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "kx25p8c1",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  useCdn: false,
});
