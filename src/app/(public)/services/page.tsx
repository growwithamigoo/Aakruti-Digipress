"use client";

import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function ServicesPage() {
  const services = [
    {
      title: "Wedding Photo Books",
      description: "Our signature offering. High-end, lay-flat photo books designed specifically for wedding photographers to showcase their best work.",
      features: ["Silver Halide Printing", "Custom Leather/Acrylic Covers", "Thick Substrate Pages", "Lifetime Binding Guarantee"],
      image: "/assets/indian_wedding.png",
    },
    {
      title: "Custom Album Covers",
      description: "We offer bespoke cover manufacturing for photographers who print elsewhere but need premium encasements.",
      features: ["Italian Leather Options", "Crystal Acrylic Facias", "Laser Engraved Wood", "Gold & Silver Foil Stamping"],
      image: "/assets/leather_album_cover.png",
    },
    {
      title: "Professional Photo Printing",
      description: "Loose prints and large-format canvases for studio displays or client deliveries.",
      features: ["6-Color Hexachrome Tech", "True-to-life Skin Tones", "Lustre & Matte Finishes", "Archival Quality"],
      image: "/assets/hero_craft_album.png",
    }
  ];

  return (
    <div className="pt-[90px]">
      <div className="bg-brand-petrol-dark text-white py-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">Comprehensive printing and binding solutions for professional photographers.</p>
      </div>
      
      <section className="py-20 px-4 md:px-6 container mx-auto space-y-24">
        {services.map((service, idx) => (
          <div key={idx} className={`flex flex-col lg:flex-row gap-12 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
            <div className="w-full lg:w-1/2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image src={service.image} alt={service.title} fill className="object-cover" />
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">{service.title}</h2>
              <p className="text-lg text-gray-600 leading-relaxed">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-brand-petrol font-medium">
                    <CheckCircle2 className="w-5 h-5 mr-3" /> {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
