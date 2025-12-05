import Header from "../components/Header";
import Footer from "../components/Footer";

const blogPosts = [
  { date: "Dec 04, 2025", category: "Strategy", title: "The Future of AI in Banking Risk Management", description: "How predictive analytics is transforming how financial institutions approach risk mitigation and compliance.", gradient: "linear-gradient(135deg, var(--color-navy), var(--color-teal))" },
  { date: "Nov 28, 2025", category: "Compliance", title: "Navigating the New Regulatory Landscape", description: "A deep dive into the latest regulatory changes and how automated reporting can ensure 100% compliance.", gradient: "linear-gradient(135deg, var(--color-navy), var(--color-lavender))" },
  { date: "Nov 15, 2025", category: "Technology", title: "From Data to Decision: The BBA Approach", description: "Why traditional dashboards are failing modern banks and how actionable intelligence is the answer.", gradient: "linear-gradient(135deg, var(--color-teal), var(--color-navy))" },
];

export default function Blog() {
  return (
    <>
      <Header />
      <main>
        <section class="hero" style={{ minHeight: "60vh", paddingBottom: "4rem" }}>
          <svg class="poly-bg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path class="poly-shape" d="M0,0 L100,0 L100,100 L0,85 Z" fill="rgba(255,255,255,0.02)" />
            <line x1="0" y1="0" x2="100" y2="100" stroke="rgba(255,255,255,0.05)" stroke-width="0.2" />
          </svg>
          <div class="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <div class="font-mono text-gradient" style={{ marginBottom: "1.5rem", fontSize: "0.875rem", letterSpacing: "0.05em" }}>// LATEST UPDATES</div>
            <h1 style={{ marginBottom: "1.5rem" }}>INSIGHTS & <span class="text-gradient">NEWS</span></h1>
            <p style={{ maxWidth: "600px", margin: "0 auto", color: "rgba(255,255,255,0.9)" }}>
              Stay ahead of the curve with our latest thinking on AI, risk management, and financial technology.
            </p>
          </div>
        </section>

        <section class="blog-section" style={{ padding: "6rem 0", background: "var(--color-off-white)" }}>
          <div class="container">
            <div class="blog-grid">
              {blogPosts.map((post, i) => (
                <article class="blog-card" key={i}>
                  <div class="blog-image" style={{ background: post.gradient }}></div>
                  <div class="blog-content">
                    <div class="blog-meta font-mono">{post.date} • {post.category}</div>
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>
                    <a href="/blog-post" class="read-more font-mono">Read Article -&gt;</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section class="cta" style={{ background: "var(--color-navy)" }}>
          <div class="container">
            <div class="cta-box">
              <h2 style={{ marginBottom: "2rem", color: "white" }}>SUBSCRIBE TO OUR NEWSLETTER</h2>
              <form style={{ maxWidth: "400px", margin: "0 auto", display: "flex", gap: "1rem" }}>
                <input type="email" placeholder="Enter your email" style={{ flex: 1, padding: "1rem", borderRadius: "4px", border: "none" }} />
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
