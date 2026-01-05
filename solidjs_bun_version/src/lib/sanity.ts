import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

type PublicSanityConfig = {
  projectId: string;
  dataset: string;
  useCdn: boolean;
};

const apiVersion = "2024-01-01";
let clientPromise: Promise<ReturnType<typeof createClient>> | null = null;
let builder: ReturnType<typeof imageUrlBuilder> | null = null;

async function resolvePublicConfig(): Promise<PublicSanityConfig> {
  const isServer = typeof window === "undefined";

  if (isServer) {
    const projectId = process.env.VITE_SANITY_PROJECT_ID || "";
    const dataset = process.env.VITE_SANITY_DATASET || "production";
    const useCdn = process.env.VITE_SANITY_USE_CDN === "false" ? false : true;
    return { projectId, dataset, useCdn };
  }

  const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || "";
  const dataset = import.meta.env.VITE_SANITY_DATASET || "production";
  const useCdn = import.meta.env.VITE_SANITY_USE_CDN === "false" ? false : true;

  if (projectId) {
    return { projectId, dataset, useCdn };
  }

  const res = await fetch("/api/sanity-config");
  if (!res.ok) {
    throw new Error("Failed to load Sanity config");
  }
  const json = (await res.json()) as PublicSanityConfig;
  return {
    projectId: typeof json.projectId === "string" ? json.projectId : "",
    dataset: typeof json.dataset === "string" ? json.dataset : "production",
    useCdn: typeof json.useCdn === "boolean" ? json.useCdn : true,
  };
}

export async function getSanityClient() {
  if (clientPromise) return clientPromise;

  clientPromise = (async () => {
    const isServer = typeof window === "undefined";
    const cfg = await resolvePublicConfig();
    if (!cfg.projectId) {
      throw new Error("Configuration must contain `projectId`");
    }

    const token = isServer ? process.env.VITE_SANITY_TOKEN : undefined;

    const client = createClient({
      projectId: cfg.projectId,
      dataset: cfg.dataset,
      apiVersion,
      useCdn: token ? false : cfg.useCdn,
      token,
    });

    builder = imageUrlBuilder(client);
    return client;
  })();

  return clientPromise;
}

export function urlFor(source: any) {
  if (!builder) {
    throw new Error("Sanity client not initialized");
  }
  return builder.image(source);
}
