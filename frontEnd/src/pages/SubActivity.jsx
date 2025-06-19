import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduitsCategory } from '../services/productService';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { FaFilter, FaSearch, FaArrowRight, FaChevronLeft } from 'react-icons/fa';
import { categories } from '../data/categories';

const SubActivity = () => {
  const { category, subcategory } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const searchInputRef = useRef(null);

  // Get current category and subcategory data
  const currentCategory = categories.find(cat => cat.slug === category);

  const currentSubcategory = currentCategory?.subcategories.find(
    sub => sub.slug.toLowerCase() === subcategory.toLowerCase()
  );


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const result = await getProduitsCategory(currentSubcategory.name);
        const allProducts = result.products || [];
        
        
        setProducts(allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (currentCategory?.name && currentSubcategory?.name) {
      fetchProducts();
    }
  }, [category, subcategory, currentCategory, currentSubcategory]);

  // Filter products based on search
  const filteredProducts = products.filter(product => 
    product.ProductLabel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}      {/* Header Section with Hero */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 h-[300px] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-dots-pattern opacity-5"></div>
        
        {/* Content */}
        <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
          <nav className="absolute top-4 left-4 right-4">
            <ol className="flex items-center space-x-2 text-sm text-gray-300/80">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <span>/</span>
                <Link to={`/activite/${category}`} className="hover:text-white transition-colors">
                  {currentCategory?.name}
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <span>/</span>
                <span className="text-white">{currentSubcategory?.name}</span>
              </li>
            </ol>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {currentSubcategory?.name}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
             {` Découvrez notre gamme complète d'équipements pour ${currentSubcategory?.name.toLowerCase()}`}
            </p>
          </motion.div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      {/* Search Bar Section - Sticky */}
      <div className="top-0 z-50 bg-gray-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border-0 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e63812] transition-all duration-300"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-3 bg-white rounded-xl shadow-sm hover:shadow transition-all duration-300 text-gray-600 hover:text-[#e63812]"
            >
              <FaFilter className="text-xl" />
            </button>
          </div>
        </div>
      </div>      {/* Products Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              // Loading skeleton with improved animation
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[1, 2, 3, 4, 5, 6, 8].map((item) => (
                  <div 
                    key={item} 
                    className="bg-white rounded-2xl p-4 animate-pulse shadow-sm"
                  >
                    <div className="h-64 bg-gray-200 rounded-xl mb-4"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded-full w-1/4"></div>
                      <div className="h-6 bg-gray-200 rounded-full w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded-full w-2/3"></div>
                      <div className="h-10 bg-gray-200 rounded-xl w-full mt-6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-8">
                  <motion.p 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-gray-600"
                  >
                    {filteredProducts.length} produits trouvés
                  </motion.p>
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-2"
                  >
                    {/* Add sorting options here if needed */}
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.ProductId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: [0.43, 0.13, 0.23, 0.96]
                      }}
                    >
                      <ProductCard
                        product={{
                          id: product.ProductId,
                          name: product.ProductLabel,
                          description: product.shortDescription || product.ProductDescription || 'Description à venir',
                          image: product.ImageFilenames?.length > 0 
                            ? `https://www.kelmohub.com/product-images/${product.ProductRef}/${product.ImageFilenames[0]}` 
                            : currentCategory?.image,
                          category: currentSubcategory?.name
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16 bg-white rounded-2xl shadow-sm"
              >
                <div className="mb-6">
                  <FaSearch className="w-16 h-16 mx-auto text-gray-300" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Aucun produit trouvé
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Nous n'avons trouvé aucun produit correspondant à vos critères de recherche. 
                  Essayez de modifier vos filtres ou utilisez des termes différents.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>      {/* Contact Banner */}
      <section className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-[#e63812] rounded-3xl p-8 md:p-16 text-white relative overflow-hidden"
          >
            {/* Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>
              <div className="absolute w-[500px] h-[500px] -top-48 -right-48 bg-white rounded-full blur-3xl opacity-[0.15]"></div>
              <div className="absolute w-[300px] h-[300px] -bottom-24 -left-24 bg-white rounded-full blur-2xl opacity-[0.15]"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Besoin d'une solution personnalisée ?
                </h2>
                <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
                  Notre équipe d'experts est là pour vous accompagner dans le choix de l'équipement idéal pour votre activité.
                </p>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-3 bg-white text-[#e63812] px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors duration-300 font-semibold shadow-lg hover:shadow-xl"
                  >
                    Contactez-nous maintenant
                    <FaArrowRight className="text-lg transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SubActivity;
