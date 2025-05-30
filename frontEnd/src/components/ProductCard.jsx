import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaInfoCircle, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // Strip HTML tags for cart preview
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = product.description;
    const strippedDescription = tempDiv.textContent || tempDiv.innerText || '';

    dispatch(addToCart({
      id: product.id,
      name: product.name,
      description: strippedDescription.substring(0, 150) + (strippedDescription.length > 150 ? '...' : ''), // Limit description length
      price: product.price || 0,
      image: product.image,
      quantity: 1
    }));
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 relative"
    >
      <div className="absolute top-4 right-4 z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center hover:bg-[#e63812] hover:text-white transition-all duration-300"
        >
          <FaInfoCircle className="text-lg" />
        </motion.button>
      </div>

      {/* Image Container */}
      <div className="relative h-[300px] overflow-hidden">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Quick Actions */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="flex gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="bg-white text-[#e63812] px-6 py-3 rounded-lg font-semibold shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-[#e63812] hover:text-white flex items-center gap-2"
            >
              <FaShoppingCart />
              Ajouter au panier
            </motion.button>
          </motion.div>
        </div>
      </div>      {/* Content Container */}
      <div className="p-6">
        <div className="mb-4">
          <span className="text-xs font-semibold px-3 py-1 bg-[#e63812]/10 text-[#e63812] rounded-full">
            {product.category || 'Équipement industriel'}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-[#e63812] transition-colors duration-300">
          {product.ProductLabel || product.name}
        </h3>
          <div 
          className="text-gray-600 text-sm line-clamp-2 mb-4 min-h-[2.5rem]"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(product.shortDescription || product.ProductDescription || product.description || 'Description à venir')
          }}
        />        <Link 
          to={`/produit/${slugify(product.ProductLabel || product.name)}?id=${product.ProductId || product.id}`}
          className="block w-full"
        >
          <motion.button
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 w-full justify-center bg-gray-100 text-gray-800 rounded-xl py-3 hover:bg-[#e63812] hover:text-white transition-all duration-300 font-semibold group/btn"
          >
            Découvrir le produit
            <FaArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
