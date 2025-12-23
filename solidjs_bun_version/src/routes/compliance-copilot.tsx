import { Title } from "@solidjs/meta";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

const features = [
  { icon: "01", title: "Pre-built RegTech Templates", description: "Ready-to-use templates for Basel, IFRS 9, AML/KYC, NCCF, LCR, and more—constantly updated." },
  { icon: "02", title: "Drag-and-Drop Report Builder", description: "Create custom reports without coding. Map data sources visually and generate outputs in any format." },
  { icon: "03", title: "Granular Data Lineage", description: "Trace every number back to its source. Full audit trails that satisfy the most rigorous examinations." },
  { icon: "04", title: "Submission Manager", description: "Schedule and automate submissions to regulators with built-in validation and error checking." },
  { icon: "05", title: "Report Archiving", description: "Secure storage of all historical reports with instant retrieval for audits and comparisons." },
  { icon: "06", title: "Regulatory Updates", description: "Automatic template updates when regulations change, keeping you always compliant." },
];

const audiences = [
  { title: "Compliance Officers", description: "For CCOs needing automated regulatory reporting and audit trail management.", color: "var(--color-teal)" },
  { title: "Finance Teams", description: "For finance professionals responsible for regulatory submissions and IFRS reporting.", color: "var(--color-lavender)" },
  { title: "Internal Audit", description: "For audit teams requiring complete data lineage and documentation.", color: "var(--color-teal)" },
];

