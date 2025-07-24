import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getProduitsCategory } from '../services/productService';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { FaFilter, FaSearch, FaArrowRight, FaPhoneAlt } from 'react-icons/fa';
import { categories } from '../data/categories';

// Import hero images
import ExtractionHuileHero from '../assets/heros/activite/EXTRACTION-DISTILLATION-DES-HUILES-HERO.png';
import PackagingHero from '../assets/heros/activite/PACKAGING-HERO.png';
import SechageHero from '../assets/heros/activite/SECHACE-ET-TORREFACTION-HERO.png';
import BroyageEMouture from '../assets/heros/activite/broyage et mouture.jpg';
import NettoyageEtSeparation from '../assets/heros/activite/nettoyage et separation.jpg';
import ExtractionFruits from '../assets/heros/activite/Extraction des Fruits.png';

// Import coming soon images
import ExtractionFruitsCommingSoon from '../assets/comming_soon/Extraction des Fruits.png';

// Import subcategory icons
import EnsachageIcon from '../assets/subactivites_icons/Ensachage.png';
import EtiquetageIcon from '../assets/subactivites_icons/Etiquetage.png';
import MarquageIcon from '../assets/subactivites_icons/Marquage.png';
import RemplissageIcon from '../assets/subactivites_icons/Remplissage et dosage.png';
import ScellageIcon from '../assets/subactivites_icons/Scellage.png';
import SertissageIcon from '../assets/subactivites_icons/Sertissage et Bouchage.png';
import DistillationIcon from '../assets/subactivites_icons/Distillation.png';
import ExtractionIcon from '../assets/subactivites_icons/Extraction des huiles.png';
import SechageIcon from '../assets/subactivites_icons/Sechage.png';
import TorrefactionIcon from '../assets/subactivites_icons/Torrefaction.png';
import Broyage from '../assets/subactivites_icons/Broyage.jpg';
import Mouture from '../assets/subactivites_icons/Mouture.jpg';

// Hero images mapping
const heroImages = {
  'extraction-distillation': ExtractionHuileHero,
  'packaging': PackagingHero,
  'sechage-torrefaction': SechageHero,
  'broyage-mouture': BroyageEMouture,
  'extraction-fruits': ExtractionFruits,
  'nettoyage-separation': NettoyageEtSeparation
};

// Categories that are coming soon
const comingSoonCategories = [''];


// Subcategory icons mapping
const subcategoryIcons = {
  'Ensachage': EnsachageIcon,
  'Etiquetage': EtiquetageIcon,
  'Marquage': MarquageIcon,
  'Remplissage et dosage': RemplissageIcon,
  'Scellage': ScellageIcon,
  'Sertissage et Bouchage': SertissageIcon,
  'Distillation': DistillationIcon,
  'Extraction': ExtractionIcon,
  'Séchage': SechageIcon,
  'Torréfaction': TorrefactionIcon,
  'Broyage': Broyage,
  'Mouture': Mouture
};

