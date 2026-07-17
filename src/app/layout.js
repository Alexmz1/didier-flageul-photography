import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import ContactFab from '@/components/ContactFab'
import SessionProvider from '@/components/SessionProvider'
import Script from 'next/script'

export const metadata = {
  title: 'Didier Flageul Photography',
  description: 'Photographe haut de gamme – Réservations en ligne',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/logoDF.jpg" type="image/jpeg" />
      </head>
      <body className="bg-white text-navy font-serif overflow-x-hidden">
        <Script src="https://unpkg.com/cally" strategy="afterInteractive" />
        <SessionProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
          <ContactFab />
        </SessionProvider>
      </body>
    </html>
  )
}
