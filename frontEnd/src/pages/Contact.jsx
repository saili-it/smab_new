import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { submitContactForm } from '../services/contactService';
import Seo from '../components/Seo';
import { useMetaPixel } from '../hooks/useMetaPixel';

const Contact = () => {
  // Meta Pixel tracking
  const { trackEvent } = useMetaPixel();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  // Get dynamic contact info from Redux store
  const contentWebSite = useSelector(state => state.content.data);
  const contactInfo = contentWebSite?.smabContactPage || {};
  const phoneNumber = contactInfo.tel ? `+${contactInfo.tel}` : '+212 766-074939';
  const emailAddress = contactInfo.email || 'contact@smab-co.com';

  const seoData = contactInfo?.seo;
  let heroMediaUrl = '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', content: '' });

    try {
      await submitContactForm(formData);
      
      // Track successful form submission with Meta Pixel
      trackEvent('Lead', {
        content_name: 'Contact Form Submission',
        content_category: 'Lead Generation',
        value: 0,
        currency: 'EUR'
      });
      
      setMessage({
        type: 'success',
        content: 'Votre message a été envoyé avec succès!'
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      setMessage({
        type: 'error',
        content: error.message || 'Une erreur est survenue. Veuillez réessayer.'
      });
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWhatsAppClick = () => {
    // Track WhatsApp contact attempt
    trackEvent('Contact', {
      content_name: 'WhatsApp Contact',
      content_category: 'Contact Method',
      value: 0,
      currency: 'EUR'
    });
    
    window.open(`https://wa.me/${contactInfo.tel || phoneNumber.replace(/[^0-9]/g, '')}`, '_blank');
  };

  const handleEmailClick = () => {
    // Track email contact attempt
    trackEvent('Contact', {
      content_name: 'Email Contact',
      content_category: 'Contact Method',
      value: 0,
      currency: 'EUR'
    });
    window.location.href = `mailto:${emailAddress}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title={seoData?.metaTitle || 'Contact - SMAB'}
        description={seoData?.metaDescription || 'Contactez-nous pour en savoir plus sur nos services et produits'}
        keywords={seoData?.keywords}
        focusKeyphrase={seoData?.focusKeyphrase}
        ogImage={heroMediaUrl}
        pageType="contact"
        breadcrumbs={[
          { name: 'Accueil', url: 'https://smab-co.com' },
          { name: 'Contact', url: 'https://smab-co.com/contact' }
        ]}
      />
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{contactInfo.title || "Contactez-nous"}</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {contactInfo.text || "Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans vos projets."}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Information and Form Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Informations de contact</h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#e63812]/10 p-3 rounded-lg">
                    <FaMapMarkerAlt className="text-[#e63812] text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Notre adresse</h3>
                    <p className="text-gray-600">21, bd Lahcen Ou Idder 20000 Casablanca</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#e63812]/10 p-3 rounded-lg cursor-pointer" onClick={handleWhatsAppClick}>
                    <FaWhatsapp className="text-[#e63812] text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">WhatsApp</h3>
                    <p className="text-gray-600 cursor-pointer hover:text-[#e63812]" onClick={handleWhatsAppClick}>
                      {phoneNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#e63812]/10 p-3 rounded-lg">
                    <FaPhone className="text-[#e63812] text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Téléphone</h3>
                    <p className="text-gray-600">{phoneNumber}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#e63812]/10 p-3 rounded-lg">
                    <FaEnvelope className="text-[#e63812] text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                    <p className="text-gray-600 cursor-pointer hover:text-[#e63812]" onClick={handleEmailClick}>
                      {emailAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Envoyez-nous un message</h2>

              {message.content && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-lg p-4 mb-6 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}
                >
                  <div className="text-sm">{message.content}</div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">Nom complet</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e63812] transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e63812] transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="subject" className="block text-gray-700 mb-2 font-medium">Sujet</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e63812] transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 mb-2 font-medium">Téléphone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e63812] transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e63812] transition-all"
                    required
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={loading}
                  className="bg-[#e63812] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#d32f0f] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    'Envoyer le message'
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Map Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full h-[500px] mt-16"
      >
        <iframe
          src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=33.587528,-7.6117231&ie=UTF8&t=&z=14&iwloc=B&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </motion.div>
    </div>
  )
}

export default Contact
