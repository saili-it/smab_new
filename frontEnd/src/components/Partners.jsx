import React from 'react';
import { motion } from 'framer-motion';

// Import all partner logos
import bimboLogo from '../assets/partners/bimbo.png';
import cocacolaLogo from '../assets/partners/cocacola.png';
import enabelLogo from '../assets/partners/enabel.png';
import gizLogo from '../assets/partners/giz.png';
import mohamed5Logo from '../assets/partners/mohamed5.png';
import ocpLogo from '../assets/partners/ocp.png';
import triaLogo from '../assets/partners/tria.png';
import agricolSouseLogo from '../assets/partners/agricol souse.png';
import dgacasaLogo from '../assets/partners/dgacasa.png';
import draBnimelalLogo from '../assets/partners/dra bnimelal.png';
import ofpptLogo from '../assets/partners/ofppt.png';
import ormvahLogo from '../assets/partners/ormvah.png';
import ormvatrLogo from '../assets/partners/ORMVAT.png';
import ormvatfLogo from '../assets/partners/ormvatf.png';

const Partners = () => {
  const partners = [
    { name: 'Bimbo', logo: bimboLogo },
    { name: 'Coca Cola', logo: cocacolaLogo },
    { name: 'Enabel', logo: enabelLogo },
    { name: 'GIZ', logo: gizLogo },
    { name: 'Université Mohammed V', logo: mohamed5Logo },
    { name: 'OCP', logo: ocpLogo },
    { name: 'Tria', logo: triaLogo },
    { name: 'Agricol Souse', logo: agricolSouseLogo },
    { name: 'DGACASA', logo: dgacasaLogo },
    { name: 'DRA Bni Melal', logo: draBnimelalLogo },
    { name: 'OFPPT', logo: ofpptLogo },
    { name: 'ORMVAH', logo: ormvahLogo },
    { name: 'ORMVAT', logo: ormvatrLogo },
    { name: 'ORMVATF', logo: ormvatfLogo },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/5 via-transparent to-gray-900/5" />
        <div className="absolute w-[500px] h-[500px] -top-48 -left-48 bg-[#e63812] rounded-full blur-[100px] opacity-[0.08]" />
        <div className="absolute w-[500px] h-[500px] -bottom-48 -right-48 bg-[#e63812] rounded-full blur-[100px] opacity-[0.08]" />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block px-4 py-2 bg-[#e63812]/10 text-[#e63812] rounded-full text-sm font-semibold mb-4"
          >
            Ils Nous Font Confiance
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Nos Partenaires
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Des entreprises leaders qui nous font confiance pour leurs solutions industrielles
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="relative group"
            >
              <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-[#e63812]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative h-32 flex items-center justify-center">
                  <motion.img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
