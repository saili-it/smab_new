import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaChevronRight, FaSpinner, FaShoppingCart, FaFileAlt, FaWhatsapp, FaPlay } from 'react-icons/fa';
import { getProduitDetails } from '../services/productService';
import ReactPlayer from 'react-player/youtube';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const data = await getProduitDetails(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-[#e63812] mx-auto mb-4" />
          <p className="text-gray-600">Chargement du produit...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Une erreur est survenue
          </h2>
          <p className="text-gray-600 mb-6">
           {` Nous n'avons pas pu charger les détails du produit. Veuillez réessayer plus tard.`}
          </p>
          <Link
            to="/activite"
            className="inline-flex items-center text-[#e63812] hover:underline"
          >
            <FaArrowLeft className="mr-2" />
            Retour aux activités
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Produit non trouvé
          </h2>
          <p className="text-gray-600 mb-6">
          {`  Le produit que vous recherchez n'existe pas ou a été supprimé.`}
          </p>
          <Link
            to="/activite"
            className="inline-flex items-center text-[#e63812] hover:underline"
          >
            <FaArrowLeft className="mr-2" />
            Retour aux activités
          </Link>
        </div>
      </div>
    );
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === (product.ImageFilenames?.length - 1) ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? (product.ImageFilenames?.length - 1) : prev - 1
    );
  };

  const handleAddToCart = () => {
    if (product) {
      // Strip HTML tags for cart preview
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = product.shortDescription || product.ProductDescription;
      const strippedDescription = tempDiv.textContent || tempDiv.innerText || '';
      
      dispatch(addToCart({
        id: product.ProductId,
        name: product.ProductLabel,
        description: strippedDescription.substring(0, 150) + (strippedDescription.length > 150 ? '...' : ''), // Limit description length
        price: product.price || 0,
        image: product.ImageFilenames?.length > 0
          ? `https://www.kelmohub.com/product-images/${product.ProductRef}/${product.ImageFilenames[0]}`
          : '',
        quantity: 1
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}      <nav className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-[#e63812]">
              Accueil
            </Link>
            <FaChevronRight className="text-gray-400" />
            <Link to="/activite" className="text-gray-600 hover:text-[#e63812]">
              Nos Produits
            </Link>
            <FaChevronRight className="text-gray-400" />
            <span className="text-gray-800 font-medium">
              {product.ProductLabel} {product.ProductRef}
            </span>
          </div>
        </div>
      </nav>

      {/* Product Content */}      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Product Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {product.ProductLabel}
            </h1>
            <p className="text-lg text-gray-600">Réf: {product.ProductRef}</p>
          </div>

          {/* Main Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Left Column - Media */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Main Image */}
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-xl">
                  <img
                    src={`https://www.kelmohub.com/product-images/${product.ProductRef}/${product.ImageFilenames[currentImageIndex]}`}
                    alt={product.ProductLabel}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Thumbnails */}
              {product.ImageFilenames?.length > 1 && (
                <div className="grid grid-cols-5 gap-3">
                  {product.ImageFilenames.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden transition-all ${
                        currentImageIndex === index
                          ? 'ring-2 ring-[#e63812] ring-offset-2'
                          : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-2'
                      }`}
                    >
                      <img
                        src={`https://www.kelmohub.com/product-images/${product.ProductRef}/${image}`}
                        alt={`${product.ProductLabel} - Vue ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}              {/* Video Section */}
              {product.VideoUrls && product.VideoUrls.length > 0 && (
                <>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isFullscreen ? 1 : 0 }}
                    className={`fixed inset-0 z-50 bg-black/90 ${isFullscreen ? 'pointer-events-auto' : 'pointer-events-none'}`}
                  >
                    <div className="absolute top-4 right-4 z-10">
                      <button 
                        onClick={() => setIsFullscreen(false)}
                        className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
                      >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <motion.div 
                        className="w-full max-w-7xl aspect-video"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", duration: 0.5 }}
                      >
                        <ReactPlayer
                          url={product.VideoUrls[0]}
                          width="100%"
                          height="100%"
                          controls
                          playing={isFullscreen}
                          className="rounded-xl overflow-hidden"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  <div className="bg-white rounded-2xl p-8 shadow-lg transform transition-all duration-500 hover:shadow-2xl">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
                        <FaPlay className="text-[#e63812] mr-3" />
                        Vidéo de démonstration
                      </h3>
                      <button 
                        onClick={() => setIsFullscreen(true)}
                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-300 flex items-center text-sm font-medium text-gray-600"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                        </svg>
                        Plein écran
                      </button>
                    </div>
                    <motion.div 
                      className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-black"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <ReactPlayer
                        url={product.VideoUrls[0]}
                        width="100%"
                        height="100%"
                        controls
                        light={true}
                        className="absolute top-0 left-0 right-0 bottom-0"
                        playIcon={
                          <motion.button 
                            className="w-28 h-28 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center hover:bg-[#e63812]/60 transition-all duration-500 group"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FaPlay className="text-white text-6xl ml-2 group-hover:text-white transition-colors duration-300" />
                          </motion.button>
                        }
                      />
                    </motion.div>
                  </div>
                </>
              )}

              {/* Long Description */}
              {product.ProductDescription && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Description détaillée
                  </h2>
                  <div 
                    className="prose prose-lg max-w-none text-gray-600 [&>ul]:list-disc [&>ul]:pl-6 [&>ol]:list-decimal [&>ol]:pl-6"
                    dangerouslySetInnerHTML={{ 
                      __html: product.ProductDescription
                    }}
                  />
                </motion.div>
              )}
            </motion.div>

            {/* Right Column - Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Description */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Description
                </h2>
                <div 
                  className="prose prose-lg max-w-none text-gray-600"
                  dangerouslySetInnerHTML={{ 
                    __html: product.shortDescription || 'Aucune description disponible' 
                  }}
                />
              </div>

              {/* Characteristics Table */}
              {product.characteristics && (
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Caractéristiques techniques
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    {Object.entries(product.characteristics).map(([key, value]) => (
                      <div key={key} className="flex items-center py-3 border-b border-gray-100 last:border-0">
                        <span className="font-medium text-gray-700 min-w-[200px]">{key}</span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features Section */}
              {product.ProductFeatures && (
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Caractéristiques
                  </h2>
                  <div 
                    className="prose prose-lg max-w-none text-gray-600"
                    dangerouslySetInnerHTML={{ 
                      __html: product.ProductFeatures 
                    }}
                  />
                </div>
              )}              {/* Action Buttons Section */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="space-y-4">
                  {/* Add to Cart Button */}
                  <button
                    className="inline-flex items-center justify-center w-full bg-[#e63812] text-white px-6 py-4 rounded-xl font-semibold hover:bg-[#ff6b4a] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    onClick={handleAddToCart}
                  >
                    <FaShoppingCart className="mr-3 text-xl" />
                    Ajouter au panier
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Request Technical Sheet via WhatsApp */}
                    <a
                      href={`https://wa.me/212666441894?text=Bonjour, je souhaite recevoir la fiche technique du produit: ${product.ProductLabel} (Réf: ${product.ProductRef})`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full bg-green-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-green-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      <div className="flex items-center">
                        <FaWhatsapp className="mr-2 text-xl" />
                        <FaFileAlt className="mr-2" />
                        <span>Fiche technique</span>
                      </div>
                    </a>

                    {/* Request Quote via WhatsApp */}
                    <a
                      href={`https://wa.me/212666441894?text=Bonjour, je souhaite avoir un devis pour le produit: ${product.ProductLabel} (Réf: ${product.ProductRef})`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full bg-green-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-green-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      <div className="flex items-center">
                        <FaWhatsapp className="mr-2 text-xl" />
                        <span>Demander un devis</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Related Products Section - You can add this later */}
    </div>
  );
};

export default ProductDetails;
