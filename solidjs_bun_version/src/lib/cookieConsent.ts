import { createSignal } from "solid-js";

export type ConsentCategory = "necessary" | "analytics" | "marketing";

export interface ConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp?: string;
  version?: string;
}

const CONSENT_KEY = "bba_cookie_consent";
const CONSENT_VERSION = "1.0";

const defaultPreferences: ConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

function loadConsent(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;
  
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return null;
    
    const parsed = JSON.parse(stored);
    if (parsed.version !== CONSENT_VERSION) return null;
    
    return parsed;
  } catch {
    return null;
  }
}

function saveConsent(preferences: ConsentPreferences) {
  if (typeof window === "undefined") return;
  
  const toSave = {
    ...preferences,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  
  localStorage.setItem(CONSENT_KEY, JSON.stringify(toSave));
}

export const [consentPreferences, setConsentPreferences] = createSignal<ConsentPreferences | null>(null);

export const [showConsentBanner, setShowConsentBanner] = createSignal(false);

export const [showPreferencesModal, setShowPreferencesModal] = createSignal(false);

export function initializeConsent() {
  if (typeof window === "undefined") return;
  
  const existing = loadConsent();
  setConsentPreferences(existing);
  setShowConsentBanner(!existing);
}

export function acceptAll() {
  const prefs: ConsentPreferences = {
    necessary: true,
    analytics: true,
    marketing: true,
  };
  setConsentPreferences(prefs);
  saveConsent(prefs);
  setShowConsentBanner(false);
  initializeTracking(prefs);
}

export function rejectAll() {
  const prefs: ConsentPreferences = {
    necessary: true,
    analytics: false,
    marketing: false,
  };
  setConsentPreferences(prefs);
  saveConsent(prefs);
  setShowConsentBanner(false);
  clearNonEssentialCookies();
}

export function savePreferences(preferences: ConsentPreferences) {
  setConsentPreferences(preferences);
  saveConsent(preferences);
  setShowConsentBanner(false);
  setShowPreferencesModal(false);
  initializeTracking(preferences);
}

export function openPreferences() {
  setShowPreferencesModal(true);
}

function initializeTracking(preferences: ConsentPreferences) {
  if (typeof window === "undefined") return;
  
  if (preferences.analytics) {
    // Initialize Google Analytics when you add it
    // Example: window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
  }
  
  if (preferences.marketing) {
    // Initialize marketing pixels when you add them
    // Example: window.fbq?.('consent', 'grant');
  }
}

function clearNonEssentialCookies() {
  if (typeof window === "undefined") return;
  
  // Clear analytics/marketing cookies
  const cookies = document.cookie.split(";");
  
  for (const cookie of cookies) {
    const name = cookie.split("=")[0].trim();
    
    // Don't clear necessary cookies (session, auth, consent itself)
    if (name === CONSENT_KEY || name.startsWith("__Host-") || name.startsWith("__Secure-")) {
      continue;
    }
    
    // Clear GA and other tracking cookies
    if (name.startsWith("_ga") || name.startsWith("_gid") || name.startsWith("_fbp") || name.startsWith("_gcl")) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  }
}

export function hasConsent(category: ConsentCategory): boolean {
  const prefs = consentPreferences();
  if (!prefs) return category === "necessary";
  return prefs[category];
}
