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
    <section class="clients">
      <div class="container">
        <div class="clients-header">
          <p class="clients-label">
            Trusted by Regional Banks & Financial Institutions
          </p>
          <h2>Our Partners</h2>
        </div>
        <div class="partners-grid">
          {partners.map(partner => (
            <div class="partner-logo">
              <img 
                src={partner.logo} 
                alt={partner.name}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

