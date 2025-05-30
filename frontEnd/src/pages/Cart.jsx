import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { FaTrash, FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';
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

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
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
                    <div className="flex-shrink-0 text-right">
                      <p className="font-semibold text-lg">{item.price} MAD</p>
                      <p className="text-sm text-gray-500">
                        Total: {item.price * item.quantity} MAD
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-semibold mb-6">Résumé de la commande</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="font-medium">{calculateTotal()} MAD</span>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{calculateTotal()} MAD</span>
                  </div>
                </div>
              </div>
              <button className="w-full py-4 bg-[#e63812] text-white rounded-xl font-semibold hover:bg-[#ff6b4a] transition-colors duration-300">
                Procéder au paiement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
