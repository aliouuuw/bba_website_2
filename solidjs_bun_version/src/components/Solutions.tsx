 import { createEffect, createSignal, For, Show } from "solid-js";

export default function Solutions() {
  const [isMobile, setIsMobile] = createSignal(false);
  const [openSection, setOpenSection] = createSignal<1 | 2 | 3>(1);

  createEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();

    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  });

  return (
    <section id="solutions" class="solutions dark-section">
      <div class="container">
        <div class="reveal-up" style={{ "margin-bottom": "6rem", "text-align": "right" }}>
          <div class="font-mono text-gradient">// INTELLIGENCE SUITE</div>
          <h2>ENGINEERED FOR <span class="text-gradient">IMPACT</span></h2>
        </div>

        {/* Solution 1 */}
        <div class="solution-row reveal-slide">
          <div class="solution-content">
            <Show when={isMobile()}>
              <button
                type="button"
                onClick={() => setOpenSection(1)}
                style={{
                  width: "100%",
                  display: "flex",
                  "align-items": "center",
                  "justify-content": "space-between",
                  gap: "1rem",
                  padding: "1rem 1.25rem",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  "border-radius": "14px",
                  color: "inherit",
                  "text-align": "left",
                  cursor: "pointer",
                }}
              >
                <span style={{ "font-weight": 700, "letter-spacing": "0.02em" }}>AI STRATEGIC COMMAND CENTER</span>
                <span class="font-mono" style={{ opacity: 0.7, "font-size": "0.875rem" }}>{openSection() === 1 ? "−" : "+"}</span>
              </button>
            </Show>

            <Show when={!isMobile() || openSection() === 1}>
              <div style={{ "margin-top": isMobile() ? "1.25rem" : undefined }}>
                <h3 style={{ "margin-bottom": "1.5rem" }}>AI STRATEGIC COMMAND CENTER</h3>
                <InfoBlock
                  icon="🎯"
                  heading="The Problem"
                  text="You have dashboards showing what happened, but no clear guidance on what to do next. Leadership teams spend weeks debating strategy based on conflicting reports, while market opportunities pass by."
                />
                <InfoBlock
                  icon="🚀"
                  heading="Our Solution"
                  text="A dynamic intelligence platform that analyzes your data alongside market signals to generate prioritized action plans—not just more reports."
                />
                <OutcomeBlock
                  icon="📈"
                  heading="Your Business Outcomes"
                  items={[
                    "Make faster strategic decisions with AI-generated initiatives tied to your specific objectives",
                    "Identify hidden market opportunities 2-3 quarters before competitors",
                    "Reduce strategic planning cycles from months to weeks with data-backed scenarios",
                    "Align leadership teams around a single source of strategic truth",
                  ]}
                />
                <FeatureGrid
                  heading="Key Features That Deliver Results"
                  items={[
                    { icon: "✅", text: "AI-Generated Strategic Plans → Receive monthly initiatives ranked by impact potential" },
                    { icon: "✅", text: "Competitive Benchmarking Dashboards → See exactly where you outperform or lag peers" },
                    { icon: "✅", text: "Market Opportunity Assessment → Identify underserved segments or products" },
                    { icon: "✅", text: "Brand & Sentiment Tracking → Monitor how market perception affects your growth" },
                  ]}
                />
                <a href="/strategic-command-center" class="btn btn-outline">Get Your Market Opportunity Assessment</a>
              </div>
            </Show>
          </div>
          <div class="solution-visual">
            <NetworkGraph />
          </div>
        </div>

        {/* Solution 2 */}
        <div class="solution-row reverse reveal-slide">
          <div class="solution-content">
            <Show when={isMobile()}>
              <button
                type="button"
                onClick={() => setOpenSection(2)}
                style={{
                  width: "100%",
                  display: "flex",
                  "align-items": "center",
                  "justify-content": "space-between",
                  gap: "1rem",
                  padding: "1rem 1.25rem",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  "border-radius": "14px",
                  color: "inherit",
                  "text-align": "left",
                  cursor: "pointer",
                }}
              >
                <span style={{ "font-weight": 700, "letter-spacing": "0.02em" }}>AI RISK ADVISOR PLATFORM</span>
                <span class="font-mono" style={{ opacity: 0.7, "font-size": "0.875rem" }}>{openSection() === 2 ? "−" : "+"}</span>
              </button>
            </Show>

            <Show when={!isMobile() || openSection() === 2}>
              <div style={{ "margin-top": isMobile() ? "1.25rem" : undefined }}>
                <h3 style={{ "margin-bottom": "1.5rem" }}>AI RISK ADVISOR PLATFORM</h3>
                <InfoBlock
                  icon="⚠️"
                  heading="The Problem"
                  text="Your risk management is manual, periodic, and fragmented across departments. You discover problems only after they've impacted earnings or triggered regulatory attention."
                />
                <InfoBlock
                  icon="🛡️"
                  heading="Our Solution"
                  text="A unified platform that continuously monitors financial and non-financial risks, providing early warnings and automated mitigation playbooks."
                />
                <OutcomeBlock
                  icon="📉"
                  heading="Your Business Outcomes"
                  items={[
                    "Reduce unexpected losses by 40-60% with proactive risk identification",
                    "Cut regulatory exposure through continuous compliance monitoring",
                    "Optimize capital allocation by accurately quantifying risk-adjusted returns",
                    "Transform risk management from a cost center to a strategic advantage",
                  ]}
                />
                <FeatureGrid
                  heading="Key Features That Deliver Results"
                  items={[
                    { icon: "✅", text: "Early Warning System → Get alerts on emerging risks 30-90 days before material impact" },
                    { icon: "✅", text: "Holistic Portfolio Surveillance → Continuously track asset performance and funding health to secure liquidity" },
                    { icon: "✅", text: "Real-Time Liquidity Monitoring → Prevent funding crises with predictive cash flow analysis" },
                    { icon: "✅", text: "Automated Mitigation Playbooks → Execute pre-approved responses to common risk scenarios" },
                    { icon: "✅", text: "Holistic Risk Coverage → Credit, market, operational, cyber, and structural risks in one view" },
                  ]}
                />
                <a href="/risk-advisor" class="btn btn-outline">Schedule a Risk Gap Analysis</a>
              </div>
            </Show>
          </div>
          <div class="solution-visual">
            <RiskChart />
          </div>
        </div>

        {/* Solution 3 */}
        <div class="solution-row reveal-slide">
          <div class="solution-content">
            <Show when={isMobile()}>
              <button
                type="button"
                onClick={() => setOpenSection(3)}
                style={{
                  width: "100%",
                  display: "flex",
                  "align-items": "center",
                  "justify-content": "space-between",
                  gap: "1rem",
                  padding: "1rem 1.25rem",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  "border-radius": "14px",
                  color: "inherit",
                  "text-align": "left",
                  cursor: "pointer",
                }}
              >
                <span style={{ "font-weight": 700, "letter-spacing": "0.02em" }}>AI COMPLIANCE CO-PILOT</span>
                <span class="font-mono" style={{ opacity: 0.7, "font-size": "0.875rem" }}>{openSection() === 3 ? "−" : "+"}</span>
              </button>
            </Show>

            <Show when={!isMobile() || openSection() === 3}>
              <div style={{ "margin-top": isMobile() ? "1.25rem" : undefined }}>
                <h3 style={{ "margin-bottom": "1.5rem" }}>AI COMPLIANCE CO-PILOT</h3>
                <InfoBlock
                  icon="📋"
                  heading="The Problem"
                  text="Your compliance team spends 70% of their time gathering data and formatting reports instead of strategic oversight. Manual processes create errors, delays, and audit findings."
                />
                <InfoBlock
                  icon="⚖️"
                  heading="Our Solution"
                  text="Transform regulatory compliance from a manual burden to an automated, strategic function with pre-built templates and seamless data lineage."
                />
                <OutcomeBlock
                  icon="✅"
                  heading="Your Business Outcomes"
                  items={[
                    "Reduce compliance operating costs by 50-70% through automation",
                    "Eliminate late or error-prone submissions with regulator-ready reporting",
                    "Cut audit preparation time from weeks to days with full data lineage",
                    "Reallocate FTEs from data assembly to strategic risk management",
                  ]}
                />
                <FeatureGrid
                  heading="Key Features That Deliver Results"
                  items={[
                    { icon: "✅", text: "Automated Data Integrity Engine → Ensure audit-ready, consistent data" },
                    { icon: "✅", text: "Pre-built RegTech Templates → Basel, IFRS 9, AML/KYC, LCR, NSFR, NCCF ready-to-use" },
                    { icon: "✅", text: "Drag-and-Drop Report Builder → Create regulator-ready reports without IT support" },
                    { icon: "✅", text: "Granular Data Lineage → Click from any report value back to source transactions" },
                    { icon: "✅", text: "Submission Manager → Track all filings, deadlines, and regulator communications" },
                  ]}
                />
                <a href="/compliance-copilot" class="btn btn-outline">See Our RegTech Templates in Action</a>
              </div>
            </Show>
          </div>
          <div class="solution-visual">
            <ComplianceVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoBlock(props: { icon: string; heading: string; text: string }) {
  return (
    <div style={{ "margin-bottom": "1.25rem" }}>
      <div style={{ display: "flex", gap: "0.75rem", "align-items": "baseline" }}>
        <div style={{ width: "1.75rem", "text-align": "center", opacity: 0.95 }}>{props.icon}</div>
        <div style={{ flex: 1 }}>
          <div class="font-mono" style={{ "font-size": "0.75rem", opacity: 0.75, "letter-spacing": "0.12em", "text-transform": "uppercase" }}>{props.heading}</div>
          <p style={{ "margin-top": "0.5rem" }}>{props.text}</p>
        </div>
      </div>
    </div>
  );
}

function OutcomeBlock(props: { icon: string; heading: string; items: string[] }) {
  return (
    <div style={{ "margin-bottom": "1.75rem" }}>
      <div style={{ display: "flex", gap: "0.75rem", "align-items": "baseline" }}>
        <div style={{ width: "1.75rem", "text-align": "center", opacity: 0.95 }}>{props.icon}</div>
        <div style={{ flex: 1 }}>
          <div class="font-mono" style={{ "font-size": "0.75rem", opacity: 0.75, "letter-spacing": "0.12em", "text-transform": "uppercase" }}>{props.heading}</div>
          <ul class="font-mono" style={{ "margin-top": "0.75rem", "padding-left": "1.1rem", "font-size": "0.875rem", "line-height": 1.5 }}>
            <For each={props.items}>{(item) => <li style={{ "margin-bottom": "0.5rem" }}>{item}</li>}</For>
          </ul>
        </div>
      </div>
    </div>
  );
}

function FeatureGrid(props: { heading: string; items: Array<{ icon: string; text: string }> }) {
  return (
    <div style={{ "margin-bottom": "2rem" }}>
      <div class="font-mono" style={{ "font-size": "0.75rem", opacity: 0.75, "letter-spacing": "0.12em", "text-transform": "uppercase", "margin-bottom": "0.75rem" }}>{props.heading}</div>
      <div
        style={{
          display: "grid",
          "grid-template-columns": "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "0.75rem",
        }}
      >
        <For each={props.items}>
          {(item) => (
            <div
              style={{
                display: "flex",
                gap: "0.6rem",
                padding: "0.85rem 1rem",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.10)",
                "border-radius": "14px",
              }}
            >
              <div style={{ width: "1.25rem", "text-align": "center" }}>{item.icon}</div>
              <div style={{ "font-size": "0.9rem", "line-height": 1.4 }}>{item.text}</div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}

function NetworkGraph() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 400">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
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
  );
}

function RiskChart() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 400">
      <defs>
        <linearGradient id="barGrad1" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="var(--color-teal)" stop-opacity="0.8" />
          <stop offset="100%" stop-color="var(--color-teal)" stop-opacity="0.3" />
        </linearGradient>
      </defs>
      <line x1="60" y1="80" x2="340" y2="80" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
      <line x1="60" y1="150" x2="340" y2="150" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
      <line x1="60" y1="220" x2="340" y2="220" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
      <line x1="60" y1="290" x2="340" y2="290" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
      <rect x="80" y="150" width="40" height="140" fill="url(#barGrad1)" rx="2" />
      <rect x="140" y="110" width="40" height="180" fill="url(#barGrad1)" rx="2" />
      <rect x="200" y="190" width="40" height="100" fill="#FCD34D" opacity="0.7" rx="2" />
      <rect x="260" y="230" width="40" height="60" fill="#F43F5E" opacity="0.7" rx="2" />
      <text x="100" y="310" fill="rgba(255,255,255,0.5)" font-size="10" text-anchor="middle">Q1</text>
      <text x="160" y="310" fill="rgba(255,255,255,0.5)" font-size="10" text-anchor="middle">Q2</text>
      <text x="220" y="310" fill="rgba(255,255,255,0.5)" font-size="10" text-anchor="middle">Q3</text>
      <text x="280" y="310" fill="rgba(255,255,255,0.5)" font-size="10" text-anchor="middle">Q4</text>
    </svg>
  );
}

