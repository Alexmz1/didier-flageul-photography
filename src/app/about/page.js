export default function About() {
  return (
    <main className="min-h-screen bg-white pt-48">
      {/* Hero Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <img
                  src="/Didier2.jpeg"
                  alt="Didier Flageul au travail"
                  loading="lazy"
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                />
              </div>
            </div>
            
            {/* Contenu */}
                        <div className="order-1 lg:order-2 space-y-8">
                          <div className="space-y-6">
                            <h1 className="text-4xl md:text-5xl font-light text-slate-800 leading-tight" 
                                style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
                              À propos de moi
                            </h1>
                            <div className="w-24 h-px bg-slate-300"></div>
                          </div>
                          
                          <div className="space-y-6 text-slate-700 leading-relaxed">
                            <p className="text-lg font-light">
                              Je m’appelle Didier Flageul.
                              Depuis toujours, la photographie est pour moi une manière de capturer l’essentiel : un regard, une émotion, une atmosphère.
                            </p>
                            
                            <p className="text-lg font-light">
                             Ma démarche s’inspire du cinéma et du portrait classique : travailler les lumières, soigner les détails, rechercher ce moment où tout devient juste.
                            </p>
                            
                            <p className="text-lg font-light">
                              Plus qu’un métier, c’est une rencontre humaine à chaque séance.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Philosophie */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-8" 
              style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
            Ma philosophie
          </h2>
          <div className="w-16 h-px bg-slate-300 mx-auto mb-12"></div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-slate-800">Vision artistique</h3>
              <p className="text-slate-600 leading-relaxed">
                Chaque image doit raconter une histoire et transmettre une émotion authentique.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-slate-800">Maîtrise de la lumière</h3>
              <p className="text-slate-600 leading-relaxed">
                La lumière est mon pinceau pour créer des atmosphères magiques et poétiques.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-slate-800">Approche humaine</h3>
              <p className="text-slate-600 leading-relaxed">
                Je privilégie la connexion humaine pour capturer la véritable essence de mes sujets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Réseaux sociaux */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-8" 
                style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
              Suivez mon univers
            </h2>
            <div className="w-16 h-px bg-slate-300 mx-auto mb-8"></div>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Découvrez mes différents univers photographiques à travers mes comptes Instagram spécialisés. 
              Chaque compte reflète une facette de mon travail et de ma passion.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Instagram Mariages */}
            <div className="bg-white p-8 text-center space-y-6 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-light text-slate-800 mb-2">Mariages</h3>
                <p className="text-slate-600 text-sm mb-4">
                  L'émotion et la magie des plus beaux jours
                </p>
                <a 
                  href="https://www.instagram.com/didier_flageul_photography91/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block text-slate-800 hover:text-slate-600 transition-colors font-light"
                >
                  @didier_flageul_photography91
                </a>
              </div>
              <div className="pt-2">
                <a 
                  href="https://www.instagram.com/didier_flageul_photography91/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-slate-800 text-white px-6 py-2 text-sm uppercase tracking-wider hover:bg-slate-700 transition-colors"
                >
                  Suivre
                </a>
              </div>
            </div>

            {/* Instagram Portraits */}
            <div className="bg-white p-8 text-center space-y-6 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-light text-slate-800 mb-2">Portraits</h3>
                <p className="text-slate-600 text-sm mb-4">
                  L'art de révéler la personnalité unique
                </p>
                <a 
                  href="https://www.instagram.com/didier_flageul_photography/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block text-slate-800 hover:text-slate-600 transition-colors font-light"
                >
                  @didier_flageul_photography
                </a>
              </div>
              <div className="pt-2">
                <a 
                  href="https://www.instagram.com/didier_flageul_photography/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-slate-800 text-white px-6 py-2 text-sm uppercase tracking-wider hover:bg-slate-700 transition-colors"
                >
                  Suivre
                </a>
              </div>
            </div>
          </div>

          {/* Facebook en dessous au centre */}
          <div className="mt-8 flex justify-center">
            <div className="bg-white p-8 text-center space-y-6 hover:shadow-lg transition-shadow duration-300 w-full md:w-1/2 lg:w-1/2">
              <div className="w-16 h-16 mx-auto bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-light text-slate-800 mb-2">Facebook</h3>
                <p className="text-slate-600 text-sm mb-4">
                  Suivez toutes mes actualités
                </p>
                <a 
                  href="https://www.facebook.com/p/Didier-Flageul-Photography-100047715709392/?locale=fr_FR" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block text-slate-800 hover:text-slate-600 transition-colors font-light"
                >
                  Didier Flageul Photography
                </a>
              </div>
              <div className="pt-2">
                <a 
                  href="https://www.facebook.com/p/Didier-Flageul-Photography-100047715709392/?locale=fr_FR" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-slate-800 text-white px-6 py-2 text-sm uppercase tracking-wider hover:bg-slate-700 transition-colors"
                >
                  Suivre
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-light mb-6" 
              style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
            Créons ensemble votre histoire
          </h2>
          <p className="text-lg mb-8 opacity-85">
            Contactez-moi pour discuter de votre projet et découvrir comment nous pouvons 
            créer des photos qui vous ressemblent.
          </p>
          <a 
            href="/contact" 
            className="inline-block border border-white text-white px-12 py-4 uppercase tracking-[0.15em] text-sm font-light hover:bg-white hover:text-slate-800 transition-all duration-500"
          >
            Me contacter
          </a>
        </div>
      </section>
    </main>
  )
}
