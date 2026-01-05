import { Title } from "@solidjs/meta";
import { A, useSearchParams } from "@solidjs/router";
import { createSignal, For, Show, createMemo } from "solid-js";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { getAllPosts } from "~/lib/sanityApi";
import { createQuery } from "~/lib/query";
import type { BlogPost } from "~/lib/sanityTypes";

const gradients = [
  "linear-gradient(135deg, var(--color-navy), var(--color-teal))",
  "linear-gradient(135deg, var(--color-navy), var(--color-lavender))",
  "linear-gradient(135deg, var(--color-teal), var(--color-navy))",
];

const categories = [
  { title: "All", value: "all" },
  { title: "News", value: "news" },
  { title: "Articles", value: "article" },
  { title: "Perspectives", value: "perspective" },
  { title: "Case Studies", value: "case_study" },
  { title: "Reports", value: "report" },
  { title: "Newsletters", value: "newsletter" },
];

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

function filterPosts(allPosts: BlogPost[], category: string, search: string): BlogPost[] {
  return allPosts.filter((post) => {
    const matchesCategory =
      category === "all" ||
      (category === "news" && post.postType === "news") ||
      (category === "article" && post.postType === "article") ||
      (post.postType === "article" && post.articleType === category);
    
    const searchLower = search.toLowerCase();
    const matchesSearch = !search || 
      post.title.toLowerCase().includes(searchLower) ||
      post.description.toLowerCase().includes(searchLower);
    
    return matchesCategory && matchesSearch;
  });
}

