import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import banner from '../assets/images/about us/banner nos_service.png';
import historyImage from '../assets/images/about us/nos histoire.png';
import mission from '../assets/images/about us/Notre Mission.png';
import vision from '../assets/images/about us/Notre Vision.png';
import qualite from '../assets/images/about us/Qualité et performance .png';
import integrite from '../assets/images/about us/Intégrité et transparence.png';
import innovation from '../assets/images/about us/Innovation continue .png';
import accompagnement from '../assets/images/about us/NotreAccpmpagnement.png';
import { FaArrowRight } from 'react-icons/fa';

const values = [
  {
    id: 1,
    title: "Qualité et performance",
    description: "Nous nous engageons à fournir des équipements et des solutions de haute qualité pour garantir la performance optimale de vos installations.",
    image: qualite,
    delay: 0.1
  },
  {
    id: 2,
    title: "Intégrité et transparence",
    description: "Notre approche est basée sur une communication transparente et des relations de confiance avec nos clients.",
    image: integrite,
    delay: 0.2
  },
  {
    id: 3,
    title: "Innovation continue",
    description: "Nous investissons constamment dans la recherche et le développement pour vous offrir les solutions les plus innovantes.",
    image: innovation,
    delay: 0.3
  },
  {
    id: 4,
    title: "Accompagnement personnalisé",
    description: "Chaque projet est unique, c'est pourquoi nous vous accompagnons de manière personnalisée tout au long de votre projet.",
    image: accompagnement,
    delay: 0.4
  }
];

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-[70vh] overflow-hidden">
        <img
          src={banner}
          alt="À propos de nous"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                À propos de SMAB
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Spécialiste des équipements industriels au Maroc, nous accompagnons votre réussite depuis plus de 40 ans.
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
        </div>
      </div>

      {/* Notre Histoire Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Notre Histoire
              </h2>
              <div className="h-1 w-20 bg-[#e63812] mb-8"></div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Depuis notre création, SMAB s'est imposé comme un acteur majeur dans le domaine des équipements industriels au Maroc. Notre parcours est marqué par un engagement constant envers l'excellence et l'innovation.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Nous avons bâti notre réputation sur la qualité de nos services, l'expertise de nos équipes et notre capacité à comprendre et répondre aux besoins spécifiques de chaque client.
              </p>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex items-center gap-4">
                  <img src={mission} alt="Mission" className="w-12 h-12" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Notre Mission</h4>
                    <p className="text-gray-600 text-sm">Fournir des solutions industrielles innovantes</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <img src={vision} alt="Vision" className="w-12 h-12" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Notre Vision</h4>
                    <p className="text-gray-600 text-sm">Devenir le leader des équipements industriels</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2"
            >
              <div className="relative">
                <img
                  src={historyImage}
                  alt="Notre Histoire"
                  className="w-full rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#e63812]/10 rounded-full"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#e63812]/5 rounded-full"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>      {/* Notre Expertise Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Notre Expertise
            </h2>
            <div className="h-1 w-20 bg-[#e63812] mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Étude & Conception Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Étude & Conception :
                </h3>
                <h4 className="text-xl font-semibold text-[#e63812] mb-6">
                  Des Solutions Sur Mesure
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Le projet commence par une phase d'analyse approfondie afin de proposer des équipements adaptés aux besoins spécifiques de nos clients. Grâce à notre expertise et à des outils de conception avancés, nous développons des solutions innovantes, performantes et conformes aux exigences industrielles.
                </p>
              </div>
            </motion.div>

            {/* Montage & Fabrication Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Montage & Fabrication :
                </h3>
                <h4 className="text-xl font-semibold text-[#e63812] mb-6">
                  Une Qualité Maîtrisée
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Nos machines sont fabriquées avec des matériaux de haute qualité et assemblées selon des processus rigoureux garantissant fiabilité et durabilité. Chaque étape, du montage à la mise en service, est réalisée avec précision pour assurer une performance optimale et une intégration fluide dans vos lignes de production.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Nos Valeurs
            </h2>
            <div className="h-1 w-20 bg-[#e63812] mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Des principes qui guident chacune de nos actions et reflètent notre engagement envers l'excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: value.delay }}
                className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500"
              >
                <div className="bg-white rounded-xl p-4 shadow-md mb-6">
                  <img
                    src={value.image}
                    alt={value.title}
                    className="w-16 h-16 mx-auto"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>      </section>

      {/* Notre Accompagnement Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Notre Accompagnement
              </h2>
              <div className="h-1 w-20 bg-[#e63812] mb-8"></div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Quel que soit le stade de votre projet, que vous soyez un expert ou un débutant, SMAB vous accompagne avec des solutions sur mesure. Nous soutenons également les porteurs de projets financés par des programmes tels que FORSA, Intilaka ou INDH, en leur apportant des solutions adaptées à leurs besoins.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                En choisissant SMAB, vous bénéficiez d'un accompagnement complet, de la conception à l'installation de vos équipements, ainsi qu'un service client dédié pour assurer la performance et la pérennité de vos investissements.
              </p>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#e63812] text-white px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center group"
                >
                  En savoir plus
                  <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <img
                  src={accompagnement}
                  alt="Notre Accompagnement"
                  className="w-full rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#e63812]/10 rounded-full"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#e63812]/5 rounded-full"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Besoin d'informations supplémentaires ?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Contactez notre équipe pour discuter de vos projets et découvrir nos solutions adaptées à vos besoins. SMAB, votre partenaire pour une production optimisée et un avenir prospère.
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
  );
};

export default About;
