"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";
import { Playfair_Display, Cormorant_Garamond } from 'next/font/google';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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

const CATEGORIES = [
  "Hero (Page d'accueil)",
  "Mariages",
  "Portraits",
  "Événements",
  "Commercial",
  "Famille",
];

// Composant pour chaque image draggable
function SortableImage({ image, onEdit, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.url });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group overflow-hidden bg-gray-50"
    >
      <img
        src={image.url}
        alt={image.category}
        loading="lazy"
        className="w-full h-64 object-cover transition-opacity duration-300 group-hover:opacity-75"
      />

      {/* Bouton Déplacer - toujours visible en haut à gauche */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 bg-white hover:bg-slate-800 text-slate-800 hover:text-white px-3 py-2 font-light text-sm transition-colors cursor-move flex items-center gap-2 z-10"
        title="Glisser pour réorganiser"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
        </svg>
        Déplacer
      </div>

      {/* Boutons d'action - visibles au survol */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
        <button
          onClick={() => onEdit(image.url)}
          className="bg-white hover:bg-slate-800 text-slate-800 hover:text-white px-4 py-2 font-light text-sm transition-colors"
          title="Modifier l'image"
        >
          Modifier
        </button>
        <button
          onClick={() => onDelete(image.url)}
          className="bg-white hover:bg-red-600 text-slate-800 hover:text-white px-4 py-2 font-light text-sm transition-colors"
          title="Supprimer l'image"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [visibleImagesCount, setVisibleImagesCount] = useState({});
  const [activeTab, setActiveTab] = useState(CATEGORIES[0]);
  const [isOnVacation, setIsOnVacation] = useState(false);
  const [returnDate, setReturnDate] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  const IMAGES_PER_PAGE = 8; // 2 lignes de 4 images

  // Sensors pour le drag & drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // Gérer le drag & drop
  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = images.findIndex((item) => item.url === active.id);
      const newIndex = images.findIndex((item) => item.url === over.id);
      
      const newItems = arrayMove(images, oldIndex, newIndex);
      setImages(newItems);
      
      // Sauvegarder l'ordre dans la BDD
      try {
        await fetch('/api/images', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ images: newItems })
        });
        showNotification('Ordre des images modifié', 'success');
      } catch (error) {
        console.error('Error saving order:', error);
      }
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin");
    }
  }, [status, router]);

  // Charger les images depuis l'API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/images');
        if (response.ok) {
          const data = await response.json();
          setImages(data);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
        showNotification('Erreur lors du chargement des images', 'error');
      }
    };

    fetchImages();
    
    // Initialiser le compteur d'images visibles pour chaque catégorie
    const initialVisible = {};
    CATEGORIES.forEach(cat => {
      initialVisible[cat] = IMAGES_PER_PAGE;
    });
    setVisibleImagesCount(initialVisible);
  }, []);

  // Charger les paramètres de vacances depuis l'API
  useEffect(() => {
    const fetchVacationSettings = async () => {
      try {
        const response = await fetch('/api/vacation');
        if (response.ok) {
          const data = await response.json();
          setIsOnVacation(data.isActive);
          setReturnDate(data.returnDate || '');
        }
      } catch (error) {
        console.error('Error fetching vacation settings:', error);
      }
    };

    fetchVacationSettings();
  }, []);

  useEffect(() => {
    if (!isCalendarOpen) return;

    const calendar = document.querySelector('calendar-date');
    if (!calendar) return;

    const handleDateChange = () => {
      const selectedDate =
        calendar.getAttribute('value') ||
        calendar.value ||
        calendar.selectedDate ||
        null;

      if (selectedDate) {
        handleReturnDateChange(selectedDate);
        setIsCalendarOpen(false);
      }
    };

    calendar.addEventListener('change', handleDateChange);
    return () => {
      calendar.removeEventListener('change', handleDateChange);
    };
  }, [isCalendarOpen]);

  const saveImages = async (newImages) => {
    setImages(newImages);
    // Mettre à jour l'ordre dans la BDD
    try {
      await fetch('/api/images', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: newImages })
      });
    } catch (error) {
      console.error('Error saving images order:', error);
    }
  };

  const loadMoreImages = (category) => {
    setVisibleImagesCount(prev => ({
      ...prev,
      [category]: prev[category] + IMAGES_PER_PAGE
    }));
  };

  const handleVacationToggle = async () => {
    const newStatus = !isOnVacation;
    setIsOnVacation(newStatus);
    
    // Si on désactive le mode congés, effacer la date de retour
    const newReturnDate = newStatus ? returnDate : null;
    if (!newStatus) {
      setReturnDate('');
    }
    
    // Sauvegarder dans la BDD
    try {
      await fetch('/api/vacation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          isActive: newStatus, 
          returnDate: newReturnDate 
        })
      });
      
      showNotification(
        newStatus ? 'Mode congés activé' : 'Mode congés désactivé',
        'success'
      );
    } catch (error) {
      console.error('Error updating vacation settings:', error);
      showNotification('Erreur lors de la mise à jour', 'error');
    }
  };

  const handleReturnDateChange = async (date) => {
    setReturnDate(date);
    
    // Sauvegarder dans la BDD
    try {
      await fetch('/api/vacation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          isActive: isOnVacation, 
          returnDate: date 
        })
      });
    } catch (error) {
      console.error('Error updating return date:', error);
    }
  };

  const handleImagesChange = async (newImages) => {
    // La vérification est maintenant faite dans ImageUploader avant l'upload
    // Ajouter chaque image à la BDD
    try {
      const addedImages = [];
      for (const img of newImages) {
        const response = await fetch('/api/images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: img.url,
            key: img.key,
            name: img.name,
            category: selectedCategory
          })
        });
        
        if (response.ok) {
          const savedImage = await response.json();
          addedImages.push(savedImage);
        }
      }
      
      // Mettre à jour l'état local
      setImages([...images, ...addedImages]);
      showNotification('Image uploadée avec succès !', 'success');
    } catch (error) {
      console.error('Error saving images:', error);
      showNotification('Erreur lors de l\'ajout des images', 'error');
    }
  };

  const handleEditImage = (imageUrl) => {
    const imageToEdit = images.find((img) => img.url === imageUrl);
    if (imageToEdit) {
      setEditingImage(imageToEdit);
      setEditingCategory(imageToEdit.category);
      // Scroll vers la section upload
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSaveEdit = async () => {
    // Si une nouvelle image est sélectionnée, déclencher l'upload
    const uploadButton = document.querySelector('#trigger-upload');
    if (uploadButton) {
      uploadButton.click();
      return;
    }
    
    // Sinon, juste mettre à jour la catégorie si elle a changé
    if (editingImage && editingCategory !== editingImage.category) {
      try {
        setUploading(true);
        const response = await fetch('/api/images', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingImage.id,
            category: editingCategory
          })
        });
        
        if (response.ok) {
          const updatedImage = await response.json();
          const updatedImages = images.map(img => 
            img.id === editingImage.id ? updatedImage : img
          );
          setImages(updatedImages);
          setEditingImage(null);
          setEditingCategory(null);
          showNotification('Catégorie modifiée avec succès !', 'success');
        }
      } catch (error) {
        console.error('Error updating category:', error);
        showNotification('Erreur lors de la modification', 'error');
      } finally {
        setUploading(false);
      }
    } else {
      // Rien à faire, juste fermer
      handleCancelEdit();
    }
  };

  const handleReplaceImage = async (newImage) => {
    if (!editingImage) return;

    try {
      // Supprimer l'ancienne image d'UploadThing
      await fetch('/api/delete-image', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: editingImage.key }),
      });

      // Supprimer de la BDD
      await fetch(`/api/images?id=${editingImage.id}`, {
        method: 'DELETE'
      });

      // Ajouter la nouvelle image
      const response = await fetch('/api/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: newImage.url,
          key: newImage.key,
          name: newImage.name,
          category: editingCategory // Utiliser la catégorie éditée
        })
      });

      if (response.ok) {
        const savedImage = await response.json();
        
        // Mettre à jour l'état local
        const updatedImages = images.map(img => 
          img.id === editingImage.id ? savedImage : img
        );
        setImages(updatedImages);
        setEditingImage(null);
        setEditingCategory(null);
        showNotification('Image remplacée avec succès !', 'success');
      }
    } catch (error) {
      console.error('Error replacing image:', error);
      showNotification('Erreur lors du remplacement de l\'image', 'error');
    }
  };

  const handleCancelEdit = () => {
    setEditingImage(null);
    setEditingCategory(null);
  };

  const handleDelete = async (imageUrl) => {
    const imageToDelete = images.find((img) => img.url === imageUrl);
    
    if (!imageToDelete || !imageToDelete.key) {
      console.error('Image ou clé introuvable');
      showNotification('Impossible de supprimer cette image', 'error');
      return;
    }

    if (!confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
      return;
    }

    try {
      // Supprimer l'image d'UploadThing
      const deleteResponse = await fetch('/api/delete-image', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key: imageToDelete.key }),
      });

      if (!deleteResponse.ok) {
        const errorData = await deleteResponse.json();
        throw new Error(errorData.error || 'Erreur lors de la suppression');
      }

      // Supprimer de la BDD
      await fetch(`/api/images?id=${imageToDelete.id}`, {
        method: 'DELETE'
      });

      // Supprimer de l'état local
      const updatedImages = images.filter((img) => img.url !== imageUrl);
      setImages(updatedImages);

      showNotification('Image supprimée avec succès !', 'success');
    } catch (error) {
      console.error('Erreur suppression:', error);
      showNotification(error.message, 'error');
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className={`min-h-screen bg-white pt-48 pb-12 ${playfair.variable} ${cormorant.variable}`}>
      <div className="w-full">
        {/* Notification globale */}
        {notification && (
          <div className={`fixed top-40 right-6 z-50 p-4 shadow-lg max-w-md font-light transition-all ${
            notification.type === 'success' 
              ? 'bg-green-50 border-l-4 border-green-600 text-green-800' 
              : 'bg-red-50 border-l-4 border-red-600 text-red-800'
          }`}>
            {notification.message}
          </div>
        )}
        {/* En-tête */}
        <div className="p-8 mb-0 max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="flex flex-col gap-6">
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-light text-slate-800 mb-3" 
                    style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
                  Dashboard Admin
                </h1>
                <div className="w-24 h-px bg-slate-300 mx-auto md:mx-0"></div>
              </div>
              
              {/* Checkbox Mode Congés */}
              <div className="flex flex-col items-start gap-3">
                <label htmlFor="vacation-mode" className="flex items-center cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="vacation-mode"
                      checked={isOnVacation}
                      onChange={handleVacationToggle}
                      className="sr-only"
                    />
                    <div 
                      className={`w-6 h-6 border-2 rounded-md flex items-center justify-center transition-all ${
                        isOnVacation
                          ? 'border-slate-800 bg-slate-800' 
                          : 'border-slate-300 group-hover:border-slate-400'
                      }`}
                    >
                      {isOnVacation && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="ml-3 text-sm font-light text-slate-700">
                    Mode congés
                  </span>
                </label>
                
                {isOnVacation && (
                  <div className="w-72">
                    <div className="relative">
                      <div className="text-xs font-light text-slate-600 mb-2">
                        Date de retour :
                      </div>
                      <div
                        className="w-full px-0 py-2 border-0 border-b border-slate-300 bg-transparent cursor-pointer"
                        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                      >
                        <div className="flex justify-between items-center">
                          <span className={`text-sm ${returnDate ? 'text-slate-700' : 'text-slate-400'}`}>
                            {returnDate
                              ? new Date(returnDate + 'T00:00:00').toLocaleDateString('fr-FR', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric'
                                })
                              : "Sélectionner une date"}
                          </span>
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>

                      {isCalendarOpen && (
                        <>
                          <div className="absolute top-full left-0 z-50 mt-2 bg-white shadow-lg border border-slate-300 rounded-md p-4">
                            <calendar-date 
                              class="cally bg-white"
                              value={returnDate}
                              style={{ color: '#1e293b', fontWeight: 400 }}
                            >
                              <svg aria-label="Previous" className="fill-current size-4 text-slate-600" slot="previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5"></path>
                              </svg>
                              <svg aria-label="Next" className="fill-current size-4 text-slate-600" slot="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
                              </svg>
                              <calendar-month></calendar-month>
                            </calendar-date>
                          </div>
                          <div className="fixed inset-0 z-40" onClick={() => setIsCalendarOpen(false)} />
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <button 
              onClick={() => signOut({ callbackUrl: "/admin" })} 
              className="border border-slate-300 text-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-800 font-light px-8 py-3 transition-colors flex items-center gap-2 uppercase tracking-wider text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Déconnexion
            </button>
          </div>
        </div>

        {/* Section Upload */}
        <div className="bg-gray-50 py-16 px-6">
          <div className="max-w-7xl mx-auto">
          {editingImage ? (
            // Mode édition avec layout gauche/droite
            <div>
              <h2 className="text-3xl font-light text-slate-800 mb-8 text-center" 
                  style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
                Modifier la photo
              </h2>
              <div className="w-16 h-px bg-slate-300 mx-auto mb-12"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Image à gauche */}
                <div className="flex flex-col">
                  <ImageUploader
                    images={[]}
                    onImagesChange={handleReplaceImage}
                    maxFiles={1}
                    editingImage={editingImage}
                    onCancelEdit={handleCancelEdit}
                    category={editingCategory}
                    currentImagesCount={0}
                    uploading={uploading}
                    setUploading={setUploading}
                  />
                </div>
                
                {/* Contrôles à droite */}
                <div className="flex flex-col justify-center gap-6">
                  <div>
                    <label className="block text-sm font-light text-slate-700 mb-3">
                      Catégorie *
                    </label>
                    <div className="relative">
                      <div
                        className="w-full px-0 py-3 border-0 border-b border-slate-300 bg-transparent cursor-pointer"
                        onClick={() => setIsSelectOpen(!isSelectOpen)}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-slate-700 font-light">
                            {editingCategory === "Hero (Page d'accueil)" ? "Carrousel (Page d'accueil)" : editingCategory}
                          </span>
                          <svg
                            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isSelectOpen ? 'rotate-180' : ''}`}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>

                      {isSelectOpen && (
                        <>
                          <div className="absolute top-full left-0 right-0 z-50 bg-white shadow-lg border mt-1">
                            {CATEGORIES.map((cat) => (
                              <div
                                key={cat}
                                className="px-4 py-3 text-slate-700 hover:bg-slate-100 cursor-pointer border-b border-slate-200 last:border-0 transition-colors duration-150 font-light"
                                onClick={() => {
                                  setEditingCategory(cat)
                                  setIsSelectOpen(false)
                                }}
                              >
                                {cat === "Hero (Page d'accueil)" ? "Carrousel (Page d'accueil)" : cat}
                              </div>
                            ))}
                          </div>
                          <div className="fixed inset-0 z-40" onClick={() => setIsSelectOpen(false)} />
                        </>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm font-light text-slate-600 mt-4">
                    Cliquez sur l'image à gauche ou déposez une nouvelle image pour la remplacer.
                  </p>
                  
                  {/* Boutons Annuler / Enregistrer */}
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={handleCancelEdit}
                      className="flex-1 border border-slate-300 text-slate-700 hover:border-slate-800 hover:text-slate-800 font-light px-6 py-3 transition-colors uppercase tracking-wider text-sm"
                      disabled={uploading}
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      disabled={uploading}
                      className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-light px-6 py-3 transition-colors uppercase tracking-wider text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {uploading ? 'Upload en cours...' : 'Enregistrer'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Mode ajout normal
            <div>
              <h2 className="text-3xl font-light text-slate-800 mb-8 text-center" 
                  style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
                Ajouter une photo
              </h2>
              <div className="w-16 h-px bg-slate-300 mx-auto mb-8"></div>
              
              {/* Select Catégorie */}
              <div className="max-w-md mx-auto mb-8">
                <label className="block text-sm font-light text-slate-700 mb-2">
                  Catégorie *
                </label>
                <div className="relative">
                  <div
                    className="w-full px-0 py-3 border-0 border-b border-slate-300 bg-transparent cursor-pointer"
                    onClick={() => setIsSelectOpen(!isSelectOpen)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 font-light">
                        {selectedCategory === "Hero (Page d'accueil)" ? "Carrousel (Page d'accueil)" : selectedCategory}
                      </span>
                      <svg
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isSelectOpen ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {isSelectOpen && (
                    <>
                      <div className="absolute top-full left-0 right-0 z-50 bg-white shadow-lg border mt-1">
                        {CATEGORIES.map((cat) => (
                          <div
                            key={cat}
                            className="px-4 py-3 text-slate-700 hover:bg-slate-100 cursor-pointer border-b border-slate-200 last:border-0 transition-colors duration-150 font-light"
                            onClick={() => {
                              setSelectedCategory(cat)
                              setIsSelectOpen(false)
                            }}
                          >
                            {cat === "Hero (Page d'accueil)" ? "Carrousel (Page d'accueil)" : cat}
                          </div>
                        ))}
                      </div>
                      <div className="fixed inset-0 z-40" onClick={() => setIsSelectOpen(false)} />
                    </>
                  )}
                </div>
              </div>

              <ImageUploader
                images={[]}
                onImagesChange={handleImagesChange}
                maxFiles={10}
                editingImage={null}
                onCancelEdit={handleCancelEdit}
                category={selectedCategory}
                currentImagesCount={images.filter(img => img.category === selectedCategory).length}
              />
            </div>
          )}
        </div>
        </div>

        {/* Section Galerie */}
        <div className="bg-white py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-light text-slate-800 mb-8 text-center" 
                style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
              Galerie des photos
            </h2>
            <div className="w-16 h-px bg-slate-300 mx-auto mb-12"></div>
            
            {/* Onglets de filtrage */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`px-6 py-3 uppercase tracking-[0.15em] text-sm font-light transition-all duration-300 ${
                    activeTab === category
                      ? 'bg-slate-800 text-white'
                      : 'border border-slate-300 text-slate-600 hover:border-slate-800 hover:text-slate-800'
                  }`}
                >
                  {category === "Hero (Page d'accueil)" ? "Carrousel (Page d'accueil)" : category}
                </button>
              ))}
            </div>
            
            {CATEGORIES.map((category) => {
              const categoryImages = images.filter(
                (img) => img.category === category
              );
              
              // Afficher seulement si l'onglet correspond
              if (activeTab !== category) return null;
              if (categoryImages.length === 0) return null;

              const visibleImages = categoryImages.slice(0, visibleImagesCount[category] || IMAGES_PER_PAGE);
              const hasMoreImages = categoryImages.length > visibleImages.length;

              return (
                <div key={category} className="mb-12 last:mb-0">
                  <div className="border-b border-slate-200 pb-3 mb-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-light text-slate-800" 
                          style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
                        {category === "Hero (Page d'accueil)" ? "Carrousel (Page d'accueil)" : category}
                      </h3>
                      <span className="text-sm text-slate-500 font-light">
                        {categoryImages.length} {categoryImages.length > 1 ? 'photos' : 'photo'}
                      </span>
                    </div>
                  </div>
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={visibleImages.map((img) => img.url)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {visibleImages.map((img) => (
                          <SortableImage
                            key={img.url}
                            image={img}
                            onEdit={handleEditImage}
                            onDelete={handleDelete}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                  
                  {/* Bouton Voir plus */}
                  {hasMoreImages && (
                    <div className="text-center mt-8">
                      <button
                        onClick={() => loadMoreImages(category)}
                        className="inline-flex items-center gap-2 px-8 py-3 border border-slate-300 text-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-800 font-light transition-colors uppercase tracking-wider text-sm"
                      >
                        Voir plus
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <p className="text-xs text-slate-500 mt-2 font-light">
                        {visibleImages.length} sur {categoryImages.length} photos affichées
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
            

            {images.length === 0 && (
              <div className="text-center py-24">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-lg font-light text-slate-600" 
                   style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
                  Aucune photo pour le moment
                </p>
                <p className="text-sm text-slate-500 mt-2 font-light">
                  Commencez par uploader votre première photo
                </p>
              </div>
            )}
            
            {images.length > 0 && !CATEGORIES.some(cat => {
              const categoryImages = images.filter(img => img.category === cat);
              return cat === activeTab && categoryImages.length > 0;
            }) && (
              <div className="text-center py-24">
                <p className="text-lg font-light text-slate-600" 
                   style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
                  Aucune photo dans cette catégorie
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
