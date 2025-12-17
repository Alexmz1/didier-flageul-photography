"use client"
import { useState, useEffect } from 'react'

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [photos, setPhotos] = useState([])
  
  // Mapper les catégories de l'admin vers les IDs de la galerie
  const categoryMap = {
    "Mariages": "wedding",
    "Portraits": "portrait",
    "Famille": "family",
    "Événements": "event",
    "Commercial": "commercial"
  }
  
  const categories = [
    { id: 'all', name: 'Toutes' },
    { id: 'wedding', name: 'Mariages' },
    { id: 'portrait', name: 'Portraits' },
    { id: 'family', name: 'Famille' },
    { id: 'event', name: 'Événements' },
    { id: 'commercial', name: 'Commercial' }
  ]

  // Photos par défaut si aucune image n'est uploadée
  const defaultPhotos = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "wedding",
      title: "Mariage romantique",
      span: "col-span-2 row-span-2"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "couple",
      title: "Séance couple",
      span: "col-span-1 row-span-1"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "portrait",
      title: "Portrait artistique",
      span: "col-span-1 row-span-2"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "family",
      title: "Famille heureuse",
      span: "col-span-1 row-span-1"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "wedding",
      title: "Détails mariage",
      span: "col-span-1 row-span-1"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "couple",
      title: "Engagement",
      span: "col-span-2 row-span-1"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1556103255-4443dbae8e5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "portrait",
      title: "Portrait naturel",
      span: "col-span-1 row-span-1"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "family",
      title: "Maternité",
      span: "col-span-1 row-span-2"
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "wedding",
      title: "Cérémonie",
      span: "col-span-2 row-span-1"
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "couple",
      title: "Moment intime",
      span: "col-span-1 row-span-1"
    },
    {
      id: 11,
      src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "portrait",
      title: "Portrait élégant",
      span: "col-span-1 row-span-1"
    },
    {
      id: 12,
      src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "family",
      title: "Joie familiale",
      span: "col-span-1 row-span-1"
    }
  ]

  // Charger les images depuis le localStorage
  useEffect(() => {
    const savedImages = localStorage.getItem("gallery-images")
    if (savedImages) {
      const allImages = JSON.parse(savedImages)
      
      // Filtrer les images Hero (elles ne vont pas dans la galerie)
      const galleryImages = allImages
        .filter(img => img.category !== "Hero (Page d'accueil)")
        .map((img, index) => ({
          id: `uploaded-${index}`,
          src: img.url,
          category: categoryMap[img.category] || "wedding",
          title: img.name || img.category,
        }))
      
      setPhotos(galleryImages)
    } else {
      setPhotos([])
    }
  }, [])

  const filteredPhotos = selectedCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory)

  return (
    <main className="min-h-screen bg-white pt-36">
      {/* Hero Section */}
      <section className="py-32 bg-gray-50 text-center">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-light text-slate-800 mb-8" 
              style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
            Galerie
          </h1>
          <div className="w-24 h-px bg-slate-300 mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Découvrez une sélection de mes travaux les plus récents, témoins de moments 
            uniques et d'émotions authentiques capturés avec passion.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 uppercase tracking-[0.15em] text-sm font-light transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-slate-800 text-white'
                    : 'border border-slate-300 text-slate-600 hover:border-slate-800 hover:text-slate-800'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          {filteredPhotos.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-500 font-light text-xl mb-4">Aucune image dans cette catégorie</p>
              <p className="text-slate-400 font-light text-sm">Ajoutez des images depuis l'admin</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredPhotos.map((photo) => (
                <div key={photo.id} className="w-full">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-8" 
                style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
              Témoignages
            </h2>
            <div className="w-16 h-px bg-slate-300 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 text-center space-y-4">
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <div className="text-4xl text-slate-300">"</div>
              <p className="text-slate-600 italic leading-relaxed text-left">
                Un excellent moment passé en compagnie de Didier ! Très professionnel, tout en restant chaleureux, 
                il a su mettre en place une atmosphère conviviale et détendue dès le premier instant. On se sent 
                à l'aise et en confiance, ce qui donne lieu à un magnifique travail. Un vrai plaisir du début à la fin !
                <br/><strong>Je recommande les yeux fermés !</strong>
              </p>
              <div className="pt-4">
                <div className="font-light text-slate-800">Justine M.</div>
                <div className="text-sm text-slate-500">Il y a 2 mois • Google</div>
              </div>
            </div>
            
            <div className="bg-white p-8 text-center space-y-4">
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <div className="text-4xl text-slate-300">"</div>
              <p className="text-slate-600 italic leading-relaxed text-left">
                Nous avons eu la chance d'avoir Didier qui est venu photographier notre famille lors d'un anniversaire. 
                Des photos posées mais aussi des photos volées prises sur l'instant ont été faites. Toujours disponible, 
                de bons conseils, drôle et sympathique, il a su être patient et mettre à l'aise l'ensemble des convives.
                <br/><strong>Nous vous le recommandons sans hésitation !!</strong>
              </p>
              <div className="pt-4">
                <div className="font-light text-slate-800">Alexandra D.</div>
                <div className="text-sm text-slate-500">Séance Famille • Google</div>
              </div>
            </div>
          </div>
          
          {/* Avis mariage en pleine largeur */}
          <div className="mt-8">
            <div className="bg-white p-8 text-center space-y-4 max-w-4xl mx-auto">
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <div className="text-4xl text-slate-300">"</div>
              <p className="text-slate-600 italic leading-relaxed text-left">
                Nos photos de mariage ont été très réussies et ce en dépit de la saison peu commune (décembre). 
                Le style d'images captées par Didier nous a pleinement satisfaits. Elles combinent douceur et luminosité, 
                parfaites pour notre attente. De plus, l'album papier que nous avons commandé est de très belle qualité 
                et les photos très bien agencées dedans.<br/><br/>
                D'un point de vue humain, Didier a su gérer les invités avec intelligence pour réaliser des clichés 
                de façon fluide pour tout le monde tout en gardant à l'esprit le timing des événements prévus.
                <br/><strong>Expérience réussie à tout niveau donc. Merci Didier !</strong>
              </p>
              <div className="pt-4">
                <div className="font-light text-slate-800">Guillaume</div>
                <div className="text-sm text-slate-500">Mariage • Google</div>
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
            Créons votre galerie unique
          </h2>
          <p className="text-lg mb-8 opacity-85">
            Chaque projet est une nouvelle aventure créative. Contactez-moi pour créer 
            des images qui vous ressemblent.
          </p>
          <a 
            href="/contact" 
            className="inline-block border border-white text-white px-12 py-4 uppercase tracking-[0.15em] text-sm font-light hover:bg-white hover:text-slate-800 transition-all duration-500"
          >
            Réserver une séance
          </a>
        </div>
      </section>
    </main>
  )
}
