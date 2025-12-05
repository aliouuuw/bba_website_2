import type { Handler, HandlerEvent } from "@netlify/functions";

// Netlify API configuration
const NETLIFY_SITE_ID = process.env.NETLIFY_SITE_ID || "";
const NETLIFY_ACCESS_TOKEN = process.env.NETLIFY_ACCESS_TOKEN || "";

const handler: Handler = async (event: HandlerEvent) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  // If Netlify API is not configured, return unknown status
  if (!NETLIFY_SITE_ID || !NETLIFY_ACCESS_TOKEN) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        status: "unknown",
        message: "Build status not configured. Set NETLIFY_SITE_ID and NETLIFY_ACCESS_TOKEN."
      }),
    };
  }

  try {
    // Fetch recent deploys from Netlify API
    const response = await fetch(
      `https://api.netlify.com/api/v1/sites/${NETLIFY_SITE_ID}/deploys?per_page=5`,
      {
        headers: {
          "Authorization": `Bearer ${NETLIFY_ACCESS_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Netlify API error: ${response.status}`);
    }

    const deploys = await response.json();
    
    if (!deploys || deploys.length === 0) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ status: "unknown", message: "No deploys found" }),
      };
    }

    const latest = deploys[0];
    
    // Map Netlify states to simpler statuses
    let status: "building" | "ready" | "error" | "queued";
    switch (latest.state) {
      case "building":
      case "uploading":
      case "processing":
        status = "building";
        break;
      case "ready":
        status = "ready";
        break;
      case "error":
        status = "error";
        break;
      case "new":
      case "pending":
      case "enqueued":
        status = "queued";
        break;
      default:
        status = "ready";
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status,
        deploy_id: latest.id,
        state: latest.state,
        created_at: latest.created_at,
        published_at: latest.published_at,
        commit_message: latest.title || latest.commit_ref,
        deploy_time: latest.deploy_time,
        branch: latest.branch,
      }),
    };
  } catch (error) {
    console.error("Error fetching build status:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        status: "error",
        error: error instanceof Error ? error.message : "Failed to fetch build status" 
      }),
    };
  }
};

export { handler };
