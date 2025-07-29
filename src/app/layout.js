import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Nom du Photographe',
  description: 'Photographe haut de gamme – Réservations en ligne',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white text-navy font-serif">
        <Header />
        <main className="pt-24">{children}</main> {/* pt-24 à cause du header fixed */}
        <Footer />
      </body>
    </html>
  )
}
