"use client"

import { useEffect } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  acceptAllConsent,
  getSavedConsent,
  hasConsentDecision,
  rejectAllConsent,
  updateGoogleConsent,
} from "@/lib/cookie-consent"

function showConsentToast() {
  toast(
    <div className="flex flex-col gap-3">
      <p className="text-sm">
        Ta strona używa plików cookie do analizy ruchu i personalizacji
        reklam.{" "}
        <a
          href="https://slickshift.ai/privacy-policy-slickshift"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-900"
        >
          Polityka prywatności
        </a>
      </p>
      <div className="flex justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            rejectAllConsent()
            toast.dismiss("cookie-consent")
          }}
        >
          Tylko niezbędne
        </Button>
        <Button
          size="sm"
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => {
            acceptAllConsent()
            toast.dismiss("cookie-consent")
          }}
        >
          Akceptuj wszystkie
        </Button>
      </div>
    </div>,
    {
      id: "cookie-consent",
      duration: Infinity,
      position: "bottom-right",
    },
  )
}

export default function CookieConsentBanner() {
  useEffect(() => {
    const saved = getSavedConsent()
    if (saved) {
      updateGoogleConsent(saved)
    } else if (!hasConsentDecision()) {
      showConsentToast()
    }
  }, [])

  return null
}
