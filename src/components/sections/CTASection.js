"use client"
import { useState, useEffect } from 'react'

export default function ReservationSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    shootingType: '',
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
    
    // Validation pour le champ téléphone - accepter seulement les chiffres, espaces, tirets et parenthèses
    if (name === 'phone') {
      const phoneRegex = /^[0-9\s\-\(\)\+]*$/
      if (!phoneRegex.test(value)) {
        return // Ne pas mettre à jour si le caractère n'est pas valide
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
    
    // Validation des champs obligatoires
    if (!formData.name || !formData.email || !formData.phone || !formData.eventDate || !formData.shootingType) {
      alert('Veuillez remplir tous les champs obligatoires (marqués par *)')
      return
    }
    
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
          {/* Texte gauche */}
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

            {/* Contact info */}
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

        {/* Formulaire */}
                  <div className="bg-white p-8 lg:p-12">
                    <h3 className="text-2xl font-light text-slate-800 mb-8 text-center">
                      Demande de renseignements
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
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

                      <div className="grid md:grid-cols-2 gap-6">
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Votre téléphone *"
                          value={formData.phone}
                          onChange={handleInputChange}
                          pattern="[0-9\s\-\(\)\+]*"
                          title="Veuillez entrer un numéro de téléphone valide (chiffres, espaces, tirets autorisés)"
                          required
                          className="w-full px-0 py-3 border-0 border-b border-slate-300 bg-transparent text-slate-700 placeholder-slate-400 focus:outline-none focus:border-slate-600"
                        />

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
                                  : "Date de l'événement *"}
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
                      </div>

                      {/* Select personnalisé */}
              <div className="relative">
                <div
                  className="w-full px-0 py-3 border-0 border-b border-slate-300 bg-transparent cursor-pointer"
                  onClick={() => setIsSelectOpen(!isSelectOpen)}
                >
                  <div className="flex justify-between items-center">
                    <span className={formData.shootingType ? 'text-slate-700 font-light' : 'text-slate-400 font-light'}>
                      {formData.shootingType || 'Type de séance souhaité *'}
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

              <textarea
                name="message"
                placeholder="Parlez-moi de votre projet..."
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-0 py-3 border-0 border-b border-slate-300 bg-transparent text-slate-700 placeholder-slate-400 focus:outline-none focus:border-slate-600 resize-none"
              />

              <div className="pt-8 text-center">
                <button
                  type="submit"
                  className="bg-slate-800 text-white px-12 py-4 uppercase tracking-[0.15em] text-sm font-light hover:bg-slate-700 transition"
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
