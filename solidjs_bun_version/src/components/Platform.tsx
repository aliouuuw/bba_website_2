const features = [
  { icon: "01", title: "DIGITAL ONBOARDING", description: "Powered by Microsoft Power Apps for seamless client integration." },
  { icon: "02", title: "END-TO-END DATA PIPELINE", description: "Integrated data cleaning, ingestion, modeling, validation, reporting, and AI‑driven insights." },
  { icon: "03", title: "AUDIT & COMPLIANCE READY", description: "Full audit trails, report archiving, and secure data lineage." },
];

export default function Platform() {
  return (
    <section id="platform" class="platform">
      <div class="container">
        <div class="feature-grid">
          {features.map((feature, index) => (
            <div class="feature-card reveal-up" style={{ "transition-delay": `${index * 0.1}s` }} key={index}>
              <div class="icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