export default function ComplianceCopilot() {
  return (
    <>
      <Title>AI Compliance Co-Pilot - BBA FinTech</Title>
      <Header />
      <main>
        <section class="hero" style={{ "min-height": "70vh", "padding-bottom": "4rem" }}>
          <svg class="poly-bg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path class="poly-shape" d="M0,0 L100,0 L100,100 L0,85 Z" fill="rgba(255,255,255,0.02)" />
          </svg>
          <div class="container hero-grid">
            <div class="hero-content">
              <div class="font-mono text-gradient" style={{ "margin-bottom": "1.5rem", "font-size": "0.875rem", "letter-spacing": "0.05em" }}>// INTELLIGENCE SUITE</div>
              <h1>AI COMPLIANCE <br /><span class="text-gradient">CO-PILOT</span></h1>
              <p>Turn regulatory burden into strategic advantage. From data to regulator-ready submissions.</p>
              <div style={{ display: "flex", gap: "1rem", "flex-wrap": "wrap" }}>
                <a href="/contact" class="btn" style={{ background: "var(--color-teal)", color: "var(--color-navy)" }}>See a Live Compliance Workflow Demo</a>
                <a href="#" class="btn btn-outline" style={{ color: "white", "box-shadow": "inset 0 0 0 2px white" }}>Access Our RegTech Template Library</a>
              </div>
            </div>
            <div class="hero-visual">
              <div class="hero-card-main" style={{ display: "flex", "align-items": "center", "justify-content": "center", padding: "3rem" }}>
                <div style={{ width: "100%", "max-width": "280px" }}>
                  {[1, 2, 3].map((i) => (
                    <div key={i} style={{ display: "flex", "align-items": "center", gap: "1rem", "margin-bottom": "1.5rem" }}>
                      <div style={{ width: "24px", height: "24px", border: "2px solid var(--color-teal)", "border-radius": "4px", display: "flex", "align-items": "center", "justify-content": "center" }}>
                        <svg width="16" height="16" viewBox="0 0 16 16"><path d="M3 8 L6 11 L13 4" stroke="var(--color-teal)" stroke-width="2" fill="none" stroke-linecap="round" /></svg>
                      </div>
                      <div style={{ flex: 1, height: "4px", background: "var(--color-teal)", "border-radius": "2px" }}></div>
                    </div>
                  ))}
                  <div style={{ display: "flex", "align-items": "center", gap: "1rem" }}>
                    <div style={{ width: "24px", height: "24px", border: "2px solid var(--color-lavender)", "border-radius": "4px", display: "flex", "align-items": "center", "justify-content": "center" }}>
                      <div style={{ width: "8px", height: "8px", background: "var(--color-lavender)", "border-radius": "50%" }}></div>
                    </div>
                    <div style={{ flex: 1, height: "4px", background: "rgba(255,255,255,0.1)", "border-radius": "2px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: "65%", background: "var(--color-lavender)" }}></div>
                    </div>
                  </div>
                  <div style={{ "margin-top": "2rem", "text-align": "center" }}>
                    <div style={{ display: "inline-flex", "align-items": "center", gap: "0.5rem", padding: "0.75rem 1.5rem", background: "rgba(94, 234, 212, 0.1)", border: "1px solid var(--color-teal)", "border-radius": "20px" }}>
                      <div style={{ width: "8px", height: "8px", background: "var(--color-teal)", "border-radius": "50%" }}></div>
                      <span style={{ "font-family": "var(--font-mono)", "font-size": "0.75rem", color: "var(--color-teal)" }}>AUDIT READY</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="problem-section" style={{ padding: "6rem 0", background: "var(--color-white)" }}>
          <div class="container">
            <div style={{ "text-align": "center", "max-width": "800px", margin: "0 auto 4rem auto" }}>
              <h2 style={{ "margin-bottom": "1.5rem", color: "var(--color-navy)" }}>THE CHALLENGE</h2>
              <p style={{ "font-size": "1.125rem" }}>Is regulatory compliance a costly, manual burden that drains resources and creates exposure?</p>
            </div>
            <div class="pain-grid">
              <div class="pain-item"><h4>Manual Report Generation</h4><p>Hours wasted compiling data from disparate sources into regulatory formats.</p></div>
              <div class="pain-item"><h4>Audit Trail Gaps</h4><p>Lack of end-to-end data lineage creates compliance risks and audit failures.</p></div>
              <div class="pain-item"><h4>Regulatory Changes</h4><p>Keeping up with Basel, IFRS 9, AML/KYC, and local regulations requires constant updates.</p></div>
            </div>
          </div>
        </section>

        <section class="solution-details" style={{ padding: "6rem 0", background: "var(--color-off-white)" }}>
          <div class="container">
            <div style={{ "text-align": "center", "max-width": "800px", margin: "0 auto 4rem auto" }}>
              <h2 style={{ "margin-bottom": "1.5rem", color: "var(--color-navy)" }}>OUR SOLUTION</h2>
              <p style={{ "font-size": "1.125rem" }}>Automated regulatory reporting with pre-built templates, granular data lineage, and one-click submission.</p>
            </div>
            <div class="feature-grid">
              {features.slice(0, 3).map((f, i) => (
                <div class="feature-card" key={i}><div class="icon">{f.icon}</div><h3>{f.title}</h3><p>{f.description}</p></div>
              ))}
            </div>
            <div class="feature-grid" style={{ "margin-top": "2rem" }}>
              {features.slice(3).map((f, i) => (
                <div class="feature-card" key={i}><div class="icon">{f.icon}</div><h3>{f.title}</h3><p>{f.description}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section class="target-audience" style={{ padding: "6rem 0", background: "var(--color-navy)", color: "white" }}>
          <div class="container">
            <div style={{ "text-align": "center", "margin-bottom": "4rem" }}><h2 style={{ color: "white" }}>WHO IT'S FOR</h2></div>
            <div style={{ display: "flex", "justify-content": "center", gap: "4rem", "flex-wrap": "wrap" }}>
              {audiences.map((a, i) => (
                <div key={i} style={{ "text-align": "center", "max-width": "300px" }}>
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
                <a href="/contact" class="btn" style={{ background: "var(--color-navy)", color: "white" }}>See a Live Compliance Workflow Demo</a>
                <a href="#" class="btn btn-outline" style={{ color: "var(--color-navy)", "box-shadow": "inset 0 0 0 2px var(--color-navy)" }}>Access Our RegTech Template Library</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

