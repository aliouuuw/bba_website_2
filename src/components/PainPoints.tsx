export default function PainPoints() {
  return (
    <section class="pain-points">
      <div class="container">
        <div class="pain-grid">
          <div class="reveal-slide">
            <h2 style={{ marginBottom: "2rem" }}>PAIN POINTS WE ADDRESS</h2>
            <p style={{ fontSize: "1.125rem", marginBottom: "2rem" }}>
              BBA FinTech tackles core financial‑sector challenges with advanced advisory and modeling solutions, turning data into decisive action.
            </p>

            <div class="pain-item">
              <h4>1. INEFFICIENCY & PROCESS GAPS</h4>
              <p style={{ marginBottom: "0.5rem" }}>Manual reporting, clunky models, and disconnected systems slow decisions and raise costs.</p>
              <p style={{ color: "var(--color-navy)", fontWeight: "600", fontSize: "0.9rem" }}>
                Our Solution: We optimize and automate core financial processes.
              </p>
            </div>

            <div class="pain-item">
              <h4>2. POOR DATA GOVERNANCE & CONTROL</h4>
              <p style={{ marginBottom: "0.5rem" }}>Siloed, inconsistent data without clear lineage creates distrust and complicates audits.</p>
              <p style={{ color: "var(--color-navy)", fontWeight: "600", fontSize: "0.9rem" }}>
                Our Solution: We provide a unified, secure ecosystem with robust data governance.
              </p>
            </div>

            <div class="pain-item">
              <h4>3. ESCALATING RISK & COMPLIANCE BURDENS</h4>
              <p style={{ marginBottom: "0.5rem" }}>Reactive, manual risk management leads to regulatory exposure and unexpected losses.</p>
              <p style={{ color: "var(--color-navy)", fontWeight: "600", fontSize: "0.9rem" }}>
                Our Solution: We enable proactive risk management and automated compliance.
              </p>
            </div>
          </div>

          <div class="reveal-up" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "2rem" }}>
            <div style={{ background: "var(--color-navy)", padding: "2rem", clipPath: "var(--clip-card)", color: "white" }}>
              <h3 style={{ color: "var(--color-teal)", marginBottom: "1rem" }}>CORE CAPABILITIES</h3>
              <ul class="core-caps-list">
                <li><strong>Scoring Models:</strong> Build and validate robust models for accurate risk assessment.</li>
                <li><strong>Expected Credit Loss & Stress Testing:</strong> Proactive risk management through advanced calculations.</li>
                <li><strong>Balance Sheet Modeling & ALM:</strong> Earnings at Risk, Economic Value at Risk, Liquidity Ratios.</li>
                <li><strong>Funds Transfer Pricing:</strong> Optimize FTP frameworks to enhance profitability.</li>
                <li><strong>Model Risk Management:</strong> Comprehensive validation, testing, and governance.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
