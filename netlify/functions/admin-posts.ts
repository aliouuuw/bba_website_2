import type { Handler, HandlerEvent } from "@netlify/functions";
import { readdir, readFile } from "fs/promises";
import { join } from "path";
import matter from "gray-matter";

// Note: This function reads from the content directory at BUILD time
// The data is bundled into the function during Netlify's build process

interface BlogPostMeta {
  filename: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  description: string;
  readTime: string;
  content: string;
}

const CONTENT_PATH = "content/blog";

// Simple token verification - in production use JWT
const verifyToken = (authHeader: string | undefined): boolean => {
  if (!authHeader) return false;
  const token = authHeader.replace("Bearer ", "");
  // For now, just check that a token exists (it was issued by login)
  // In production, use JWT or a database to verify tokens
  return token.length > 0;
};

const handler: Handler = async (event: HandlerEvent) => {
  const authHeader = event.headers.authorization;
  
  if (!verifyToken(authHeader)) {
    return {
      statusCode: 401,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Unauthorized" }),
    };
  }

  // Handle different HTTP methods
  switch (event.httpMethod) {
    case "GET":
      return await handleGetPosts();
    case "POST":
      return handleCreatePost();
    case "DELETE":
      return handleDeletePost();
    default:
      return {
        statusCode: 405,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Method not allowed" }),
      };
  }
};

async function handleGetPosts() {
  try {
    const files = await readdir(CONTENT_PATH);
    const posts: BlogPostMeta[] = [];

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

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ posts }),
    };
  } catch (error) {
    console.error("Error reading posts:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Failed to load posts" }),
    };
  }
}

function handleCreatePost() {
  // Netlify Functions can't write to the filesystem
  // In production, you would integrate with GitHub API or a CMS
  return {
    statusCode: 501,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      error: "Creating posts is not supported in production. Please edit markdown files locally and push to GitHub.",
      info: "This is a limitation of serverless functions - they cannot write to the filesystem."
    }),
  };
}

function handleDeletePost() {
  // Netlify Functions can't delete files from the filesystem
  return {
    statusCode: 501,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      error: "Deleting posts is not supported in production. Please remove markdown files locally and push to GitHub.",
      info: "This is a limitation of serverless functions - they cannot modify the filesystem."
    }),
  };
}

export { handler };
