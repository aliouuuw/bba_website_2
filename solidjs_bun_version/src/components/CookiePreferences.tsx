import { Show, createSignal } from "solid-js";
import { showPreferencesModal, setShowPreferencesModal, savePreferences, consentPreferences } from "../lib/cookieConsent";
import type { ConsentPreferences } from "../lib/cookieConsent";
import "./CookiePreferences.css";

export default function CookiePreferences() {
  const existing = consentPreferences();
  const [preferences, setPreferences] = createSignal<ConsentPreferences>({
    necessary: true,
    analytics: existing?.analytics ?? false,
    marketing: existing?.marketing ?? false,
  });

  const handleToggle = (category: "analytics" | "marketing") => {
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSave = () => {
    savePreferences(preferences());
  };

  const handleClose = () => {
    setShowPreferencesModal(false);
  };

  return (
    <Show when={showPreferencesModal()}>
      <div class="cookie-modal-overlay" onClick={handleClose}>
        <div class="cookie-modal" onClick={(e) => e.stopPropagation()}>
          <div class="cookie-modal-header">
            <h2 class="cookie-modal-title">Cookie Preferences</h2>
            <button 
              class="cookie-modal-close" 
              onClick={handleClose}
              aria-label="Close preferences"
            >
              ×
            </button>
          </div>

          <div class="cookie-modal-body">
            <p class="cookie-modal-intro">
              We use cookies to enhance your experience, analyze site traffic, and personalize content. 
              You can choose which types of cookies to allow below.
            </p>

            <div class="cookie-category">
              <div class="cookie-category-header">
                <div class="cookie-category-info">
                  <h3 class="cookie-category-title">Strictly Necessary</h3>
                  <p class="cookie-category-description">
                    Essential for the website to function properly. These cannot be disabled.
                  </p>
                </div>
                <div class="cookie-toggle cookie-toggle-disabled">
                  <input 
                    type="checkbox" 
                    checked 
                    disabled 
                    id="necessary"
                    class="cookie-toggle-input"
                  />
                  <label for="necessary" class="cookie-toggle-label">Always Active</label>
                </div>
              </div>
            </div>

            <div class="cookie-category">
              <div class="cookie-category-header">
                <div class="cookie-category-info">
                  <h3 class="cookie-category-title">Analytics</h3>
                  <p class="cookie-category-description">
                    Help us understand how visitors interact with our website by collecting and reporting information anonymously.
                  </p>
                </div>
                <div class="cookie-toggle">
                  <input 
                    type="checkbox" 
                    checked={preferences().analytics}
                    onChange={() => handleToggle("analytics")}
                    id="analytics"
                    class="cookie-toggle-input"
                  />
                  <label for="analytics" class="cookie-toggle-label cookie-toggle-switch"></label>
                </div>
              </div>
            </div>

            <div class="cookie-category">
              <div class="cookie-category-header">
                <div class="cookie-category-info">
                  <h3 class="cookie-category-title">Marketing</h3>
                  <p class="cookie-category-description">
                    Used to track visitors across websites to display relevant ads and measure campaign effectiveness.
                  </p>
                </div>
                <div class="cookie-toggle">
                  <input 
                    type="checkbox" 
                    checked={preferences().marketing}
                    onChange={() => handleToggle("marketing")}
                    id="marketing"
                    class="cookie-toggle-input"
                  />
                  <label for="marketing" class="cookie-toggle-label cookie-toggle-switch"></label>
                </div>
              </div>
            </div>
          </div>

          <div class="cookie-modal-footer">
            <button 
              onClick={handleSave}
              class="cookie-btn cookie-btn-primary"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
}
