import { APIEvent } from "@solidjs/start/server";
import { verifyToken, getTokenFromRequest } from "~/lib/auth";

export async function GET({ request }: APIEvent) {
  const token = getTokenFromRequest(request);
  if (!verifyToken(token)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  // For now, return a mock build status
  // In production, this would check actual build status from Netlify API
  return new Response(JSON.stringify({
    status: "ready",
    commit_message: "Latest build completed",
    created_at: new Date().toISOString()
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}