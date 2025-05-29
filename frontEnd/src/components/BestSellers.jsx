import React from 'react';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const BestSellers = ({ title, products }) => {
  // Show loading skeleton if no products
  if (!products || products.length === 0) {
    return (
      <section className="py-24 px-4 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {title}
            </h2>
            <div className="h-1 w-20 bg-[#e63812] mx-auto mb-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="h-[450px] bg-gray-100 rounded-2xl animate-pulse">
                <div className="h-[300px] bg-gray-200 rounded-t-2xl"></div>
                <div className="p-6">
                  <div className="h-5 bg-gray-200 rounded-full w-1/3 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                  <div className="h-12 bg-gray-200 rounded-xl w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Ensure we only display 4 products
  const displayProducts = products.slice(0, 4);
  
  return (
    <section className="py-24 px-4 relative bg-gradient-to-br from-white to-gray-50 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/5 via-transparent to-gray-900/5" />
        <div className="absolute w-[500px] h-[500px] -top-48 -left-48 bg-[#e63812] rounded-full blur-3xl opacity-[0.15]" />
        <div className="absolute w-[500px] h-[500px] -bottom-48 -right-48 bg-[#e63812] rounded-full blur-3xl opacity-[0.15]" />
      </div>

      <div className="container mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block px-4 py-2 bg-[#e63812]/10 text-[#e63812] rounded-full text-sm font-semibold mb-4"
          >
            Produits Phares
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Découvrez notre sélection d'équipements industriels performants et innovants, choisis pour leur qualité exceptionnelle et leur fiabilité éprouvée
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
          {displayProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 bg-[#e63812] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#ff6b4a] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Voir tous nos produits
            <FaArrowRight className="text-lg" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default BestSellers;
