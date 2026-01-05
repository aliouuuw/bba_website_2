 import { createSignal, For, Switch, Match } from "solid-js";

export default function Solutions() {
  const [openSection, setOpenSection] = createSignal<1 | 2 | 3 | null>(1);

  return (
    <section id="solutions" class="solutions dark-section">
      <div class="container">
        <div class="reveal-up" style={{ "margin-bottom": "6rem", "text-align": "right" }}>
          <div class="font-mono text-gradient">// INTELLIGENCE SUITE</div>
          <h2>ENGINEERED FOR <span class="text-gradient">IMPACT</span></h2>
        </div>

        <div class="reveal-slide">
          <ExpandableItem
            title="🎯 AI STRATEGIC COMMAND CENTER"
            isOpen={openSection() === 1}
            onToggle={() => setOpenSection((prev) => (prev === 1 ? null : 1))}
          >
            <ProductTabs
              title="AI STRATEGIC COMMAND CENTER"
              problem={{
                icon: "🎯",
                heading: "The Problem: Strategic Drift in a Data-Rich World",
                text: "You have dashboards showing what happened, but no clear guidance on what to do next. Leadership teams spend weeks debating strategy based on conflicting reports, while market opportunities pass by."
              }}
              solution={{
                icon: "🚀",
                heading: "Our Solution: Your AI Co-Pilot for Market Leadership",
                text: "A dynamic intelligence platform that analyzes your data alongside market signals to generate prioritized action plans—not just more reports."
              }}
              outcomes={{
                icon: "📈",
                heading: "Your Business Outcomes",
                items: [
                  "Make faster strategic decisions with AI-generated initiatives tied to your specific objectives",
                  "Identify hidden market opportunities 2-3 quarters before competitors",
                  "Reduce strategic planning cycles from months to weeks with data-backed scenarios",
                  "Align leadership teams around a single source of strategic truth",
                ]
              }}
              features={{
                heading: "Key Features That Deliver Results",
                items: [
                  { icon: "✅", text: "AI-Generated Strategic Plans → Receive monthly initiatives ranked by impact potential" },
                  { icon: "✅", text: "Competitive Benchmarking Dashboards → See exactly where you outperform or lag peers" },
                  { icon: "✅", text: "Market Opportunity Assessment → Identify underserved segments or products" },
                  { icon: "✅", text: "Brand & Sentiment Tracking → Monitor how market perception affects your growth" },
                ]
              }}
              cta={{
                text: "Learn More",
                link: "/strategic-command-center"
              }}
              visual={<NetworkGraph />}
            />
          </ExpandableItem>

          <ExpandableItem
            title="🛡️ AI RISK ADVISOR PLATFORM"
            isOpen={openSection() === 2}
            onToggle={() => setOpenSection((prev) => (prev === 2 ? null : 2))}
          >
            <ProductTabs
              title="AI RISK ADVISOR PLATFORM"
              problem={{
                icon: "⚠️",
                heading: "The Problem: Reacting to Crises Instead of Preventing Them",
                text: "Your risk management is manual, periodic, and fragmented across departments. You discover problems only after they've impacted earnings or triggered regulatory attention."
              }}
              solution={{
                icon: "🛡️",
                heading: "Our Solution: Predictive Risk Intelligence",
                text: "A dynamic intelligence platform that analyzes your data alongside market signals to generate prioritized action plans—not just more reports."
              }}
              outcomes={{
                icon: "📉",
                heading: "Your Business Outcomes",
                items: [
                  "Reduce unexpected losses by 40-60% with proactive risk identification",
                  "Cut regulatory exposure through continuous compliance monitoring",
                  "Optimize capital allocation by accurately quantifying risk-adjusted returns",
                  "Market performance in real time (terms apply)",
                  "Transform risk management from a cost center to a strategic advantage",
                ]
              }}
              features={{
                heading: "Key Features That Deliver Results",
                items: [
                  { icon: "✅", text: "Early Warning System → Get alerts on emerging risks 30-90 days before material impact" },
                  { icon: "✅", text: "Holistic Portfolio Surveillance → Continuously track asset performance and funding health to secure liquidity" },
                  { icon: "✅", text: "Real-Time Liquidity Monitoring → Prevent funding crises with predictive cash flow analysis" },
                  { icon: "✅", text: "Automated Mitigation Playbooks → Execute pre-approved responses to common risk scenarios" },
                  { icon: "✅", text: "Holistic Risk Coverage → Credit, market, operational, cyber, and structural risks in one view" },
                ]
              }}
              cta={{
                text: "Learn More",
                link: "/risk-advisor"
              }}
              visual={<RiskChart />}
            />
          </ExpandableItem>

          <ExpandableItem
            title="⚖️ AI COMPLIANCE CO-PILOT"
            isOpen={openSection() === 3}
            onToggle={() => setOpenSection((prev) => (prev === 3 ? null : 3))}
          >
            <ProductTabs
              title="AI COMPLIANCE CO-PILOT"
              problem={{
                icon: "📋",
                heading: "The Problem: Regulatory Burden Draining Resources",
                text: "Your compliance team spends 70% of their time gathering data and formatting reports instead of strategic oversight. Manual processes create errors, delays, and audit findings."
              }}
              solution={{
                icon: "⚖️",
                heading: "Our Solution: Automated RegTech Workflow",
                text: "Transform regulatory compliance from a manual burden to an automated, strategic function with pre-built templates and seamless data lineage."
              }}
              outcomes={{
                icon: "✅",
                heading: "Your Business Outcomes",
                items: [
                  "Reduce compliance operating costs by 50-70% through automation",
                  "Eliminate late or error-prone submissions with regulator-ready reporting",
                  "Cut audit preparation time from weeks to days with full data lineage",
                  "Reallocate FTEs from data assembly to strategic risk management",
                ]
              }}
              features={{
                heading: "Key Features That Deliver Results",
                items: [
                  { icon: "✅", text: "Automated Data Integrity Engine → Ensure audit-ready, consistent data" },
                  { icon: "✅", text: "Pre-built RegTech Templates → Basel, IFRS 9, AML/KYC, LCR, NSFR, NCCF ready-to-use" },
                  { icon: "✅", text: "Drag-and-Drop Report Builder → Create regulator-ready reports without IT support" },
                  { icon: "✅", text: "Granular Data Lineage → Click from any report value back to source transactions" },
                  { icon: "✅", text: "Submission Manager → Track all filings, deadlines, and regulator communications" },
                ]
              }}
              cta={{
                text: "Learn More",
                link: "/compliance-copilot"
              }}
              visual={<ComplianceVisual />}
            />
          </ExpandableItem>
        </div>
      </div>
    </section>
  );
}

