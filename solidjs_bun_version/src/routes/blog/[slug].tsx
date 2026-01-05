import { Title } from "@solidjs/meta";
import { useParams, A } from "@solidjs/router";
import { createResource, Show, For } from "solid-js";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { getPostBySlug, getRelatedPosts } from "~/lib/sanityApi";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

export default function BlogPost() {
  const params = useParams();
  const slug = () => params.slug ?? "";
  const [post] = createResource(slug, getPostBySlug);
  
  const [relatedPosts] = createResource(
    () => {
      const p = post();
      if (!p) return null;
      return {
        currentSlug: p.slug,
        postType: p.postType,
        articleType: p.articleType ?? null,
      };
    },
    async (args) => {
      if (!args) return [];
      return getRelatedPosts(args);
    }
  );

  const shareArticle = () => {
    if (typeof window === "undefined") return;
    const currentPost = post();
    if (!currentPost) return;
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: currentPost.title, url }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
  };

  return (
    <>
      <Title>{post()?.title || "Loading..." } - BBA FinTech</Title>
      <Header />
      <main>
        <Show when={post.loading}>
          <div style={{ padding: "10rem 0", "text-align": "center", background: "var(--color-navy)", color: "white" }}>
            <div class="loader" style={{ margin: "0 auto 2rem" }}></div>
            <p class="font-mono">Decrypting content...</p>
          </div>
        </Show>

        <Show when={post.error}>
          <section style={{ padding: "10rem 0", "text-align": "center" }}>
            <h1 class="text-gradient">ACCESS ERROR</h1>
            <p style={{ "margin-bottom": "2rem" }}>We couldn't retrieve this intelligence report.</p>
            <A href="/blog" class="btn">Back to Hub</A>
          </section>
        </Show>

        <Show when={!post() && !post.loading && !post.error}>
          <section style={{ padding: "10rem 0", "text-align": "center" }}>
            <h1 class="text-gradient">404: NOT FOUND</h1>
            <p style={{ "margin-bottom": "2rem" }}>This transmission doesn't exist or has been archived.</p>
            <A href="/blog" class="btn">Back to Hub</A>
          </section>
        </Show>

        <Show when={post()}>
          <article>
            <section class="hero" style={{ "min-height": "50vh", "padding-bottom": "4rem", background: "var(--color-navy)", position: "relative" }}>
              <div class="container" style={{ position: "relative", "z-index": 1 }}>
                <nav class="breadcrumbs font-mono" style={{ "margin-bottom": "2rem", "font-size": "0.75rem", color: "rgba(255,255,255,0.5)" }}>
                  <A href="/" style={{ color: "inherit", "text-decoration": "none" }}>HOME</A> / 
                  <A href="/blog" style={{ color: "inherit", "text-decoration": "none", "margin": "0 0.5rem" }}>INSIGHTS</A> / 
                  <span style={{ color: "var(--color-teal)" }}>{post()!.title.toUpperCase()}</span>
                </nav>
                
                <div class="font-mono text-gradient" style={{ "margin-bottom": "1.5rem", "font-size": "0.875rem", "letter-spacing": "0.05em" }}>
                  // {post()!.category.toUpperCase()}
                </div>
                <h1 style={{ "margin-bottom": "1.5rem", "font-size": "clamp(2rem, 5vw, 3.5rem)", "max-width": "900px", color: "white" }}>
                  {post()!.title}
                </h1>
                <div class="font-mono" style={{ color: "rgba(255,255,255,0.6)", "font-size": "0.875rem", display: "flex", "gap": "1.5rem", "justify-content": "center" }}>
                  <span>{formatDate(post()!.date)}</span>
                  <span>•</span>
                  <span>{post()!.readTime}</span>
                </div>
              </div>
            </section>

            <section class="blog-content-section" style={{ padding: "6rem 0", background: "var(--color-white)" }}>
              <div class="container" style={{ "max-width": "850px" }}>
                <div 
                  class="blog-article-content"
                  innerHTML={post()!.htmlContent}
                />
                
                <Show when={post()!.file}>
                  <div style={{ 
                    "margin-top": "4rem", 
                    padding: "2rem", 
                    background: "var(--color-off-white)", 
                    "border-left": "4px solid var(--color-teal)",
                    display: "flex",
                    "align-items": "center",
                    "justify-content": "space-between",
                    "flex-wrap": "wrap",
                    gap: "1.5rem"
                  }}>
                    <div>
                      <h4 style={{ "margin-bottom": "0.5rem" }}>Technical Documentation</h4>
                      <p style={{ "font-size": "0.9rem", margin: 0 }}>Download the full report for in-depth analysis.</p>
                    </div>
                    <a href={post()!.file} target="_blank" rel="noopener noreferrer" class="btn">
                      Download PDF
                    </a>
                  </div>
                </Show>

                <div style={{ "margin-top": "4rem", "padding-top": "2rem", "border-top": "1px solid rgba(0,0,0,0.1)", display: "flex", "justify-content": "space-between", "align-items": "center" }}>
                  <A href="/blog" class="read-more font-mono">&larr; BACK TO INSIGHTS</A>
                  <button onClick={shareArticle} class="btn btn-outline" style={{ "padding": "0.5rem 1rem", "font-size": "0.75rem" }}>SHARE ARTICLE</button>
                </div>
              </div>
            </section>
          </article>

          <Show when={relatedPosts() && relatedPosts()!.length > 0}>
            <section style={{ padding: "6rem 0", background: "var(--color-off-white)", "border-top": "1px solid rgba(0,0,0,0.05)" }}>
              <div class="container">
                <h2 style={{ "margin-bottom": "3rem", "text-align": "center" }}>RELATED <span class="text-gradient">INSIGHTS</span></h2>
                <div class="blog-grid">
                  <For each={relatedPosts()}>
                    {(rPost) => (
                      <article class="blog-card">
                        <A href={`/blog/${rPost.slug}`} style={{ "text-decoration": "none", color: "inherit" }}>
                          <Show when={rPost.image}>
                            <div class="blog-image" style={{ "background-image": `url(${rPost.image})`, "background-size": "cover", "background-position": "center" }}></div>
                          </Show>
                          <div class="blog-content">
                            <div class="blog-meta font-mono">{rPost.category}</div>
                            <h3 style={{ "font-size": "1.1rem" }}>{rPost.title}</h3>
                            <p style={{ "font-size": "0.85rem", "-webkit-line-clamp": "2" }}>{rPost.description}</p>
                            <span class="read-more font-mono" style={{ "font-size": "0.8rem" }}>Read More -&gt;</span>
                          </div>
                        </A>
                      </article>
                    )}
                  </For>
                </div>
              </div>
            </section>
          </Show>
        </Show>

        <section class="cta" style={{ background: "var(--color-navy)" }}>
          <div class="container">
            <div class="cta-box">
              <h2 style={{ "margin-bottom": "1.5rem", color: "white" }}>SUBSCRIBE FOR AI-FINANCE INSIGHTS</h2>
              <div style={{ display: "flex", "flex-wrap": "wrap", gap: "1rem", "justify-content": "center" }}>
                <A href="/contact?topic=subscribe" class="btn" style={{ background: "var(--color-teal)", color: "var(--color-navy)" }}>
                  Subscribe
                </A>
                <button type="button" class="btn btn-outline" style={{ color: "white", "box-shadow": "inset 0 0 0 2px white" }} onClick={shareArticle}>
                  Share this Article
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <style>{`
        .loader {
          border: 2px solid rgba(255,255,255,0.1);
          border-top: 2px solid var(--color-teal);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}

