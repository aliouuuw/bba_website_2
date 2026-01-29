import { createSignal, Show } from "solid-js";
import { Title } from "@solidjs/meta";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Careers() {
  const [formData, setFormData] = createSignal({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    message: "",
    resume: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [submitStatus, setSubmitStatus] = createSignal<"idle" | "success" | "error">("idle");

  const handleInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    setFormData(prev => ({
      ...prev,
      [target.name]: target.value
    }));
  };

  const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      resume: file
    }));
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const data = formData();
      const response = await fetch('/api/careers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          position: data.position,
          experience: data.experience,
          message: data.message
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit application');
      }
      
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
        message: "",
        resume: null
      });
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Title>Careers - BBA FinTech</Title>
      <Header />
      <main>
        {/* Hero Section */}
        <section class="hero" style={{ "min-height": "50vh", "padding-bottom": "4rem" }}>
          <svg class="poly-bg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path class="poly-shape" d="M0,0 L100,0 L100,100 L0,85 Z" fill="rgba(255,255,255,0.02)" />
          </svg>
          <div class="container">
            <div class="hero-content" style={{ "max-width": "800px", margin: "0 auto", "text-align": "center" }}>
              <div class="font-mono text-gradient" style={{ "margin-bottom": "1.5rem", "font-size": "0.875rem", "letter-spacing": "0.05em" }}>
                // OPPORTUNITIES
              </div>
              <h1 style={{ "margin-bottom": "1.5rem" }}>JOIN THE <span class="text-gradient">FUTURE</span> OF FINTECH</h1>
              <p style={{ margin: "0 auto 2.5rem auto" }}>
                Help us transform financial technology. We're looking for talented individuals who are passionate about innovation and excellence.
              </p>
            </div>
          </div>
        </section>

        {/* Culture & Open Positions */}
        <section style={{ padding: "6rem 0", background: "var(--color-white)" }}>
          <div class="container">
            <div class="pain-grid" style={{ "grid-template-columns": "1fr 1fr" }}>
              <div>
                <h2 style={{ "margin-bottom": "2rem", color: "var(--color-navy)" }}>WHY BBA FINTECH?</h2>
                <div class="space-y-6">
                  <div class="pain-item" style={{ margin: 0, "margin-bottom": "1.5rem" }}>
                    <h4>Innovation-Driven</h4>
                    <p>Work on cutting-edge AI solutions that are reshaping the financial industry.</p>
                  </div>
                  <div class="pain-item" style={{ margin: 0, "margin-bottom": "1.5rem" }}>
                    <h4>Growth Mindset</h4>
                    <p>Continuous learning and professional development in a rapidly evolving field.</p>
                  </div>
                  <div class="pain-item" style={{ margin: 0 }}>
                    <h4>Real Impact</h4>
                    <p>Make a real difference in how global financial institutions make decisions.</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 style={{ "margin-bottom": "2rem", color: "var(--color-navy)" }}>OPEN POSITIONS</h2>
                <div class="space-y-4">
                  {[
                    { title: "Senior Frontend Developer", type: "Full-time • Remote/Hybrid" },
                    { title: "Data Scientist", type: "Full-time • Remote/Hybrid" },
                    { title: "Product Manager", type: "Full-time • Remote/Hybrid" }
                  ].map(pos => (
                    <div class="feature-card" style={{ padding: "2rem", "margin-bottom": "1rem", transform: "none" }}>
                      <h3 style={{ "font-size": "1.25rem", "margin-bottom": "0.5rem" }}>{pos.title}</h3>
                      <p class="font-mono" style={{ "font-size": "0.8rem", color: "var(--color-teal)" }}>{pos.type}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="apply" style={{ padding: "6rem 0", background: "var(--color-off-white)" }}>
          <div class="container">
            <div class="contact-form-wrapper" style={{ "max-width": "800px", margin: "0 auto" }}>
              <div style={{ "text-align": "center", "margin-bottom": "3rem" }}>
                <h2 style={{ "font-size": "2rem", "margin-bottom": "1rem" }}>APPLY NOW</h2>
                <p>Ready to take the next step? Fill out the form below.</p>
              </div>

              <Show when={submitStatus() === "success"}>
                <div class="pain-item" style={{ "border-left-color": "var(--color-teal)", background: "#f0fdfa", "margin-bottom": "2rem" }}>
                  <p style={{ color: "var(--color-navy)", "font-weight": "600" }}>
                    ✓ Thank you for your application! We'll review it and get back to you soon.
                  </p>
                </div>
              </Show>

              <Show when={submitStatus() === "error"}>
                <div class="pain-item" style={{ "border-left-color": "#ef4444", background: "#fef2f2", "margin-bottom": "2rem" }}>
                  <p style={{ color: "#b91c1c", "font-weight": "600" }}>
                    ✕ Something went wrong. Please try again or contact us directly.
                  </p>
                </div>
              </Show>

              <form onSubmit={handleSubmit} class="space-y-6">
                <div class="contact-grid" style={{ "grid-template-columns": "1fr 1fr", gap: "2rem" }}>
                  <div class="form-group">
                    <label for="name">FULL NAME *</label>
                    <input type="text" id="name" name="name" value={formData().name} onInput={handleInputChange} required />
                  </div>
                  <div class="form-group">
                    <label for="email">EMAIL ADDRESS *</label>
                    <input type="email" id="email" name="email" value={formData().email} onInput={handleInputChange} required />
                  </div>
                </div>

                <div class="contact-grid" style={{ "grid-template-columns": "1fr 1fr", gap: "2rem" }}>
                  <div class="form-group">
                    <label for="phone">PHONE NUMBER</label>
                    <input type="tel" id="phone" name="phone" value={formData().phone} onInput={handleInputChange} 
                           style={{ width: "100%", padding: "1rem", border: "1px solid #E2E8F0", "border-radius": "6px", background: "#F8FAFC" }} />
                  </div>
                  <div class="form-group">
                    <label for="position">POSITION *</label>
                    <select id="position" name="position" value={formData().position} onInput={handleInputChange} required
                            style={{ width: "100%", padding: "1rem", border: "1px solid #E2E8F0", "border-radius": "6px", background: "#F8FAFC", "font-family": "var(--font-sans)" }}>
                      <option value="">Select a position</option>
                      <option value="Senior Frontend Developer">Senior Frontend Developer</option>
                      <option value="Data Scientist">Data Scientist</option>
                      <option value="Product Manager">Product Manager</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div class="form-group">
                  <label for="experience">YEARS OF EXPERIENCE *</label>
                  <select id="experience" name="experience" value={formData().experience} onInput={handleInputChange} required
                          style={{ width: "100%", padding: "1rem", border: "1px solid #E2E8F0", "border-radius": "6px", background: "#F8FAFC", "font-family": "var(--font-sans)" }}>
                    <option value="">Select experience level</option>
                    <option value="0-2">0-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="resume">RESUME/CV *</label>
                  <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" onChange={handleFileChange} required
                         style={{ width: "100%", padding: "0.75rem", border: "1px solid #E2E8F0", "border-radius": "6px", background: "#F8FAFC" }} />
                  <p class="font-mono" style={{ "font-size": "0.7rem", "margin-top": "0.5rem", opacity: 0.6 }}>// PDF, DOC, OR DOCX ONLY</p>
                </div>

                <div class="form-group">
                  <label for="message">COVER LETTER / ADDITIONAL INFO</label>
                  <textarea id="message" name="message" value={formData().message} onInput={handleInputChange} rows={4}
                            placeholder="Tell us why you're a great fit..." />
                </div>

                <div style={{ "text-align": "center", "margin-top": "3rem" }}>
                  <button type="submit" disabled={isSubmitting()} class="btn" style={{ width: "100%", "max-width": "300px" }}>
                    {isSubmitting() ? "SUBMITTING..." : "SUBMIT APPLICATION"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
