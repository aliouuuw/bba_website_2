import { Show, onMount } from "solid-js";
import { showConsentBanner, acceptAll, rejectAll, openPreferences, initializeConsent } from "../lib/cookieConsent";
import "./CookieBanner.css";

export default function CookieBanner() {
  onMount(() => {
    initializeConsent();
  });

  return (
    <Show when={showConsentBanner()}>
      <div class="cookie-banner-overlay">
        <div class="cookie-banner">
          <div class="cookie-banner-content">
            <h3 class="cookie-banner-title">Cookies</h3>
            <p class="cookie-banner-text">
              This site uses cookies and similar technologies to analyze site traffic, 
              personalize content, understand your interactions with BBA FinTech's marketing 
              communications, and display ads about our products on other sites and apps.{" "}
              <a href="/privacy#cookies" class="cookie-banner-link">Learn more</a>.
            </p>
          </div>
          
          <div class="cookie-banner-actions">
            <button 
              onClick={rejectAll}
              class="cookie-btn cookie-btn-secondary"
              aria-label="Reject all cookies"
            >
              Reject All
            </button>
            <button 
              onClick={openPreferences}
              class="cookie-btn cookie-btn-secondary"
              aria-label="Manage cookie preferences"
            >
              Manage Preferences
            </button>
            <button 
              onClick={acceptAll}
              class="cookie-btn cookie-btn-primary"
              aria-label="Accept all cookies"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
}
