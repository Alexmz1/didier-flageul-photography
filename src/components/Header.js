"use client"

import Link from "next/link"
import { useState } from "react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <header className="w-full bg-white text-slate-800 fixed top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Top row: Social icons on the right */}
        <div className="flex justify-end mb-4">
          <div className="flex gap-4 text-slate-700 mr-2">
            {/* Instagram */}
            <a href="#" className="hover:text-slate-900 transition-colors duration-300" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            
            {/* Facebook */}
            <a href="#" className="hover:text-slate-900 transition-colors duration-300" aria-label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Main header content */}
        <div className="flex flex-col items-center">
          {/* Logo centré */}
          <Link href="/" className="text-4xl text-slate-800 font-bold tracking-wide mb-4 text-center" 
                style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
            Didier Flageul
          </Link>

          {/* Navigation desktop centrée */}
          <nav className="hidden md:flex gap-8 text-sm uppercase font-light tracking-wider text-slate-700">
            <Link href="/" className="hover:text-slate-900 transition-colors duration-300">Accueil</Link>
            <Link href="/about" className="hover:text-slate-900 transition-colors duration-300">À propos</Link>
            <Link href="/services" className="hover:text-slate-900 transition-colors duration-300">Services</Link>
            <Link href="/gallery" className="hover:text-slate-900 transition-colors duration-300">Galerie</Link>
            <Link href="/contact" className="hover:text-slate-900 transition-colors duration-300">Contact</Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden focus:outline-none text-slate-800 mt-2"
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
        <div className="md:hidden bg-white px-4 py-4 space-y-3 text-sm uppercase font-light text-center border-t border-gray-100 text-slate-700">
          <Link href="/" className="block py-2 hover:text-slate-900 transition-colors duration-300" onClick={toggleMenu}>Accueil</Link>
          <Link href="/about" className="block py-2 hover:text-slate-900 transition-colors duration-300" onClick={toggleMenu}>À propos</Link>
          <Link href="/services" className="block py-2 hover:text-slate-900 transition-colors duration-300" onClick={toggleMenu}>Services</Link>
          <Link href="/gallery" className="block py-2 hover:text-slate-900 transition-colors duration-300" onClick={toggleMenu}>Galerie</Link>
          <Link href="/contact" className="block py-2 hover:text-slate-900 transition-colors duration-300" onClick={toggleMenu}>Contact</Link>
        </div>
      )}
    </header>
  )
}
