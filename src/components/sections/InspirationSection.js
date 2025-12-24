"use client"
import { useState, useEffect } from 'react'

export default function GallerySection() {
  const [galleryImages, setGalleryImages] = useState([])
  
  // Images par défaut si aucune image n'est uploadée
  const defaultImages = [
    { 
      id: 1, 
      src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
      alt: "Portrait femme élégant", 
      size: "large" 
    },
    { 
      id: 2, 
      src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
      alt: "Couple mariage", 
      size: "small" 
    },
    { 
      id: 3, 
      src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
      alt: "Famille heureuse", 
      size: "wide" 
    },
    { 
      id: 4, 
      src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
      alt: "Mariage romantique", 
      size: "tall" 
    },
    { 
      id: 5, 
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
      alt: "Portrait artistique", 
      size: "medium" 
    },
    { 
      id: 6, 
      src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
      alt: "Grossesse maternité", 
      size: "small" 
    },
    { 
      id: 7, 
      src: "https://images.unsplash.com/photo-1521478413868-1bbd982fa4a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
      alt: "Détails mariage", 
      size: "large" 
    },
    { 
      id: 8, 
      src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
      alt: "Couple engagement", 
      size: "small" 
    },
    { 
      id: 9, 
      src: "https://images.unsplash.com/photo-1502998070258-dc1338445ac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
      alt: "Portrait naturel", 
      size: "wide" 
    },
    { 
      id: 10, 
      src: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
      alt: "Mariage église", 
      size: "medium" 
    },
    { 
      id: 11, 
      src: "https://images.unsplash.com/photo-1445905595283-21f8ae8a33d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
      alt: "Couple nature", 
      size: "tall" 
    },
    { 
      id: 12, 
      src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
      alt: "Portrait femme douce", 
      size: "small" 
    },
    { 
      id: 13, 
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
      alt: "Mariage bohème", 
      size: "medium" 
    },
    { 
      id: 14, 
      src: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
      alt: "Portrait couple", 
      size: "wide" 
    },
    { 
      id: 15, 
      src: "https://images.unsplash.com/photo-1521747116042-5a810fda9664?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
      alt: "Famille nature", 
      size: "small" 
    }
  ]

  // Tailles disponibles pour la mosaïque
  const sizes = ['large', 'wide', 'tall', 'medium', 'small']

  // Fonction pour mélanger un tableau (Fisher-Yates shuffle)
  const shuffleArray = (array) => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  // Charger les images depuis localStorage et les mélanger
  useEffect(() => {
    const savedImages = localStorage.getItem('gallery-images')
    
    if (savedImages) {
      const allImages = JSON.parse(savedImages)
      
      if (allImages.length > 0) {
        // Mélanger toutes les images (y compris Hero)
        const shuffledImages = shuffleArray(allImages)
        
        // Prendre 15 images (ou moins si pas assez)
        const selectedImages = shuffledImages.slice(0, 15)
        
        // Assigner des tailles aléatoires de façon variée
        const imagesWithSizes = selectedImages.map((img, index) => ({
          id: `uploaded-${index}`,
          src: img.url,
          alt: img.name || img.category,
          size: sizes[index % sizes.length] // Distribution variée des tailles
        }))
        
        setGalleryImages(imagesWithSizes)
      } else {
        setGalleryImages(defaultImages)
      }
    } else {
      setGalleryImages(defaultImages)
    }
  }, [])

  const getSizeClasses = (size) => {
    switch (size) {
      case 'large': return 'col-span-3 row-span-4'
      case 'wide': return 'col-span-3 row-span-2'
      case 'tall': return 'col-span-2 row-span-5'
      case 'medium': return 'col-span-2 row-span-3'
      case 'small': return 'col-span-1 row-span-2'
      default: return 'col-span-1 row-span-1'
    }
  }

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-full mx-auto">
        {/* Titre de section - plus compact */}
        <div className="text-center mb-8 px-4">
          <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-4" 
              style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
            Des images douces et lumineuses
          </h2>
          <div className="w-16 h-px bg-slate-300 mx-auto mb-4"></div>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
            Je cherche toujours à réaliser des images lumineuses tout en conservant des couleurs 
            douces mais naturelles.
          </p>
        </div>

        {/* Grille mosaïque artistique et désordonnée */}
        <div className="grid grid-cols-6 md:grid-cols-9 lg:grid-cols-12 gap-1 auto-rows-[80px] h-[75vh] overflow-hidden">
          {galleryImages.map((image) => (
            <div 
              key={image.id}
              className={`relative group cursor-pointer overflow-hidden ${getSizeClasses(image.size)}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-105 group-hover:saturate-110 shadow-md"
              />
              
              {/* Overlay artistique au hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Texte en bas de section */}
        <div className="text-center mt-8 px-4 space-y-6">
          <p className="text-sm text-slate-500 italic">
            Chaque détail compte pour créer des photographies élégantes et intemporelles
          </p>
          <a href="/gallery" className="inline-block border border-slate-800 text-slate-800 px-8 py-3 uppercase tracking-[0.15em] text-sm font-light hover:bg-slate-800 hover:text-white transition-all duration-500">
            Voir toute la galerie
          </a>
        </div>
      </div>
    </section>
  )
}
