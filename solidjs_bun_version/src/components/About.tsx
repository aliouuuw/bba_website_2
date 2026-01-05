import { createSignal, Show } from "solid-js";

export default function About() {
  const [showFounders, setShowFounders] = createSignal(false);

  const founders = [
    {
      name: "Sohail FAROOQ",
      role: "CEO",
      bio:
        "Throughout his 20+ year career, in positions with management responsibility and also as a consultant, Sohail has worked at the forefront of developing analytical solutions using digital technology.",
      imageUrl: "/founders/Sohail.png",
      linkedinUrl: "https://ca.linkedin.com/in/sohail-farooq-mqf-msc-mba-05b4403",
    },
  ];

  return (
    <section id="about" class="about">
      <div class="container">
        <div class="about-content reveal-up" style={{ "text-align": "center" }}>
          <h2 style={{ "margin-bottom": "2rem" }}>EMPOWERING THE DATA-DRIVEN FUTURE OF FINANCE</h2>

          <div style={{ "text-align": "left", "margin-bottom": "3rem" }}>
            <h3 style={{ "font-size": "1.5rem", "margin-bottom": "1rem", color: "var(--color-navy)" }}>OUR VISION</h3>
            <p style={{ "margin-bottom": "2rem" }}>To be the leading strategic partner in AI‑driven intelligence for the financial sector—where every decision is confident, proactive, and impactful.</p>

            <h3 style={{ "font-size": "1.5rem", "margin-bottom": "1rem", color: "var(--color-navy)" }}>OUR MISSION</h3>
            <p style={{ "margin-bottom": "2rem" }}>To empower financial institutions with scalable, intuitive platforms that transform complex data into clear, actionable intelligence, driving automation and strategic advantage.</p>

            <h3 style={{ "font-size": "1.5rem", "margin-bottom": "1rem", color: "var(--color-navy)" }}>OUR STORY: THE DECISION GAP WE LIVED</h3>
            <p style={{ "margin-bottom": "1rem" }}>It started with a late-night spreadsheet and a critical error.</p>
            <p style={{ "margin-bottom": "1rem" }}>In 2018, our founder - a former Chief Risk Officer and a data architect - were leading a transformation project at a mid-sized bank. Their mandate was clear: use data to navigate rising interest rates and new IFRS 9 regulations.</p>
            <p style={{ "margin-bottom": "1rem" }}>After months of work, they presented a beautifully formatted 150-page report to the board. The "what" was perfect - charts, dashboards, variance analyses. But when a board member asked the simple question, "So what do we actually do on Monday?" - the room went silent.</p>
            <p style={{ "margin-bottom": "1rem" }}>The models showed risk, but gave no actionable mitigation plan. The data highlighted inefficiency, but offered no automated fix. They had spent millions and thousands of hours to create... a better rearview mirror.</p>

            <h3 style={{ "font-size": "1.5rem", "margin-bottom": "1rem", color: "var(--color-navy)" }}>The Realization</h3>
            <p style={{ "margin-bottom": "1rem" }}>The financial world wasn't suffering from a lack of data. It was drowning in it. The real crisis was a "Decision Gap" - the exhausting, expensive chasm between seeing a problem and knowing the precise, optimal action to take.</p>

            <h3 style={{ "font-size": "1.5rem", "margin-bottom": "1rem", color: "var(--color-navy)" }}>Our Founding Promise</h3>
            <p style={{ "margin-bottom": "1rem" }}>We founded BBA FinTech not to build another dashboard, but to bridge that gap. We asked a different question: What if software didn't just report problems, but solved them?</p>
            <p style={{ "margin-bottom": "1rem" }}>Our earliest prototype wasn't for a client. It was for ourselves - an intelligent system that ingested regulatory data, diagnosed concentration risk in the commercial portfolio, and spit out three ranked, executable recommendations with projected capital impact. It turned a 3-week analytical slog into a 3-minute decision.</p>

            <h3 style={{ "font-size": "1.5rem", "margin-bottom": "1rem", color: "var(--color-navy)" }}>Why We're Different: We've Sat in Your Chair</h3>
            <p style={{ "margin-bottom": "1rem" }}>We aren't technologists selling to finance. We are financial professionals who built technology. We understand the regulatory pressure before the exam, the frustration of the manual model run, the accountability of signing the quarterly report.</p>
            <p style={{ "margin-bottom": "1rem" }}>That's why every solution we build starts not with an algorithm, but with a question: "What does the person receiving this output need to DO?"</p>

            <h3 style={{ "font-size": "1.5rem", "margin-bottom": "1rem", color: "var(--color-navy)" }}>Your Partner, Not a Vendor</h3>
            <p style={{ "margin-bottom": "1rem" }}>Today, we serve institutions who are tired of vendors that deliver data and leave. They choose a partner who delivers answers and stays - to implement, advise, and ensure those answers drive real business outcomes.</p>
            <p style={{ "margin-bottom": "1rem" }}>We bridge the gap between insight and action. Because in today's complex landscape, you need more than data - you need a strategic partner who has walked your path.</p>

            <p style={{ "margin-bottom": "1rem" }}>Ready to close your Decision Gap?</p>
            <div style={{ "margin-bottom": "2rem", display: "flex", gap: "1rem", "flex-wrap": "wrap" }}>
              <button
                onClick={() => setShowFounders(!showFounders())}
                class="btn"
                style={{
                  background: "var(--color-navy)",
                  color: "white",
                  display: "flex",
                  "align-items": "center",
                  gap: "0.5 vh",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                Meet Our Founders {showFounders() ? "↑" : "↓"}
              </button>
              <a href="/contact" class="btn" style={{ background: "var(--color-teal)", color: "var(--color-navy)", "text-decoration": "none" }}>
                Book a Strategy Session
              </a>
            </div>

            <Show when={showFounders()}>
              <div class="founders-dropdown" style={{
                background: "rgba(255, 255, 255, 0.05)",
                padding: "2rem",
                "border-radius": "8px",
                "margin-top": "1rem",
                "margin-bottom": "2rem",
                border: "1px solid rgba(0, 0, 0, 0.1)"
              }}>
                <div style={{ display: "grid", "grid-template-columns": "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                  {founders.map((founder) => (
                    <div class="founder-card" style={{ display: "flex", gap: "1.5rem", "align-items": "flex-start" }}>
                      <img
                        src={founder.imageUrl}
                        alt={founder.name}
                        style={{
                          width: "120px",
                          height: "120px",
                          "border-radius": "50%",
                          "object-fit": "cover",
                          border: "3px solid var(--color-teal)"
                        }}
                      />
                      <div>
                        <h4 style={{ margin: "0", color: "var(--color-navy)", "font-size": "1.2rem" }}>{founder.name}</h4>
                        <p style={{ margin: "0.2rem 0 1rem", color: "var(--color-teal)", "font-weight": "bold", "font-size": "0.9rem" }}>{founder.role}</p>
                        <p style={{ "font-size": "0.95rem", "line-height": "1.5", "margin-bottom": "1rem" }}>{founder.bio}</p>
                        <a
                          href={founder.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "var(--color-navy)",
                            "text-decoration": "none",
                            display: "inline-flex",
                            "align-items": "center",
                            gap: "0.5rem",
                            "font-weight": "500"
                          }}
                        >
                          LinkedIn ↗
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Show>
          </div>
        </div>
      </div>
    </section>
  );
}

