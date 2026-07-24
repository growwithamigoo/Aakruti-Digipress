"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const banners = [
  { src: "/assets/ak b1.png", mobileSrc: "/assets/m1.png", title: "Preserving Your Precious Moments", subtitle: "Premium Wedding Album Printing in Vijayawada" },
  { src: "/assets/ak b2.png", mobileSrc: "/assets/m2.png", title: "Artisan Craftsmanship", subtitle: "Hand-bound with premium materials for lasting memories." },
  { src: "/assets/akb3.png", mobileSrc: "/assets/m3.png", title: "For Professional Photographers", subtitle: "Elevate your studio with our trusted white-label printing." }
];

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-brand-charcoal">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.5, ease: "easeInOut" },
            scale: { duration: 6, ease: "linear" }
          }}
          className="absolute inset-0"
        >
          {/* Desktop Image */}
          <Image
            src={banners[currentIndex].src}
            alt={`Aakruti Banner ${currentIndex + 1}`}
            fill
            className="object-cover hidden md:block"
            priority={currentIndex === 0}
            unoptimized={true}
          />
          
          {/* Mobile Image */}
          <Image
            src={banners[currentIndex].mobileSrc}
            alt={`Aakruti Mobile Banner ${currentIndex + 1}`}
            fill
            className="object-cover block md:hidden"
            priority={currentIndex === 0}
            unoptimized={true}
          />
          {banners[currentIndex].title && (
             <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 pt-20">
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-heading text-white mb-4 drop-shadow-lg"
                >
                  {banners[currentIndex].title}
                </motion.h1>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 1 }}
                  className="text-lg md:text-2xl text-white/90 font-light drop-shadow-md"
                >
                  {banners[currentIndex].subtitle}
                </motion.p>
             </div>
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Subtle gradient, no heavy black blocks */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-brand-charcoal/40 via-transparent to-brand-ivory pointer-events-none" />
    </div>
  );
}
