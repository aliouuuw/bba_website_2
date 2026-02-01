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
    <section class="testimonials">
      <div class="container">
        <div class="testimonials-header">
          <p class="testimonials-label">
            Trusted by Leaders
          </p>
          <h2>
            What Our Clients Say
          </h2>
          <p class="testimonials-subtitle">
            Real results from financial leaders who transformed their operations with BBA
          </p>
        </div>

        <div class="testimonials-grid">
          {visibleTestimonials().map(testimonial => (
            <div class="testimonial-card">
              <div class="testimonial-pain-wrapper">
                <p class="testimonial-pain-point">
                  {testimonial.painPoint}
                </p>
              </div>

              <blockquote class="testimonial-quote">
                "{testimonial.quote}"
              </blockquote>

              <div class="testimonial-footer">
                <p class="testimonial-author">
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
