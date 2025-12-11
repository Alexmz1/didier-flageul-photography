"use client"
import { useState, useEffect } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    eventDate: '',
    shootingType: '',
    location: '',
    message: ''
  })

  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  useEffect(() => {
    if (!isCalendarOpen) return

    const calendar = document.querySelector('calendar-date')
    if (!calendar) return

    const handleDateChange = () => {
      const selectedDate =
        calendar.getAttribute('value') ||
        calendar.value ||
        calendar.selectedDate ||
        null

      if (selectedDate) {
        setFormData(prev => ({
          ...prev,
          eventDate: selectedDate
        }))
        setIsCalendarOpen(false)
      }
    }

    calendar.addEventListener('change', handleDateChange)
    return () => {
      calendar.removeEventListener('change', handleDateChange)
    }
  }, [isCalendarOpen])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    if (name === 'phone') {
      const phoneRegex = /^[0-9\s\-\(\)\+]*$/
      if (!phoneRegex.test(value)) {
        return
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (value) => {
    setFormData(prev => ({
      ...prev,
      shootingType: value
    }))
    setIsSelectOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Veuillez remplir tous les champs obligatoires (marqués par *)')
      return
    }
    
    console.log('Formulaire soumis:', formData)
    alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.')
  }

  const shootingOptions = [
    'Mariage',
    'Séance Couple',
    'Portrait Individuel',
    'Famille & Maternité',
    'Autre'
  ]

  return (
    <main className="min-h-screen bg-white pt-36">
      {/* Hero Section */}
      <section className="py-32 bg-gray-50 text-center">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-light text-slate-800 mb-8" 
              style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
            Contact
          </h1>
          <div className="w-24 h-px bg-slate-300 mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Vous avez un projet en tête ? Je serais ravi d'en discuter avec vous et de vous 
            accompagner dans la création d'images uniques qui vous ressemblent.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20">
            {/* Informations de contact */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-light text-slate-800" 
                    style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
                  Restons en contact
                </h2>
                <div className="w-16 h-px bg-slate-300"></div>
                <p className="text-lg text-slate-600 leading-relaxed">
                  N'hésitez pas à me contacter pour discuter de votre projet. 
                  Je vous répondrai personnellement dans les 24 heures.
                </p>
              </div>

              {/* Coordonnées */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <svg className="w-6 h-6 text-slate-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <div className="font-light text-slate-800 mb-1">Email</div>
                    <a href="mailto:contact@didierflageul.com" className="text-slate-600 hover:text-slate-800 transition-colors">
                      contact@didierflageul.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <svg className="w-6 h-6 text-slate-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <div className="font-light text-slate-800 mb-1">Téléphone</div>
                    <a href="tel:+33778381920" className="text-slate-600 hover:text-slate-800 transition-colors">
                      +33 7 78 38 19 20
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <svg className="w-6 h-6 text-slate-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <div className="font-light text-slate-800 mb-1">Zone d'intervention</div>
                    <div className="text-slate-600">France</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <svg className="w-6 h-6 text-slate-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div className="font-light text-slate-800 mb-1">Horaires</div>
                    <div className="text-slate-600 space-y-1">
                      <div>Lundi à Vendredi : 9h00 - 18h00</div>
                      <div>Samedi : 10h00 - 17h00</div>
                      <div>Dimanche : Fermé</div>
                      <div className="text-sm text-slate-500 mt-2">Séances sur rendez-vous uniquement</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div className="pt-8">
                <h3 className="text-lg font-light text-slate-800 mb-4">Suivez-moi</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-800 hover:text-white transition-all duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-800 hover:text-white transition-all duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div className="bg-gray-50 p-8 lg:p-12">
              <h3 className="text-2xl font-light text-slate-800 mb-8 text-center">
                Envoyez-moi un message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Votre nom *"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-0 py-3 border-0 border-b border-slate-300 bg-transparent text-slate-700 placeholder-slate-400 focus:outline-none focus:border-slate-600"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Votre email *"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-0 py-3 border-0 border-b border-slate-300 bg-transparent text-slate-700 placeholder-slate-400 focus:outline-none focus:border-slate-600"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Votre téléphone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-0 py-3 border-0 border-b border-slate-300 bg-transparent text-slate-700 placeholder-slate-400 focus:outline-none focus:border-slate-600"
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Sujet *"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-0 py-3 border-0 border-b border-slate-300 bg-transparent text-slate-700 placeholder-slate-400 focus:outline-none focus:border-slate-600"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  {/* Champ Date personnalisé */}
                  <div className="relative">
                    <div
                      className="w-full px-0 py-3 border-0 border-b border-slate-300 bg-transparent cursor-pointer"
                      onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                    >
                      <div className="flex justify-between items-center">
                        <span className={formData.eventDate ? 'text-slate-700' : 'text-slate-400'}>
                          {formData.eventDate
                            ? new Date(formData.eventDate + 'T00:00:00').toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })
                            : "Date souhaitée"}
                        </span>
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>

                    {isCalendarOpen && (
                      <>
                        <div className="absolute top-full left-0 z-50 mt-2 bg-white shadow-lg border rounded-md p-4">
                          <calendar-date style={{ color: '#1e293b', fontWeight: 400 }}>
                            <svg aria-label="Previous" className="fill-current size-4 text-slate-600" slot="previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                              <path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5"></path>
                            </svg>
                            <svg aria-label="Next" className="fill-current size-4 text-slate-600" slot="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                              <path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
                            </svg>
                            <calendar-month></calendar-month>
                          </calendar-date>
                        </div>
                        <div className="fixed inset-0 z-40" onClick={() => setIsCalendarOpen(false)} />
                      </>
                    )}
                  </div>

                  {/* Select personnalisé */}
                  <div className="relative">
                    <div
                      className="w-full px-0 py-3 border-0 border-b border-slate-300 bg-transparent cursor-pointer"
                      onClick={() => setIsSelectOpen(!isSelectOpen)}
                    >
                      <div className="flex justify-between items-center">
                        <span className={formData.shootingType ? 'text-slate-700 font-light' : 'text-slate-400 font-light'}>
                          {formData.shootingType || 'Type de séance'}
                        </span>
                        <svg
                          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isSelectOpen ? 'rotate-180' : ''}`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {isSelectOpen && (
                      <>
                        <div className="absolute top-full left-0 right-0 z-50 bg-white shadow-lg border mt-1">
                          {shootingOptions.map((option, index) => (
                            <div
                              key={index}
                              className="px-4 py-3 text-slate-700 hover:bg-slate-100 cursor-pointer border-b border-slate-200 last:border-0 transition-colors duration-150"
                              onClick={() => handleSelectChange(option)}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                        <div className="fixed inset-0 z-40" onClick={() => setIsSelectOpen(false)} />
                      </>
                    )}
                  </div>
                </div>

                <input
                  type="text"
                  name="location"
                  placeholder="Lieu souhaité"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 border-0 border-b border-slate-300 bg-transparent text-slate-700 placeholder-slate-400 focus:outline-none focus:border-slate-600"
                />

                <textarea
                  name="message"
                  placeholder="Votre message *"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-0 py-3 border-0 border-b border-slate-300 bg-transparent text-slate-700 placeholder-slate-400 focus:outline-none focus:border-slate-600 resize-none"
                />

                <div className="pt-8 text-center">
                  <button
                    type="submit"
                    className="bg-slate-800 text-white px-12 py-4 uppercase tracking-[0.15em] text-sm font-light hover:bg-slate-700 transition"
                  >
                    Envoyer le message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-8" 
                style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
              Questions fréquentes
            </h2>
            <div className="w-16 h-px bg-slate-300 mx-auto"></div>
          </div>
          
          <div className="space-y-8">
            <div className="bg-white p-6 lg:p-8">
              <h3 className="text-lg font-light text-slate-800 mb-3">Combien de temps à l'avance dois-je réserver ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Je recommande de réserver au moins 2-3 mois à l'avance, surtout pour les mariages et événements saisonniers. 
                Cependant, n'hésitez pas à me contacter même pour des dates plus proches, je ferai de mon mieux pour vous accommoder.
              </p>
            </div>
            
            <div className="bg-white p-6 lg:p-8">
              <h3 className="text-lg font-light text-slate-800 mb-3">Proposez-vous des forfaits personnalisés ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Absolument ! Chaque projet est unique et mérite une approche sur mesure. 
                Je peux adapter mes services selon vos besoins spécifiques et votre budget.
              </p>
            </div>
            
            <div className="bg-white p-6 lg:p-8">
              <h3 className="text-lg font-light text-slate-800 mb-3">Quel est le délai de livraison des photos ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Pour les séances portraits et couples : 2 semaines. Pour les mariages : 6-8 semaines. 
                Vous recevrez un aperçu dans les 48h suivant la séance.
              </p>
            </div>
            
            <div className="bg-white p-6 lg:p-8">
              <h3 className="text-lg font-light text-slate-800 mb-3">Travaillez-vous avec des photographes associés ?</h3>
              <p className="text-slate-600 leading-relaxed">
                Je travaille personnellement sur tous mes projets pour garantir la cohérence artistique. 
                Pour les grands événements, je peux faire appel à un second photographe de confiance si nécessaire.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
