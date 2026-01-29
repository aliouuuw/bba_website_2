import { openPreferences } from "../lib/cookieConsent";

export default function Footer() {
  const yearValue = new Date().getFullYear();  
  return (
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <img src="/assets/bba_new_logo_horizontal.png" alt="BBA FinTech" style={{ height: "68px" }} />
            <p class="font-mono" style={{ "margin-top": "1rem", "font-size": "0.75rem", opacity: "0.6" }}>
              © {yearValue} BBA FinTech. Empowering Confident Decisions.
            </p>
          </div>
          <div class="footer-links">
            <h4>Links</h4>
            <a href="/privacy">Privacy Policy</a>
            <a href="#" onClick={(e) => { e.preventDefault(); openPreferences(); }}>Cookie Settings</a>
            <a href="/privacy">Terms of Service</a>
            <a href="/careers">Careers</a>
          </div>
          <div class="footer-social">
            <h4>Social</h4>
            <a href="https://www.linkedin.com/company/bba-fintech/?viewAsMember=true" target="_blank" rel="noopener">LinkedIn</a>
            <a href="https://www.youtube.com/@bankingbookanalytics1948" target="_blank" rel="noopener">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

