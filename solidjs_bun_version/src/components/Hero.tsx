import { createSignal, onMount } from "solid-js";
import { useAnchorNavigation } from "~/lib/navigation";

export default function Hero() {
  const [accuracy, setAccuracy] = createSignal(0);
  const [savings, setSavings] = createSignal(0);
  const { navigateToAnchor } = useAnchorNavigation();

  onMount(() => {
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
  });

  return (
    <section id="home" class="hero">
      <svg class="poly-bg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path class="poly-shape" d="M0,0 L100,0 L100,100 L0,85 Z" fill="rgba(255,255,255,0.02)" />
        <path class="poly-shape" d="M80,20 L100,20 L100,50 L70,40 Z" fill="var(--color-teal)" style={{ opacity: "0.1" }} />
        <path class="poly-shape" d="M10,60 L30,70 L20,90 L0,80 Z" fill="var(--color-lavender)" style={{ opacity: "0.1" }} />
        <line x1="0" y1="0" x2="100" y2="100" stroke="rgba(255,255,255,0.05)" stroke-width="0.2" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="rgba(255,255,255,0.05)" stroke-width="0.2" />
      </svg>

      <div class="container hero-grid">
        <div class="hero-content">
          <div class="font-mono text-gradient reveal-slide" style={{ "margin-bottom": "1.5rem", "font-size": "0.875rem", "letter-spacing": "0.05em" }}>
            // AI-POWERED INTELLIGENCE
          </div>
          <h1 class="reveal-slide">
            FROM DATA TO DECISION <br />
            <span class="text-gradient">WITH AI INTELLIGENCE</span>
          </h1>
          <p class="reveal-slide">
            Move beyond dashboards into action. Get strategic recommendations, proactive risk alerts, and automated compliance—powered by AI.
          </p>
          <div class="reveal-slide" style={{ display: "flex", gap: "1rem", "flex-wrap": "wrap" }}>
            <a href="#contact" class="btn" style={{ background: "var(--color-teal)", color: "var(--color-navy)" }} onClick={(e) => { e.preventDefault(); navigateToAnchor("#contact"); }}>
              Unlock Your Free Strategy Assessment
            </a>
            <a href="https://youtu.be/LSYX7cMhsYI?si=dqiD97aEZ2c1L6CK" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style={{ color: "white", "box-shadow": "inset 0 0 0 2px white" }}>
              Watch 3-Minute Overview
            </a>
          </div>
        </div>

        <div class="hero-visual reveal-up">
          <div class="hero-card-main">
            <div style={{ display: "grid", "grid-template-columns": "1.5fr 1fr", height: "100%" }}>
              <div style={{ padding: "2rem", "border-right": "1px solid rgba(255,255,255,0.1)", display: "flex", "flex-direction": "column", "justify-content": "center" }}>
                <div style={{ "font-family": "var(--font-mono)", "font-size": "0.75rem", color: "rgba(255,255,255,0.6)", "margin-bottom": "0.5rem" }}>
                  PREDICTIVE ACCURACY
                </div>
                <div style={{ "font-size": "4rem", "font-weight": "700", color: "white", "line-height": "1" }}>
                  {accuracy()}%
                </div>
                <div style={{ height: "4px", width: "100%", background: "rgba(255,255,255,0.1)", "margin-top": "1.5rem", "border-radius": "2px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${accuracy()}%`, background: "var(--color-teal)", "border-radius": "2px", transition: "width 0.1s" }}></div>
                </div>
                <div style={{ "margin-top": "3rem" }}>
                  <div style={{ "font-family": "var(--font-mono)", "font-size": "0.75rem", color: "rgba(255,255,255,0.6)", "margin-bottom": "0.5rem" }}>
                    AVG. PROCESS SAVINGS
                  </div>
                  <div style={{ "font-size": "2.5rem", "font-weight": "700", color: "var(--color-lavender)" }}>
                    $2.4M
                  </div>
                  <div style={{ "font-size": "0.875rem", color: "rgba(255,255,255,0.6)" }}>Projected Annual</div>
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

