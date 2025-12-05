import { serve, type BunRequest } from "bun";

// Preact SPA entry point
import app from "./src/index.html";

const server = serve({
  port: 3000,

  routes: {
    // Static Assets
    "/assets/*": async (req) => {
      const url = new URL(req.url);
      const file = Bun.file(`.${url.pathname}`);
      if (await file.exists()) {
        return new Response(file);
      }
      return new Response("Not found", { status: 404 });
    },
    "/styles.css": () => new Response(Bun.file("./styles.css")),

    // API Routes
    "/api/health": {
      GET() {
        return Response.json({ status: "ok", timestamp: new Date().toISOString() });
      },
    },

    "/api/contact": {
      async POST(req: BunRequest) {
        try {
          const body = await req.json();
          const { name, email, company, message } = body as {
            name: string;
            email: string;
            company?: string;
            message: string;
          };

          if (!name || !email || !message) {
            return Response.json({ error: "Name, email, and message are required" }, { status: 400 });
          }

          console.log("Contact form submission:", { name, email, company, message });
          return Response.json({ success: true, message: "Message received" });
        } catch {
          return Response.json({ error: "Invalid request body" }, { status: 400 });
        }
      },
    },

    // SPA Routes - all serve the Preact app (client-side routing handles the rest)
    "/": app,
    "/blog": app,
    "/blog-post": app,
    "/contact": app,
    "/strategic-command-center": app,
    "/risk-advisor": app,
    "/compliance-copilot": app,
  },

  development: true,
});

console.log(`🚀 BBA FinTech server running at ${server.url}`);
