import { Title } from "@solidjs/meta";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { getAllPosts } from "~/lib/blogData";

const gradients = [
  "linear-gradient(135deg, var(--color-navy), var(--color-teal))",
  "linear-gradient(135deg, var(--color-navy), var(--color-lavender))",
  "linear-gradient(135deg, var(--color-teal), var(--color-navy))",
];

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

export default function Blog() {
  const posts = getAllPosts();

  return (
    <>
      <Title>Blog - BBA FinTech</Title>
      <Header />
      <main>
        <section class="hero" style={{ "min-height": "60vh", "padding-bottom": "4rem" }}>
          <svg class="poly-bg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path class="poly-shape" d="M0,0 L100,0 L100,100 L0,85 Z" fill="rgba(255,255,255,0.02)" />
            <line x1="0" y1="0" x2="100" y2="100" stroke="rgba(255,255,255,0.05)" stroke-width="0.2" />
          </svg>
          <div class="container" style={{ position: "relative", "z-index": 1, "text-align": "center" }}>
            <div class="font-mono text-gradient" style={{ "margin-bottom": "1.5rem", "font-size": "0.875rem", "letter-spacing": "0.05em" }}>// LATEST UPDATES</div>
            <h1 style={{ "margin-bottom": "1.5rem" }}>INSIGHTS & <span class="text-gradient">NEWS</span></h1>
            <p style={{ "max-width": "600px", margin: "0 auto", color: "rgba(255,255,255,0.9)" }}>
              Stay ahead of the curve with our latest thinking on AI, risk management, and financial technology.
            </p>
          </div>
        </section>

        <section class="blog-section" style={{ padding: "6rem 0", background: "var(--color-off-white)" }}>
          <div class="container">
            <div class="blog-grid">
              {posts.map((post, i) => (
                <article class="blog-card" key={post.slug}>
                  <div class="blog-image" style={{ background: gradients[i % gradients.length] }}></div>
                  <div class="blog-content">
                    <div class="blog-meta font-mono">{formatDate(post.date)} • {post.category}</div>
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>
                    <a href={`/blog/${post.slug}`} class="read-more font-mono">Read Article -&gt;</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section class="cta" style={{ background: "var(--color-navy)" }}>
          <div class="container">
            <div class="cta-box">
              <h2 style={{ "margin-bottom": "2rem", color: "white" }}>SUBSCRIBE TO OUR NEWSLETTER</h2>
              <form style={{ "max-width": "400px", margin: "0 auto", display: "flex", gap: "1rem" }}>
                <input type="email" placeholder="Enter your email" style={{ flex: 1, padding: "1rem", "border-radius": "4px", border: "none" }} />
                <button class="btn" style={{ background: "var(--color-teal)", color: "var(--color-navy)" }}>Subscribe</button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

