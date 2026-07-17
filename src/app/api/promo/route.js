import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function withCurrentlyActive(settings) {
  const today = new Date().toISOString().slice(0, 10)
  const startsOk = !settings.startDate || settings.startDate <= today
  const endsOk = !settings.endDate || settings.endDate >= today

  return {
    ...settings,
    isCurrentlyActive: settings.isActive && startsOk && endsOk,
  }
}

// GET - Récupérer les paramètres de la promo
export async function GET() {
  try {
    let settings = await prisma.promoSettings.findFirst()

    // Si aucun paramètre n'existe, en créer un par défaut
    if (!settings) {
      settings = await prisma.promoSettings.create({
        data: {
          isActive: false,
          title: null,
          description: null,
          price: null,
          startDate: null,
          endDate: null
        }
      })
    }

    return NextResponse.json(withCurrentlyActive(settings))
  } catch (error) {
    // ...
    return NextResponse.json(
      { error: 'Failed to fetch promo settings' },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour les paramètres de la promo
export async function PUT(request) {
  try {
    const body = await request.json()
    const { isActive, title, description, price, startDate, endDate } = body
    const data = { isActive, title, description, price, startDate, endDate }

    let settings = await prisma.promoSettings.findFirst()

    if (!settings) {
      settings = await prisma.promoSettings.create({ data })
    } else {
      settings = await prisma.promoSettings.update({
        where: { id: settings.id },
        data
      })
    }

    return NextResponse.json(withCurrentlyActive(settings))
  } catch (error) {
    // ...
    return NextResponse.json(
      { error: 'Failed to update promo settings' },
      { status: 500 }
    )
  }
}
