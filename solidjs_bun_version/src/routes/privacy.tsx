import { Title } from "@solidjs/meta";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { openPreferences } from "~/lib/cookieConsent";

export default function Privacy() {
  return (
    <>
      <Title>Privacy & Cookie Policy - BBA FinTech</Title>
      <Header />
      <main>
        <section class="hero" style={{ "min-height": "40vh", "padding-bottom": "3rem" }}>
          <svg class="poly-bg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path class="poly-shape" d="M0,0 L100,0 L100,100 L0,85 Z" fill="rgba(255,255,255,0.02)" />
            <line x1="0" y1="0" x2="100" y2="100" stroke="rgba(255,255,255,0.05)" stroke-width="0.2" />
          </svg>
          <div class="container" style={{ position: "relative", "z-index": 1, "text-align": "center" }}>
            <div class="font-mono text-gradient" style={{ "margin-bottom": "1.5rem", "font-size": "0.875rem", "letter-spacing": "0.05em" }}>// LEGAL</div>
            <h1 style={{ "margin-bottom": "1.5rem" }}>PRIVACY & <span class="text-gradient">COOKIE POLICY</span></h1>
            <p style={{ "max-width": "600px", margin: "0 auto", color: "rgba(255,255,255,0.9)" }}>
              Your privacy matters to us. Learn how we collect, use, and protect your data.
            </p>
          </div>
        </section>

        <section style={{ padding: "4rem 0", background: "var(--color-white)" }}>
          <div class="container" style={{ "max-width": "900px" }}>
            <div style={{ color: "var(--color-navy)", "line-height": "1.8" }}>
              
              <h2 style={{ "margin-top": "3rem", "margin-bottom": "1.5rem", color: "var(--color-navy)" }}>Privacy Policy</h2>
              
              <p style={{ "margin-bottom": "1.5rem" }}>
                <strong>Last Updated:</strong> January 2025
              </p>

              <p style={{ "margin-bottom": "1.5rem" }}>
                BBA FinTech ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you visit our website and use our services.
              </p>

              <h3 style={{ "margin-top": "2rem", "margin-bottom": "1rem", color: "var(--color-navy)" }}>Information We Collect</h3>
              
              <p style={{ "margin-bottom": "1rem" }}><strong>Personal Information:</strong></p>
              <ul style={{ "margin-bottom": "1.5rem", "padding-left": "2rem" }}>
                <li>Name, email address, company name when you contact us</li>
                <li>Information you provide in forms or communications</li>
                <li>Professional information relevant to our services</li>
              </ul>

              <p style={{ "margin-bottom": "1rem" }}><strong>Automatically Collected Information:</strong></p>
              <ul style={{ "margin-bottom": "1.5rem", "padding-left": "2rem" }}>
                <li>IP address, browser type, device information</li>
                <li>Pages visited, time spent, referring URLs</li>
                <li>Cookies and similar tracking technologies (see Cookie Policy below)</li>
              </ul>

              <h3 style={{ "margin-top": "2rem", "margin-bottom": "1rem", color: "var(--color-navy)" }}>How We Use Your Information</h3>
              
              <ul style={{ "margin-bottom": "1.5rem", "padding-left": "2rem" }}>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To send you information about our products and services (with your consent)</li>
                <li>To improve our website and services</li>
                <li>To analyze usage patterns and optimize user experience</li>
                <li>To comply with legal obligations</li>
              </ul>

              <h3 style={{ "margin-top": "2rem", "margin-bottom": "1rem", color: "var(--color-navy)" }}>Data Sharing and Disclosure</h3>
              
              <p style={{ "margin-bottom": "1.5rem" }}>
                We do not sell your personal information. We may share your information with:
              </p>
              
              <ul style={{ "margin-bottom": "1.5rem", "padding-left": "2rem" }}>
                <li><strong>Service Providers:</strong> Third parties who assist us in operating our website and services</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              </ul>

              <h3 style={{ "margin-top": "2rem", "margin-bottom": "1rem", color: "var(--color-navy)" }}>Your Rights (GDPR & Data Protection)</h3>
              
              <p style={{ "margin-bottom": "1rem" }}>If you are in the European Economic Area (EEA), UK, or other jurisdictions with data protection laws, you have the right to:</p>
              
              <ul style={{ "margin-bottom": "1.5rem", "padding-left": "2rem" }}>
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Erasure:</strong> Request deletion of your data</li>
                <li><strong>Restriction:</strong> Limit how we process your data</li>
                <li><strong>Portability:</strong> Receive your data in a structured format</li>
                <li><strong>Object:</strong> Opt out of certain processing activities</li>
                <li><strong>Withdraw Consent:</strong> Revoke consent for data processing at any time</li>
              </ul>

              <p style={{ "margin-bottom": "1.5rem" }}>
                To exercise these rights, contact us at <a href="mailto:contact@bbafintech.com" style={{ color: "var(--color-teal)", "text-decoration": "underline" }}>contact@bbafintech.com</a>.
              </p>

              <h2 id="cookies" style={{ "margin-top": "3rem", "margin-bottom": "1.5rem", color: "var(--color-navy)" }}>Cookie Policy</h2>

              <p style={{ "margin-bottom": "1.5rem" }}>
                This website uses cookies and similar technologies to enhance your experience, analyze site traffic, and personalize content.
              </p>

              <h3 style={{ "margin-top": "2rem", "margin-bottom": "1rem", color: "var(--color-navy)" }}>What Are Cookies?</h3>
              
              <p style={{ "margin-bottom": "1.5rem" }}>
                Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences 
                and understand how you interact with the site.
              </p>

              <h3 style={{ "margin-top": "2rem", "margin-bottom": "1rem", color: "var(--color-navy)" }}>Types of Cookies We Use</h3>

              <div style={{ "margin-bottom": "2rem", padding: "1.5rem", background: "rgba(139, 92, 246, 0.05)", "border-left": "4px solid var(--color-purple)", "border-radius": "4px" }}>
                <h4 style={{ "margin-top": 0, "margin-bottom": "0.75rem", color: "var(--color-navy)" }}>Strictly Necessary Cookies</h4>
                <p style={{ "margin-bottom": "0.5rem" }}><strong>Purpose:</strong> Essential for website functionality</p>
                <p style={{ "margin-bottom": "0.5rem" }}><strong>Examples:</strong> Session management, security, load balancing</p>
                <p style={{ "margin-bottom": "0.5rem" }}><strong>Duration:</strong> Session or up to 1 year</p>
                <p style={{ margin: 0 }}><strong>Legal Basis:</strong> Legitimate interest (cannot be disabled)</p>
              </div>

              <div style={{ "margin-bottom": "2rem", padding: "1.5rem", background: "rgba(139, 92, 246, 0.05)", "border-left": "4px solid var(--color-teal)", "border-radius": "4px" }}>
                <h4 style={{ "margin-top": 0, "margin-bottom": "0.75rem", color: "var(--color-navy)" }}>Analytics Cookies</h4>
                <p style={{ "margin-bottom": "0.5rem" }}><strong>Purpose:</strong> Understand how visitors use our website</p>
                <p style={{ "margin-bottom": "0.5rem" }}><strong>Examples:</strong> Google Analytics (_ga, _gid, _gat)</p>
                <p style={{ "margin-bottom": "0.5rem" }}><strong>Duration:</strong> Up to 2 years</p>
                <p style={{ "margin-bottom": "0.5rem" }}><strong>Third Parties:</strong> Google LLC</p>
                <p style={{ margin: 0 }}><strong>Legal Basis:</strong> Consent (opt-in required)</p>
              </div>

              <div style={{ "margin-bottom": "2rem", padding: "1.5rem", background: "rgba(139, 92, 246, 0.05)", "border-left": "4px solid var(--color-navy)", "border-radius": "4px" }}>
                <h4 style={{ "margin-top": 0, "margin-bottom": "0.75rem", color: "var(--color-navy)" }}>Marketing Cookies</h4>
                <p style={{ "margin-bottom": "0.5rem" }}><strong>Purpose:</strong> Track visitors across websites to display relevant ads</p>
                <p style={{ "margin-bottom": "0.5rem" }}><strong>Examples:</strong> LinkedIn Insight Tag, Meta Pixel (_fbp, _fbc)</p>
                <p style={{ "margin-bottom": "0.5rem" }}><strong>Duration:</strong> Up to 1 year</p>
                <p style={{ "margin-bottom": "0.5rem" }}><strong>Third Parties:</strong> LinkedIn, Meta Platforms</p>
                <p style={{ margin: 0 }}><strong>Legal Basis:</strong> Consent (opt-in required)</p>
              </div>

              <h3 style={{ "margin-top": "2rem", "margin-bottom": "1rem", color: "var(--color-navy)" }}>Managing Your Cookie Preferences</h3>
              
              <p style={{ "margin-bottom": "1rem" }}>
                You can control and manage cookies in several ways:
              </p>

              <ul style={{ "margin-bottom": "1.5rem", "padding-left": "2rem" }}>
                <li>
                  <strong>Cookie Banner:</strong> When you first visit our site, you can accept all, reject all, or customize your preferences
                </li>
                <li>
                  <strong>Cookie Settings:</strong>{" "}
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); openPreferences(); }}
                    style={{ color: "var(--color-teal)", "text-decoration": "underline", cursor: "pointer" }}
                  >
                    Click here to update your cookie preferences
                  </a> at any time
                </li>
                <li>
                  <strong>Browser Settings:</strong> Most browsers allow you to block or delete cookies through their settings
                </li>
              </ul>

              <p style={{ "margin-bottom": "1.5rem" }}>
                <strong>Note:</strong> Blocking certain cookies may impact website functionality and your user experience.
              </p>

              <h3 style={{ "margin-top": "2rem", "margin-bottom": "1rem", color: "var(--color-navy)" }}>Third-Party Links and Services</h3>
              
              <p style={{ "margin-bottom": "1.5rem" }}>
                Our website may contain links to third-party websites and embedded content (e.g., YouTube videos, social media widgets). 
                These third parties have their own privacy policies and cookie practices. We recommend reviewing their policies:
              </p>

              <ul style={{ "margin-bottom": "1.5rem", "padding-left": "2rem" }}>
                <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener" style={{ color: "var(--color-teal)", "text-decoration": "underline" }}>Google Privacy Policy</a></li>
                <li><a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener" style={{ color: "var(--color-teal)", "text-decoration": "underline" }}>LinkedIn Privacy Policy</a></li>
                <li><a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener" style={{ color: "var(--color-teal)", "text-decoration": "underline" }}>Meta Privacy Policy</a></li>
              </ul>

              <h3 style={{ "margin-top": "2rem", "margin-bottom": "1rem", color: "var(--color-navy)" }}>Data Retention</h3>
              
              <p style={{ "margin-bottom": "1.5rem" }}>
                We retain your personal data only as long as necessary for the purposes outlined in this policy or as required by law. 
                Cookie data is retained according to the durations specified above.
              </p>

              <h3 style={{ "margin-top": "2rem", "margin-bottom": "1rem", color: "var(--color-navy)" }}>Contact Us</h3>
              
              <p style={{ "margin-bottom": "1.5rem" }}>
                If you have questions about this Privacy & Cookie Policy or wish to exercise your data protection rights, contact us:
              </p>

              <ul style={{ "margin-bottom": "2rem", "padding-left": "2rem", "list-style": "none" }}>
                <li style={{ "margin-bottom": "0.5rem" }}><strong>Email:</strong> <a href="mailto:contact@bbafintech.com" style={{ color: "var(--color-teal)", "text-decoration": "underline" }}>contact@bbafintech.com</a></li>
                <li style={{ "margin-bottom": "0.5rem" }}><strong>BBA FinTech Corp., The Exchange Tower, 130 King Street West, Suite 1900, Toronto, Ontario M5X 1E3, Canada</strong></li>
                <li style={{ "margin-bottom": "0.5rem" }}><strong>BBA Bahrain FinTech WLL, Bahrain FinTech Bay, Arcapita, 3rd Floor, Kingdom of Bahrain</strong></li>
              </ul>

              <h3 style={{ "margin-top": "2rem", "margin-bottom": "1rem", color: "var(--color-navy)" }}>Changes to This Policy</h3>
              
              <p style={{ "margin-bottom": "2rem" }}>
                We may update this Privacy & Cookie Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. 
                We encourage you to review this policy periodically.
              </p>

              <div style={{ "margin-top": "3rem", padding: "1.5rem", background: "rgba(139, 92, 246, 0.08)", "border-radius": "8px", "text-align": "center" }}>
                <p style={{ margin: 0, "font-weight": 600 }}>
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); openPreferences(); }}
                    style={{ color: "var(--color-purple)", "text-decoration": "underline", cursor: "pointer", "font-size": "1.1rem" }}
                  >
                    Manage Cookie Preferences
                  </a>
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