function ProductTabs(props: {
  title: string;
  problem: { icon: string; heading: string; text: string };
  solution: { icon: string; heading: string; text: string };
  outcomes: { icon: string; heading: string; items: string[] };
  features: { heading: string; items: Array<{ icon: string; text: string }> };
  cta: { text: string; link: string };
  visual: any;
  reverse?: boolean;
}) {
  const [activeTab, setActiveTab] = createSignal<"overview" | "outcomes" | "features">("overview");

  return (
    <div class="product-tabs-container">
      <div 
        style={{ 
          display: "flex", 
          gap: "1rem", 
          "margin-bottom": "2rem",
          "border-bottom": "1px solid rgba(255, 255, 255, 0.1)",
          padding: "0 0 1rem 0"
        }}
      >
        <TabButton 
          active={activeTab() === "overview"} 
          onClick={() => setActiveTab("overview")}
          label="Overview"
        />
        <TabButton 
          active={activeTab() === "outcomes"} 
          onClick={() => setActiveTab("outcomes")}
          label="Outcomes"
        />
        <TabButton 
          active={activeTab() === "features"} 
          onClick={() => setActiveTab("features")}
          label="Features"
        />
      </div>

      <div class="solution-row">
        <div class="solution-content">
          <h3 style={{ "margin-bottom": "1.5rem" }}>{props.title}</h3>
          
          <div style={{ "min-height": "320px" }}>
            <Switch>
              <Match when={activeTab() === "overview"}>
                <InfoBlock {...props.problem} />
                <InfoBlock {...props.solution} />
              </Match>
              <Match when={activeTab() === "outcomes"}>
                <OutcomeBlock {...props.outcomes} />
              </Match>
              <Match when={activeTab() === "features"}>
                <FeatureGrid {...props.features} />
              </Match>
            </Switch>
          </div>

          <div style={{ "margin-top": "2rem" }}>
            <a href={props.cta.link} class="btn btn-outline">{props.cta.text}</a>
          </div>
        </div>
        <div class="solution-visual">
          {props.visual}
        </div>
      </div>
    </div>
  );
}

function TabButton(props: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={props.onClick}
      style={{
        background: props.active ? "rgba(94, 234, 212, 0.1)" : "transparent",
        border: props.active ? "1px solid var(--color-teal)" : "1px solid transparent",
        color: props.active ? "var(--color-teal)" : "rgba(255, 255, 255, 0.6)",
        padding: "0.5rem 1.25rem",
        "border-radius": "20px",
        cursor: "pointer",
        "font-family": "var(--font-mono)",
        "font-size": "0.8rem",
        "text-transform": "uppercase",
        "transition": "all 0.2s ease",
        "font-weight": props.active ? "700" : "500"
      }}
    >
      {props.label}
    </button>
  );
}


