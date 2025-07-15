import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const StatCounter = ({ end, duration, label }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      let startTime;
      let animationFrame;
      
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);

        if (progress < 1) {
          setCount(Math.min(Math.floor(end * progress), end));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
          setHasAnimated(true);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [end, duration, isInView, hasAnimated]);

  return (
    <motion.div
      ref={counterRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="flex flex-col items-center justify-center">
        <span className="text-5xl md:text-6xl font-bold text-white mb-2">
          +{count}
        </span>
        <p className="text-xl md:text-2xl text-white/90 font-medium uppercase">{label}</p>
      </div>
    </motion.div>
  );
};

const Stats = ({ projetsRealises = 800, partenaires = 200, ansExpertise = 25 }) => {
  return (
    <section className="relative py-20 bg-black">
      {/* Background overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#e63812]/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <StatCounter end={projetsRealises} duration={2.5} label="Projets Réalisés" />
          <StatCounter end={partenaires} duration={2} label="Partenaires" />
          <StatCounter end={ansExpertise} duration={1.5} label="Ans D'expertise" />
        </div>
      </div>
    </section>
  );
};

export default Stats;
