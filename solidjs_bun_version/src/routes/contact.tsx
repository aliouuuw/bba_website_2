import { Title } from "@solidjs/meta";
import { createSignal } from "solid-js";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export default function Contact() {
  const [formData, setFormData] = createSignal({ name: "", email: "", company: "", message: "", partnership: false });
  const [status, setStatus] = createSignal<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData()),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", company: "", message: "", partnership: false });
        
        // Trigger download
        const link = document.createElement("a");
        link.href = "/AI_Powered_Strategy_Playbook.pdf";
        link.download = "AI_Powered_Strategy_Playbook.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Title>Contact - BBA FinTech</Title>
      <Header />
      <main>
        <section class="hero" style={{ "min-height": "50vh", "padding-bottom": "4rem" }}>
          <svg class="poly-bg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path class="poly-shape" d="M0,0 L100,0 L100,100 L0,85 Z" fill="rgba(255,255,255,0.02)" />
            <line x1="0" y1="0" x2="100" y2="100" stroke="rgba(255,255,255,0.05)" stroke-width="0.2" />
          </svg>
          <div class="container" style={{ position: "relative", "z-index": 1, "text-align": "center" }}>
            <div class="font-mono text-gradient" style={{ "margin-bottom": "1.5rem", "font-size": "0.875rem", "letter-spacing": "0.05em" }}>// GET IN TOUCH</div>
            <h1 style={{ "margin-bottom": "1.5rem" }}>READY TO <span class="text-gradient">TRANSFORM?</span></h1>
            <p style={{ "max-width": "600px", margin: "0 auto", color: "rgba(255,255,255,0.9)" }}>
              Whether you're looking for a demo, partnership opportunities, or just have a question, we're here to help.
            </p>
          </div>
        </section>

        <section class="contact-section" style={{ padding: "6rem 0", background: "var(--color-white)" }}>
          <div class="container">
            <div class="contact-grid">
              <div class="contact-info">
                <h3 style={{ "margin-bottom": "2rem", color: "var(--color-navy)" }}>Contact Information</h3>
                <div class="info-item">
                  <h4 style={{ "font-size": "1rem", "margin-bottom": "0.5rem" }}>Email Us</h4>
                  <p style={{ "margin-bottom": "2rem" }}><a href="mailto:contact@bbafintech.com" style={{ color: "var(--color-navy)", "text-decoration": "none", "border-bottom": "1px solid var(--color-teal)" }}>contact@bbafintech.com</a></p>
                </div>
                <div class="info-item">
                  <h4 style={{ "font-size": "1rem", "margin-bottom": "0.5rem" }}>Location</h4>
                  <p style={{ "margin-bottom": "2rem" }}>Bahrain FinTech Bay<br />Manama, Kingdom of Bahrain</p>
                </div>
                <div style={{ "margin-top": "4rem", padding: "2rem", background: "var(--color-off-white)", "border-radius": "8px", border: "1px solid rgba(0,0,0,0.05)" }}>
                  <h4 style={{ "margin-bottom": "1rem" }}>Trusted By</h4>
                  <div style={{ "font-weight": 700, "font-size": "1.25rem", color: "var(--color-navy)", "font-family": "var(--font-mono)", "margin-bottom": "1rem" }}>Bahrain FinTech Bay</div>
                  <div style={{ "font-weight": 700, "font-size": "1.25rem", color: "var(--color-navy)", "font-family": "var(--font-mono)" }}>Microsoft Cloud Partner</div>
                </div>
              </div>

              <div class="contact-form-wrapper">
                <form class="contact-form" onSubmit={handleSubmit}>
                  <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" placeholder="John Doe" required value={formData().name} onInput={(e) => setFormData({ ...formData(), name: (e.target as HTMLInputElement).value })} />
                  </div>
                  <div class="form-group">
                    <label for="email">Work Email</label>
                    <input type="email" id="email" placeholder="john@company.com" required value={formData().email} onInput={(e) => setFormData({ ...formData(), email: (e.target as HTMLInputElement).value })} />
                  </div>
                  <div class="form-group">
                    <label for="company">Company Name</label>
                    <input type="text" id="company" placeholder="Acme Corp" value={formData().company} onInput={(e) => setFormData({ ...formData(), company: (e.target as HTMLInputElement).value })} />
                  </div>
                  <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" rows={5} placeholder="How can we help you?" required value={formData().message} onInput={(e) => setFormData({ ...formData(), message: (e.target as HTMLTextAreaElement).value })}></textarea>
                  </div>
                  <div class="form-group checkbox-group">
                    <input type="checkbox" id="partnership" checked={formData().partnership} onChange={(e) => setFormData({ ...formData(), partnership: (e.target as HTMLInputElement).checked })} />
                    <label for="partnership" style={{ "margin-bottom": 0, "font-weight": 400 }}>I am interested in Partnership Opportunities</label>
                  </div>
                  <button type="submit" class="btn" style={{ width: "100%", "margin-top": "1rem" }} disabled={status() === "loading"}>
                    {status() === "loading" ? "Sending..." : "Send Message"}
                  </button>
                  {status() === "success" && (
                    <div style={{ "margin-top": "1rem" }}>
                      <p style={{ color: "var(--color-teal)" }}>Message sent successfully!</p>
                      <p style={{ "font-size": "0.875rem", color: "var(--color-navy)", "margin-top": "0.5rem" }}>
                        Your download of the <strong>AI Powered Strategy Playbook</strong> should start automatically. 
                        If it doesn't, <a href="/AI_Powered_Strategy_Playbook.pdf" download="AI_Powered_Strategy_Playbook.pdf" style={{ color: "var(--color-teal)", "text-decoration": "underline" }}>click here to download manually</a>.
                      </p>
                    </div>
                  )}
                  {status() === "error" && <p style={{ color: "#F43F5E", "margin-top": "1rem" }}>Failed to send. Please try again.</p>}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

