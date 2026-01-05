import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const token = import.meta.env.VITE_SANITY_TOKEN;
const isDev = import.meta.env.DEV;

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "",
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  // Use CDN in production for better performance, 
  // but disable it if we have a token (authenticated reads) or if explicitly requested.
  useCdn: token ? false : (import.meta.env.VITE_SANITY_USE_CDN === "false" ? false : true),
  token: token,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}
