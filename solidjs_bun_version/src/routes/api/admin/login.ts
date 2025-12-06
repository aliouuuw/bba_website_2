import { APIEvent } from "@solidjs/start/server";
import { activeSessions, generateToken } from "~/lib/auth";

// Admin auth config
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"; // Set via env in production!

export async function POST({ request }: APIEvent) {
  console.log("Login API route called");
  
  try {
    const { password } = await request.json() as { password: string };
    console.log("Password received:", password ? "***" : "(empty)");
    
    if (password !== ADMIN_PASSWORD) {
      console.log("Password mismatch");
      return new Response(JSON.stringify({ error: "Invalid password" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }

    const token = generateToken();
    activeSessions.add(token);
    console.log("Token generated and session created");

    // Clean up old sessions (keep last 10)
    if (activeSessions.size > 10) {
      const sessions = Array.from(activeSessions);
      sessions.slice(0, sessions.length - 10).forEach(s => activeSessions.delete(s));
    }

    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Login API error:", error);
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
}