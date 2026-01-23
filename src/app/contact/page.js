"use client"
import { useState, useEffect } from 'react'
import CalendarPicker from '@/components/CalendarPicker';
import emailjs from '@emailjs/browser';

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
  // const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isOnVacation, setIsOnVacation] = useState(false)
  const [returnDate, setReturnDate] = useState('')
  const [formStatus, setFormStatus] = useState('') // '', 'success', 'error', 'empty'
  const [formMessage, setFormMessage] = useState('')

  useEffect(() => {
    const fetchVacationSettings = async () => {
      try {
        const response = await fetch('/api/vacation')
        if (response.ok) {
          const data = await response.json()
          setIsOnVacation(data.isActive)
          setReturnDate(data.returnDate || '')
        }
      } catch (error) {
        // ...
      }
    }

    fetchVacationSettings()
  }, [])

  // Calendrier custom remplacé par react-datepicker

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus('')
    setFormMessage('')
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormStatus('empty')
      setFormMessage('Veuillez remplir tous les champs obligatoires (marqués par *)')
      return
    }
    try {
      await emailjs.send(
        'service_208jdfr',
        'template_wlh15rr',
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          eventDate: formData.eventDate,
          shootingType: formData.shootingType,
          location: formData.location,
          message: formData.message,
        },
        'ioGHCK38EjSkPYomj'
      )
      setFormStatus('success')
      setFormMessage('Merci pour votre message ! Il a bien été envoyé, je vous répondrai dans les plus brefs délais.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        eventDate: '',
        shootingType: '',
        location: '',
        message: ''
      })
    } catch (error) {
      setFormStatus('error')
      setFormMessage("Une erreur est survenue lors de l'envoi du message. Veuillez réessayer ou contactez-moi directement par email.")
    }
  }

  const shootingOptions = [
    'Mariage',
    'Séance Couple',
    'Portrait Individuel',
    'Famille & Maternité',
    'Autre'
  ]

  return (
    <>
      <main className="min-h-screen bg-white pt-48">
      {/* Hero Section */}
      <section className="py-32 bg-gray-50 text-center">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-light text-slate-800 mb-8" 
              style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
            Contact
          </h1>
          <div className="w-24 h-px bg-slate-300 mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Vous avez un projet en tête ? <br />
            Je serais ravi d'en discuter avec vous et de vous 
            accompagner dans la création de souvenirs uniques qui vous ressemblent.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Message de congés au-dessus du formulaire */}
          {isOnVacation && (
            <div className="mb-12 bg-amber-100 border-l-4 border-amber-500 text-amber-800 p-6 rounded" role="alert">
              <div className="flex items-start gap-4">
                <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="text-center flex-1">
                  <p className="font-light text-lg">
                    Actuellement en congés. Les réservations sont temporairement suspendues.
                    {returnDate && (
                      <span className="block mt-2">Retour prévu le {new Date(returnDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}.</span>
                    )}
                  </p>
                  <p className="text-sm mt-2">Je reviendrai vers vous dès mon retour. Merci de votre compréhension.</p>
                </div>
              </div>
            </div>
          )}
          
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
                      <div>Lundi&nbsp;: Fermé</div>
                      <div>Mardi&nbsp;: 09:00–12:00, 14:00–19:00</div>
                      <div>Mercredi&nbsp;: 09:00–12:00, 14:00–19:00</div>
                      <div>Jeudi&nbsp;: 09:00–12:00, 14:00–19:00</div>
                      <div>Vendredi&nbsp;: 09:00–12:00, 14:00–19:00</div>
                      <div>Samedi&nbsp;: 09:00–12:00, 14:00–19:30</div>
                      <div>Dimanche&nbsp;: Fermé</div>
                      <div className="text-sm text-slate-500 mt-2">Séances sur rendez-vous uniquement</div>
                    </div>
                  </div>
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
                  <div className="relative flex items-center">
                    <CalendarPicker
                      value={formData.eventDate}
                      onChange={date => setFormData(prev => ({ ...prev, eventDate: date }))}
                      placeholder="Date souhaitée"
                      className="w-full px-0 py-3 border-0 border-b border-slate-300 bg-transparent text-slate-700 placeholder-slate-400 focus:outline-none focus:border-slate-600"
                    />
                  </div>
                  
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

                <div className="pt-8 text-center flex flex-col items-center gap-4">
                  <button
                    type="submit"
                    className="bg-slate-800 text-white px-12 py-4 uppercase tracking-[0.15em] text-sm font-light hover:bg-slate-700 transition"
                  >
                    Envoyer le message
                  </button>
                  {formStatus && (
                    <div className={`mt-2 text-base ${formStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}
                         role="alert">
                      {formMessage}
                    </div>
                  )}
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
    </>
  )
}
