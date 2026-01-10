import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Récupérer toutes les images
export async function GET() {
  try {
    const images = await prisma.image.findMany({
      orderBy: [
        { category: 'asc' },
        { order: 'asc' }
      ]
    })
    
    return NextResponse.json(images)
  } catch (error) {
    console.error('Error fetching images:', error)
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    )
  }
}

// POST - Ajouter une nouvelle image
export async function POST(request) {
  try {
    const body = await request.json()
    const { url, key, name, category } = body
    
    // Obtenir le dernier ordre pour cette catégorie
    const lastImage = await prisma.image.findFirst({
      where: { category },
      orderBy: { order: 'desc' }
    })
    
    const newOrder = lastImage ? lastImage.order + 1 : 0
    
    const image = await prisma.image.create({
      data: {
        url,
        key,
        name,
        category,
        order: newOrder
      }
    })
    
    return NextResponse.json(image, { status: 201 })
  } catch (error) {
    console.error('Error creating image:', error)
    return NextResponse.json(
      { error: 'Failed to create image' },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour l'ordre des images ou une image individuelle
export async function PUT(request) {
  try {
    const body = await request.json()
    
    // Si c'est un tableau d'images, mettre à jour l'ordre
    if (body.images) {
      const { images } = body
      
      // Mettre à jour l'ordre de toutes les images
      await Promise.all(
        images.map((img, index) =>
          prisma.image.update({
            where: { id: img.id },
            data: { order: index }
          })
        )
      )
      
      return NextResponse.json({ success: true })
    }
    
    // Sinon, mettre à jour une image individuelle (catégorie, etc.)
    const { id, category } = body
    
    if (!id) {
      return NextResponse.json(
        { error: 'Image ID is required' },
        { status: 400 }
      )
    }
    
    const updatedImage = await prisma.image.update({
      where: { id },
      data: { category }
    })
    
    return NextResponse.json(updatedImage)
  } catch (error) {
    console.error('Error updating image:', error)
    return NextResponse.json(
      { error: 'Failed to update image' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer une image
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Image ID is required' },
        { status: 400 }
      )
    }
    
    await prisma.image.delete({
      where: { id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting image:', error)
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    )
  }
}
