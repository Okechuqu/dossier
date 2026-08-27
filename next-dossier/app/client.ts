import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "kx25p8c1",
  dataset: "production",
  apiVersion: "2024-01-01",
  // This client is imported by browser components, so it must never contain a
  // write token. Public content reads should use Sanity's CDN.
  useCdn: true,
});
