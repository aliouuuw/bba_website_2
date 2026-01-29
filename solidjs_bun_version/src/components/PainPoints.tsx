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
                <strong>The Problem:</strong> For any AI project to secure regulatory approval, robust data governance isn't optional - it's essential. Without it, proving model integrity becomes a costly, manual chase. Siloed data and missing audit trails erode trust, delay approvals, and introduce compliance risk.
              </p>
              <p style={{ color: "var(--color-navy)", "font-weight": "600", "font-size": "0.9rem", "margin-bottom": "0.75rem" }}>
                Our Solution in Action: We provide the governance backbone required for regulatory-ready AI - delivering secure data lineage, full auditability, and controlled model management to accelerate approval and ensure compliance.
              </p>
              <p style={{ "font-size": "0.9rem", "margin-bottom": "0.5rem" }}>
                <strong>How We Build Regulator-Trusted AI:</strong>
              </p>
              <ul style={{ "font-size": "0.9rem", "margin-left": "1.5rem", "margin-bottom": "0.75rem" }}>
                <li>AI Model Assurance: Develop validated models with complete, transparent data lineage</li>
                <li>Model Risk Management: End-to-end validation, testing, and governance for regulator confidence</li>
                <li>Audit-Ready AI Frameworks: Maintain full audit trails, version control, and archived reporting</li>
              </ul>
              <p style={{ "font-size": "0.9rem", "font-weight": "600", "margin-bottom": "0.5rem" }}>
                Typical Client Results:
              </p>
              <ul style={{ "font-size": "0.85rem", "margin-left": "1.5rem", "margin-bottom": "0.75rem" }}>
                <li>🔗 Data Silos Removed: 4 disconnected systems integrated under a unified governance framework</li>
                <li>🔗 Critical Data Elements Defined: 125 key model inputs and metrics standardized and controlled</li>
                <li>🔗 AI Data Lineage Documented: 100% of automated models and reports fully traceable for audits</li>
                <li>🔗 Data Quality Issues Resolved: ~40 inconsistencies corrected to ensure reliable AI outcomes</li>
                <li>✅ Audit Preparation Time: Reduced from 12 weeks to 10 days</li>
                <li>✅ Regulatory Approval Accelerated: $500K in potential fines avoided and faster sign-off achieved</li>
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

            <div class="pain-item" style={{ "margin-top": "2rem", "padding-top": "2rem" }}>
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
              <div style={{ "margin-top": "1.5rem", display: "flex", gap: "1rem", "flex-wrap": "wrap" }}>
                <a href="/contact" class="btn" style={{ background: "var(--color-navy)", color: "white" }}>
                  Speak with a Financial Solutions Architect
                </a>
                <a href="/insights" class="btn" style={{ background: "var(--color-teal)", color: "var(--color-navy)" }}>
                  See Relevant Case Studies
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

