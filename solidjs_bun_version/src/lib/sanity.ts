import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Handle both server (process.env) and client (import.meta.env) environments
const isServer = typeof window === "undefined";

const projectId = isServer
  ? process.env.VITE_SANITY_PROJECT_ID || ""
  : import.meta.env.VITE_SANITY_PROJECT_ID || "";

const dataset = isServer
  ? process.env.VITE_SANITY_DATASET || "production"
  : import.meta.env.VITE_SANITY_DATASET || "production";

const token = isServer
  ? process.env.VITE_SANITY_TOKEN
  : import.meta.env.VITE_SANITY_TOKEN;

const isDev = isServer ? process.env.NODE_ENV === "development" : import.meta.env.DEV;

export const sanityClient = createClient({
  projectId: projectId,
  dataset: dataset,
  apiVersion: "2024-01-01",
  // Use CDN in production for better performance, 
  // but disable it if we have a token (authenticated reads) or if explicitly requested.
  useCdn: token ? false : (isServer ? false : (import.meta.env.VITE_SANITY_USE_CDN === "false" ? false : true)),
  token: token,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}
