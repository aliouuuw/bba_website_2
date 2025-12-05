/** @jsxImportSource preact */
import { renderToString } from "preact-render-to-string";
import { readdir, readFile, mkdir, writeFile } from "fs/promises";
import { join } from "path";
import matter from "gray-matter";
import { marked } from "marked";
import type { BlogPost } from "../src/lib/blog";

// Import components
import Home from "../src/pages/Home";
import Blog from "../src/pages/Blog";
import BlogPostPage from "../src/pages/BlogPost";
import Contact from "../src/pages/Contact";
import StrategicCommandCenter from "../src/pages/StrategicCommandCenter";
import RiskAdvisor from "../src/pages/RiskAdvisor";
import ComplianceCopilot from "../src/pages/ComplianceCopilot";
import Admin from "../src/pages/Admin";

const DIST_DIR = "./dist";
const CONTENT_DIR = "./content/blog";

// HTML template
function htmlTemplate(content: string, title: string, description: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${description}">
  <title>${title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/styles.css">
  <link rel="icon" type="image/png" href="/assets/bba_new_logo_transparent.png">
</head>
<body>
  <div id="root">${content}</div>
  <script type="module" src="/src/index.tsx"></script>
</body>
</html>`;
}

async function loadBlogPosts(): Promise<BlogPost[]> {
  const files = await readdir(CONTENT_DIR);
  const posts: BlogPost[] = [];

  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    const content = await readFile(join(CONTENT_DIR, file), "utf-8");
    const { data, content: markdownContent } = matter(content);
    const htmlContent = marked.parse(markdownContent) as string;

    posts.push({
      slug: data.slug || file.replace(/\.md$/, ""),
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString().split("T")[0],
      category: data.category || "General",
      description: data.description || "",
      readTime: data.readTime || "3 min read",
      content: markdownContent,
      htmlContent,
    });
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

async function writeHtmlFile(path: string, content: string) {
  const fullPath = join(DIST_DIR, path);
  const dir = fullPath.substring(0, fullPath.lastIndexOf("/"));
  await mkdir(dir, { recursive: true });
  await writeFile(fullPath, content);
  console.log(`  ✓ ${path}`);
}

async function prerender() {
  console.log("🔨 Prerendering pages...\n");

  // Load blog posts
  const posts = await loadBlogPosts();

  // Create dist directory
  await mkdir(DIST_DIR, { recursive: true });

  // Static pages
  const staticPages = [
    { path: "index.html", component: <Home />, title: "BBA FinTech | From Data to Decisive Action", description: "AI-Powered Intelligence for Financial Institutions" },
    { path: "contact/index.html", component: <Contact />, title: "Contact Us | BBA FinTech", description: "Get in touch with BBA FinTech" },
    { path: "strategic-command-center/index.html", component: <StrategicCommandCenter />, title: "AI Strategic Command Center | BBA FinTech", description: "Your AI co-pilot for market leadership" },
    { path: "risk-advisor/index.html", component: <RiskAdvisor />, title: "AI Risk Advisor Platform | BBA FinTech", description: "Predict, monitor, and mitigate financial risks" },
    { path: "compliance-copilot/index.html", component: <ComplianceCopilot />, title: "AI Compliance Co-Pilot | BBA FinTech", description: "Turn regulatory burden into strategic advantage" },
    { path: "admin/index.html", component: <Admin />, title: "Admin | BBA FinTech", description: "Content management dashboard" },
  ];

  for (const page of staticPages) {
    const html = renderToString(page.component);
    await writeHtmlFile(page.path, htmlTemplate(html, page.title, page.description));
  }

  // Blog index - need to pass posts as props
  // For now, we'll create a simple version
  const blogHtml = renderToString(<Blog />);
  await writeHtmlFile("blog/index.html", htmlTemplate(blogHtml, "Blog | BBA FinTech", "Insights and news from BBA FinTech"));

  // Individual blog posts
  for (const post of posts) {
    const postHtml = renderToString(<BlogPostPage />);
    await writeHtmlFile(
      `blog/${post.slug}/index.html`,
      htmlTemplate(postHtml, `${post.title} | BBA FinTech`, post.description)
    );
  }

  // Copy static assets
  console.log("\n📦 Copying static assets...");
  await Bun.write(join(DIST_DIR, "styles.css"), Bun.file("./styles.css"));
  console.log("  ✓ styles.css");
  await Bun.write(join(DIST_DIR, "admin.css"), Bun.file("./src/admin.css"));
  console.log("  ✓ admin.css");

  // Copy assets folder
  const assetsDir = "./assets";
  const assetFiles = await readdir(assetsDir);
  await mkdir(join(DIST_DIR, "assets"), { recursive: true });
  for (const file of assetFiles) {
    await Bun.write(join(DIST_DIR, "assets", file), Bun.file(join(assetsDir, file)));
    console.log(`  ✓ assets/${file}`);
  }

  console.log("\n✅ Prerendering complete!");
}

prerender().catch(console.error);
