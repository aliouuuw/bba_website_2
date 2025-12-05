import type { Handler, HandlerEvent } from "@netlify/functions";

// Import the pre-generated blog posts JSON (generated at build time)
import blogPosts from "./blog-posts.json";

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

// Simple token verification - in production use JWT
const verifyToken = (authHeader: string | undefined): boolean => {
  if (!authHeader) return false;
  const token = authHeader.replace("Bearer ", "");
  // For now, just check that a token exists (it was issued by login)
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
      return handleGetPosts();
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

function handleGetPosts() {
  try {
    // Transform blogPosts to match the expected format
    const posts: BlogPostMeta[] = (blogPosts as any[]).map((post) => ({
      filename: `${post.date}-${post.slug}.md`,
      slug: post.slug,
      title: post.title,
      date: post.date,
      category: post.category,
      description: post.description,
      readTime: post.readTime,
      content: post.content,
    }));

    // Sort by date (newest first)
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ posts }),
    };
  } catch (error) {
    console.error("Error loading posts:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Failed to load posts", details: String(error) }),
    };
  }
}

function handleCreatePost() {
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