export default function Insights() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialCategory = (searchParams.category as string) || "all";
  const initialSearch = (searchParams.q as string) || "";
  
  const [activeCategory, setActiveCategory] = createSignal(initialCategory);
  const [searchQuery, setSearchQuery] = createSignal(initialSearch);
  
  // Debounced search query for performance
  const [debouncedSearch, setDebouncedSearch] = createSignal(initialSearch);
  let debounceTimer: ReturnType<typeof setTimeout>;

  const [allPosts] = createQuery("insights:all-posts", async (_key) => {
    try {
      return await getAllPosts();
    } catch (err: any) {
      console.error("[Sanity Error] Failed to fetch insights:", {
        message: err.message,
        isCORS: err.message?.includes("CORS") || err.status === 403,
      });
      throw err;
    }
  }, {
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSearchParams({ category: category === "all" ? undefined : category, q: searchQuery() || undefined }, { replace: true });
  };
  
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    
    // Update URL immediately for better responsiveness
    setSearchParams({ category: activeCategory() === "all" ? undefined : activeCategory(), q: query || undefined }, { replace: true });
    
    // Debounce the actual filter computation
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      setDebouncedSearch(query);
    }, 250);
  };
  
  const filteredPosts = createMemo(() => {
    const posts = allPosts();
    if (!posts) return [];
    return filterPosts(posts, activeCategory(), debouncedSearch());
  });

  const sharePage = () => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: "BBA Insights - AI Finance Insights", url }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
  };

  return (
    <>
      <Title>Insights & News - BBA FinTech</Title>
      <Header />
      <main>
        <section class="hero" style={{ "min-height": "40vh", "padding-bottom": "2rem" }}>
          <svg class="poly-bg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path class="poly-shape" d="M0,0 L100,0 L100,100 L0,85 Z" fill="rgba(255,255,255,0.02)" />
          </svg>
          <div class="container" style={{ position: "relative", "z-index": 1, "text-align": "center" }}>
            <div class="font-mono text-gradient" style={{ "margin-bottom": "1.5rem", "font-size": "0.875rem", "letter-spacing": "0.05em" }}>// KNOWLEDGE HUB</div>
            <h1 style={{ "margin-bottom": "1.5rem" }}>INSIGHTS & <span class="text-gradient">NEWS</span></h1>
            <p style={{ "max-width": "600px", margin: "0 auto", color: "rgba(255,255,255,0.9)" }}>
              Expert analysis on the intersection of AI, regulatory technology, and financial strategy.
            </p>
          </div>
        </section>

        <section class="insights-filters" style={{ padding: "2rem 0", background: "var(--color-white)", "border-bottom": "1px solid rgba(0,0,0,0.05)" }}>
          <div class="container">
            <div style={{ display: "flex", "flex-wrap": "wrap", "justify-content": "space-between", "align-items": "center", gap: "2rem" }}>
              <div class="category-tabs" style={{ display: "flex", "gap": "1rem", "overflow-x": "auto", "padding-bottom": "0.5rem" }}>
                <For each={categories}>
                  {(cat) => (
                    <button
                      onClick={() => handleCategoryChange(cat.value)}
                      class={`font-mono ${activeCategory() === cat.value ? 'active' : ''}`}
                      style={{
                        padding: "0.5rem 1.5rem",
                        background: activeCategory() === cat.value ? "var(--color-navy)" : "transparent",
                        color: activeCategory() === cat.value ? "white" : "var(--color-navy)",
                        border: "1px solid var(--color-navy)",
                        cursor: "pointer",
                        "text-transform": "uppercase",
                        "font-size": "0.75rem",
                        "white-space": "nowrap",
                        transition: "all 0.2s"
                      }}
                    >
                      {cat.title}
                    </button>
                  )}
                </For>
              </div>
              <div class="search-box" style={{ position: "relative", width: "100%", "max-width": "300px" }}>
                <input
                  type="text"
                  placeholder="Search articles..."
                  onInput={(e) => handleSearchChange(e.currentTarget.value)}
                  value={searchQuery()}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    "border-radius": "4px",
                    border: "1px solid #E2E8F0",
                    "font-family": "var(--font-sans)"
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <section class="insights-section" style={{ padding: "4rem 0", background: "var(--color-off-white)", "min-height": "60vh" }}>
          <div class="container">
            <Show when={allPosts.loading}>
              <div class="insights-grid">
                <For each={[1, 2, 3, 4, 5, 6]}>
                  {() => (
                    <div class="insight-card skeleton" style={{ height: "400px", background: "rgba(0,0,0,0.05)", "border-radius": "8px", position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)", animation: "shimmer 1.5s infinite" }}></div>
                    </div>
                  )}
                </For>
              </div>
            </Show>

            <Show when={allPosts.error}>
              <div style={{ "text-align": "center", padding: "4rem 0", color: "red" }}>
                <p>Error loading insights. Please try again later.</p>
              </div>
            </Show>

            <Show when={allPosts() && filteredPosts().length === 0}>
              <div style={{ "text-align": "center", padding: "6rem 0" }}>
                <h3 style={{ "margin-bottom": "1rem" }}>No results found</h3>
                <p>Try adjusting your search or filters to find what you're looking for.</p>
                <button 
                  onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}
                  class="btn" style={{ "margin-top": "2rem" }}
                >
                  Clear All Filters
                </button>
              </div>
            </Show>

            <Show when={allPosts() && filteredPosts().length > 0}>
              <div class="insights-grid">
                <For each={filteredPosts()}>
                  {(post, i) => (
                    <article class="insight-card" data-key={post.slug}>
                      <A href={`/insights/${post.slug}`} style={{ "text-decoration": "none", color: "inherit" }}>
                        <Show
                          when={post.image}
                          fallback={<div class="insight-image" style={{ background: gradients[i() % gradients.length] }}></div>}
                        >
                          <div 
                            class="insight-image" 
                            style={{ 
                              "background-image": `url(${post.image})`, 
                              "background-size": "cover", 
                              "background-position": "center",
                              transition: "transform 0.5s ease"
                            }} 
                          ></div>
                        </Show>
                        <div class="insight-content">
                          <div style={{ display: "flex", "justify-content": "space-between", "margin-bottom": "1rem" }}>
                            <span class="insight-meta font-mono">{post.category}</span>
                            <span class="font-mono" style={{ "font-size": "0.7rem", color: "#94A3B8" }}>{formatDate(post.date)}</span>
                          </div>
                          <h3>{post.title}</h3>
                          <p style={{ 
                            display: "-webkit-box", 
                            "-webkit-line-clamp": "3", 
                            "-webkit-box-orient": "vertical", 
                            overflow: "hidden" 
                          }}>
                            {post.description}
                          </p>
                          <div style={{ display: "flex", "justify-content": "space-between", "align-items": "center", "margin-top": "auto" }}>
                            <span class="read-more font-mono">Read Article -&gt;</span>
                            <span class="font-mono" style={{ "font-size": "0.75rem", color: "#64748B" }}>{post.readTime}</span>
                          </div>
                        </div>
                      </A>
                    </article>
                  )}
                </For>
              </div>
            </Show>
          </div>
        </section>

        <section class="cta" style={{ background: "var(--color-navy)" }}>
          <div class="container">
            <div class="cta-box">
              <h2 style={{ "margin-bottom": "1.5rem", color: "white" }}>STAY INFORMED</h2>
              <p style={{ color: "rgba(255,255,255,0.7)", "margin-bottom": "2.5rem" }}>
                Join our newsletter to receive the latest industry insights and BBA updates directly in your inbox.
              </p>
              <div style={{ display: "flex", "flex-wrap": "wrap", gap: "1rem", "justify-content": "center" }}>
                <A href="/contact?topic=subscribe" class="btn" style={{ background: "var(--color-teal)", color: "var(--color-navy)" }}>
                  Subscribe Now
                </A>
                <button type="button" class="btn btn-outline" style={{ color: "white", "box-shadow": "inset 0 0 0 2px white" }} onClick={sharePage}>
                  Share Hub
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .insight-card:hover .insight-image {
          transform: scale(1.05);
        }
        .category-tabs::-webkit-scrollbar {
          display: none;
        }
        .category-tabs {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}

