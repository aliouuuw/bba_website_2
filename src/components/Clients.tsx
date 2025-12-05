export default function Clients() {
  return (
    <section class="clients" style={{ padding: "3rem 0", background: "var(--color-white)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
      <div class="container" style={{ textAlign: "center" }}>
        <p style={{ fontSize: "0.875rem", color: "#64748B", marginBottom: "2rem", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: "600" }}>
          Trusted by Regional Banks & Financial Institutions
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "4rem", alignItems: "center", flexWrap: "wrap", opacity: "0.8" }}>
          <div style={{ fontWeight: "700", fontSize: "1.5rem", color: "var(--color-navy)", fontFamily: "var(--font-mono)" }}>Bahrain FinTech Bay</div>
          <div style={{ width: "1px", height: "30px", background: "#cbd5e1" }}></div>
          <div style={{ fontWeight: "700", fontSize: "1.5rem", color: "var(--color-navy)", fontFamily: "var(--font-mono)" }}>Microsoft Cloud Partner</div>
        </div>
      </div>
    </section>
  );
}
