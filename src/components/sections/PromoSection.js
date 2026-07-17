"use client"

import { useEffect, useState } from 'react'

export default function PromoSection() {
  const [promo, setPromo] = useState(null)

  useEffect(() => {
    const fetchPromo = async () => {
      try {
        const response = await fetch('/api/promo')
        if (response.ok) {
          const data = await response.json()
          if (data.isCurrentlyActive) {
            setPromo(data)
          }
        }
      } catch (error) {
        // ...
      }
    }

    fetchPromo()
  }, [])

  if (!promo) return null

  return (
    <section id="promo" className="py-20 px-4 bg-slate-800 text-white">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
          Offre limitée
        </p>
        <h2
          className="text-3xl md:text-4xl font-light"
          style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
        >
          {promo.title || 'Une offre exclusive'}
        </h2>
        <div className="w-16 h-px bg-slate-500 mx-auto"></div>
        {promo.description && (
          <p className="text-slate-200 font-light leading-relaxed max-w-xl mx-auto">
            {promo.description}
          </p>
        )}
        {promo.price && (
          <p className="text-2xl font-light">{promo.price}</p>
        )}
        <a
          href="/contact"
          className="inline-block bg-white text-slate-800 px-10 py-3 uppercase tracking-[0.15em] text-sm font-light hover:bg-slate-100 transition-all duration-300"
        >
          Réserver maintenant
        </a>
      </div>
    </section>
  )
}
