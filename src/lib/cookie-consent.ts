type ConsentState = {
  analytics_storage: "granted" | "denied"
  ad_storage: "granted" | "denied"
  ad_user_data: "granted" | "denied"
  ad_personalization: "granted" | "denied"
}

const CONSENT_KEY = "COOKIE_CONSENT_STATE"

export function getSavedConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    if (!raw) return null
    return JSON.parse(raw) as ConsentState
  } catch {
    return null
  }
}

export function hasConsentDecision(): boolean {
  return getSavedConsent() !== null
}

function saveConsent(state: ConsentState): void {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(state))
  } catch {
    // ignore
  }
}

export function updateGoogleConsent(state: ConsentState): void {
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: state.analytics_storage,
      ad_storage: state.ad_storage,
      ad_user_data: state.ad_user_data,
      ad_personalization: state.ad_personalization,
    })
  }
}

export function acceptAllConsent(): void {
  const state: ConsentState = {
    analytics_storage: "granted",
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
  }
  saveConsent(state)
  updateGoogleConsent(state)
}

export function rejectAllConsent(): void {
  const state: ConsentState = {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  }
  saveConsent(state)
  updateGoogleConsent(state)
}
