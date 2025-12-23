import { createSignal } from "solid-js";

function ExpandableItem(props: { title: string; children: any }) {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <div class="expandable-item">
      <button
        class="expandable-header"
        onClick={() => setIsOpen(!isOpen())}
        aria-expanded={isOpen()}
      >
        <span class="expandable-title">{props.title}</span>
        <span class="expandable-icon" classList={{ open: isOpen() }}>
          ▼
        </span>
      </button>
      {isOpen() && <div class="expandable-content">{props.children}</div>}
    </div>
  );
}

export default function PainPoints() {
  return (
    <section class="pain-points">
      <div class="container">
        <div class="pain-grid">
          <div class="reveal-slide">
            <h2 style={{ "margin-bottom": "2rem" }}>PAIN POINTS WE ADDRESS</h2>
            <p style={{ "font-size": "1.125rem", "margin-bottom": "2rem" }}>
              BBA FinTech tackles core financial sector challenges with advanced advisory and modeling solutions, transforming data into decisive action and measurable business impact.
            </p>

            <ExpandableItem title="🚨 1. INEFFICIENCY & PROCESS GAPS">
              <p style={{ "margin-bottom": "0.75rem" }}>
                <strong>The Problem:</strong> Are you still waiting days for reports that are outdated the moment they're printed? Manual reporting, clunky models, and disconnected systems don't just slow decisions—they cost money and opportunity.
              </p>
              <p style={{ color: "var(--color-navy)", "font-weight": "600", "font-size": "0.9rem", "margin-bottom": "0.75rem" }}>
                Our Solution in Action: We optimize and automate core financial processes through our integrated AI-powered data pipeline and reporting workflows.
              </p>
              <p style={{ "font-size": "0.9rem", "margin-bottom": "0.5rem" }}>
                <strong>How We Fix It:</strong>
              </p>
              <ul style={{ "font-size": "0.9rem", "margin-left": "1.5rem", "margin-bottom": "0.75rem" }}>
                <li>End-to-End Data Pipeline: Automated data cleaning, ingestion, modeling, and validation</li>
                <li>Funds Transfer Pricing: Optimized FTP frameworks to enhance profitability</li>
                <li>Automated Reporting: Replacement of manual assembly processes with intelligent workflows</li>
              </ul>
              <p style={{ "font-size": "0.9rem", "font-weight": "600", "margin-bottom": "0.5rem" }}>
                Typical Client Results:
              </p>
              <ul style={{ "font-size": "0.85rem", "margin-left": "1.5rem", "margin-bottom": "0.75rem" }}>
                <li>⚡ Processes Rationalized: 12 duplicate workflows eliminated</li>
                <li>⚡ Automation Created: 11 core reports now generated automatically</li>
                <li>⚡ FTEs Redeployed: 3.0 personnel shifted to higher-value analysis</li>
                <li>⚡ Reporting Cycle Time Reduced: ~65% faster delivery</li>
                <li>💰 Annual Savings: $1.8M in process costs and optimized decisions</li>
              </ul>
            </ExpandableItem>

            <ExpandableItem title="🔍 2. POOR DATA GOVERNANCE & CONTROL">
              <p style={{ "margin-bottom": "0.75rem" }}>
                <strong>The Problem:</strong> When the regulator asks for data lineage, does your team dread the costly scavenger hunt? Siloed, inconsistent data without clear audit trails erodes trust and complicates compliance.
              </p>
              <p style={{ color: "var(--color-navy)", "font-weight": "600", "font-size": "0.9rem", "margin-bottom": "0.75rem" }}>
                Our Solution in Action: We provide a unified, secure ecosystem with robust data governance, full audit trails, and secure lineage for a single source of truth.
              </p>
              <p style={{ "font-size": "0.9rem", "margin-bottom": "0.5rem" }}>
                <strong>How We Fix It:</strong>
              </p>
              <ul style={{ "font-size": "0.9rem", "margin-left": "1.5rem", "margin-bottom": "0.75rem" }}>
                <li>Scoring Models: Build and validate robust models with transparent data lineage</li>
                <li>Model Risk Management: Comprehensive validation, testing, and governance</li>
                <li>Audit & Compliance Ready: Full audit trails and report archiving</li>
              </ul>
              <p style={{ "font-size": "0.9rem", "font-weight": "600", "margin-bottom": "0.5rem" }}>
                Typical Client Results:
              </p>
              <ul style={{ "font-size": "0.85rem", "margin-left": "1.5rem", "margin-bottom": "0.75rem" }}>
                <li>🔗 Data Silos Removed: 4 disconnected systems integrated</li>
                <li>🔗 Critical Data Elements Defined: 125 key metrics standardized</li>
                <li>🔗 Data Lineage Documented: 100% of automated reports fully traceable</li>
                <li>🔗 Data Quality Issues Resolved: ~40 inconsistencies corrected</li>
                <li>✅ Audit Preparation Time: Reduced from 12 weeks to 10 days</li>
                <li>✅ Regulatory Penalties Avoided: $500K in potential fines eliminated</li>
              </ul>
            </ExpandableItem>

            <ExpandableItem title="⚠️ 3. ESCALATING RISK & COMPLIANCE BURDENS">
              <p style={{ "margin-bottom": "0.75rem" }}>
                <strong>The Problem:</strong> Are you managing risk by looking in the rearview mirror? Reactive, manual risk management leads to regulatory exposure and unexpected losses.
              </p>
              <p style={{ color: "var(--color-navy)", "font-weight": "600", "font-size": "0.9rem", "margin-bottom": "0.75rem" }}>
                Our Solution in Action: We enable proactive risk management and automated compliance through advanced calculations, scenario analysis, and real-time monitoring.
              </p>
              <p style={{ "font-size": "0.9rem", "margin-bottom": "0.5rem" }}>
                <strong>How We Fix It (Core Capabilities Applied):</strong>
              </p>
              <ul style={{ "font-size": "0.9rem", "margin-left": "1.5rem", "margin-bottom": "0.75rem" }}>
                <li>Expected Credit Loss & Stress Testing: Proactive risk management through advanced calculations</li>
                <li>Balance Sheet Modeling & ALM: Earnings at Risk, Economic Value at Risk, Liquidity & Regulatory Ratios</li>
                <li>Capital Management: Align capital allocation with regulatory requirements</li>
              </ul>
              <p style={{ "font-size": "0.9rem", "font-weight": "600", "margin-bottom": "0.5rem" }}>
                Typical Client Results:
              </p>
              <ul style={{ "font-size": "0.85rem", "margin-left": "1.5rem", "margin-bottom": "0.75rem" }}>
                <li>🛡️ Compliance Challenges Remediated: 8 regulatory gaps addressed</li>
                <li>🛡️ Delayed Submissions: 0 incidents post-implementation</li>
                <li>🛡️ Manual Error Reduction: ~90% decrease in reporting errors</li>
                <li>💸 Potential Losses Mitigated: $4.2M through early risk identification</li>
                <li>📈 Capital Efficiency: Regulatory requirements optimized by 15%</li>
                <li>🤝 Stakeholder Trust: Enhanced through reliable, transparent reporting</li>
              </ul>
            </ExpandableItem>

            <div class="pain-item" style={{ "margin-top": "2rem", "padding-top": "2rem", "border-top": "1px solid var(--color-navy)" }}>
              <h3 style={{ color: "var(--color-navy)", "margin-bottom": "1rem" }}>FROM PAIN POINTS TO PROVEN OUTCOMES</h3>
              <p style={{ "margin-bottom": "1rem" }}>
                Our approach doesn't just identify problems—we deliver quantifiable transformation. By applying our core capabilities directly to your specific pain points, we create a virtuous cycle of improvement:
              </p>
              <ol style={{ "font-size": "0.95rem", "margin-left": "1.5rem", "margin-bottom": "1.5rem" }}>
                <li>Diagnose inefficiencies and risks through our advanced modeling</li>
                <li>Automate core processes to eliminate manual effort and errors</li>
                <li>Govern data to create a single, trusted source of truth</li>
                <li>Monitor continuously to proactively manage risk and compliance</li>
                <li>Optimize performance through data-driven strategic decisions</li>
              </ol>
              <p style={{ "font-size": "1rem", "font-weight": "600", color: "var(--color-navy)" }}>
                Ready to transform your challenges into measurable results?
              </p>
            </div>
          </div>

          <div class="reveal-up" style={{ display: "flex", "flex-direction": "column", "justify-content": "center", gap: "2rem" }}>
            <div style={{ background: "var(--color-navy)", padding: "2rem", "clip-path": "var(--clip-card)", color: "white" }}>
              <h3 style={{ color: "var(--color-teal)", "margin-bottom": "1rem" }}>CORE CAPABILITIES</h3>
              <ul class="core-caps-list">
                <li><strong>Scoring Models:</strong> Build and validate robust models with transparent data lineage.</li>
                <li><strong>Expected Credit Loss & Stress Testing:</strong> Proactive risk management through advanced calculations.</li>
                <li><strong>Balance Sheet Modeling & ALM:</strong> Earnings at Risk, Economic Value at Risk, Liquidity & Regulatory Ratios.</li>
                <li><strong>Funds Transfer Pricing:</strong> Optimized FTP frameworks to enhance profitability.</li>
                <li><strong>Model Risk Management:</strong> Comprehensive validation, testing, and governance.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

