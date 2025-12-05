import { serve, type BunRequest } from "bun";
import { readdir, readFile } from "fs/promises";
import { join } from "path";
import matter from "gray-matter";

// Preact SPA entry point
import app from "./src/index.html";

// Admin auth config
const CONTENT_PATH = "content/blog";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"; // Set via env in production!

// Simple in-memory session tokens (cleared on server restart)
const activeSessions = new Set<string>();

function generateToken(): string {
  return crypto.randomUUID();
}

function verifyToken(token: string | null | undefined): boolean {
  if (!token) return false;
  return activeSessions.has(token);
}

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

    // Admin API - Login
    "/api/admin/login": {
      async POST(req: BunRequest) {
        try {
          const { password } = await req.json() as { password: string };
          
          if (password !== ADMIN_PASSWORD) {
            return Response.json({ error: "Invalid password" }, { status: 401 });
          }

          const token = generateToken();
          activeSessions.add(token);

          // Clean up old sessions (keep last 10)
          if (activeSessions.size > 10) {
            const sessions = Array.from(activeSessions);
            sessions.slice(0, sessions.length - 10).forEach(s => activeSessions.delete(s));
          }

          return Response.json({ token });
        } catch {
          return Response.json({ error: "Invalid request" }, { status: 400 });
        }
      },
    },

    // Admin API - List/Create/Update/Delete posts
    "/api/admin/posts": {
      async GET(req: BunRequest) {
        const token = req.headers.get("Authorization")?.replace("Bearer ", "");
        if (!verifyToken(token)) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        try {
          const files = await readdir(CONTENT_PATH);
          const posts = [];

          for (const file of files) {
            if (!file.endsWith(".md")) continue;
            const content = await readFile(join(CONTENT_PATH, file), "utf-8");
            const { data, content: markdown } = matter(content);

            posts.push({
              filename: file,
              slug: data.slug || file.replace(/\.md$/, ""),
              title: data.title || "Untitled",
              date: data.date || "",
              category: data.category || "General",
              description: data.description || "",
              readTime: data.readTime || "5 min read",
              content: markdown,
            });
          }

          posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          return Response.json({ posts });
        } catch (err) {
          return Response.json({ error: String(err) }, { status: 500 });
        }
      },

      async POST(req: BunRequest) {
        const token = req.headers.get("Authorization")?.replace("Bearer ", "");
        if (!verifyToken(token)) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        try {
          const post = await req.json() as {
            slug: string;
            title: string;
            date: string;
            category: string;
            description: string;
            readTime: string;
            content: string;
            filename?: string;
          };

          // Generate filename
          const filename = post.filename || `${post.date}-${post.slug}.md`;
          const filepath = join(CONTENT_PATH, filename);

          // Create frontmatter content
          const fileContent = `---
title: "${post.title}"
slug: "${post.slug}"
date: "${post.date}"
category: "${post.category}"
description: "${post.description}"
readTime: "${post.readTime}"
---

${post.content}`;

          // Write file locally
          await Bun.write(filepath, fileContent);

          // Regenerate blog data
          Bun.spawn(["bun", "run", "generate-blog"], { cwd: process.cwd() });

          return Response.json({ success: true, filename });
        } catch (err) {
          return Response.json({ error: String(err) }, { status: 500 });
        }
      },

      async DELETE(req: BunRequest) {
        const token = req.headers.get("Authorization")?.replace("Bearer ", "");
        if (!verifyToken(token)) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        try {
          const url = new URL(req.url);
          const filename = url.searchParams.get("filename");
          if (!filename) {
            return Response.json({ error: "Filename required" }, { status: 400 });
          }

          const filepath = join(CONTENT_PATH, filename);
          
          // Delete file
          const file = Bun.file(filepath);
          if (await file.exists()) {
            await Bun.write(filepath, ""); // Clear content
            const { unlinkSync } = await import("fs");
            unlinkSync(filepath);
          }

          // Regenerate blog data
          Bun.spawn(["bun", "run", "generate-blog"], { cwd: process.cwd() });

          return Response.json({ success: true });
        } catch (err) {
          return Response.json({ error: String(err) }, { status: 500 });
        }
      },
    },

    // SPA Routes - all serve the Preact app (client-side routing handles the rest)
    "/": app,
    "/blog": app,
    "/blog/*": app,
    "/contact": app,
    "/strategic-command-center": app,
    "/risk-advisor": app,
    "/compliance-copilot": app,
    "/admin": app,
  },

  development: true,
});

console.log(`🚀 BBA FinTech server running at ${server.url}`);
