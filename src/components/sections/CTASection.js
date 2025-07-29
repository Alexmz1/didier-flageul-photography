"use client"
import { useState } from 'react'

export default function ReservationSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    shootingType: '',
    message: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Logique de soumission du formulaire
    console.log('Formulaire soumis:', formData)
  }

  const shootingOptions = [
    'Mariage',
    'Séance Couple',
    'Portrait Individuel',
    'Famille & Maternité',
    'Autre'
  ]

  return (
    <section className="py-32 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Contenu gauche */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-light text-slate-800 leading-tight" 
                  style={{ fontFamily: "'Dancing Script', 'Brush Script MT', cursive" }}>
                Réservez votre photographe Fine Art
              </h2>
              <div className="w-24 h-px bg-slate-300"></div>
            </div>
            
            <div className="space-y-6 text-slate-700 leading-relaxed">
              <p className="text-lg font-light">
                Si ce style photographique vous plaît, n'hésitez pas à me contacter pour obtenir 
                plus d'informations ou un devis personnalisé.
              </p>
              
              <p className="text-lg font-light">
                Je me déplace dans toute la France et l'Europe pour photographier vos moments 
                précieux et serais ravi d'en apprendre plus sur vous et votre projet.
              </p>
              
              <p className="text-lg font-light">
                J'ai hâte de créer avec vous de magnifiques images de votre histoire.
              </p>
            </div>

            {/* Informations de contact */}
            <div className="space-y-4 pt-8">
              <div className="flex items-center space-x-4">
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-slate-600">contact@didierflageul.com</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-slate-600">+33 6 12 34 56 78</span>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="bg-white p-8 lg:p-12">
            <h3 className="text-2xl font-light text-slate-800 mb-8 text-center">
              Demande de renseignements
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Votre nom *"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-0 py-3 border-0 border-b border-slate-300 bg-transparent text-slate-700 placeholder-slate-400 focus:outline-none focus:border-slate-600 transition-colors duration-300"
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Votre email *"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-0 py-3 border-0 border-b border-slate-300 bg-transparent text-slate-700 placeholder-slate-400 focus:outline-none focus:border-slate-600 transition-colors duration-300"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Votre téléphone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-0 py-3 border-0 border-b border-slate-300 bg-transparent text-slate-700 placeholder-slate-400 focus:outline-none focus:border-slate-600 transition-colors duration-300"
                  />
                </div>
                
                <div>
                  <input
                    type="date"
                    name="eventDate"
                    placeholder="Date de l'événement"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    className="w-full px-0 py-3 border-0 border-b border-slate-300 bg-transparent text-slate-700 placeholder-slate-400 focus:outline-none focus:border-slate-600 transition-colors duration-300"
                  />
                </div>
              </div>
              
              <div>
                <select
                  name="shootingType"
                  value={formData.shootingType}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 border-0 border-b border-slate-300 bg-transparent text-slate-700 focus:outline-none focus:border-slate-600 transition-colors duration-300"
                >
                  <option value="">Type de séance souhaité</option>
                  {shootingOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <textarea
                  name="message"
                  placeholder="Parlez-moi de votre projet..."
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-0 py-3 border-0 border-b border-slate-300 bg-transparent text-slate-700 placeholder-slate-400 focus:outline-none focus:border-slate-600 transition-colors duration-300 resize-none"
                />
              </div>
              
              <div className="pt-8 text-center">
                <button
                  type="submit"
                  className="bg-slate-800 text-white px-12 py-4 uppercase tracking-[0.15em] text-sm font-light hover:bg-slate-700 transition-colors duration-500"
                >
                  Envoyer ma demande
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
