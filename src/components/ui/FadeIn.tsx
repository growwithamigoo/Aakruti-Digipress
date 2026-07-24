"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxImage({ src, alt, className = "" }: { src: string, alt: string, className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-[120%] object-cover absolute top-0 left-0"
        initial={{ y: "0%" }}
        whileInView={{ y: "-15%" }}
        viewport={{ once: false, margin: "0px" }}
        transition={{ ease: "linear" }}
      />
    </div>
  );
}
