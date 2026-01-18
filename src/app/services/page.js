import Image from 'next/image'

export default function Services() {
  const services = [
    {
      id: "mariage",
      title: "Mariage",
      description: "Immortalisez votre journée unique.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "À partir de 2500€",
      features: [
        "Séance couple romantique",
        "Photos retouchées",
        "Clé USB personnalisée",
        "Délai de livraison : 6 semaines"
      ]
    },
    {
      id: "seance-couple",
      title: "Séance Couple",
      description: "Capturez la complicité et l'amour dans un cadre naturel et poétique.",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "À partir de 450€",
      features: [
        "1h30 de séance photo",
        "Conseils stylisme",
        "Photos retouchées",
        "Délai de livraison : 2 semaines"
      ]
    },
    {
      id: "portrait-individuel",
      title: "Portrait Individuel",
      description: "Révélez votre personnalité à travers des portraits artistiques et authentiques, pour un book ou simplement vos réseaux sociaux.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "À partir de 350€",
      features: [
        "1h de séance photo",
        "Plusieurs tenues possibles",
        "Photos retouchées",
        "Délai de livraison : 2 semaines"
      ]
    },
    {
      id: "famille-maternite",
      title: "Famille & Maternité",
      description: "Immortalisez les moments précieux de votre famille avec tendresse.",
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "À partir de 400€",
      features: [
        "1h30 de séance photo",
        "En extérieur ou à domicile",
        "Photos retouchées",
        "Délai de livraison : 2 semaines"
      ]
    }
  ]

  return (
    <main className="min-h-screen bg-white pt-48">
      {/* Hero Section */}
      <section className="py-32 bg-gray-50 text-center">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-light text-slate-800 mb-8" 
              style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
            Mes Services
          </h1>
          <div className="w-24 h-px bg-slate-300 mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Je propose une gamme variée de services, chacun adapté à vos besoins 
            spécifiques et réalisé avec le même souci du détail et la même passion artistique.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid gap-16">
            {services.map((service, index) => (
              <div key={index} id={service.id} className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center scroll-mt-48 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={800}
                    height={500}
                    loading="lazy"
                    className="w-full h-[400px] lg:h-[500px] object-cover"
                  />
                </div>
                
                {/* Contenu */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-4" 
                        style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
                      {service.title}
                    </h2>
                    <div className="w-16 h-px bg-slate-300 mb-6"></div>
                    <p className="text-lg text-slate-600 leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-light text-slate-800">Ce qui est inclus :</h3>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-slate-600">
                          <svg className="w-4 h-4 text-slate-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4">
                    <div className="text-2xl font-light text-slate-800 mb-4">{service.price}</div>
                    <a 
                      href="/contact"
                      className="inline-block bg-slate-800 text-white px-8 py-3 uppercase tracking-[0.15em] text-sm font-light hover:bg-slate-700 transition-all duration-300"
                    >
                      Demander un devis
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-8" 
                style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
              Mon processus
            </h2>
            <div className="w-16 h-px bg-slate-300 mx-auto mb-8"></div>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Chaque projet suit un processus créatif pensé pour garantir des résultats exceptionnels 
              et une expérience mémorable.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-slate-800 text-white rounded-full flex items-center justify-center text-xl font-light">1</div>
              <h3 className="text-xl font-light text-slate-800">Consultation</h3>
              <p className="text-slate-600">Discussion de vos attentes et définition du concept artistique.</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-slate-800 text-white rounded-full flex items-center justify-center text-xl font-light">2</div>
              <h3 className="text-xl font-light text-slate-800">Préparation</h3>
              <p className="text-slate-600">Planification détaillée, repérage des lieux et conseils stylisme.</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-slate-800 text-white rounded-full flex items-center justify-center text-xl font-light">3</div>
              <h3 className="text-xl font-light text-slate-800">Séance Photo</h3>
              <p className="text-slate-600">Capture des moments avec attention aux détails et à l'émotion.</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-slate-800 text-white rounded-full flex items-center justify-center text-xl font-light">4</div>
              <h3 className="text-xl font-light text-slate-800">Post-production</h3>
              <p className="text-slate-600">Retouche artistique et livraison de votre galerie privée.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white text-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-light mb-6" 
              style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
            Prêt à commencer votre projet ?
          </h2>
          <p className="text-lg mb-8 opacity-85">
            Contactez-moi pour discuter de vos besoins et recevoir un devis personnalisé.
          </p>
          <a 
            href="/contact"
            className="inline-block bg-slate-800 text-white px-12 py-4 uppercase tracking-[0.15em] text-sm font-light hover:bg-slate-700 border border-slate-800 transition-all duration-500"
          >
            Demander un devis
          </a>
        </div>
      </section>
    </main>
  )
}
