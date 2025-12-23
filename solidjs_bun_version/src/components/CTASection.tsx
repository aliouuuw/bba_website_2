export default function CTASection() {
  const ctaItems = [
    {
      id: 1,
      title: "Unlock Your Free Strategy Assessment",
      description: "Get personalized insights into your financial operations",
      primaryCTA: "Unlock Your Free Strategy Assessment",
      secondaryCTA: "Watch a 3-Minute Platform Overview",
      secondaryLink: "https://youtu.be/LSYX7cMhsYI?si=dqiD97aEZ2c1L6CK",
      context: "Homepage / Hero",
    },
    {
      id: 2,
      title: "AI Strategic Command Center",
      description: "Transform your strategic planning with real-time insights",
      primaryCTA: "Get Your 48-Hour Competitive Analysis",
      secondaryCTA: "Download the Strategy Leader's Playbook",
      context: "Product: AI Strategic Command Center",
    },
    {
      id: 3,
      title: "AI Risk Advisor",
      description: "Proactive risk management and compliance monitoring",
      primaryCTA: "Request Your 72-Hour Portfolio Diagnostic",
      secondaryCTA: "View a Sample Risk Audit Report",
      context: "Product: AI Risk Advisor",
    },
    {
      id: 4,
      title: "AI Compliance Co-Pilot",
      description: "Streamline your compliance workflows",
      primaryCTA: "See a Live Compliance Workflow Demo",
      secondaryCTA: "Access Our RegTech Template Library",
      context: "Product: AI Compliance Co-Pilot",
    },
  ];

  return (
    <section class="cta-section" style={{ padding: "5rem 0", background: "var(--color-white)" }}>
      <div class="container">
        <div style={{ "text-align": "center", "margin-bottom": "4rem" }}>
          <h2 style={{ "font-size": "2.5rem", color: "var(--color-navy)", "font-weight": "700", "margin-bottom": "1rem" }}>
            Ready to Transform Your Operations?
          </h2>
          <p style={{ "font-size": "1.125rem", color: "#475569", "max-width": "600px", margin: "0 auto" }}>
            Take the first step towards data-driven decision making
          </p>
        </div>

        <div style={{ display: "grid", "grid-template-columns": "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          {ctaItems.map(item => (
            <div
              style={{
                background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                padding: "2rem",
                "border-radius": "12px",
                "border": "1px solid #e2e8f0",
                transition: "all 0.3s ease",
              }}
              class="cta-card"
            >
              <p style={{ "font-size": "0.75rem", color: "#64748B", "text-transform": "uppercase", "letter-spacing": "0.05em", "font-weight": "600", "margin-bottom": "0.5rem" }}>
                {item.context}
              </p>
              <h3 style={{ "font-size": "1.25rem", color: "var(--color-navy)", "font-weight": "700", "margin-bottom": "1rem" }}>
                {item.title}
              </h3>
              <p style={{ color: "#475569", "margin-bottom": "1.5rem", "line-height": "1.6" }}>
                {item.description}
              </p>

              <div style={{ display: "flex", "flex-direction": "column", gap: "1rem" }}>
                <button
                  style={{
                    background: "var(--color-navy)",
                    color: "white",
                    padding: "0.75rem 1.5rem",
                    "border-radius": "6px",
                    border: "none",
                    "font-weight": "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  class="btn-primary"
                >
                  {item.primaryCTA}
                </button>
                <a
                  href={item.secondaryLink || "#"}
                  style={{
                    color: "var(--color-navy)",
                    "text-decoration": "none",
                    "font-weight": "600",
                    "text-align": "center",
                    padding: "0.75rem 1.5rem",
                    transition: "all 0.3s ease",
                  }}
                  class="btn-secondary"
                >
                  {item.secondaryCTA}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