function ExpandableItem(props: { title: string; isOpen: boolean; onToggle: () => void; children: any }) {
  return (
    <div 
      class="expandable-item" 
      style={{ 
        "margin-bottom": "1.5rem",
        "background": "rgba(255, 255, 255, 0.02)",
        "border": props.isOpen ? "1px solid rgba(94, 234, 212, 0.3)" : "1px solid rgba(255, 255, 255, 0.1)",
        "border-left": `4px solid ${props.isOpen ? "var(--color-teal)" : "var(--color-lavender)"}`,
        "border-radius": "4px",
        "transition": "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)"
      }}
    >
      <button
        class="expandable-header"
        onClick={() => props.onToggle()}
        aria-expanded={props.isOpen}
        style={{
          "background": props.isOpen ? "rgba(94, 234, 212, 0.05)" : "transparent",
          "padding": "1.5rem 2rem",
          "color": props.isOpen ? "var(--color-teal)" : "var(--color-white)",
          "width": "100%",
          "border": "none",
          "cursor": "pointer",
          "display": "flex",
          "justify-content": "space-between",
          "align-items": "center",
          "text-align": "left",
          "font-family": "var(--font-sans)",
          "font-weight": "700",
          "font-size": "1.1rem",
          "letter-spacing": "0.02em"
        }}
      >
        <span class="expandable-title">{props.title}</span>
        <span 
          class="expandable-icon" 
          classList={{ open: props.isOpen }}
          style={{
            "transform": props.isOpen ? "rotate(180deg)" : "rotate(0deg)",
            "transition": "transform 0.3s ease",
            "color": props.isOpen ? "var(--color-teal)" : "rgba(255,255,255,0.5)"
          }}
        >
          ▼
        </span>
      </button>
      {props.isOpen && (
        <div 
          class="expandable-content"
          style={{
            "padding": "2.5rem 2rem",
            "border-top": "1px solid rgba(255, 255, 255, 0.05)",
            "background": "rgba(0, 0, 0, 0.1)"
          }}
        >
          {props.children}
        </div>
      )}
    </div>
  );
}

function InfoBlock(props: { icon: string; heading: string; text: string }) {
  return (
    <div style={{ "margin-bottom": "1.25rem" }}>
      <div style={{ display: "flex", gap: "0.75rem", "align-items": "baseline" }}>
        <div style={{ width: "1.75rem", "text-align": "center", "font-size": "1.25rem" }}>{props.icon}</div>
        <div style={{ flex: 1 }}>
          <div class="font-mono" style={{ "font-size": "0.75rem", "color": "var(--color-teal)", "letter-spacing": "0.12em", "text-transform": "uppercase", "font-weight": "600" }}>{props.heading}</div>
          <p style={{ "margin-top": "0.5rem", "color": "rgba(255, 255, 255, 0.9)", "font-size": "1rem" }}>{props.text}</p>
        </div>
      </div>
    </div>
  );
}

function OutcomeBlock(props: { icon: string; heading: string; items: string[] }) {
  return (
    <div style={{ "margin-bottom": "2rem", "background": "rgba(255, 255, 255, 0.02)", "padding": "1.5rem", "border-radius": "8px", "border": "1px solid rgba(255, 255, 255, 0.05)" }}>
      <div style={{ display: "flex", gap: "0.75rem", "align-items": "baseline" }}>
        <div style={{ width: "1.75rem", "text-align": "center", "font-size": "1.25rem" }}>{props.icon}</div>
        <div style={{ flex: 1 }}>
          <div class="font-mono" style={{ "font-size": "0.75rem", "color": "var(--color-teal)", "letter-spacing": "0.12em", "text-transform": "uppercase", "font-weight": "600" }}>{props.heading}</div>
          <ul style={{ "margin-top": "1rem", "padding-left": "0", "list-style": "none" }}>
            <For each={props.items}>
              {(item) => (
                <li style={{ "margin-bottom": "0.75rem", "color": "rgba(255, 255, 255, 0.95)", "display": "flex", "gap": "0.75rem", "align-items": "flex-start", "font-size": "0.95rem" }}>
                  <span style={{ "color": "var(--color-teal)", "font-weight": "bold" }}>→</span>
                  {item}
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>
    </div>
  );
}

function FeatureGrid(props: { heading: string; items: Array<{ icon: string; text: string }> }) {
  return (
    <div style={{ "margin-bottom": "2rem" }}>
      <div class="font-mono" style={{ "font-size": "0.75rem", "color": "var(--color-periwinkle)", "letter-spacing": "0.12em", "text-transform": "uppercase", "margin-bottom": "1rem", "font-weight": "600" }}>{props.heading}</div>
      <div
        style={{
          display: "grid",
          "grid-template-columns": "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "0.75rem",
        }}
      >
        <For each={props.items}>
          {(item) => (
            <div
              style={{
                display: "flex",
                gap: "0.6rem",
                padding: "1rem",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.08)",
                "border-radius": "8px",
              }}
            >
              <div style={{ width: "1.25rem", "text-align": "center" }}>{item.icon}</div>
              <div style={{ "font-size": "0.9rem", "line-height": 1.4, "color": "rgba(255,255,255,0.85)" }}>{item.text}</div>
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

