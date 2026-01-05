import { Title, Meta } from "@solidjs/meta";
import { useParams, A } from "@solidjs/router";
import { createResource, Show, For, createSignal, onCleanup, onMount, createMemo } from "solid-js";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { getPostBySlug, getRelatedPosts } from "~/lib/sanityApi";
import { createQuery } from "~/lib/query";

const gradients = [
  "linear-gradient(135deg, var(--color-navy), var(--color-teal))",
  "linear-gradient(135deg, var(--color-navy), var(--color-lavender))",
  "linear-gradient(135deg, var(--color-teal), var(--color-navy))",
];

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

export default function InsightPost() {
  const params = useParams();
  const slug = () => params.slug ?? "";
  const [post] = createQuery(
    () => {
      const s = slug();
      return s ? `insights:post:${s}` : "";
    },
    async (key) => {
      const s = key.split(":")[2] || "";
      if (!s) return undefined;
      return getPostBySlug(s);
    },
    { staleTime: 15 * 60 * 1000 }
  );

  const categoryKey = () => {
    const p = post();
    if (!p) return "all";
    if (p.postType === "news") return "news";
    return p.articleType ?? "article";
  };

  const categoryLabel = () => {
    const p = post();
    if (!p) return "";
    if (p.postType === "news") return "NEWS";
    if (!p.articleType) return "ARTICLES";
    return p.category.toUpperCase();
  };

  const [readingProgress, setReadingProgress] = createSignal(0);
  const [showBackToTop, setShowBackToTop] = createSignal(false);
  const [isShareCopied, setIsShareCopied] = createSignal(false);
  const [timeLeft, setTimeLeft] = createSignal("");

  const toc = createMemo(() => {
    const p = post();
    if (!p || !p.content) return [];

    const items: Array<{ id: string; text: string; level: 2 | 3 }> = [];
    const idCounts = new Map<string, number>();

    for (const block of p.content as any[]) {
      if (!block || block._type !== "block") continue;
      
      const style = block.style?.toLowerCase() ?? "";
      const isH2 = style === "h2" || style === "heading2" || style === "h1";
      const isH3 = style === "h3" || style === "heading3" || style === "h4";
      
      if (!isH2 && !isH3) continue;

      const text = (block.children ?? [])
        .map((c: any) => c?.text ?? "")
        .join(" ")
        .trim();
      if (!text) continue;

      const base = slugifyHeading(text);
      const next = (idCounts.get(base) ?? 0) + 1;
      idCounts.set(base, next);
      const id = next === 1 ? base : `${base}-${next}`;
      const level = isH3 ? 3 : 2;

      items.push({ id, text, level });
    }

    return items;
  });

  const htmlWithIds = createMemo(() => {
    const p = post();
    if (!p || !p.htmlContent) return "";
    
    let processedHtml = p.htmlContent;
    const items = toc();

    if (items.length === 0) return processedHtml;

    const counters = { h2: 0, h3: 0 };

    processedHtml = processedHtml.replace(/<(h2|h3)([^>]*)>/g, (_m, tag: "h2" | "h3", attrs: string) => {
      const level = tag === "h3" ? 3 : 2;
      const idx = tag === "h3" ? counters.h3 : counters.h2;
      const candidates = items.filter((it) => it.level === level);
      const item = candidates[idx];
      if (tag === "h3") counters.h3 += 1;
      else counters.h2 += 1;
      if (!item) return `<${tag}${attrs}>`;
      return `<${tag}${attrs}><span id="${item.id}" class="anchor-offset"></span>`;
    });
    
    return processedHtml;
  });

  onMount(() => {
    if (typeof window === "undefined") return;

    const update = () => {
      const scrollY = window.scrollY || 0;
      const docHeight = document.documentElement.scrollHeight || 0;
      const viewport = window.innerHeight || 0;
      const total = Math.max(1, docHeight - viewport);
      const pct = Math.min(100, Math.max(0, (scrollY / total) * 100));

      setReadingProgress(pct);
      setShowBackToTop(scrollY > 600);

      const p = post();
      if (p?.readTime) {
        const totalMinutes = parseInt(p.readTime);
        if (!isNaN(totalMinutes)) {
          const remainingMinutes = Math.max(1, Math.ceil(totalMinutes * (1 - pct / 100)));
          setTimeLeft(pct > 95 ? "Finish line" : `${remainingMinutes} min left`);
        }
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    onCleanup(() => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    });
  });

  const scrollToTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
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
      navigator.clipboard.writeText(url).then(() => {
        setIsShareCopied(true);
        setTimeout(() => setIsShareCopied(false), 2000);
      }).catch(() => {});
    }
  };

  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${readingProgress()}%`,
          height: "3px",
          background: "var(--color-teal)",
          "z-index": 1001,
          transition: "width 0.1s linear",
        }}
      />
      <Show when={timeLeft() && readingProgress() > 5}>
        <div style={{
          position: "fixed",
          top: "10px",
          right: "20px",
          background: "rgba(10, 22, 44, 0.8)",
          color: "white",
          padding: "4px 10px",
          "border-radius": "4px",
          "font-size": "0.7rem",
          "font-family": "var(--font-mono)",
          "z-index": 1000,
          "backdrop-filter": "blur(4px)",
          border: "1px solid rgba(255,255,255,0.1)",
          transition: "opacity 0.3s"
        }}>
          {timeLeft()}
        </div>
      </Show>
      <Title>{post()?.title || "Loading..." } - BBA FinTech</Title>
      <Meta name="description" content={post()?.description || "Read insights on AI, regulatory technology, and financial strategy from BBA FinTech."} />
      <Meta name="og:title" content={post()?.title || "BBA FinTech Insights"} />
      <Meta name="og:description" content={post()?.description || "Read insights on AI, regulatory technology, and financial strategy from BBA FinTech."} />
      <Meta name="og:image" content={post()?.image || "https://bba-website.com/og-image.png"} />
      <Meta name="og:type" content="article" />
      <Meta name="article:published_time" content={post()?.date || ""} />
      <Meta name="article:author" content="BBA FinTech" />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content={post()?.title || "BBA FinTech Insights"} />
      <Meta name="twitter:description" content={post()?.description || "Read insights on AI, regulatory technology, and financial strategy from BBA FinTech."} />
      <Meta name="twitter:image" content={post()?.image || "https://bba-website.com/og-image.png"} />
      <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : ""} />
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
            <A href="/insights" class="btn">Back to Hub</A>
          </section>
        </Show>

        <Show when={!post() && !post.loading && !post.error}>
          <section style={{ padding: "10rem 0", "text-align": "center" }}>
            <h1 class="text-gradient">404: NOT FOUND</h1>
            <p style={{ "margin-bottom": "2rem" }}>This transmission doesn't exist or has been archived.</p>
            <A href="/insights" class="btn">Back to Hub</A>
          </section>
        </Show>

        <Show when={post()}>
          <article class="fade-in" data-key={slug()}>
            <section class="hero" style={{ "min-height": "50vh", "padding-bottom": "4rem", background: "var(--color-navy)", position: "relative" }}>
              <div class="container" style={{ position: "relative", "z-index": 1 }}>
                <nav class="breadcrumbs font-mono" style={{ "margin-bottom": "2rem", "font-size": "0.75rem", color: "rgba(255,255,255,0.5)" }}>
                  <A href="/" style={{ color: "inherit", "text-decoration": "none" }}>HOME</A> / 
                  <A href="/insights" style={{ color: "inherit", "text-decoration": "none", "margin": "0 0.5rem" }}>INSIGHTS</A> / 
                  <A
                    href={`/insights?category=${categoryKey()}`}
                    style={{ color: "inherit", "text-decoration": "none", "margin": "0 0.5rem" }}
                  >
                    {categoryLabel()}
                  </A>
                  /
                  <span style={{ color: "var(--color-teal)", "margin-left": "0.5rem" }}>{post()!.title.toUpperCase()}</span>
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

            <section class="insights-content-section" style={{ padding: "6rem 0", background: "var(--color-white)", overflow: "visible" }}>
              <div class="container" style={{ display: "grid", "grid-template-columns": "minmax(0, 850px) 250px", gap: "4rem", "align-items": "start" }}>
                <div class="insight-main-column">
                  <div 
                    class="insight-article-content"
                    innerHTML={htmlWithIds()}
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
                    <A href="/insights" class="read-more font-mono">&larr; BACK TO INSIGHTS</A>
                    <button onClick={shareArticle} class="btn btn-outline" style={{ "padding": "0.5rem 1rem", "font-size": "0.75rem" }}>
                      {isShareCopied() ? "LINK COPIED" : "SHARE ARTICLE"}
                    </button>
                  </div>
                </div>

                <aside class="insight-sidebar" style={{ position: "sticky", top: "100px", display: "flex", "flex-direction": "column", gap: "2.5rem" }}>
                  <Show when={toc().length > 0}>
                    <div class="toc-container">
                      <h4 class="font-mono" style={{ "font-size": "0.75rem", "margin-bottom": "1.25rem", "letter-spacing": "0.1em", color: "var(--color-navy)" }}>TABLE OF CONTENTS</h4>
                      <nav>
                        <ul style={{ "list-style": "none", padding: 0, margin: 0, display: "flex", "flex-direction": "column", gap: "0.75rem" }}>
                          <For each={toc()}>
                            {(item) => (
                              <li style={{ "padding-left": item.level === 3 ? "0.75rem" : "0" }}>
                                <a 
                                  href={`#${item.id}`} 
                                  class="toc-link font-sans"
                                  style={{ 
                                    "text-decoration": "none", 
                                    color: "var(--color-navy)", 
                                    "font-size": item.level === 3 ? "0.85rem" : "0.9rem",
                                    opacity: 0.75,
                                    transition: "opacity 0.2s, color 0.2s"
                                  }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (typeof window === "undefined") return;
                                    document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                                    window.history.pushState(null, "", `#${item.id}`);
                                  }}
                                >
                                  {item.text}
                                </a>
                              </li>
                            )}
                          </For>
                        </ul>
                      </nav>
                    </div>
                  </Show>

                  <div class="share-actions-vertical" style={{ "padding-top": "1rem", "border-top": "1px solid rgba(0,0,0,0.05)" }}>
                     <h4 class="font-mono" style={{ "font-size": "0.75rem", "margin-bottom": "1.5rem", "letter-spacing": "0.1em", color: "var(--color-navy)" }}>SHARE</h4>
                     <div style={{ display: "flex", gap: "1rem" }}>
                        <button 
                          onClick={shareArticle}
                          title="Copy Link"
                          style={{ background: "none", border: "1px solid rgba(0,0,0,0.1)", padding: "0.5rem", cursor: "pointer", "border-radius": "4px" }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                        </button>
                        <button 
                          onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`)}
                          title="Share on LinkedIn"
                          style={{ background: "none", border: "1px solid rgba(0,0,0,0.1)", padding: "0.5rem", cursor: "pointer", "border-radius": "4px" }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        </button>
                     </div>
                  </div>
                </aside>
              </div>
            </section>
          </article>

          <Show when={relatedPosts() && relatedPosts()!.length > 0}>
            <section style={{ padding: "6rem 0", background: "var(--color-off-white)", "border-top": "1px solid rgba(0,0,0,0.05)" }}>
              <div class="container">
                <h2 style={{ "margin-bottom": "3rem", "text-align": "center" }}>RELATED <span class="text-gradient">INSIGHTS</span></h2>
                <div class="insights-grid">
                   <For each={relatedPosts()}>
                    {(rPost, i) => (
                      <article class="insight-card">
                        <A href={`/insights/${rPost.slug}`} style={{ "text-decoration": "none", color: "inherit" }}>
                          <Show 
                            when={rPost.image}
                            fallback={<div class="insight-image" style={{ background: gradients[i() % gradients.length] }}></div>}
                          >
                            <div class="insight-image" style={{ "background-image": `url(${rPost.image})`, "background-size": "cover", "background-position": "center" }}></div>
                          </Show>
                          <div class="insight-content">
                            <div style={{ display: "flex", "justify-content": "space-between", "margin-bottom": "0.5rem" }}>
                                <span class="insight-meta font-mono" style={{ margin: 0 }}>{rPost.category}</span>
                                <span class="font-mono" style={{ "font-size": "0.7rem", color: "#94A3B8" }}>{formatDate(rPost.date)}</span>
                            </div>
                            <h3 style={{ "font-size": "1.1rem", "margin-bottom": "1rem" }}>{rPost.title}</h3>
                            <p
                              style={{
                                "font-size": "0.85rem",
                                display: "-webkit-box",
                                "-webkit-line-clamp": "3",
                                "-webkit-box-orient": "vertical",
                                overflow: "hidden",
                                "margin-bottom": "1.5rem"
                              }}
                            >
                              {rPost.description}
                            </p>
                            <div style={{ display: "flex", "justify-content": "space-between", "align-items": "center" }}>
                                <span class="read-more font-mono" style={{ "font-size": "0.8rem" }}>Read More -&gt;</span>
                                <span class="font-mono" style={{ "font-size": "0.7rem", color: "#64748B" }}>{rPost.readTime}</span>
                            </div>
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
      <Show when={showBackToTop()}>
        <button
          type="button"
          aria-label="Back to top"
          onClick={scrollToTop}
          style={{
            position: "fixed",
            right: "1.25rem",
            bottom: "1.25rem",
            width: "44px",
            height: "44px",
            "border-radius": "999px",
            border: "1px solid rgba(255,255,255,0.25)",
            background: "rgba(10, 22, 44, 0.9)",
            color: "white",
            cursor: "pointer",
            "z-index": 1000,
            "box-shadow": "0 10px 25px rgba(0,0,0,0.25)",
          }}
        >
          ↑
        </button>
      </Show>
      <style>{`
        .fade-in {
          animation: contentFadeIn 0.5s ease-out forwards;
        }
        @keyframes contentFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .anchor-offset {
          display: block;
          position: relative;
          top: -120px;
          visibility: hidden;
        }
        .toc-container {
          padding: 1.25rem;
          background: var(--color-off-white);
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 8px;
        }
        .toc-link:hover {
          opacity: 1 !important;
          color: var(--color-teal) !important;
        }
        @media (max-width: 1024px) {
          .insight-sidebar {
            display: none !important;
          }
          .insights-content-section .container {
            grid-template-columns: 1fr !important;
          }
        }
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

