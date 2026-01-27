import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-10 text-center border-t border-gray-700">
      <div className="max-w-4xl mx-auto px-4 space-y-6 text-sm">
        {/* Logo script dans le footer */}
        <div className="text-2xl text-white font-bold tracking-wide" 
             style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
          Didier Flageul
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 font-light uppercase tracking-wider text-white">
          <Link href="/" className="hover:text-slate-300 transition-colors duration-300">Accueil</Link>
          <Link href="/about" className="hover:text-slate-300 transition-colors duration-300">À propos</Link>
          <Link href="/services" className="hover:text-slate-300 transition-colors duration-300">Services</Link>
          <Link href="/gallery" className="hover:text-slate-300 transition-colors duration-300">Galerie</Link>
          <Link href="/partenaires" className="hover:text-slate-300 transition-colors duration-300">Partenaires</Link>
          <Link href="/contact" className="hover:text-slate-300 transition-colors duration-300">Contact</Link>
        </div>
        
        <p className="text-xs text-slate-300 mt-4">
          &copy; {new Date().getFullYear()} Didier Flageul Photography. Tous droits réservés.
        </p>
      </div>
    </footer>
  )
}
