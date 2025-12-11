"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Playfair_Display, Cormorant_Garamond } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
});

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await signIn("credentials", {
      password,
      redirect: false,
    });

    setIsLoading(false);

    if (result?.error) {
      setError("Mot de passe incorrect");
    } else {
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gray-50 pt-36 pb-12 ${playfair.variable} ${cormorant.variable}`}>
      <div className="w-full max-w-md px-6">
        {/* En-tête élégante */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-light text-slate-800 mb-4" 
              style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
            Admin
          </h1>
          <div className="w-24 h-px bg-slate-300 mx-auto mb-4"></div>
          <p className="text-lg text-slate-600 font-light">
            Espace de gestion des images
          </p>
        </div>

        {/* Carte de connexion */}
        <div className="bg-white p-8 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                className="w-full px-0 py-3 pr-10 border-0 border-b border-slate-300 bg-transparent text-slate-700 placeholder-slate-400 focus:outline-none focus:border-slate-600 font-light"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-3 text-slate-400 hover:text-slate-600 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-600 p-4">
                <p className="text-red-600 text-sm font-light">{error}</p>
              </div>
            )}

            <div className="text-center">
              <button 
                type="submit" 
                className="bg-slate-800 text-white px-12 py-4 uppercase tracking-[0.15em] text-sm font-light hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? "Connexion..." : "Se connecter"}
              </button>
            </div>
          </form>
        </div>

        {/* Note de sécurité */}
        <p className="text-center mt-8 text-sm text-slate-500 font-light">
          Accès réservé aux administrateurs
        </p>
      </div>
    </div>
  );
}
