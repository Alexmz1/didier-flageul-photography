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
  const [notification, setNotification] = useState(null);
  const [visibleImagesCount, setVisibleImagesCount] = useState({});
  const [activeTab, setActiveTab] = useState(CATEGORIES[0]);
  
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
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((item) => item.url === active.id);
        const newIndex = items.findIndex((item) => item.url === over.id);
        
        const newItems = arrayMove(items, oldIndex, newIndex);
        localStorage.setItem("gallery-images", JSON.stringify(newItems));
        return newItems;
      });
      
      showNotification('Ordre des images modifié', 'success');
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin");
    }
  }, [status, router]);

  useEffect(() => {
    // Charger les images depuis le localStorage
    const savedImages = localStorage.getItem("gallery-images");
    if (savedImages) {
      setImages(JSON.parse(savedImages));
    }
    
    // Initialiser le compteur d'images visibles pour chaque catégorie
    const initialVisible = {};
    CATEGORIES.forEach(cat => {
      initialVisible[cat] = IMAGES_PER_PAGE;
    });
    setVisibleImagesCount(initialVisible);
  }, []);

  const saveImages = (newImages) => {
    setImages(newImages);
    localStorage.setItem("gallery-images", JSON.stringify(newImages));
  };

  const loadMoreImages = (category) => {
    setVisibleImagesCount(prev => ({
      ...prev,
      [category]: prev[category] + IMAGES_PER_PAGE
    }));
  };

  const handleImagesChange = (newImages) => {
    // La vérification est maintenant faite dans ImageUploader avant l'upload
    // Ajouter la catégorie aux nouvelles images
    const imagesWithCategory = newImages.map(img => ({
      ...img,
      category: selectedCategory,
      uploadedAt: img.uploadedAt || new Date().toISOString(),
    }));
    
    // Fusionner avec les images existantes au lieu de les remplacer
    const allImages = [...images, ...imagesWithCategory];
    saveImages(allImages);
  };

  const handleEditImage = (imageUrl) => {
    const imageToEdit = images.find((img) => img.url === imageUrl);
    if (imageToEdit) {
      setEditingImage(imageToEdit);
      setSelectedCategory(imageToEdit.category);
      // Scroll vers la section upload
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReplaceImage = (newImage) => {
    if (!editingImage) return;

    // Remplacer l'ancienne image par la nouvelle
    const updatedImages = images.map(img => 
      img.url === editingImage.url 
        ? { ...newImage, category: editingImage.category, uploadedAt: new Date().toISOString() }
        : img
    );
    saveImages(updatedImages);
    setEditingImage(null);
  };

  const handleCancelEdit = () => {
    setEditingImage(null);
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
      const response = await fetch('/api/delete-image', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key: imageToDelete.key }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la suppression');
      }

      // Supprimer l'image de la liste
      const updatedImages = images.filter((img) => img.url !== imageUrl);
      saveImages(updatedImages);

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
    <div className={`min-h-screen bg-gray-50 pt-48 pb-12 px-6 ${playfair.variable} ${cormorant.variable}`}>
      <div className="max-w-7xl mx-auto">
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
        <div className="bg-white p-8 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-light text-slate-800 mb-3" 
                  style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
                Dashboard Admin
              </h1>
              <div className="w-24 h-px bg-slate-300 mx-auto md:mx-0"></div>
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
        <div className="bg-white p-8 lg:p-12 mb-8">
          {editingImage && (
            <div className="bg-slate-800 text-white p-4 mb-8 text-center">
              <p className="text-sm font-light">
                Mode modification : Vous allez remplacer la photo actuelle
              </p>
              <button
                onClick={handleCancelEdit}
                className="mt-2 text-xs underline hover:no-underline"
              >
                Annuler la modification
              </button>
            </div>
          )}
          <h2 className="text-3xl font-light text-slate-800 mb-8 text-center" 
              style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
            {editingImage ? 'Modifier la photo' : 'Ajouter une photo'}
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
            onImagesChange={editingImage ? handleReplaceImage : handleImagesChange}
            maxFiles={10}
            editingImage={editingImage}
            onCancelEdit={handleCancelEdit}
            category={selectedCategory}
            currentImagesCount={images.filter(img => img.category === selectedCategory).length}
          />
        </div>

        {/* Section Galerie */}
        <div className="bg-white p-8 lg:p-12">
          <div>
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
