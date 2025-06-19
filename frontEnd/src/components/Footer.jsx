import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logos/LOGO-SMAB-CROP-1.png'
import logo_cmi from '../assets/logo_cmi.png'
import logo_mastercard from '../assets/logo_mastercard.png'
import logo_visa from '../assets/logo_visa.png'
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaEnvelope, FaPhone, FaClock } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="mt-auto bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Top Bar with Logo and Slogan */}
      <div className="bg-gradient-to-r from-[#e63812] to-[#ff6b4a] py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">            <div className="flex items-center gap-4">
              <div className="bg-[#e63812] bg-opacity-20 backdrop-blur-sm p-2 rounded-lg shadow-lg">
                <img src={logo} alt="SMAB Logo" className="h-12 w-auto" />
              </div>
              <span className="text-white text-xl md:text-2xl font-bold tracking-wide">
                Des Solutions Avancées Pour Une Production Optimisée.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Service Commercial */}
          <div className="md:col-span-3">
            <h3 className="text-xl font-bold mb-6 text-[#e63812]">Service commercial</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                  A propos de nous
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                  Politique de confidentialité et sécurité
                </Link>
              </li>
              <li>
                <Link to="/distributeur" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                  Programme distributeur SMAB
                </Link>
              </li>
              <li>
                <Link to="/affilies" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                  Programme affiliés SMAB
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Client */}
          <div className="md:col-span-3">
            <h3 className="text-xl font-bold mb-6 text-[#e63812]">Service client</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                  Contactez-nous
                </Link>
              </li>
              <li>
                <Link to="/account" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                  Votre compte
                </Link>
              </li>
              <li>
                <Link to="/cgv" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                  CGV
                </Link>
              </li>
              <li>
                <Link to="/mention-legal" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info & Newsletter */}
          <div className="md:col-span-6">
            <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-6 text-[#e63812]">Restez connecté</h3>
              
              {/* Contact Information */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <FaPhone className="text-[#e63812]" />
                  <span>+212 766-074939</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <FaClock className="text-[#e63812]" />
                  <span>Du Lundi au Vendredi, 08:30-17:00</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <FaEnvelope className="text-[#e63812]" />
                  <span>contact@smab.com</span>
                </div>
              </div>

              {/* Newsletter */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3">Abonnez-vous à Notre Newsletter</h4>
                <form className="flex">
                  <input 
                    type="email" 
                    placeholder="Votre email" 
                    className="flex-1 px-4 py-3 rounded-l-lg bg-gray-700 border-2 border-gray-600 focus:border-[#e63812] focus:outline-none text-white placeholder-gray-400"
                  />
                  <button 
                    type="submit" 
                    className="bg-[#e63812] px-6 py-3 rounded-r-lg text-white font-semibold hover:bg-[#ff6b4a] transition-colors duration-300"
                  >
                    Subscribe
                  </button>
                </form>
              </div>

              {/* Social Media */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-4">Trouvez-nous sur</h4>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 hover:bg-[#e63812] hover:text-white transition-all duration-300">
                    <FaFacebookF size={20} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 hover:bg-[#e63812] hover:text-white transition-all duration-300">
                    <FaTiktok size={20} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 hover:bg-[#e63812] hover:text-white transition-all duration-300">
                    <FaInstagram size={20} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 hover:bg-[#e63812] hover:text-white transition-all duration-300">
                    <FaYoutube size={20} />
                  </a>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Moyens de paiement sécurisés</h4>
                <div className="flex items-center gap-4 bg-white p-3 rounded-lg">
                  <img src={logo_cmi} alt="CMI" className="h-8 hover:scale-105 transition-transform duration-300" />
                  <img src={logo_mastercard} alt="MasterCard SecureCode" className="h-8 hover:scale-105 transition-transform duration-300" />
                  <img src={logo_visa} alt="Verified by Visa" className="h-8 hover:scale-105 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="text-center text-gray-400 text-sm">
            ©2025 SMAB Tous Droits Réservés
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
