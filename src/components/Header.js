"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [promo, setPromo] = useState(null)

  const toggleMenu = () => setIsOpen(!isOpen)

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

  return (
    <header className="w-full bg-slate-800 text-white fixed top-0 z-50 shadow-sm h-auto">
      {promo && (
        <div className="bg-slate-900 border-b border-slate-700">
          <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 text-center">
            <span className="text-xs font-light uppercase tracking-wider">
              {promo.title || 'Offre en cours'}
            </span>
            {promo.price && (
              <span className="text-xs font-light text-slate-300">
                {promo.price}
              </span>
            )}
            <Link
              href="/#promo"
              className="text-xs font-light underline underline-offset-4 hover:text-slate-300 transition-colors"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 py-4">

        {/* Main header content */}
        <div className="flex flex-col items-center">
          {/* Logo centré */}
          <Link href="/" className="text-4xl text-white font-bold tracking-wide mb-4 text-center" 
                style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
            Didier Flageul
          </Link>

          {/* Navigation desktop centrée */}
          <nav className="hidden md:flex gap-8 text-sm uppercase font-light tracking-wider text-white">
            <Link href="/" className="hover:text-slate-300 transition-colors duration-300">Accueil</Link>
            <Link href="/about" className="hover:text-slate-300 transition-colors duration-300">À propos</Link>
            <Link href="/services" className="hover:text-slate-300 transition-colors duration-300">Services</Link>
            <Link href="/gallery" className="hover:text-slate-300 transition-colors duration-300">Galerie</Link>
            <Link href="/partenaires" className="hover:text-slate-300 transition-colors duration-300">Partenaires</Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors duration-300">Contact</Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden focus:outline-none text-white mt-2"
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 px-4 py-4 space-y-3 text-sm uppercase font-light text-center border-t border-gray-700 text-white">
          <Link href="/" className="block py-2 hover:text-slate-300 transition-colors duration-300" onClick={toggleMenu}>Accueil</Link>
          <Link href="/about" className="block py-2 hover:text-slate-300 transition-colors duration-300" onClick={toggleMenu}>À propos</Link>
          <Link href="/services" className="block py-2 hover:text-slate-300 transition-colors duration-300" onClick={toggleMenu}>Services</Link>
          <Link href="/gallery" className="block py-2 hover:text-slate-300 transition-colors duration-300" onClick={toggleMenu}>Galerie</Link>
          <Link href="/partenaires" className="block py-2 hover:text-slate-300 transition-colors duration-300" onClick={toggleMenu}>Partenaires</Link>
          <Link href="/contact" className="block py-2 hover:text-slate-300 transition-colors duration-300" onClick={toggleMenu}>Contact</Link>
        </div>
      )}
    </header>
  )
}
