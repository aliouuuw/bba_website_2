export default function Clients() {
  return (
    <section class="clients" style={{ padding: "3rem 0", background: "var(--color-white)", "border-bottom": "1px solid rgba(0,0,0,0.05)" }}>
      <div class="container" style={{ "text-align": "center" }}>
        <p style={{ "font-size": "0.875rem", color: "#64748B", "margin-bottom": "2rem", "text-transform": "uppercase", "letter-spacing": "0.05em", "font-weight": "600" }}>
          Trusted by Regional Banks & Financial Institutions
        </p>
        <div style={{ display: "flex", "justify-content": "center", gap: "4rem", "align-items": "center", "flex-wrap": "wrap", opacity: "0.8" }}>
          <div style={{ "font-weight": "700", "font-size": "1.5rem", color: "var(--color-navy)", "font-family": "var(--font-mono)" }}>Bahrain FinTech Bay</div>
          <div style={{ width: "1px", height: "30px", background: "#cbd5e1" }}></div>
          <div style={{ "font-weight": "700", "font-size": "1.5rem", color: "var(--color-navy)", "font-family": "var(--font-mono)" }}>Microsoft Cloud Partner</div>
        </div>
      </div>
    </section>
  );
}

