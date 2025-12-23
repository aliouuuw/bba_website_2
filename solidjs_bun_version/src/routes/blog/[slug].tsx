import { Title } from "@solidjs/meta";
import { useParams } from "@solidjs/router";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { getPostBySlug, getAllPosts } from "~/lib/blogData";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

export default function BlogPost() {
  const params = useParams();
  const slug = () => params.slug ?? "";
  const post = () => getPostBySlug(slug());

  const displayPost = () => {
    const p = post();
    if (!p) {
      const posts = getAllPosts();
      return posts[0];
    }
    return p;
  };

  const currentPost = displayPost();

  const shareArticle = () => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: currentPost.title, url }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
  };

  if (!currentPost) {
    return (
      <>
        <Title>Post not found - BBA FinTech</Title>
        <Header />
        <main style={{ padding: "10rem 0", "text-align": "center" }}>
          <h1>Post not found</h1>
          <a href="/blog">Back to Blog</a>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Title>{currentPost.title} - BBA FinTech</Title>
      <Header />
      <main>
        <section class="hero" style={{ "min-height": "50vh", "padding-bottom": "4rem" }}>
          <svg class="poly-bg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path class="poly-shape" d="M0,0 L100,0 L100,100 L0,85 Z" fill="rgba(255,255,255,0.02)" />
          </svg>
          <div class="container" style={{ position: "relative", "z-index": 1, "text-align": "center" }}>
            <div class="font-mono text-gradient" style={{ "margin-bottom": "1.5rem", "font-size": "0.875rem", "letter-spacing": "0.05em" }}>// {currentPost.category.toUpperCase()}</div>
            <h1 style={{ "margin-bottom": "1.5rem", "font-size": "2.5rem" }}>{currentPost.title}</h1>
            <div class="font-mono" style={{ color: "rgba(255,255,255,0.6)", "font-size": "0.875rem" }}>{formatDate(currentPost.date)} • {currentPost.readTime}</div>
          </div>
        </section>

        <section class="blog-content-section" style={{ padding: "6rem 0", background: "var(--color-white)" }}>
          <div class="container" style={{ "max-width": "800px" }}>
            <div 
              class="blog-article-content"
              innerHTML={currentPost.htmlContent}
            />
            <div style={{ "margin-top": "4rem", "padding-top": "2rem", "border-top": "1px solid rgba(0,0,0,0.1)" }}>
              <a href="/blog" class="btn btn-outline">&larr; Back to Blog</a>
            </div>
          </div>
        </section>

        <section class="cta" style={{ background: "var(--color-navy)" }}>
          <div class="container">
            <div class="cta-box">
              <h2 style={{ "margin-bottom": "1.5rem", color: "white" }}>SUBSCRIBE FOR AI-FINANCE INSIGHTS</h2>
              <div style={{ display: "flex", "flex-wrap": "wrap", gap: "1rem", "justify-content": "center" }}>
                <a href="/contact?topic=subscribe" class="btn" style={{ background: "var(--color-teal)", color: "var(--color-navy)" }}>
                  Subscribe
                </a>
                <button type="button" class="btn btn-outline" style={{ color: "white", "box-shadow": "inset 0 0 0 2px white" }} onClick={shareArticle}>
                  Share this Article
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