function ComplianceVisual() {
  return (
    <div style={{ display: "flex", "align-items": "center", "justify-content": "center", height: "100%", padding: "3rem" }}>
      <div style={{ width: "100%", "max-width": "280px" }}>
        {[1, 2, 3].map((i) => (
          <div style={{ display: "flex", "align-items": "center", gap: "1rem", "margin-bottom": "1.5rem" }}>
            <div style={{ width: "24px", height: "24px", border: "2px solid var(--color-teal)", "border-radius": "4px", display: "flex", "align-items": "center", "justify-content": "center" }}>
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path d="M3 8 L6 11 L13 4" stroke="var(--color-teal)" stroke-width="2" fill="none" stroke-linecap="round" />
              </svg>
            </div>
            <div style={{ flex: "1", height: "4px", background: "var(--color-teal)", "border-radius": "2px" }}></div>
          </div>
        ))}
        <div style={{ "margin-top": "2rem", "text-align": "center" }}>
          <div style={{ display: "inline-flex", "align-items": "center", gap: "0.5rem", padding: "0.75rem 1.5rem", background: "rgba(94, 234, 212, 0.1)", border: "1px solid var(--color-teal)", "border-radius": "20px" }}>
            <div style={{ width: "8px", height: "8px", background: "var(--color-teal)", "border-radius": "50%" }}></div>
            <span style={{ "font-family": "var(--font-mono)", "font-size": "0.75rem", color: "var(--color-teal)" }}>AUDIT READY</span>
          </div>
        </div>
      </div>
    </div>
  );
}

