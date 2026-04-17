import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaTruck, FaEnvelope } from 'react-icons/fa';
import Seo from '../components/Seo';

const Distributeur = () => {
  return (
    <>
      <Seo
        title="Distributeur - Bientôt disponible | SMAB"
        description="Le programme distributeur SMAB sera bientôt disponible. Rejoignez notre réseau de distribution d'équipements industriels au Maroc."
        keywords={['distributeur', 'SMAB', 'réseau distribution', 'équipements industriels', 'Maroc']}
        pageType="website"
      />

      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Hero Section */}
        <section className="relative flex-1 flex items-center justify-center overflow-hidden bg-gray-900 min-h-[70vh]">
          {/* Animated background circles */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.07, 0.12, 0.07] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#e63812]"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-32 -right-32 w-[30rem] h-[30rem] rounded-full bg-[#e63812]"
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.04, 0.08, 0.04] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-[#e63812]"
            />
          </div>

          <div className="relative container mx-auto px-4 text-center">
            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <div className="bg-[#e63812]/20 border border-[#e63812]/40 rounded-full p-6">
                <FaTruck className="text-[#e63812] text-5xl" />
              </div>
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#e63812]/10 border border-[#e63812]/30 text-[#e63812] text-sm font-semibold px-4 py-2 rounded-full mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#e63812] animate-pulse" />
              Bientôt disponible
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Programme{' '}
              <span className="text-[#e63812]">Distributeur</span>
            </motion.h1>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-1 w-24 bg-[#e63812] mx-auto mb-8"
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Nous travaillons à la mise en place d'un réseau de distribution solide pour nos équipements industriels.
              Rejoignez-nous bientôt et devenez partenaire distributeur SMAB au Maroc.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#e63812] text-white px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center gap-2 group"
                >
                  <FaEnvelope />
                  Nous contacter
                  <FaArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </Link>
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white/30 text-white hover:border-[#e63812] hover:text-[#e63812] px-8 py-4 rounded-xl font-semibold text-lg transition-colors duration-300"
                >
                  Retour à l'accueil
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Pourquoi devenir distributeur SMAB ?
              </h2>
              <div className="h-1 w-20 bg-[#e63812] mx-auto mb-6" />
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Notre réseau de distribution vous offre des avantages exclusifs pour développer votre activité.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Gamme complète',
                  description: "Accédez à l'ensemble de notre catalogue d'équipements industriels de haute qualité.",
                  delay: 0.1,
                },
                {
                  title: 'Support dédié',
                  description: 'Bénéficiez d\'un accompagnement technique et commercial pour développer vos ventes.',
                  delay: 0.2,
                },
                {
                  title: 'Conditions avantageuses',
                  description: 'Profitez de conditions tarifaires préférentielles et de marges compétitives.',
                  delay: 0.3,
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: item.delay }}
                  className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-[#e63812]"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Intéressé par notre programme distributeur ?
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Contactez-nous dès maintenant pour être parmi les premiers informés du lancement et réserver votre place dans notre réseau.
              </p>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#e63812] text-white px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center group"
                >
                  Contactez-nous
                  <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Distributeur;
