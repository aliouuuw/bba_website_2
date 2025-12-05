import type { Handler, HandlerEvent } from "@netlify/functions";

// GitHub API configuration
const GITHUB_OWNER = process.env.GITHUB_OWNER || "";
const GITHUB_REPO = process.env.GITHUB_REPO || "";
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";
const GITHUB_TOKEN = process.env.GITHUB_PAT || "";
const CONTENT_PATH = "content/blog";

// Fallback to bundled posts if GitHub fetch fails
import blogPostsFallback from "./blog-posts.json";

interface BlogPost {
  filename: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  description: string;
  readTime: string;
  content: string;
}

// Simple token verification
const verifyToken = (authHeader: string | undefined): boolean => {
  if (!authHeader) return false;
  const token = authHeader.replace("Bearer ", "");
  return token.length > 0;
};

// GitHub API helper
async function githubRequest(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`https://api.github.com${endpoint}`, {
    ...options,
    headers: {
      "Accept": "application/vnd.github.v3+json",
      "Authorization": `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `GitHub API error: ${response.status}`);
  }
  
  return response.json();
}

// Get file SHA (needed for updates)
async function getFileSHA(path: string): Promise<string | null> {
  try {
    const data = await githubRequest(
      `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}?ref=${GITHUB_BRANCH}`
    );
    return data.sha;
  } catch {
    return null; // File doesn't exist
  }
}

// Parse frontmatter from markdown content
function parseFrontmatter(content: string): { data: Record<string, string>; content: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content };
  
  const frontmatter = match[1];
  const body = match[2];
  const data: Record<string, string> = {};
  
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      // Remove quotes
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      data[key] = value;
    }
  });
  
  return { data, content: body.trim() };
}

const handler: Handler = async (event: HandlerEvent) => {
  // CORS headers for preflight
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  };

  // Handle preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  const authHeader = event.headers.authorization;
  if (!verifyToken(authHeader)) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: "Unauthorized" }),
    };
  }

  // Check GitHub configuration
  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: "GitHub integration not configured",
        details: "Please set GITHUB_PAT, GITHUB_OWNER, and GITHUB_REPO environment variables"
      }),
    };
  }

  try {
    switch (event.httpMethod) {
      case "GET":
        return await handleGetPosts(event, headers);
      case "POST":
        return await handleSavePost(event, headers);
      case "DELETE":
        return await handleDeletePost(event, headers);
      default:
        return {
          statusCode: 405,
          headers,
          body: JSON.stringify({ error: "Method not allowed" }),
        };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error instanceof Error ? error.message : "Internal error" }),
    };
  }
};

async function handleGetPosts(event: HandlerEvent, headers: Record<string, string>) {
  // Check if fresh data is requested
  const params = new URLSearchParams(event.rawQuery || "");
  const fresh = params.get("fresh") === "true";
  
  if (fresh) {
    // Fetch directly from GitHub for fresh data
    try {
      const data = await githubRequest(
        `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CONTENT_PATH}?ref=${GITHUB_BRANCH}`
      );
      
      const posts: BlogPost[] = [];
      
      for (const file of data) {
        if (!file.name.endsWith('.md')) continue;
        
        // Fetch file content
        const fileData = await githubRequest(
          `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CONTENT_PATH}/${file.name}?ref=${GITHUB_BRANCH}`
        );
        
        const content = Buffer.from(fileData.content, 'base64').toString('utf-8');
        const { data: frontmatter, content: body } = parseFrontmatter(content);
        
        posts.push({
          filename: file.name,
          slug: frontmatter.slug || file.name.replace(/\.md$/, ''),
          title: frontmatter.title || 'Untitled',
          date: frontmatter.date || '',
          category: frontmatter.category || 'General',
          description: frontmatter.description || '',
          readTime: frontmatter.readTime || '5 min read',
          content: body,
        });
      }
      
      posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ posts, source: 'github' }),
      };
    } catch (error) {
      console.error("Error fetching from GitHub, using fallback:", error);
      // Fall through to bundled data
    }
  }
  
  // Use pre-bundled posts (fast, but may be stale)
  const posts: BlogPost[] = (blogPostsFallback as any[]).map((post) => ({
    filename: `${post.date}-${post.slug}.md`,
    slug: post.slug,
    title: post.title,
    date: post.date,
    category: post.category,
    description: post.description,
    readTime: post.readTime,
    content: post.content,
  }));

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ posts, source: 'cache' }),
  };
}

async function handleSavePost(event: HandlerEvent, headers: Record<string, string>) {
  const post = JSON.parse(event.body || "{}") as BlogPost;
  
  if (!post.slug || !post.title || !post.date) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Missing required fields: slug, title, date" }),
    };
  }

  // Generate filename and content
  const filename = post.filename || `${post.date}-${post.slug}.md`;
  const filepath = `${CONTENT_PATH}/${filename}`;
  
  const fileContent = `---
title: "${post.title}"
slug: "${post.slug}"
date: "${post.date}"
category: "${post.category}"
description: "${post.description}"
readTime: "${post.readTime}"
---

${post.content}`;

  // Check if file exists (for update)
  const existingSHA = await getFileSHA(filepath);

  // Create or update file via GitHub API
  const requestBody: any = {
    message: existingSHA 
      ? `Update blog post: ${post.title}` 
      : `Create blog post: ${post.title}`,
    content: Buffer.from(fileContent).toString("base64"),
    branch: GITHUB_BRANCH,
  };

  if (existingSHA) {
    requestBody.sha = existingSHA;
  }

  await githubRequest(
    `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filepath}`,
    {
      method: "PUT",
      body: JSON.stringify(requestBody),
    }
  );

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ 
      success: true, 
      filename,
      message: "Post saved to GitHub! Your site will rebuild automatically (~1-2 min).",
      post: {
        ...post,
        filename,
      }
    }),
  };
}

async function handleDeletePost(event: HandlerEvent, headers: Record<string, string>) {
  const params = new URLSearchParams(event.rawQuery || "");
  const filename = params.get("filename");

  if (!filename) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Filename is required" }),
    };
  }

  const filepath = `${CONTENT_PATH}/${filename}`;
  
  // Get file SHA (required for deletion)
  const sha = await getFileSHA(filepath);
  
  if (!sha) {
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: "Post not found" }),
    };
  }

  // Delete file via GitHub API
  await githubRequest(
    `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filepath}`,
    {
      method: "DELETE",
      body: JSON.stringify({
        message: `Delete blog post: ${filename}`,
        sha,
        branch: GITHUB_BRANCH,
      }),
    }
  );

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ 
      success: true,
      message: "Post deleted! Your site will rebuild automatically (~1-2 min)."
    }),
  };
}

export { handler };
