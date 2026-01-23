import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { UTApi } from 'uploadthing/server'

const utapi = new UTApi()

export async function GET() {
  try {
    // Récupérer le nombre total d'images
    const totalImages = await prisma.image.count()
    
    // Récupérer les vraies statistiques d'UploadThing
    let uploadThingStats = {
      used: 0,
      limit: 2048, // 2 GB en MB
      percentage: 0
    }
    
    try {
      const usageInfo = await utapi.getUsageInfo()
      // UploadThing retourne en bytes, convertir en MB
      uploadThingStats.used = Math.round((usageInfo.totalBytes / (1024 * 1024)) * 100) / 100
      uploadThingStats.percentage = Math.round((uploadThingStats.used / uploadThingStats.limit) * 100)
    } catch (error) {
      // ...
      // Fallback sur estimation si l'API échoue
      const heroImages = await prisma.image.count({
        where: { category: "Hero (Page d'accueil)" }
      })
      const otherImages = totalImages - heroImages
      uploadThingStats.used = Math.round(((heroImages * 5) + (otherImages * 0.4)) * 100) / 100
      uploadThingStats.percentage = Math.round((uploadThingStats.used / uploadThingStats.limit) * 100)
    }
    
    // Compter les images par catégorie
    const heroImages = await prisma.image.count({
      where: { category: "Hero (Page d'accueil)" }
    })
    const otherImages = totalImages - heroImages
    
    // Estimation de la base de données Neon (30 MB de base + ~50 KB par image)
    const neonLimit = 512 // 512 MB
    const dbSizeMB = 30 + (totalImages * 0.05)
    
    return NextResponse.json({
      uploadThing: uploadThingStats,
      neon: {
        used: Math.round(dbSizeMB * 100) / 100,
        limit: neonLimit,
        percentage: Math.round((dbSizeMB / neonLimit) * 100)
      },
      images: {
        total: totalImages,
        hero: heroImages,
        other: otherImages
      }
    })
  } catch (error) {
    // ...
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}
