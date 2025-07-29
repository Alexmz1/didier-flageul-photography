export default function PhotographerSection() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Image du photographe */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Portrait de Didier Flageul"
                className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover"
              />
            </div>
          </div>
          
          {/* Contenu texte */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-light text-slate-800 leading-tight" 
                  style={{ fontFamily: "'Dancing Script', 'Brush Script MT', cursive" }}>
                Photographie
              </h2>
              <h3 className="text-xl uppercase tracking-[0.2em] text-slate-600 font-light">
                Un style artistique
              </h3>
              <div className="w-16 h-px bg-slate-300"></div>
            </div>
            
            <div className="space-y-6 text-slate-700 leading-relaxed">
              <p className="text-lg font-light">
                Je suis Didier Flageul, photographe passionné par la création d'images 
                artistiques et poétiques. Mon approche se concentre sur la lumière, les 
                émotions et les moments authentiques pour capturer la beauté de chaque instant.
              </p>
              
              <p className="text-lg font-light">
                L'idée est de réaliser des images artistiques et poétiques, au-delà du simple 
                reportage documentaire. J'apporte ma propre touche et mon regard unique à 
                chaque prise de vue et retouche.
              </p>
              
              <p className="text-lg font-light">
                La lumière a une grande importance : je recherche des conditions lumineuses 
                mais douces, souvent à contre-jour pour un effet poétique et magique.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
