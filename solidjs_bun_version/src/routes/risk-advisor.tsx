import { Title } from "@solidjs/meta";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import Testimonials from "~/components/Testimonials";

const features = [
  { icon: "01", title: "Early Warning System", description: "AI-driven alerts that predict potential risks before they materialize, giving you time to act." },
  { icon: "02", title: "Real-Time Liquidity Monitoring", description: "Continuous monitoring of liquidity positions with automated regulatory ratio calculations." },
  { icon: "03", title: "Automated Mitigation Playbooks", description: "Pre-defined response protocols that kick in automatically when risk thresholds are breached." },
];

const audiences = [
  { title: "Chief Risk Officers", description: "For CROs requiring enterprise-wide risk visibility and proactive management tools.", color: "var(--color-teal)" },
  { title: "Risk Directors", description: "For risk leaders needing real-time monitoring and automated reporting.", color: "var(--color-lavender)" },
  { title: "Treasury Teams", description: "For treasury professionals managing liquidity and interest rate exposure.", color: "var(--color-teal)" },
];

export default function RiskAdvisor() {
  return (
    <>
      <Title>AI Risk Advisor Platform - BBA FinTech</Title>
      <Header />
      <main>
        <section class="hero" style={{ "min-height": "70vh", "padding-bottom": "4rem" }}>
          <svg class="poly-bg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path class="poly-shape" d="M0,0 L100,0 L100,100 L0,85 Z" fill="rgba(255,255,255,0.02)" />
          </svg>
          <div class="container hero-grid">
            <div class="hero-content">
              <div class="font-mono text-gradient" style={{ "margin-bottom": "1.5rem", "font-size": "0.875rem", "letter-spacing": "0.05em" }}>// INTELLIGENCE SUITE</div>
              <h1>AI RISK <br /><span class="text-gradient">ADVISOR PLATFORM</span></h1>
              <p>Predict, monitor, and mitigate financial and non-financial risks before they impact your business.</p>
              <div style={{ display: "flex", gap: "1rem", "flex-wrap": "wrap" }}>
                <a href="/contact" class="btn" style={{ background: "var(--color-teal)", color: "var(--color-navy)" }}>Request Your 72-Hour Portfolio Diagnostic</a>
                <a href="/Sample Portfolio Risk & Compliance Health Audit.pdf" target="_blank" class="btn btn-outline" style={{ color: "white", "box-shadow": "inset 0 0 0 2px white" }}>View a Sample Risk Audit Report</a>
              </div>
            </div>
            <div class="hero-visual">
              <div class="hero-card-main" style={{ display: "flex", "align-items": "center", "justify-content": "center" }}>
                <svg width="100%" height="100%" viewBox="0 0 400 400">
                  <defs>
                    <linearGradient id="barGrad1" x1="0%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stop-color="var(--color-teal)" stop-opacity="0.8" /><stop offset="100%" stop-color="var(--color-teal)" stop-opacity="0.3" /></linearGradient>
                    <linearGradient id="barGrad2" x1="0%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stop-color="#FCD34D" stop-opacity="0.8" /><stop offset="100%" stop-color="#FCD34D" stop-opacity="0.3" /></linearGradient>
                    <linearGradient id="barGrad3" x1="0%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stop-color="#F43F5E" stop-opacity="0.8" /><stop offset="100%" stop-color="#F43F5E" stop-opacity="0.3" /></linearGradient>
                  </defs>
                  <line x1="60" y1="80" x2="340" y2="80" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
                  <line x1="60" y1="150" x2="340" y2="150" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
                  <line x1="60" y1="220" x2="340" y2="220" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
                  <line x1="60" y1="290" x2="340" y2="290" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
                  <rect x="80" y="150" width="40" height="140" fill="url(#barGrad1)" rx="2" />
                  <rect x="140" y="110" width="40" height="180" fill="url(#barGrad1)" rx="2" />
                  <rect x="200" y="190" width="40" height="100" fill="url(#barGrad2)" rx="2" />
                  <rect x="260" y="230" width="40" height="60" fill="url(#barGrad3)" rx="2" />
                  <circle cx="280" cy="210" r="8" fill="#F43F5E" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        <section class="problem-section" style={{ padding: "6rem 0", background: "var(--color-white)" }}>
          <div class="container">
            <div style={{ "text-align": "center", "max-width": "800px", margin: "0 auto 4rem auto" }}>
              <h2 style={{ "margin-bottom": "1.5rem", color: "var(--color-navy)" }}>THE CHALLENGE</h2>
              <p style={{ "font-size": "1.125rem" }}>Is your risk management reactive, manual, and struggling to keep pace with evolving threats?</p>
            </div>
            <div class="pain-grid">
              <div class="pain-item"><h4>Reactive Risk Detection</h4><p>Most systems alert you after problems occur, not before.</p></div>
              <div class="pain-item"><h4>Siloed Risk Data</h4><p>Credit, market, operational, and liquidity risks managed separately.</p></div>
              <div class="pain-item"><h4>Manual Stress Testing</h4><p>Time-consuming manual processes that can't keep up with market changes.</p></div>
            </div>
          </div>
        </section>

        <section class="solution-details" style={{ padding: "6rem 0", background: "var(--color-off-white)" }}>
          <div class="container">
            <div style={{ "text-align": "center", "max-width": "800px", margin: "0 auto 4rem auto" }}>
              <h2 style={{ "margin-bottom": "1.5rem", color: "var(--color-navy)" }}>OUR SOLUTION</h2>
              <p style={{ "font-size": "1.125rem" }}>Proactive risk management with AI-powered early warning systems and automated mitigation playbooks.</p>
            </div>
            <div class="feature-grid">
              {features.map((f, i) => (
                <div class="feature-card"><div class="icon">{f.icon}</div><h3>{f.title}</h3><p>{f.description}</p></div>
              ))}
            </div>
            <div style={{ "margin-top": "4rem", background: "var(--color-navy)", padding: "2rem", color: "white", "border-radius": "8px" }}>
              <h3 style={{ color: "var(--color-teal)", "margin-bottom": "1rem" }}>COMPREHENSIVE RISK COVERAGE</h3>
              <p style={{ color: "rgba(255,255,255,0.9)" }}>Our platform covers credit risk, market risk, operational risk, structural interest rate risk, liquidity risk, and expected/unexpected credit loss—all in one unified view.</p>
            </div>
          </div>
        </section>

        <Testimonials ids={[3]} />

        <section class="target-audience" style={{ padding: "6rem 0", background: "var(--color-navy)", color: "white" }}>
          <div class="container">
            <div style={{ "text-align": "center", "margin-bottom": "4rem" }}><h2 style={{ color: "white" }}>WHO IT'S FOR</h2></div>
            <div style={{ display: "flex", "justify-content": "center", gap: "4rem", "flex-wrap": "wrap" }}>
              {audiences.map((a, i) => (
                <div style={{ "text-align": "center", "max-width": "300px" }}>
                  <div style={{ "font-size": "2rem", "margin-bottom": "1rem", color: a.color }}>{a.title}</div>
                  <p style={{ color: "rgba(255,255,255,0.8)" }}>{a.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section class="cta" style={{ background: "var(--color-off-white)" }}>
          <div class="container">
            <div class="cta-box">
              <h2 style={{ "margin-bottom": "2rem" }}>READY TO TURN DATA INTO DECISIVE ADVANTAGE?</h2>
              <div style={{ display: "flex", gap: "1rem", "flex-wrap": "wrap", "justify-content": "center" }}>
                <a href="/contact" class="btn" style={{ background: "var(--color-navy)", color: "white" }}>Request Your 72-Hour Portfolio Diagnostic</a>
                <a href="/Sample Portfolio Risk & Compliance Health Audit.pdf" target="_blank" class="btn btn-outline" style={{ color: "var(--color-navy)", "box-shadow": "inset 0 0 0 2px var(--color-navy)" }}>View a Sample Risk Audit Report</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

