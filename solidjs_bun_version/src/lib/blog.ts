import matter from "gray-matter";
import { marked } from "marked";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  description: string;
  readTime: string;
  content: string;
  htmlContent: string;
}

// This will be populated at build time
let blogPosts: BlogPost[] = [];

export function setBlogPosts(posts: BlogPost[]) {
  blogPosts = posts;
}

export function getAllPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function parseMarkdownFile(filename: string, content: string): BlogPost {
  const { data, content: markdownContent } = matter(content);
  const htmlContent = marked.parse(markdownContent) as string;

  return {
    slug: data.slug || filename.replace(/\.md$/, ""),
    title: data.title || "Untitled",
    date: data.date || new Date().toISOString().split("T")[0],
    category: data.category || "General",
    description: data.description || "",
    readTime: data.readTime || "3 min read",
    content: markdownContent,
    htmlContent,
  };
}

