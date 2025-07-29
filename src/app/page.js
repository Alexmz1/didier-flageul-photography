import { 
  HeroSection, 
  PhotographerSection, 
  GallerySection, 
  ShootingSection, 
  ReservationSection 
} from '@/components/sections'

export default function Home() {
  return (
    <main className="bg-white">
      <HeroSection />
      <PhotographerSection />
      <GallerySection />
      <ShootingSection />
      <ReservationSection />
    </main>
  )
}
