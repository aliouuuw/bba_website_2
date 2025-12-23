export default function Testimonials(props: { ids?: number[] }) {
  const testimonials = [
    {
      id: 1,
      quote: "We were data-rich but insight-poor. Our strategic planning was a marathon of manual reconciliation. BBA's Command Center didn't just give us a dashboard; it gave us a consensus. For the first time, my entire executive team is looking at the same live numbers and AI-prioritized initiatives. We've cut our strategic review cycles by 60% and redirected capital to opportunities we were previously too slow to see.",
      author: "CFO, Mid-sized Canadian Bank",
      painPoint: "Inefficiency & Strategic Clarity",
    },
    {
      id: 2,
      quote: "Our transformation mandate was clear: become data-driven. The biggest hurdle wasn't the technology—it was changing how people worked. BBA understood that. Their platform integrated into our existing workflows in weeks, not months. They delivered a working 'brain' for our business that our teams actually adopted because it solved their daily problems, not just an IT requirement.",
      author: "SVP & Head of Digital Transformation, A US Regional",
      painPoint: "Implementation Risk & Business Alignment",
    },
    {
      id: 3,
      quote: "In risk, being reactive is a failure. BBA's AI Risk Advisor transformed our posture. Their diagnostic identified a sector concentration we had missed, and their automated monitoring now gives us a 90-day head start on emerging threats. It has fundamentally changed our dialogue with the board from explaining past losses to presenting avoided ones.",
      author: "Chief Risk Officer, A Gulf-based Bank",
      painPoint: "Proactive Risk & Compliance",
    },
  ];

  const visibleTestimonials = () => {
    if (!props.ids || props.ids.length === 0) return testimonials;
    const set = new Set(props.ids);
    return testimonials.filter(t => set.has(t.id));
  };

  return (
    <section class="testimonials" style={{ padding: "5rem 0", background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)" }}>
      <div class="container">
        <div style={{ "text-align": "center", "margin-bottom": "4rem" }}>
          <p style={{ "font-size": "0.875rem", color: "#64748B", "margin-bottom": "1rem", "text-transform": "uppercase", "letter-spacing": "0.05em", "font-weight": "600" }}>
            Trusted by Leaders
          </p>
          <h2 style={{ "font-size": "2.5rem", color: "var(--color-navy)", "font-weight": "700", "margin-bottom": "1rem" }}>
            What Our Clients Say
          </h2>
          <p style={{ "font-size": "1.125rem", color: "#475569", "max-width": "600px", margin: "0 auto" }}>
            Real results from financial leaders who transformed their operations with BBA
          </p>
        </div>

        <div style={{ display: "grid", "grid-template-columns": "repeat(auto-fit, minmax(350px, 1fr))", gap: "2rem", "margin-top": "3rem" }}>
          {visibleTestimonials().map(testimonial => (
            <div
              style={{
                background: "white",
                padding: "2rem",
                "border-radius": "12px",
                "box-shadow": "0 2px 8px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                display: "flex",
                "flex-direction": "column",
              }}
              class="testimonial-card"
            >
              <div style={{ "margin-bottom": "1.5rem" }}>
                <p style={{ "font-size": "0.75rem", color: "#0f766e", background: "#ccfbf1", padding: "0.5rem 1rem", "border-radius": "20px", display: "inline-block", "font-weight": "600" }}>
                  {testimonial.painPoint}
                </p>
              </div>

              <blockquote style={{ "font-size": "1rem", "line-height": "1.6", color: "#1e293b", "margin-bottom": "2rem", "flex-grow": "1", "font-style": "italic" }}>
                "{testimonial.quote}"
              </blockquote>

              <div style={{ "border-top": "1px solid #e2e8f0", "padding-top": "1.5rem" }}>
                <p style={{ color: "var(--color-navy)", "font-weight": "600", "margin-bottom": "0.25rem" }}>
                  {testimonial.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
