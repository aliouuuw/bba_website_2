import Header from "../components/Header";
import Footer from "../components/Footer";
import { getPostBySlug, getAllPosts } from "../lib/blogData";

interface BlogPostProps {
  slug?: string;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

export default function BlogPost({ slug }: BlogPostProps) {
  // Get slug from URL if not passed as prop
  const postSlug = slug || (typeof window !== "undefined" ? window.location.pathname.split("/").pop() : "");
  const post = getPostBySlug(postSlug || "");

  if (!post) {
    // Show first post as fallback or 404
    const posts = getAllPosts();
    if (posts.length === 0) {
      return (
        <>
          <Header />
          <main style={{ padding: "10rem 0", textAlign: "center" }}>
            <h1>Post not found</h1>
            <a href="/blog">Back to Blog</a>
          </main>
          <Footer />
        </>
      );
    }
  }

  const displayPost = post || getAllPosts()[0];

  return (
    <>
      <Header />
      <main>
        <section class="hero" style={{ minHeight: "50vh", paddingBottom: "4rem" }}>
          <svg class="poly-bg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path class="poly-shape" d="M0,0 L100,0 L100,100 L0,85 Z" fill="rgba(255,255,255,0.02)" />
          </svg>
          <div class="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <div class="font-mono text-gradient" style={{ marginBottom: "1.5rem", fontSize: "0.875rem", letterSpacing: "0.05em" }}>// {displayPost.category.toUpperCase()}</div>
            <h1 style={{ marginBottom: "1.5rem", fontSize: "2.5rem" }}>{displayPost.title}</h1>
            <div class="font-mono" style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}>{formatDate(displayPost.date)} • {displayPost.readTime}</div>
          </div>
        </section>

        <section class="blog-content-section" style={{ padding: "6rem 0", background: "var(--color-white)" }}>
          <div class="container" style={{ maxWidth: "800px" }}>
            <div 
              class="blog-article-content"
              dangerouslySetInnerHTML={{ __html: displayPost.htmlContent }}
            />
            <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid rgba(0,0,0,0.1)" }}>
              <a href="/blog" class="btn btn-outline">&larr; Back to Blog</a>
            </div>
          </div>
        </section>

        <section class="cta" style={{ background: "var(--color-navy)" }}>
          <div class="container">
            <div class="cta-box">
              <h2 style={{ marginBottom: "2rem", color: "white" }}>READY TO UPGRADE YOUR RISK MANAGEMENT?</h2>
              <a href="/risk-advisor" class="btn" style={{ background: "var(--color-teal)", color: "var(--color-navy)" }}>Explore Risk Advisor</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
