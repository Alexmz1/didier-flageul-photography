"use client"
import { useState, useEffect } from 'react'

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)
  
const images = [
    { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", alt: "Couple mariage romantique" },
    { src: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", alt: "Portrait femme élégant" },
    { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", alt: "Séance famille lumineuse" },
    { src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", alt: "Mariage" },
    { src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", alt: "Portrait artistique" },
]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [images.length])

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Carousel d'images avec effet Ken Burns */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
              index === currentImage ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover filter brightness-75 contrast-110"
            />
          </div>
        ))}
        {/* Overlay sophistiqué */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
      </div>

      {/* Navigation carousel - flèches latérales plus discrètes */}
      <button
        onClick={prevImage}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 group"
      >
        <svg className="w-4 h-4 group-hover:scale-125 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextImage}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 group"
      >
        <svg className="w-4 h-4 group-hover:scale-125 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Contenu principal */}
      <div className="relative z-20 h-full flex items-center justify-center">
        {/* Section principale centrée */}
        <div className="text-center text-white px-6 max-w-6xl mx-auto">
          {/* Logo/Nom du photographe */}
          <div className="mb-16">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-thin mb-8 tracking-[0.15em] leading-tight" 
                style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
              Didier Flageul
            </h1>
            <div className="w-32 h-px bg-white/70 mx-auto"></div>
          </div>

          {/* Sous-titre */}
          <h2 className="text-lg md:text-xl uppercase tracking-[0.3em] font-light opacity-90">
            Photography
          </h2>
        </div>

        {/* Indicateurs de carousel en bas - numérotés et fonctionnels */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
          <div className="flex space-x-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`relative group transition-all duration-300 ${
                  index === currentImage ? 'text-white' : 'text-white/50 hover:text-white/80'
                }`}
              >
                <span className="block text-sm font-light tracking-wider transition-all duration-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-px bg-white transition-all duration-500 ${
                  index === currentImage ? 'w-10' : 'w-0 group-hover:w-6'
                }`}></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