const Activity = () => {
  const { category, subcategory } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Get website content from Redux store
  const contentWebSite = useSelector(state => state.content.data);

  // Get API content base URL from environment variable
  const apiContentUrl = import.meta.env.VITE_API_CONTENT;

  // Get current category data from categories.js
  const currentCategory = categories.find(cat => cat.slug === category);

  // Get category content from contentWebSite
  const currentCategoryContent = contentWebSite?.smabCategoriesPage?.find(
    cat => cat.name.toLowerCase() === currentCategory.name.toLowerCase()
  );


  // Get all related categories (excluding current)
  const relatedCategories = categories
    .filter(cat => cat.slug !== category);

  // Function to get full image URL
  const getImageUrl = (imageId) => {
    return imageId ? `${apiContentUrl}/media/${imageId}` : '';
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Use the category name instead of slug for the API
        const result = await getProduitsCategory(currentCategory?.name || '');
        // If there's a subcategory, filter the products accordingly
        const allProducts = result.products || [];
        const filteredProducts = subcategory
          ? allProducts.filter(product => {
            const subCat = currentCategory?.subcategories.find(sub => sub.slug.toLowerCase() === subcategory.toLowerCase());
            return product.subcategory?.toLowerCase() === subCat?.name.toLowerCase();
          })
          : allProducts;
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (currentCategory?.name) {
      fetchProducts();
    }
  }, [category, subcategory, currentCategory]);
  // Filter and limit products to 4
  const filteredProducts = products
    .filter(product => product.ProductLabel.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 4);

  // Best sellers are the same 4 products
  const bestSellers = filteredProducts;

  // Format category name for display
  const formatCategoryName = (categorySlug) => {
    return categorySlug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Get the title to display (subcategory or main category)
  const displayTitle = subcategory ? formatCategoryName(subcategory) : formatCategoryName(category);

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <header className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={currentCategoryContent?.hero?.image ? getImageUrl(currentCategoryContent.hero.image) : ''}
            alt={currentCategory?.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block px-4 py-2 bg-[#e63812] text-white rounded-full text-sm font-semibold mb-6"
            >
              Notre Expertise
            </motion.span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {currentCategoryContent?.hero?.title || currentCategory?.name || ''}
            </h1>
            <p className="text-xl text-gray-100 leading-relaxed mb-8 max-w-2xl">
              {currentCategoryContent?.hero?.text ||
                `Découvrez notre gamme complète d'équipements industriels pour ${currentCategory?.name || ''}`}
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-3 bg-[#e63812] text-white rounded-lg hover:bg-[#ff6b4a] transition-colors duration-300 flex items-center gap-2 shadow-lg">
                Découvrir nos produits
                <FaArrowRight />
              </button>
              <Link
                to="/contact"
                className="px-8 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors duration-300 flex items-center gap-2 shadow-lg"
              >
                Nous contacter
                <FaPhoneAlt />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </header>

      {/* Coming Soon Banner */}
      {comingSoonCategories.includes(category) && (
        <section className="py-24 px-4">
          <div className="container mx-auto">
            <div className="relative overflow-hidden rounded-3xl shadow-xl group">
              <div className="aspect-w-16 aspect-h-7">
                <img
                  src={heroImages[category]}
                  alt={currentCategory?.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
              </div>
              <Link
                to="/contact"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-2 bg-white text-[#e63812] px-8 py-4 rounded-xl font-semibold hover:bg-[#e63812] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Être notifié de la disponibilité
                <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Subcategories Section */}
      {currentCategory?.subcategories && !comingSoonCategories.includes(category) && (
        <section className="py-24 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Explorez nos solutions {displayTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {currentCategory.subcategories.map((sub) => (                <Link
                  key={sub.id}
                  to={`/activite/${category}/${sub.slug}`}
                  className="group bg-white relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="p-10 flex flex-col items-center">
                    <div className="w-32 h-32 mb-8 bg-gray-50 rounded-3xl p-6 group-hover:bg-[#e63812]/5 transition-all duration-300 ease-in-out transform group-hover:scale-110">
                      <img 
                        src={subcategoryIcons[sub.name]} 
                        alt={sub.name}
                        className="w-full h-full object-contain filter group-hover:brightness-110"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 text-center mb-4 group-hover:text-[#e63812] transition-colors duration-300">
                      {sub.name}
                    </h3>
                    <div className="flex items-center text-[#e63812] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <span className="font-medium text-lg">Découvrir</span>
                      <FaArrowRight className="ml-2 text-lg" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Best Sellers Section */}
      {bestSellers.length > 0 && (
        <section className="py-24 px-4 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Nos Meilleures Ventes en {displayTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {bestSellers.map((product, index) => (
                <motion.div
                  key={product.ProductId}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard
                    product={{
                      id: product.ProductId,
                      name: product.ProductLabel,
                      description: product.shortDescription || product.ProductDescription || 'Description à venir',
                      image: product.ImageFilenames?.length > 0
                        ? `https://www.kelmohub.com/product-images/${product.ProductRef}/${product.ImageFilenames[0]}`
                        : '',
                      category: category
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Advertising Banner */}
      {currentCategoryContent?.advertisingBanner?.image && (
        <section className="py-24 px-4">
          <div className="container mx-auto">
            <div className="relative overflow-hidden rounded-3xl shadow-xl group">
              <div className="aspect-w-16 aspect-h-7">
                <img
                  src={getImageUrl(currentCategoryContent.advertisingBanner.image)}
                  alt={currentCategoryContent.advertisingBanner.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent">
                  <div className="absolute inset-0 flex items-center justify-start px-12">
                    <div className="max-w-2xl text-white">
                      <h2 className="text-4xl font-bold mb-4">
                        {currentCategoryContent.advertisingBanner.title}
                      </h2>
                      <p className="text-xl mb-8 text-white/90">
                        {currentCategoryContent.advertisingBanner.text}
                      </p>
                      {currentCategoryContent.advertisingBanner.whatsappLink && (
                        <a
                          href={`https://wa.me/${currentCategoryContent.advertisingBanner.whatsappLink}?text=${encodeURIComponent(currentCategoryContent.advertisingBanner.whatsappMsg || '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-white text-[#e63812] px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                        >
                          {currentCategoryContent.advertisingBanner.buttonText || 'Contactez-nous'}
                          <FaArrowRight />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Promotional Banner */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#e63812]">
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
        </div>
        <div className="container mx-auto relative">
          <div className="max-w-3xl text-white">
            <h2 className="text-4xl font-bold mb-6">
             {` Besoin d'une solution sur mesure ?`}
            </h2>
            <p className="text-xl mb-8 text-white/90">
            {`Nos experts sont là pour vous accompagner dans le choix de l'équipement idéal pour votre activité.`}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#e63812] px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Contactez-nous maintenant
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Related Categories */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Catégories connexes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {relatedCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/activite/${cat.slug}`}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={contentWebSite?.smabCategoriesPage?.find(c => c.name === cat.name)?.hero?.image
                      ? getImageUrl(contentWebSite.smabCategoriesPage.find(c => c.name === cat.name).hero.image)
                      : cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {cat.name}
                      </h3>
                      <div className="flex items-center text-white/90 group-hover:translate-x-2 transition-transform duration-300">
                        <span>Explorer</span>
                        <FaArrowRight className="ml-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
};

export default Activity;
