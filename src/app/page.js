import {
  HeroSection,
  PhotographerSection,
  GallerySection,
  ShootingSection,
  ReservationSection,
  PromoSection
} from '@/components/sections'

export default function Home() {
  return (
    <main className="bg-white">
      <HeroSection />
      <PromoSection />
      <PhotographerSection />
      <GallerySection />
      <ShootingSection />
      <ReservationSection />
    </main>
  )
}
