import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

import { HeroSlider } from "@/components/home/HeroSlider";

export const revalidate = 60;

export default async function HomePage() {
  const featuredProducts = await prisma.albumProduct.findMany({
    where: { status: 'Published', isFeatured: true },
    include: { collection: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  return (
    <div className="w-full bg-brand-ivory flex flex-col selection:bg-brand-gold/30 selection:text-brand-charcoal overflow-hidden">
      {/* 1. CINEMATIC HERO */}
      <section className="relative h-screen w-full flex items-center justify-center">
        <HeroSlider />
        
        {/* Subtle gradient to anchor the header navigation */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-brand-ivory/80 to-transparent z-10 pointer-events-none" />
      </section>

      {/* 2. ELEGANT OCCASION SHOWCASE */}
      <section className="py-32 md:py-48 px-4 md:px-8 container mx-auto bg-brand-ivory relative z-10">
        <FadeIn className="mb-24 text-center max-w-3xl mx-auto">
          <h2 className="font-heading text-5xl md:text-7xl text-brand-charcoal mb-6">Every Celebration<br/><span className="italic text-brand-gold">Deserves a Story</span></h2>
          <p className="text-gray-500 text-lg font-light">Explore our curated collections of premium albums.</p>
        </FadeIn>
        
        {/* Asymmetrical Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center mb-32">
          <div className="lg:col-span-7 relative h-[300px] lg:h-[400px] group overflow-hidden rounded-2xl shadow-2xl border-8 border-white">
             <Image src="/assets/homeimg.png" alt="Wedding Albums" fill className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" />
          </div>
          <div className="lg:col-span-5 flex flex-col justify-center">
            <FadeIn>
              <span className="text-brand-gold text-xs uppercase tracking-[0.2em] font-bold block mb-4">01. Signature Collection</span>
              <h3 className="font-heading text-4xl md:text-6xl text-brand-charcoal mb-6">Telugu Weddings</h3>
              <p className="text-gray-600 text-lg leading-relaxed font-light mb-8">
                Preserve every ritual, from the Jeelakarra Bellam to the final farewell, in exquisite lay-flat spreads. Printed on archival silver halide paper.
              </p>
              <Link href="/albums?occasion=wedding" className="inline-flex items-center text-brand-charcoal text-xs uppercase tracking-[0.2em] font-bold group">
                View Collection <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </FadeIn>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          <div className="lg:col-span-5 lg:order-1 order-2 flex flex-col justify-center lg:text-right">
            <FadeIn>
              <span className="text-brand-gold text-xs uppercase tracking-[0.2em] font-bold block mb-4">02. Milestones</span>
              <h3 className="font-heading text-4xl md:text-6xl text-brand-charcoal mb-6">First Birthdays</h3>
              <p className="text-gray-600 text-lg leading-relaxed font-light mb-8 lg:ml-auto">
                Capture the very first expressions, tiny footsteps, and joyful giggles you'll treasure forever. Printed with the same premium craftsmanship as our wedding line.
              </p>
              <Link href="/albums?occasion=first-birthday" className="inline-flex items-center text-brand-charcoal text-xs uppercase tracking-[0.2em] font-bold group">
                View Milestones <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </FadeIn>
          </div>
          <div className="lg:col-span-7 lg:order-2 order-1 relative h-[300px] lg:h-[400px] group overflow-hidden rounded-2xl shadow-2xl border-8 border-white">
             <Image src="/assets/imageb.png" alt="Milestone Albums" fill className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" />
          </div>
        </div>
      </section>

      {/* 3. FEATURED ALBUMS */}
      <section className="py-32 bg-brand-cream relative">
        <div className="container mx-auto px-4 md:px-8">
          <FadeIn className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
               <h2 className="font-heading text-5xl md:text-6xl text-brand-charcoal">Featured <span className="italic text-brand-gold">Craftsmanship</span></h2>
            </div>
            <Link href="/albums" className="hidden md:inline-flex items-center text-xs uppercase tracking-[0.2em] font-bold hover:text-brand-gold transition-colors">
              View All Albums <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {featuredProducts.map((product, i) => (
              <FadeIn key={product.id} delay={i * 0.1} className="group block">
                <Link href={`/albums/${product.slug}`}>
                  <div className="relative overflow-hidden mb-6 bg-brand-charcoal aspect-[4/3] rounded-xl shadow-lg border-4 border-white/50">
                    {product.mainImage ? (
                      <Image src={product.mainImage} alt={product.name} fill className="object-cover opacity-90 group-hover:scale-[1.03] group-hover:opacity-100 transition-all duration-[1s] ease-out" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">No Image</div>
                    )}
                  </div>
                  <h3 className="font-heading text-2xl text-brand-charcoal group-hover:text-brand-gold transition-colors">{product.name}</h3>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-xs uppercase tracking-[0.1em] font-bold text-gray-500">{product.collection.name}</span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE PRINT QUALITY EXPERIENCE */}
      <section className="bg-brand-navy py-40 px-4 md:px-8 relative overflow-hidden">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-20">
           <div className="w-full lg:w-1/2">
              <FadeIn>
                <h2 className="font-heading text-5xl md:text-7xl text-white mb-8 leading-[1.1]">See the Colour.<br/><span className="italic text-brand-gold">Feel the Craft.</span></h2>
                <p className="text-gray-300 text-xl leading-relaxed font-light mb-12 max-w-lg">
                  Every photograph is reproduced with careful attention to skin tone, colour depth, clarity and consistency. The difference between viewing a photograph on a screen and experiencing it in print.
                </p>
                <div className="space-y-6">
                   <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                      <span className="text-brand-gold font-heading text-3xl">01</span>
                      <p className="text-white text-lg tracking-wide">Crystal Acrylic Finishes</p>
                   </div>
                   <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                      <span className="text-brand-gold font-heading text-3xl">02</span>
                      <p className="text-white text-lg tracking-wide">Italian Leather Binding</p>
                   </div>
                   <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                      <span className="text-brand-gold font-heading text-3xl">03</span>
                      <p className="text-white text-lg tracking-wide">Seamless Lay-flat Spreads</p>
                   </div>
                </div>
              </FadeIn>
           </div>
           <div className="w-full lg:w-1/2 relative h-[400px]">
              <FadeIn className="absolute inset-0 overflow-hidden rounded-2xl shadow-2xl border-8 border-white/10">
                 <Image src="/assets/akbf.png" alt="Cover Texture" fill className="object-cover" />
              </FadeIn>
           </div>
        </div>
      </section>
    </div>
  );
}
