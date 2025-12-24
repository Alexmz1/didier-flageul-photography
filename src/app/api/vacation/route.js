import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Récupérer les paramètres de vacances
export async function GET() {
  try {
    let settings = await prisma.vacationSettings.findFirst()
    
    // Si aucun paramètre n'existe, en créer un par défaut
    if (!settings) {
      settings = await prisma.vacationSettings.create({
        data: {
          isActive: false,
          returnDate: null
        }
      })
    }
    
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching vacation settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch vacation settings' },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour les paramètres de vacances
export async function PUT(request) {
  try {
    const body = await request.json()
    const { isActive, returnDate } = body
    
    let settings = await prisma.vacationSettings.findFirst()
    
    if (!settings) {
      settings = await prisma.vacationSettings.create({
        data: { isActive, returnDate }
      })
    } else {
      settings = await prisma.vacationSettings.update({
        where: { id: settings.id },
        data: { isActive, returnDate }
      })
    }
    
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error updating vacation settings:', error)
    return NextResponse.json(
      { error: 'Failed to update vacation settings' },
      { status: 500 }
    )
  }
}
