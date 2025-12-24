export default function PhotographerSection() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Image du photographe */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <img
                src="/Didier1.jpeg"
                alt="Portrait de Didier Flageul"
                loading="lazy"
                className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-contain rounded-lg"
              />
            </div>
          </div>
          
          {/* Contenu texte */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-light text-slate-800 leading-tight" 
                  style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
                Didier Flageul
              </h2>
              <h3 className="text-xl uppercase tracking-[0.2em] text-slate-600 font-light">
                Un style artistique
              </h3>
              <div className="w-16 h-px bg-slate-300"></div>
            </div>
            
            <div className="space-y-6 text-slate-700 leading-relaxed">
              <p className="text-lg font-light">
                Je suis Didier Flageul, photographe passionné, spécialisé dans la création d’images artistiques et intemporelles
              </p>
              
              <p className="text-lg font-light">
                Inspiré par les grands studios comme Harcourt, je mets la lumière et l’émotion au cœur de chaque image pour sublimer vos mariages, portraits et books professionnels.
              </p>
              
              <p className="text-lg font-light">
                Chaque photo est pensée comme une œuvre unique, élégante et poétique, qui raconte votre histoire.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
