"use client";

import { Palette, Printer, Hammer, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function ProcessPage() {
  const steps = [
    {
      icon: <Palette className="w-8 h-8 text-white" />,
      title: "1. Design & Layout",
      description: "Our in-house design team optimizes your raw layouts for perfect color reproduction and bleed margins."
    },
    {
      icon: <Printer className="w-8 h-8 text-white" />,
      title: "2. 6-Color Printing",
      description: "Using advanced Hexachrome technology on silver halide paper to ensure perfect skin tones."
    },
    {
      icon: <Hammer className="w-8 h-8 text-white" />,
      title: "3. Precision Binding",
      description: "Seamless lay-flat binding applied by master craftsmen using premium adhesives and materials."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-white" />,
      title: "4. Quality Assurance",
      description: "A 40-point visual and structural check before the album is packaged in its custom presentation box."
    }
  ];

  return (
    <div className="pt-[90px]">
      <div className="bg-brand-petrol-dark text-white py-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Craftsmanship Process</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">How we turn digital memories into physical heirlooms.</p>
      </div>
      
      <section className="py-24 px-4 md:px-6 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative p-8 border rounded-2xl bg-white hover:shadow-xl transition-shadow group">
              <div className="w-16 h-16 bg-brand-petrol rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-brand-grey/30">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">State of the Art Technology</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              We invest heavily in the latest print technology. Our 6-color printing presses provide a wider color gamut than traditional CMYK, allowing for absolute precision in wedding photography where skin tones and vibrant fabrics matter most.
            </p>
          </div>
          <div className="w-full md:w-1/2 relative aspect-video rounded-xl overflow-hidden shadow-2xl">
             <Image src="/assets/printing_press.png" alt="Technology" fill className="object-cover" />
          </div>
        </div>
      </section>
    </div>
  );
}
