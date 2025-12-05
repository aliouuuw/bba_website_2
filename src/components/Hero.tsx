import { useState, useEffect } from "preact/hooks";

export default function Hero() {
  const [accuracy, setAccuracy] = useState(0);
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setAccuracy(Math.round(progress * 985) / 10);
      setSavings(Math.round(progress * 24) / 10);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <section id="home" class="hero">
      <svg class="poly-bg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path class="poly-shape" d="M0,0 L100,0 L100,100 L0,85 Z" fill="rgba(255,255,255,0.02)" />
        <path class="poly-shape" d="M80,20 L100,20 L100,50 L70,40 Z" fill="var(--color-teal)" style={{ opacity: 0.1 }} />
        <path class="poly-shape" d="M10,60 L30,70 L20,90 L0,80 Z" fill="var(--color-lavender)" style={{ opacity: 0.1 }} />
        <line x1="0" y1="0" x2="100" y2="100" stroke="rgba(255,255,255,0.05)" stroke-width="0.2" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="rgba(255,255,255,0.05)" stroke-width="0.2" />
      </svg>

      <div class="container hero-grid">
        <div class="hero-content">
          <div class="font-mono text-gradient reveal-slide" style={{ marginBottom: "1.5rem", fontSize: "0.875rem", letterSpacing: "0.05em" }}>
            // AI-POWERED INTELLIGENCE
          </div>
          <h1 class="reveal-slide">
            FROM DATA TO DECISION <br />
            <span class="text-gradient">WITH AI INTELLIGENCE</span>
          </h1>
          <p class="reveal-slide">
            Move beyond dashboards into action. Get strategic recommendations, proactive risk alerts, and automated compliance—powered by AI.
          </p>
          <div class="reveal-slide" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#solutions" class="btn" style={{ background: "var(--color-teal)", color: "var(--color-navy)" }}>
              Explore AI Solutions
            </a>
            <a href="#contact" class="btn btn-outline" style={{ color: "white", boxShadow: "inset 0 0 0 2px white" }}>
              Book a Free Demo
            </a>
          </div>
        </div>

        <div class="hero-visual reveal-up">
          <div class="hero-card-main">
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", height: "100%" }}>
              <div style={{ padding: "2rem", borderRight: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", marginBottom: "0.5rem" }}>
                  PREDICTIVE ACCURACY
                </div>
                <div style={{ fontSize: "4rem", fontWeight: "700", color: "white", lineHeight: "1" }}>
                  {accuracy}%
                </div>
                <div style={{ height: "4px", width: "100%", background: "rgba(255,255,255,0.1)", marginTop: "1.5rem", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${accuracy}%`, background: "var(--color-teal)", borderRadius: "2px", transition: "width 0.1s" }}></div>
                </div>
                <div style={{ marginTop: "3rem" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", marginBottom: "0.5rem" }}>
                    RISK MITIGATION
                  </div>
                  <div style={{ fontSize: "2.5rem", fontWeight: "700", color: "var(--color-lavender)" }}>
                    +${savings}M
                  </div>
                  <div style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)" }}>Projected Savings</div>
                </div>
              </div>
              <div style={{ position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, rgba(94, 234, 212, 0.05), transparent)" }}></div>
                <div style={{ position: "absolute", bottom: "0", left: "0", right: "0", height: "40%", background: "linear-gradient(to top, var(--color-navy), transparent)" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
