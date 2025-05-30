import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import banner from '../assets/images/nos_service/0 - Banner nos services.png';
import conseil from '../assets/uspIcons/conseil.png';
import livraison from '../assets/uspIcons/Livraison.png';
import installation from '../assets/uspIcons/Installation.png';
import miseEnMarche from '../assets/uspIcons/Mise en marche.png';
import reception from '../assets/uspIcons/Reception.png';

// Service detail images
import conseilDetail from '../assets/images/nos_service/1 - Accompagnement et conseil.png';
import livraisonDetail from '../assets/images/nos_service/2 - Livraison.png';
import installationDetail from '../assets/images/nos_service/3 - Installation.png';
import miseEnMarcheDetail from '../assets/images/nos_service/4 - Mise en marche.png';
import receptionDetail from '../assets/images/nos_service/5 - Réception.png';

const services = [
  {
    id: 1,
    title: "Accompagnement et conseil",
    description: "Notre équipe d'experts vous accompagne dans le choix des équipements adaptés à vos besoins spécifiques.",
    image: conseil,
    detailImage: conseilDetail,
    delay: 0.1,
    features: [
      "Analyse de vos besoins",
      "Proposition sur mesure",
      "Suivi personnalisé"
    ],
    detailedDescription: [
      "Nous étudions votre situation pour vous proposer la solution la plus adaptée",
      "Nos experts vous recommandent les machines qui répondent le mieux à vos attentes",
      "Vous bénéficiez d'un accompagnement sur le long terme pour garantir votre satisfaction"
    ]
  },
  {
    id: 2,
    title: "Livraison",
    description: "Nous assurons la livraison de vos équipements dans les meilleures conditions et délais.",
    image: livraison,
    detailImage: livraisonDetail,
    delay: 0.2,
    features: [
      "Livraison rapide et sécurisée",
      "Installation par des experts",
      "Mise en marche complète"
    ],
    detailedDescription: [
      "Nous nous assurons que vos machines arrivent dans les meilleures conditions",
      "Nos techniciens installent vos équipements et effectuent un premier test de fonctionnement",
      "Nous mettons tout en œuvre pour que vos machines soient opérationnelles dès leur arrivée"
    ]
  },
  {
    id: 3,
    title: "Installation",
    description: "Notre équipe technique procède à l'installation professionnelle de vos équipements.",
    image: installation,
    detailImage: installationDetail,
    delay: 0.3,
    features: [
      "Installation experte",
      "Test de fonctionnement",
      "Configuration optimale"
    ],
    detailedDescription: [
      "Notre équipe technique procède à l'installation complète de vos équipements",
      "Nous effectuons tous les tests nécessaires pour garantir un fonctionnement optimal",
      "La configuration est optimisée selon vos besoins spécifiques"
    ]
  },
  {
    id: 4,
    title: "Mise en marche",
    description: "Nous garantissons la mise en service optimale de vos installations.",
    image: miseEnMarche,
    detailImage: miseEnMarcheDetail,
    delay: 0.4,
    features: [
      "Démarrage assisté",
      "Formation du personnel",
      "Vérification complète"
    ],
    detailedDescription: [
      "Nous assurons le démarrage de vos installations en toute sécurité",
      "Votre personnel est formé à l'utilisation optimale des équipements",
      "Une vérification complète est effectuée avant la mise en service définitive"
    ]
  },
  {
    id: 5,
    title: "Réception",
    description: "Nous effectuons avec vous la réception finale des équipements pour garantir votre satisfaction.",
    image: reception,
    detailImage: receptionDetail,
    delay: 0.5,
    features: [
      "Conformité aux exigences",
      "Rapport détaillé",
      "Assistance validation"
    ],
    detailedDescription: [
      "Nous nous assurons que chaque étape de la réception est en accord avec les critères des appels d'offres",
      "Nous vous transmettons un rapport détaillant la conformité des équipements aux spécifications",
      "Nous vous accompagnons dans la procédure de validation de la réception par l'entité publique"
    ]
  }
];

const Services = () => {
  // Create refs for each service section
  const refs = services.reduce((acc, service) => {
    acc[service.id] = React.useRef(null);
    return acc;
  }, {});

  const scrollToSection = (id) => {
    refs[id].current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={banner}
          alt="Nos Services Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
           
          </motion.div>
        </div>
      </div>      {/* Services Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Nos Services Professionnels</h2>
          <div className="h-1 w-20 bg-[#e63812] mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Découvrez notre gamme complète de services professionnels conçus pour répondre à vos besoins industriels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: service.delay }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group border border-gray-100"
            >              <div className="mb-6 relative">
                <div 
                  onClick={() => scrollToSection(service.id)}
                  className="w-20 h-20 mx-auto mb-4 bg-[#e63812]/10 rounded-2xl p-4 group-hover:bg-[#e63812] transition-colors duration-300 cursor-pointer transform hover:scale-105"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-contain filter group-hover:brightness-0 group-hover:invert transition-all duration-300"
                  />
                </div>
                <div className="h-1 w-12 bg-[#e63812] mx-auto transform origin-left group-hover:w-20 transition-all duration-300"></div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-[#e63812] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>                <motion.button
                  onClick={() => scrollToSection(service.id)}
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center text-[#e63812] font-semibold group/btn cursor-pointer"
                >
                  En savoir plus
                  <FaArrowRight className="ml-2 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>      {/* Detailed Service Sections */}
      {services.map((service, index) => (
        <div
          ref={refs[service.id]}
          key={service.id}
          className="relative overflow-hidden py-24 scroll-mt-24"
          style={{
            backgroundColor: index % 2 === 0 ? 'white' : '#f8fafc'
          }}
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-12 lg:gap-16`}
            >
              {/* Image Section */}
              <div className="w-full lg:w-1/2">
                <div className="relative">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="rounded-2xl overflow-hidden shadow-2xl"
                  >
                    <img
                      src={service.detailImage}
                      alt={service.title}
                      className="w-full h-auto"
                    />
                  </motion.div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#e63812]/10 rounded-full"></div>
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#e63812]/5 rounded-full"></div>
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h3 className="text-3xl font-bold mb-6 text-gray-800">
                    {service.title}
                  </h3>
                  <div className="h-1 w-20 bg-[#e63812] mb-8"></div>
                  
                  {service.detailedDescription.map((desc, idx) => (
                    <div key={idx} className="flex items-start gap-4 mb-6">
                      <div className="flex-shrink-0 mt-1">
                        <FaCheckCircle className="w-5 h-5 text-[#e63812]" />
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  ))}

                  <div className="mt-8 bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-100 shadow-lg">
                    <h4 className="font-semibold text-gray-800 mb-4">
                      Points clés :
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-gray-600"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#e63812]"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      ))}

      {/* CTA Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[#e63812] opacity-10 pattern-diagonal-lines pattern-black pattern-bg-white pattern-size-4 pattern-opacity-10"></div>
        <div className="container mx-auto px-4 py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="relative p-12 text-center">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#e63812] to-transparent"></div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#e63812] to-[#ff6b4a] bg-clip-text text-transparent">
                Prêt à commencer votre projet ?
              </h2>
              <p className="text-lg md:text-xl mb-8 text-gray-600">
                Contactez-nous dès aujourd'hui pour discuter de vos besoins et découvrir comment nous pouvons vous aider.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#e63812] to-[#ff6b4a] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-0.5"
              >
                Nous contacter
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Services;
