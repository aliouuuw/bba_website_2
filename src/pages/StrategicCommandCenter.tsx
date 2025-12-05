import Header from "../components/Header";
import Footer from "../components/Footer";

const features = [
  { icon: "01", title: "AI-Generated Strategic Plans", description: "Receive data-backed initiatives tailored to your business objectives, automatically generated from market conditions." },
  { icon: "02", title: "Climate & Macro-Risk Scenarios", description: "Test 'what-if' scenarios for climate risk, macro-economic shifts, and competitive moves." },
  { icon: "03", title: "Competitive Benchmarking", description: "Instantly measure your performance against peers on key metrics like market share and financial health." },
  { icon: "04", title: "Market Opportunity Analysis", description: "Identify untapped market segments and growth opportunities before your competitors." },
  { icon: "05", title: "Performance Tracking", description: "Monitor KPIs in real-time with automated alerts when metrics deviate from targets." },
  { icon: "06", title: "Sentiment Analysis", description: "Track brand and consumer sentiment across channels to inform strategic decisions." },
];

const audiences = [
  { title: "CEOs & CFOs", description: "For executives needing a high-level view of organizational health and strategic direction.", color: "var(--color-teal)" },
  { title: "Chief Strategy Officers", description: "For leaders requiring deep-dive capabilities and scenario modeling tools.", color: "var(--color-lavender)" },
  { title: "Group CFOs", description: "For corporate finance leaders monitoring enterprise-wide performance.", color: "var(--color-teal)" },
];

export default function StrategicCommandCenter() {
  return (
    <>
      <Header />
      <main>
        <section class="hero" style={{ minHeight: "70vh", paddingBottom: "4rem" }}>
          <svg class="poly-bg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path class="poly-shape" d="M0,0 L100,0 L100,100 L0,85 Z" fill="rgba(255,255,255,0.02)" />
          </svg>
          <div class="container hero-grid">
            <div class="hero-content">
              <div class="font-mono text-gradient" style={{ marginBottom: "1.5rem", fontSize: "0.875rem", letterSpacing: "0.05em" }}>// INTELLIGENCE SUITE</div>
              <h1>AI STRATEGIC <br /><span class="text-gradient">COMMAND CENTER</span></h1>
              <p>Your AI co-pilot for market leadership. See where you stand—and where to go next with predictive insights and automated strategy generation.</p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a href="/contact" class="btn" style={{ background: "var(--color-teal)", color: "var(--color-navy)" }}>Contact Sales</a>
                <a href="/contact" class="btn btn-outline" style={{ color: "white", boxShadow: "inset 0 0 0 2px white" }}>Request Demo</a>
              </div>
            </div>
            <div class="hero-visual">
              <div class="hero-card-main" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="100%" height="100%" viewBox="0 0 400 400">
                  <defs><filter id="glow"><feGaussianBlur stdDeviation="3" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
                  <line x1="200" y1="200" x2="100" y2="100" stroke="var(--color-teal)" stroke-width="2" opacity="0.3" />
                  <line x1="200" y1="200" x2="300" y2="100" stroke="var(--color-teal)" stroke-width="2" opacity="0.3" />
                  <line x1="200" y1="200" x2="320" y2="250" stroke="var(--color-teal)" stroke-width="2" opacity="0.3" />
                  <line x1="200" y1="200" x2="200" y2="320" stroke="var(--color-teal)" stroke-width="2" opacity="0.3" />
                  <line x1="200" y1="200" x2="80" y2="250" stroke="var(--color-teal)" stroke-width="2" opacity="0.3" />
                  <circle cx="200" cy="200" r="20" fill="var(--color-lavender)" filter="url(#glow)" />
                  <circle cx="100" cy="100" r="12" fill="var(--color-teal)" opacity="0.8" />
                  <circle cx="300" cy="100" r="12" fill="var(--color-teal)" opacity="0.8" />
                  <circle cx="320" cy="250" r="12" fill="var(--color-teal)" opacity="0.8" />
                  <circle cx="200" cy="320" r="12" fill="var(--color-teal)" opacity="0.8" />
                  <circle cx="80" cy="250" r="12" fill="var(--color-teal)" opacity="0.8" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        <section class="problem-section" style={{ padding: "6rem 0", background: "var(--color-white)" }}>
          <div class="container">
            <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 4rem auto" }}>
              <h2 style={{ marginBottom: "1.5rem", color: "var(--color-navy)" }}>THE CHALLENGE</h2>
              <p style={{ fontSize: "1.125rem" }}>Are you making strategic decisions based on outdated reports, intuition, or inefficient data processes? Traditional dashboards show you what happened, not what to do next.</p>
            </div>
            <div class="pain-grid">
              <div class="pain-item"><h4>Fragmented Strategy</h4><p>Strategic planning is often disconnected from real-time market data.</p></div>
              <div class="pain-item"><h4>Reactive vs. Proactive</h4><p>Most tools only alert you after a problem has occurred.</p></div>
              <div class="pain-item"><h4>Manual Analysis</h4><p>Hours spent manually compiling reports instead of analyzing implications.</p></div>
            </div>
          </div>
        </section>

        <section class="solution-details" style={{ padding: "6rem 0", background: "var(--color-off-white)" }}>
          <div class="container">
            <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 4rem auto" }}>
              <h2 style={{ marginBottom: "1.5rem", color: "var(--color-navy)" }}>OUR SOLUTION</h2>
              <p style={{ fontSize: "1.125rem" }}>A real-time, AI-driven view of your competitive landscape—with prioritized action plans and clear next steps.</p>
            </div>
            <div class="feature-grid">
              {features.slice(0, 3).map((f, i) => (
                <div class="feature-card" key={i}><div class="icon">{f.icon}</div><h3>{f.title}</h3><p>{f.description}</p></div>
              ))}
            </div>
            <div class="feature-grid" style={{ marginTop: "2rem" }}>
              {features.slice(3).map((f, i) => (
                <div class="feature-card" key={i}><div class="icon">{f.icon}</div><h3>{f.title}</h3><p>{f.description}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section class="target-audience" style={{ padding: "6rem 0", background: "var(--color-navy)", color: "white" }}>
          <div class="container">
            <div style={{ textAlign: "center", marginBottom: "4rem" }}><h2 style={{ color: "white" }}>WHO IT'S FOR</h2></div>
            <div style={{ display: "flex", justifyContent: "center", gap: "4rem", flexWrap: "wrap" }}>
              {audiences.map((a, i) => (
                <div key={i} style={{ textAlign: "center", maxWidth: "300px" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "1rem", color: a.color }}>{a.title}</div>
                  <p style={{ color: "rgba(255,255,255,0.8)" }}>{a.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section class="cta" style={{ background: "var(--color-off-white)" }}>
          <div class="container">
            <div class="cta-box">
              <h2 style={{ marginBottom: "2rem" }}>READY TO TURN DATA INTO DECISIVE ADVANTAGE?</h2>
              <a href="/contact" class="btn" style={{ background: "var(--color-navy)", color: "white" }}>Contact Sales</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
