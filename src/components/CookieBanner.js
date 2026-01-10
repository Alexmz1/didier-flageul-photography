"use client"

import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookie-consent')
    if (!cookieConsent) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setShowBanner(false)
  }

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Texte */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-sm text-slate-700 font-light leading-relaxed">
              Nous utilisons des cookies pour améliorer votre expérience de navigation et analyser notre trafic. 
              En continuant à utiliser ce site, vous acceptez notre utilisation des cookies.
            </p>
          </div>

          {/* Boutons */}
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={declineCookies}
              className="px-6 py-2.5 text-sm font-light text-slate-700 border border-slate-300 hover:bg-slate-50 transition-colors uppercase tracking-wider"
            >
              Refuser
            </button>
            <button
              onClick={acceptCookies}
              className="px-6 py-2.5 text-sm font-light text-white bg-slate-800 hover:bg-slate-700 transition-colors uppercase tracking-wider"
            >
              Accepter
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
