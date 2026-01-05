import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function sanityConfig(_request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const projectId = process.env.VITE_SANITY_PROJECT_ID || "";
  const dataset = process.env.VITE_SANITY_DATASET || "production";
  const useCdn = process.env.VITE_SANITY_USE_CDN === "false" ? false : true;

  if (!projectId) {
    context.error("Missing VITE_SANITY_PROJECT_ID");
    return {
      status: 500,
      jsonBody: { error: "Missing VITE_SANITY_PROJECT_ID" },
    };
  }

  return {
    status: 200,
    jsonBody: { projectId, dataset, useCdn },
  };
}

app.http("sanity-config", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: sanityConfig,
});
