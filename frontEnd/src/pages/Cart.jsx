import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { FaTrash, FaMinus, FaPlus, FaShoppingCart, FaWhatsapp } from 'react-icons/fa';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = (e) => {
    e.preventDefault(); // Prevent default form submission
    dispatch(clearCart());
  };

  const sanitizeHTML = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Votre panier</h2>
      {cartItems.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
          <div className="mb-6">
            <FaShoppingCart className="mx-auto text-gray-400 text-5xl mb-4" />
            <p className="text-xl text-gray-600">Votre panier est vide</p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-[#e63812] text-white rounded-lg hover:bg-[#ff6b4a] transition-colors duration-300"
          >
            Continuer mes achats
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Articles ({cartItems.length})</h3>
                  <button
                    onClick={handleClearCart}
                    className="text-gray-500 hover:text-[#e63812] transition-colors duration-300"
                  >
                    Vider le panier
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-6 flex gap-6"
                  >
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-grow">                      
                    <h4 className="text-lg font-medium mb-2">{item.name}</h4>
                      <p className="text-gray-500 text-sm mb-2">Réf: {item.ref}</p>
                      <p 
                        className="text-gray-600 text-sm mb-4"
                        dangerouslySetInnerHTML={sanitizeHTML(item.description)}
                      />
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                          >
                            <FaMinus className="text-gray-600" />
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                          >
                            <FaPlus className="text-gray-600" />
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-gray-400 hover:text-[#e63812] transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <a
                        href={`https://wa.me/+212000000000?text=Bonjour,%0A%0AJe suis intéressé par le produit suivant :%0A%0A▫️ Référence : ${item.ref}%0A▫️ Désignation : ${item.name}%0A▫️ Quantité souhaitée : ${item.quantity}%0A%0APouvez-vous me faire parvenir un devis détaillé pour ce produit ?%0A%0AMerci.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-500 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        <FaWhatsapp className="text-xl" />
                        <span>Demander un devis</span>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
              <h3 className="text-2xl font-bold mb-8">Actions groupées</h3>
              <div className="space-y-4">
                <a
                  href={`https://wa.me/+212000000000?text=Bonjour,%0A%0AJe souhaite recevoir un devis pour les produits suivants :%0A%0A${cartItems.map((item, index) => `${index + 1}) Réf : ${item.reference}%0A   Désignation : ${item.name}%0A   Quantité : ${item.quantity}`).join('%0A%0A')}%0A%0AMerci de me faire parvenir un devis détaillé.%0A%0ACordialement.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-500 transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <FaWhatsapp className="text-2xl" />
                  <span>Demander un devis global</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
