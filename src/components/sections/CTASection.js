"use client"
import Link from 'next/link'

export default function ReservationSection() {
  return (
    <section className="py-32 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Texte gauche */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-light text-slate-800 leading-tight" 
                  style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
                Réservez votre séance photo
              </h2>
              <div className="w-24 h-px bg-slate-300"></div>
            </div>

            <div className="space-y-6 text-slate-700 leading-relaxed">
              <p className="text-lg font-light">
                Si mon style photographique vous plaît, n'hésitez pas à me contacter pour obtenir 
                plus d'informations ou un devis personnalisé.
              </p>
              <p className="text-lg font-light">
                Je me déplace dans toute la France pour immortaliser vos moments précieux 
                et serais ravi d'échanger avec vous sur votre projet.
              </p>
              <p className="text-lg font-light">
                J'ai hâte de créer avec vous des images uniques qui racontent votre histoire.
              </p>
            </div>

            {/* Contact info */}
            <div className="space-y-4 pt-8">
              <div className="flex items-center space-x-4">
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:contact@didierflageul.com" className="text-slate-600 hover:text-slate-800 transition-colors">
                  contact@didierflageul.com
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+33778381920" className="text-slate-600 hover:text-slate-800 transition-colors">
                  +33 7 78 38 19 20
                </a>
              </div>
            </div>
          </div>

          {/* Call to Action - droite */}
          <div className="bg-white p-8 lg:p-12 text-center">
            <div className="space-y-8">
              <h3 className="text-3xl font-light text-slate-800" 
                  style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
                Parlons de votre projet
              </h3>
              
              <div className="w-16 h-px bg-slate-300 mx-auto"></div>
              
              <p className="text-lg text-slate-600 leading-relaxed">
                Chaque projet est unique et mérite une approche personnalisée. 
                Contactez-moi pour discuter de vos besoins.
              </p>
              
              <div className="space-y-4 pt-4">
                <Link 
                  href="/contact" 
                  className="inline-block bg-slate-800 text-white px-12 py-4 uppercase tracking-[0.15em] text-sm font-light hover:bg-slate-700 transition duration-300"
                >
                  Me contacter
                </Link>
                
                <p className="text-sm text-slate-500">
                  Réponse sous 24h garantie
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
