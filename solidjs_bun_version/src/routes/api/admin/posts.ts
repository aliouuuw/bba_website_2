import { APIEvent } from "@solidjs/start/server";
import { verifyToken, getTokenFromRequest } from "~/lib/auth";
import { readdir, readFile, writeFile, unlink, mkdir } from "fs/promises";
import { join, dirname } from "path";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import matter from "gray-matter";

// Get the project root directory (solidjs_bun_version)
const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, "..", "..", "..", "..");
const CONTENT_PATH = join(PROJECT_ROOT, "content", "blog");

// Helper to run shell commands
function runCommand(command: string, args: string[]): void {
  const child = spawn(command, args, { cwd: PROJECT_ROOT, stdio: "inherit" });
  child.on("error", (err) => console.error("Command error:", err));
}

// Ensure content directory exists
async function ensureContentDir(): Promise<void> {
  try {
    await mkdir(CONTENT_PATH, { recursive: true });
  } catch (err) {
    // Directory already exists, ignore
  }
}

export async function GET({ request }: APIEvent) {
  const token = getTokenFromRequest(request);
  if (!verifyToken(token)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    await ensureContentDir();
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
    
    return new Response(JSON.stringify({ posts, source: "local" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function POST({ request }: APIEvent) {
  const token = getTokenFromRequest(request);
  if (!verifyToken(token)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    await ensureContentDir();
    const post = await request.json() as {
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
    await writeFile(filepath, fileContent, "utf-8");

    // Regenerate blog data
    runCommand("bun", ["run", "generate-blog"]);

    return new Response(JSON.stringify({ 
      success: true, 
      filename,
      message: "Post saved locally!",
      post: {
        ...post,
        filename,
      }
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function DELETE({ request }: APIEvent) {
  const token = getTokenFromRequest(request);
  if (!verifyToken(token)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const url = new URL(request.url);
    const filename = url.searchParams.get("filename");
    if (!filename) {
      return new Response(JSON.stringify({ error: "Filename required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const filepath = join(CONTENT_PATH, filename);
    
    // Delete file
    await unlink(filepath);

    // Regenerate blog data
    runCommand("bun", ["run", "generate-blog"]);

    return new Response(JSON.stringify({ success: true, message: "Post deleted!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}