'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

export default function ImageUploader({ images, onImagesChange, maxFiles = 1, editingImage = null, onCancelEdit = null }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [notification, setNotification] = useState(null)
  const fileInputRef = useRef(null)

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Vérifier la taille (32MB max)
    if (file.size > 32 * 1024 * 1024) {
      showNotification('La photo ne doit pas dépasser 32MB', 'error')
      return
    }

    // Vérifier le type
    if (!file.type.startsWith('image/')) {
      showNotification('Veuillez sélectionner une photo', 'error')
      return
    }

    setSelectedFile(file)
    
    // Créer une prévisualisation
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setUploading(true)

    try {
      // Utiliser notre endpoint d'upload personnalisé
      const formData = new FormData()
      formData.append('file', selectedFile)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Erreur upload:', errorData)
        throw new Error(errorData.error || 'Erreur lors de l\'upload')
      }

      const uploadedFile = await response.json()
      console.log('Image uploadée:', uploadedFile)

      // Si on est en mode édition, supprimer l'ancienne image d'UploadThing
      if (editingImage && editingImage.key) {
        try {
          await fetch('/api/delete-image', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ key: editingImage.key }),
          })
        } catch (error) {
          console.warn('Erreur lors de la suppression de l\'ancienne image:', error)
        }
      }

      // Créer la nouvelle image
      const newImage = {
        url: uploadedFile.url,
        key: uploadedFile.key,
        name: uploadedFile.name || selectedFile.name,
      }

      // En mode édition, on passe juste la nouvelle image
      // En mode ajout, on ajoute à la liste
      if (editingImage) {
        onImagesChange(newImage)
      } else {
        onImagesChange([...images, newImage])
      }

      // Réinitialiser
      setSelectedFile(null)
      setPreviewUrl(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }

      showNotification(editingImage ? 'Image modifiée avec succès !' : 'Image uploadée avec succès !', 'success')
    } catch (error) {
      console.error('Erreur upload:', error)
      showNotification(error.message, 'error')
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = async (index) => {
    const imageToRemove = images[index]
    
    if (!imageToRemove.key) {
      console.error('Pas de clé pour cette image')
      showNotification('Impossible de supprimer cette image (clé manquante)', 'error')
      return
    }

    // Confirmation
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
      return
    }

    try {
      // Supprimer l'image d'UploadThing
      const response = await fetch('/api/delete-image', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key: imageToRemove.key }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de la suppression')
      }

      // Supprimer l'image de la liste
      const newImages = images.filter((_, i) => i !== index)
      onImagesChange(newImages)

      showNotification('Image supprimée avec succès !', 'success')
    } catch (error) {
      console.error('Erreur suppression:', error)
      showNotification(error.message, 'error')
    }
  }

  const cancelSelection = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-8">
      {/* Notification fixe en haut à droite */}
      {notification && (
        <div className={`fixed top-40 right-6 z-50 p-4 shadow-lg max-w-md font-light transition-all ${
          notification.type === 'success' 
            ? 'bg-green-50 border-l-4 border-green-600 text-green-800' 
            : 'bg-red-50 border-l-4 border-red-600 text-red-800'
        }`}>
          {notification.message}
        </div>
      )}
      {/* Affichage de l'image en cours de modification */}
      {editingImage && !previewUrl && (
        <div className="bg-white border border-slate-200 p-6 mb-6">
          <h3 className="text-lg font-light text-slate-700 mb-4 text-center">
            Image actuelle
          </h3>
          <div className="relative w-full h-64 overflow-hidden bg-gray-50">
            <Image
              src={editingImage.url}
              alt="Image à modifier"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-center text-sm text-slate-500 mt-4">
            Sélectionnez une nouvelle photo pour la remplacer
          </p>
        </div>
      )}

      {/* Zone de sélection d'image */}
      {!previewUrl && (editingImage || images.length < maxFiles) && (
        <div className="border-2 border-dashed border-slate-300 p-12 text-center bg-white hover:border-slate-400 transition-colors">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <svg
              className="w-12 h-12 text-slate-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-base font-light text-slate-700 mb-1">
              Sélectionner une photo
            </span>
            <span className="text-sm font-light text-slate-500">
              Maximum 32MB • JPG, PNG, WebP
            </span>
          </label>
        </div>
      )}

      {/* Prévisualisation de l'image sélectionnée */}
      {previewUrl && (
        <div className="bg-white border border-slate-200 p-8">
          <h3 className="text-xl font-light text-slate-800 mb-6 text-center" 
              style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
            Prévisualisation
          </h3>
          <div className="relative w-full h-96 mb-6 overflow-hidden bg-gray-50">
            <Image
              src={previewUrl}
              alt="Prévisualisation"
              fill
              className="object-contain"
            />
          </div>
          <div className="space-y-4">
            <div className="text-center text-sm font-light text-slate-600 space-y-1">
              <p>{selectedFile?.name}</p>
              <p className="text-slate-500">
                {(selectedFile?.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <div className="flex gap-4 justify-center pt-4">
              <button
                type="button"
                onClick={() => {
                  cancelSelection()
                  if (editingImage && onCancelEdit) {
                    onCancelEdit()
                  }
                }}
                className="px-8 py-3 border border-slate-300 text-slate-700 font-light hover:bg-slate-50 transition-colors"
                disabled={uploading}
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleUpload}
                disabled={uploading}
                className="px-8 py-3 bg-slate-800 hover:bg-slate-900 text-white font-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? (
                  <span className="flex items-center gap-2">
                    <span className="loading loading-spinner loading-sm"></span>
                    Envoi en cours...
                  </span>
                ) : (
                  'Envoyer l\'image'
                )}
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  )
}
