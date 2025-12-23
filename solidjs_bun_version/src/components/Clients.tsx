export default function Clients() {
  const partners = [
    { name: "Bahrain FinTech Bay", logo: "/partners/bahrain_fintech_bay.png" },
    { name: "Microsoft Azure", logo: "/partners/Microsoft_Azure_Logo.svg.png" },
    { name: "Microsoft Startups", logo: "/partners/ms_startups_FH.png" },
    { name: "Agent AI", logo: "/partners/agent_ai.png" },
    { name: "BNZ", logo: "/partners/BNZ.jpg" },
    { name: "MUFG", logo: "/partners/mufg.png" },
    { name: "QNB", logo: "/partners/qnb.png" },
    { name: "Natixis", logo: "/partners/natixis.png" },
    { name: "VersaBank", logo: "/partners/versabank.png" },
    { name: "HBC", logo: "/partners/hbc.jpeg" },
    { name: "CCUA", logo: "/partners/ccua.png" },
    { name: "Central 1", logo: "/partners/central1.png" },
    { name: "CIBG", logo: "/partners/cibg.png" },
    { name: "First Ontario", logo: "/partners/firstontario.png" },
    { name: "GRI", logo: "/partners/gri.png" },
    { name: "OCUF", logo: "/partners/ocuf.png" },
  ];

  return (
    <section class="clients" style={{ padding: "4rem 0", background: "var(--color-white)", "border-bottom": "1px solid rgba(0,0,0,0.05)" }}>
      <div class="container">
        <div style={{ "text-align": "center", "margin-bottom": "3rem" }}>
          <p style={{ "font-size": "0.875rem", color: "#64748B", "margin-bottom": "1rem", "text-transform": "uppercase", "letter-spacing": "0.05em", "font-weight": "600" }}>
            Trusted by Regional Banks & Financial Institutions
          </p>
          <h2 style={{ "font-size": "2rem", color: "var(--color-navy)", "font-weight": "700" }}>Our Partners</h2>
        </div>
        <div style={{ display: "flex", "flex-wrap": "wrap", "gap": "2rem", "align-items": "center", "justify-content": "center" }}>
          {partners.map(partner => (
            <div style={{ display: "flex", "align-items": "center", "justify-content": "center", height: "100px", width: "140px", padding: "1rem", background: "rgba(0,0,0,0.02)", "border-radius": "8px", transition: "all 0.3s ease" }} class="partner-logo">
              <img 
                src={partner.logo} 
                alt={partner.name}
                style={{ "max-width": "100%", "max-height": "80px", "object-fit": "contain" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

