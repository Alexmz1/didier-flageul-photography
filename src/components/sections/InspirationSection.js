"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function GallerySection() {
  const [galleryImages, setGalleryImages] = useState([])

  // Images par défaut si aucune image n'est uploadée
  const defaultImages = [
    { id: 1, src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Portrait femme élégant" },
    { id: 2, src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Couple mariage" },
    { id: 3, src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Famille heureuse" },
    { id: 4, src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Mariage romantique" },
    { id: 5, src: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Portrait artistique" },
    { id: 6, src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Grossesse maternité" },
    { id: 7, src: "https://images.unsplash.com/photo-1521478413868-1bbd982fa4a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Détails mariage" },
    { id: 8, src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Couple engagement" },
    { id: 9, src: "https://images.unsplash.com/photo-1502998070258-dc1338445ac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Portrait naturel" },
    { id: 10, src: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Mariage église" },
    { id: 11, src: "https://images.unsplash.com/photo-1445905595283-21f8ae8a33d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Couple nature" },
    { id: 12, src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Portrait femme douce" },
  ]

  // Fonction pour mélanger un tableau (Fisher-Yates shuffle)
  const shuffleArray = (array) => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  // Charger les images depuis l'API
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await fetch('/api/images')

        if (response.ok) {
          const allImages = await response.json()

          if (allImages.length > 0) {
            const mappedImages = allImages.map((img, index) => ({
              id: img.id || `uploaded-${index}`,
              src: img.url,
              alt: img.name || img.category
            }))

            setGalleryImages(shuffleArray(mappedImages))
          } else {
            setGalleryImages(defaultImages)
          }
        } else {
          setGalleryImages(defaultImages)
        }
      } catch (error) {
        // ...
        setGalleryImages(defaultImages)
      }
    }

    fetchGalleryImages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Liste dupliquée pour un défilement continu et sans coupure
  const marqueeImages = [...galleryImages, ...galleryImages]

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-full mx-auto">
        {/* Titre de section */}
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

        {/* Fresque défilante */}
        {galleryImages.length > 0 && (
          <div className="relative w-full overflow-hidden">
            <div className="flex w-max gap-3 animate-marquee">
              {marqueeImages.map((image, index) => (
                <div
                  key={`${image.id}-${index}`}
                  className="relative flex-shrink-0 w-56 h-72 md:w-64 md:h-80 overflow-hidden group"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    loading="lazy"
                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-105 group-hover:saturate-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Texte en bas de section */}
        <div className="text-center mt-8 px-4 space-y-6">
          <p className="text-sm text-slate-500 italic">
            Chaque détail compte pour créer des photographies élégantes et intemporelles
          </p>
          <a href="/gallery" className="inline-block bg-slate-800 text-white px-8 py-3 uppercase tracking-[0.15em] text-sm font-light hover:bg-slate-700 border border-slate-800 transition-all duration-500">
            Voir toute la galerie
          </a>
        </div>
      </div>
    </section>
  )
}
