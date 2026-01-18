import Image from 'next/image'

export default function ShootingSection() {
  const shootingTypes = [
    {
      title: "Mariage",
      description: "Un reportage élégant et lumineux de votre jour J",
      image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      duration: "Journée complète",
      price: "À partir de 2500€",
      link: "/services#mariage"
    },
    {
      title: "Séance Couple", 
      description: "Immortaliser votre amour avec poésie et romantisme",
      image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      duration: "2h",
      price: "À partir de 350€",
      link: "/services#seance-couple"
    },
    {
      title: "Portrait Individuel",
      description: "Révéler votre personnalité à travers des portraits authentiques",
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      duration: "1h30",
      price: "À partir de 280€",
      link: "/services#portrait-individuel"
    },
    {
      title: "Famille & Maternité",
      description: "Capturer les liens précieux et les moments tendres",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      duration: "1h30",
      price: "À partir de 320€",
      link: "/services#famille-maternite"
    }
  ]

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Titre de section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-8" 
              style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
            Mes prestations
          </h2>
          <div className="w-24 h-px bg-slate-300 mx-auto mb-8"></div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
            Chaque séance photo est unique et personnalisée selon vos envies et votre personnalité. 
            Découvrez mes différentes propositions de shooting.
          </p>
        </div>

        {/* Grille des prestations en ligne */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {shootingTypes.map((shooting, index) => (
            <div 
              key={index}
              className="group cursor-pointer bg-white border-r border-slate-200 last:border-r-0 hover:bg-gray-50 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-80">
                <Image
                  src={shooting.image}
                  alt={shooting.title}
                  width={400}
                  height={320}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Contenu */}
              <div className="p-8 text-center space-y-4">
                <h3 className="text-xl font-light text-slate-800 tracking-wide">
                  {shooting.title}
                </h3>
                
                <div className="w-12 h-px bg-slate-300 mx-auto"></div>
                
                <p className="text-sm text-slate-600 leading-relaxed font-light">
                  {shooting.description}
                </p>
                
                <div className="space-y-2 pt-4">
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Durée : {shooting.duration}
                  </p>
                  <p className="text-sm font-light text-slate-700">
                    {shooting.price}
                  </p>
                </div>
                
                <div className="pt-6">
                  <a 
                    href={shooting.link}
                    className="text-xs uppercase tracking-[0.15em] text-slate-800 border-b border-slate-800 pb-1 hover:text-slate-600 hover:border-slate-600 transition-colors duration-300"
                  >
                    En savoir plus
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA bas de section */}
        <div className="text-center mt-20">
          <a href="/services" className="inline-block bg-slate-800 text-white px-12 py-4 uppercase tracking-[0.15em] text-sm font-light hover:bg-slate-700 border border-slate-800 transition-all duration-500">
            Voir tous les services
          </a>
        </div>
      </div>
    </section>
  )
}
