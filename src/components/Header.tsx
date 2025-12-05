import { useState, useEffect } from "preact/hooks";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      class="header"
      style={{
        padding: scrolled ? "1rem 0" : "1.5rem 0",
        background: scrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.95)",
        boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.05)" : "none",
      }}
    >
      <div class="container">
        <nav class="nav">
          <a href="/" class="logo">
            <img src="/assets/bba_new_logo_horizontal.png" alt="BBA FinTech" style={{ height: "52px" }} />
          </a>
          <ul class={`nav-links ${menuOpen ? "active" : ""}`}>
            <li><a href="#home" class="nav-link">Home</a></li>
            <li class="nav-dropdown">
              <a href="#solutions" class="nav-link">Solutions</a>
              <ul class="dropdown-menu">
                <li><a href="/strategic-command-center">AI Strategic Command Center</a></li>
                <li><a href="/risk-advisor">AI Risk Advisor Platform</a></li>
                <li><a href="/compliance-copilot">AI Compliance Co-Pilot</a></li>
              </ul>
            </li>
            <li><a href="#about" class="nav-link">About</a></li>
            <li><a href="/blog" class="nav-link">Blog</a></li>
            <li><a href="/contact" class="nav-link">Contact</a></li>
          </ul>
          <a href="/contact" class="btn">Book a Demo</a>
          <button
            class={`hamburger ${menuOpen ? "active" : ""}`}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </div>
    </header>
  );
}
