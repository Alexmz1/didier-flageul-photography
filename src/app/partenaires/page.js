import React from "react";

const partenaires = [
  {
    name: "Influences Sandrine",
    url: "https://www.instagram.com/influences.sandrine",
    description: "Coiffeuse & Makeup Mariée.",
    image: "/partenaires/influences_sandrine.jpg"
  },
  {
    name: "William Animation Association",
    url: "https://www.instagram.com/william_animation_association",
    description: "Animation et organisation d'événements.",
    image: "/partenaires/william_animation_association.jpg"
  },
  {
    name: "Marie Starck",
    url: "https://www.instagram.com/mariestarck/",
    description: "Art Floral : Mariages, événements, moments de vie.",
    image: "/partenaires/marie_starck.jpg"
  }
];

export default function PartenairesPage() {
  return (
    <main className="min-h-screen bg-white pt-48">
      {/* Bandeau titre */}
      <section className="py-32 bg-gray-50 text-center">
        <div className="max-w-5xl mx-auto px-4">
          <h1
            className="text-4xl md:text-6xl font-light text-slate-800 mb-8"
            style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
          >
            Partenaires
          </h1>
          <div className="w-24 h-px bg-slate-300 mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Découvrez les partenaires de Didier Flageul Photography : des professionnels de confiance qui partagent la même passion pour l’excellence et l’accompagnement sur vos événements.
          </p>
        </div>
      </section>

      {/* Grille des partenaires */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-10">
            {partenaires.map((partenaire, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-8 text-center space-y-6 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Cercle image */}
                <div className="w-16 h-16 mx-auto rounded-full overflow-hidden bg-slate-200 flex items-center justify-center">
                  {partenaire.image ? (
                    <img
                      src={partenaire.image}
                      alt={partenaire.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      className="w-8 h-8 text-slate-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  )}
                </div>

                {/* Texte */}
                <div>
                  <h3 className="text-xl font-light text-slate-800 mb-2">
                    {partenaire.name}
                  </h3>

                  <p className="text-slate-600 text-sm mb-4">
                    {partenaire.description}
                  </p>
                </div>

                {/* Bouton */}
                <div className="pt-2">
                  <a
                    href={partenaire.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-slate-800 text-white px-6 py-2 text-sm uppercase tracking-wider hover:bg-slate-700 transition-colors"
                  >
                    Voir le profil Instagram
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
