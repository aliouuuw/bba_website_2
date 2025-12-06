export default function Solutions() {
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
            <h3 style={{ "margin-bottom": "1rem" }}>AI STRATEGIC COMMAND CENTER</h3>
            <p style={{ "margin-bottom": "2rem" }}>Your AI co-pilot for market leadership. See where you stand—and where to go next.</p>
            <ul class="font-mono" style={{ "list-style": "none", "margin-bottom": "2rem", "font-size": "0.875rem" }}>
              <li style={{ "margin-bottom": "0.5rem" }}>• AI‑Generated Strategic Plans and advisory</li>
              <li style={{ "margin-bottom": "0.5rem" }}>• Climate & Macro‑Risk Scenarios</li>
              <li style={{ "margin-bottom": "0.5rem" }}>• Competitive Benchmarking</li>
              <li style={{ "margin-bottom": "0.5rem" }}>• Market Opportunity Analysis</li>
            </ul>
            <a href="/strategic-command-center" class="btn btn-outline">Learn More</a>
          </div>
          <div class="solution-visual">
            <NetworkGraph />
          </div>
        </div>

        {/* Solution 2 */}
        <div class="solution-row reverse reveal-slide">
          <div class="solution-content">
            <h3 style={{ "margin-bottom": "1rem" }}>AI RISK ADVISOR PLATFORM</h3>
            <p style={{ "margin-bottom": "2rem" }}>Predict, monitor, and mitigate financial risks before they impact your business.</p>
            <ul class="font-mono" style={{ "list-style": "none", "margin-bottom": "2rem", "font-size": "0.875rem" }}>
              <li style={{ "margin-bottom": "0.5rem" }}>• Early Warning System</li>
              <li style={{ "margin-bottom": "0.5rem" }}>• Real‑Time Liquidity Monitoring</li>
              <li style={{ "margin-bottom": "0.5rem" }}>• Automated Mitigation Playbooks</li>
            </ul>
            <a href="/risk-advisor" class="btn btn-outline">Learn More</a>
          </div>
          <div class="solution-visual">
            <RiskChart />
          </div>
        </div>

        {/* Solution 3 */}
        <div class="solution-row reveal-slide">
          <div class="solution-content">
            <h3 style={{ "margin-bottom": "1rem" }}>AI COMPLIANCE CO-PILOT</h3>
            <p style={{ "margin-bottom": "2rem" }}>Turn regulatory burden into strategic advantage. From data to submission.</p>
            <ul class="font-mono" style={{ "list-style": "none", "margin-bottom": "2rem", "font-size": "0.875rem" }}>
              <li style={{ "margin-bottom": "0.5rem" }}>• Pre‑built RegTech Templates (Basel, IFRS 9, AML/KYC)</li>
              <li style={{ "margin-bottom": "0.5rem" }}>• Drag‑and‑Drop Report Builder</li>
              <li style={{ "margin-bottom": "0.5rem" }}>• Granular Data Lineage & Audit Trail</li>
            </ul>
            <a href="/compliance-copilot" class="btn btn-outline">Learn More</a>
          </div>
          <div class="solution-visual">
            <ComplianceVisual />
          </div>
        </div>
      </div>
    </section>
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
          <div key={i} style={{ display: "flex", "align-items": "center", gap: "1rem", "margin-bottom": "1.5rem" }}>
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

