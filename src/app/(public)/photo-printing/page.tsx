import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";

export default function PhotoPrintingPage() {
  return (
    <div className="bg-brand-ivory min-h-screen pt-[90px]">
      {/* Banner Hero Section */}
      <section className="relative h-[50vh] md:h-[70vh] w-full flex items-center justify-center overflow-hidden">
        <Image src="/assets/pho.png" alt="Photo Printing Banner" fill className="absolute inset-0 object-cover" unoptimized={true} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-12">
          <span className="text-brand-gold text-xs uppercase tracking-[0.2em] font-bold block mb-4">Premium Quality</span>
          <h1 className="font-heading text-5xl md:text-7xl text-white mb-6 leading-[1.1]">Photographs Printed with the<br/><span className="italic font-light">Detail They Deserve.</span></h1>
          <p className="text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed">We specialize in accurate skin tones, rich wedding colours, and fine jewellery detail using professional 6-color printing.</p>
        </div>
      </section>

      {/* Pricing and Specifications Section */}
      <section className="py-24 container mx-auto px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-brand-charcoal mb-6">Print <span className="italic text-brand-gold">Specifications</span></h2>
            <p className="text-gray-600 text-lg font-light max-w-2xl mx-auto">
              We offer a wide variety of archival papers to suit the mood and tone of your photography.
            </p>
          </FadeIn>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <FadeIn delay={0.1} className="p-10 border-b md:border-b-0 md:border-r border-gray-100">
                <h3 className="font-heading text-2xl text-brand-charcoal mb-4">Lustre / Matte</h3>
                <p className="text-gray-500 font-light mb-6">A classic finish with minimal glare and vivid color reproduction. Perfect for vibrant wedding ceremonies.</p>
                <div className="space-y-3">
                   <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                      <span className="text-sm font-bold text-gray-700">8x12 inches</span>
                      <span className="text-sm text-brand-gold font-bold">Standard</span>
                   </div>
                   <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                      <span className="text-sm font-bold text-gray-700">12x15 inches</span>
                      <span className="text-sm text-brand-gold font-bold">Standard</span>
                   </div>
                   <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                      <span className="text-sm font-bold text-gray-700">12x18 inches</span>
                      <span className="text-sm text-brand-gold font-bold">Standard</span>
                   </div>
                </div>
              </FadeIn>
              
              <FadeIn delay={0.2} className="p-10">
                <h3 className="font-heading text-2xl text-brand-charcoal mb-4">Fine Art / Metallic</h3>
                <p className="text-gray-500 font-light mb-6">A premium choice with a slight pearlescent sheen that makes high-contrast images and jewellery pop.</p>
                <div className="space-y-3">
                   <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                      <span className="text-sm font-bold text-gray-700">8x12 inches</span>
                      <span className="text-sm text-brand-gold font-bold">Premium</span>
                   </div>
                   <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                      <span className="text-sm font-bold text-gray-700">12x15 inches</span>
                      <span className="text-sm text-brand-gold font-bold">Premium</span>
                   </div>
                   <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                      <span className="text-sm font-bold text-gray-700">12x18 inches</span>
                      <span className="text-sm text-brand-gold font-bold">Premium</span>
                   </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-brand-charcoal text-white relative">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center max-w-7xl mx-auto px-4 md:px-8">
            <div className="w-full lg:w-1/2 relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-8 border-white group">
               <Image src="/assets/inpic.png" alt="Photo Printing Process" fill className="object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out" />
            </div>
            
            <div className="w-full lg:w-1/2 space-y-12 pl-0 md:pl-12">
               
               <FadeIn delay={0.1} className="relative">
                 <span className="text-brand-gold font-heading text-6xl opacity-50 absolute -left-16 -top-4 hidden md:block">01</span>
                 <span className="text-brand-gold font-heading text-4xl opacity-50 block mb-2 md:hidden">01</span>
                 <h3 className="font-heading text-3xl md:text-4xl text-white mb-4">True-to-Life Skin Tones</h3>
                 <p className="text-gray-400 text-lg leading-relaxed font-light">Our advanced printing profiles are calibrated specifically for Indian skin tones, ensuring warmth, accuracy, and natural gradients without oversaturation.</p>
               </FadeIn>
               
               <FadeIn delay={0.2} className="relative">
                 <span className="text-brand-gold font-heading text-6xl opacity-50 absolute -left-16 -top-4 hidden md:block">02</span>
                 <span className="text-brand-gold font-heading text-4xl opacity-50 block mb-2 md:hidden">02</span>
                 <h3 className="font-heading text-3xl md:text-4xl text-white mb-4">Fine Detail Reproduction</h3>
                 <p className="text-gray-400 text-lg leading-relaxed font-light">From the intricate threads of a Kanchipuram saree to the fine details of temple jewellery, our prints preserve the exact sharpness of your raw files.</p>
               </FadeIn>
               
               <FadeIn delay={0.3} className="relative">
                 <span className="text-brand-gold font-heading text-6xl opacity-50 absolute -left-16 -top-4 hidden md:block">03</span>
                 <span className="text-brand-gold font-heading text-4xl opacity-50 block mb-2 md:hidden">03</span>
                 <h3 className="font-heading text-3xl md:text-4xl text-white mb-4">Archival Quality Paper</h3>
                 <p className="text-gray-400 text-lg leading-relaxed font-light">We use premium silver halide photographic paper that resists fading, ensuring these memories can be passed down for generations.</p>
               </FadeIn>

               <FadeIn delay={0.4} className="pt-8">
                 <Button asChild size="lg" className="bg-brand-gold text-brand-charcoal hover:bg-[#cda434] rounded-full px-10 py-6 tracking-widest uppercase font-bold text-sm shadow-xl transition-transform hover:-translate-y-1 border border-brand-gold/30">
                    <Link href="/contact">Enquire About Printing</Link>
                 </Button>
               </FadeIn>
               
            </div>
         </div>
      </section>
    </div>
  );
}
