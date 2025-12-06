export default function Footer() {
  return (
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <img src="/assets/bba_new_logo_horizontal.png" alt="BBA FinTech" style={{ height: "68px" }} />
            <p class="font-mono" style={{ "margin-top": "1rem", "font-size": "0.75rem", opacity: "0.6" }}>
              © 2025 BBA FinTech. Empowering Confident Decisions.
            </p>
          </div>
          <div class="footer-links">
            <h4>Links</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Careers</a>
          </div>
          <div class="footer-social">
            <h4>Social</h4>
            <a href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn</a>
            <a href="https://youtube.com" target="_blank" rel="noopener">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

