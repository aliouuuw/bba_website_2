import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";
import matter from "gray-matter";
import { marked } from "marked";

// Configure marked to allow HTML passthrough
marked.setOptions({
  gfm: true,
  breaks: false,
});

const CONTENT_DIR = "./content/blog";
const OUTPUT_FILE = "./src/lib/blogData.ts";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  description: string;
  readTime: string;
  content: string;
  htmlContent: string;
}

async function generateBlogData() {
  console.log("📝 Generating blog data from markdown files...\n");

  const files = await readdir(CONTENT_DIR);
  const posts: BlogPost[] = [];

  for (const file of files) {
    if (!file.endsWith(".md")) continue;

    const filePath = join(CONTENT_DIR, file);
    const content = await readFile(filePath, "utf-8");
    const { data, content: markdownContent } = matter(content);
    const htmlContent = await marked.parse(markdownContent);

    const post: BlogPost = {
      slug: data.slug || file.replace(/\.md$/, ""),
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString().split("T")[0],
      category: data.category || "General",
      description: data.description || "",
      readTime: data.readTime || "3 min read",
      content: markdownContent,
      htmlContent: htmlContent,
    };

    posts.push(post);
    console.log(`  ✓ ${file} -> ${post.slug}`);
  }

  // Sort by date descending
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Generate TypeScript file
  const output = `// Auto-generated from content/blog/*.md
// Run: bun run generate-blog

import type { BlogPost } from "./blog";

export const blogPosts: BlogPost[] = ${JSON.stringify(posts, null, 2)};

export function getAllPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
`;

  await writeFile(OUTPUT_FILE, output);
  console.log(`\n✅ Generated ${OUTPUT_FILE} with ${posts.length} posts`);

  // Also generate JSON for Netlify Functions
  const jsonOutput = JSON.stringify(posts, null, 2);
  await writeFile("./netlify/functions/blog-posts.json", jsonOutput);
  console.log(`✅ Generated ./netlify/functions/blog-posts.json`);
}

generateBlogData().catch(console.error);
