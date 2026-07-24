import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { CheckCircle2 } from "lucide-react";

export default function ForPhotographersPage() {
  return (
    <div className="bg-brand-ivory min-h-screen pt-[90px]">
      
      {/* Banner Hero Section */}
      <section className="relative h-[50vh] md:h-[70vh] bg-brand-navy w-full flex items-center justify-center overflow-hidden">
         <div className="absolute inset-0 z-0">
           <Image src="/assets/akb.png" alt="For Photographers" fill className="object-cover" />
           <div className="absolute inset-0 bg-black/60" />
         </div>
         <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
           <span className="text-brand-gold text-xs uppercase tracking-[0.2em] font-bold block mb-4">B2B Partnerships</span>
           <h1 className="font-heading text-5xl md:text-7xl text-white mb-6 leading-[1.1]">Your Art, <br/><span className="italic font-light">Perfectly Printed.</span></h1>
           <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">Join the hundreds of professional photographers who trust Aakruti Digipress as their premium printing partner.</p>
         </div>
      </section>

      {/* The Sample Kit Section */}
      <section className="py-24 container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center max-w-7xl mx-auto bg-white rounded-3xl p-8 md:p-16 shadow-2xl border border-gray-100">
          <div className="w-full lg:w-1/2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-4 border-gray-50">
             <Image src="/assets/premium_wedding_album.png" alt="Photographer Sample Kit" fill className="object-cover" />
          </div>
          <div className="w-full lg:w-1/2 space-y-8">
            <FadeIn>
              <h2 className="font-heading text-4xl md:text-5xl text-brand-charcoal leading-tight mb-6">Request Your <span className="italic text-brand-gold">Studio Sample Kit</span></h2>
              <p className="text-gray-600 text-lg leading-relaxed font-light mb-8">
                Seeing is believing. We offer heavily discounted studio sample kits for professional photographers. Feel the weight of our covers, examine the binding strength, and see the color accuracy of our archival prints for yourself.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Includes Swatch Book of all Cover Materials</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Sample Prints on Lustre, Matte, and Fine Art Papers</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Complete White-label Packaging Examples</span>
                </li>
              </ul>

              <Button asChild size="lg" className="bg-brand-charcoal text-white hover:bg-black rounded-full px-8 py-6 tracking-widest uppercase font-bold text-xs shadow-xl transition-transform hover:-translate-y-1">
                 <Link href="https://wa.me/919177888499?text=I am a photographer interested in ordering a Studio Sample Kit." target="_blank">Order Sample Kit via WhatsApp</Link>
              </Button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 container mx-auto px-4 md:px-8 max-w-7xl">
         <div className="text-center max-w-3xl mx-auto mb-20">
            <FadeIn>
              <span className="text-brand-gold text-xs uppercase tracking-[0.2em] font-bold block mb-4">The Aakruti Advantage</span>
              <h2 className="font-heading text-4xl md:text-5xl text-brand-charcoal mb-6">Why Partner With Us?</h2>
            </FadeIn>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            <FadeIn delay={0.1} className="space-y-4 bg-white p-10 rounded-2xl shadow-xl border border-black/5 transition-transform hover:-translate-y-2">
              <h3 className="font-heading text-3xl text-brand-charcoal border-b border-brand-gold/30 pb-4">Consistent Quality</h3>
              <p className="text-gray-600 leading-relaxed font-light text-lg">We maintain strict color profiles and calibration, meaning the proofs you see on your calibrated monitor will match the final printed album perfectly.</p>
            </FadeIn>
            <FadeIn delay={0.2} className="space-y-4 bg-white p-10 rounded-2xl shadow-xl border border-black/5 transition-transform hover:-translate-y-2">
              <h3 className="font-heading text-3xl text-brand-charcoal border-b border-brand-gold/30 pb-4">Premium Presentation</h3>
              <p className="text-gray-600 leading-relaxed font-light text-lg">Deliver your work in custom-crafted presentation boxes, with your studio logo elegantly embossed or foiled on the cover.</p>
            </FadeIn>
            <FadeIn delay={0.3} className="space-y-4 bg-white p-10 rounded-2xl shadow-xl border border-black/5 transition-transform hover:-translate-y-2">
              <h3 className="font-heading text-3xl text-brand-charcoal border-b border-brand-gold/30 pb-4">Reliable Assistance</h3>
              <p className="text-gray-600 leading-relaxed font-light text-lg">Direct access to our printing experts in Vijayawada. We review your files for bleed, safe zones, and resolution before printing begins.</p>
            </FadeIn>
         </div>
      </section>

      {/* How We Work Together Section */}
      <section className="py-24 md:py-32 bg-brand-charcoal text-white relative mt-16">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="text-center mb-20">
            <FadeIn>
              <h2 className="font-heading text-4xl md:text-5xl text-white mb-6">Our Collaborative <span className="italic text-brand-gold">Workflow</span></h2>
              <p className="text-gray-400 font-light text-lg max-w-2xl mx-auto">A streamlined process designed to save you time and guarantee client satisfaction.</p>
            </FadeIn>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
             <FadeIn delay={0.1} className="text-center relative">
                <div className="w-20 h-20 mx-auto border-2 border-brand-gold rounded-full flex items-center justify-center mb-6">
                  <span className="font-heading text-4xl text-brand-gold">1</span>
                </div>
                <h4 className="font-heading text-2xl mb-4 text-white">Submit Files</h4>
                <p className="text-gray-400 font-light leading-relaxed">Upload your high-resolution spreads through our secure photographer portal.</p>
             </FadeIn>
             <FadeIn delay={0.2} className="text-center relative">
                <div className="w-20 h-20 mx-auto border-2 border-brand-gold rounded-full flex items-center justify-center mb-6">
                  <span className="font-heading text-4xl text-brand-gold">2</span>
                </div>
                <h4 className="font-heading text-2xl mb-4 text-white">Quality Check</h4>
                <p className="text-gray-400 font-light leading-relaxed">Our prepress team reviews every spread for color space, resolution, and safe zones.</p>
             </FadeIn>
             <FadeIn delay={0.3} className="text-center relative">
                <div className="w-20 h-20 mx-auto border-2 border-brand-gold rounded-full flex items-center justify-center mb-6">
                  <span className="font-heading text-4xl text-brand-gold">3</span>
                </div>
                <h4 className="font-heading text-2xl mb-4 text-white">Artisan Printing</h4>
                <p className="text-gray-400 font-light leading-relaxed">Your album is printed, bound, and meticulously checked for structural perfection.</p>
             </FadeIn>
             <FadeIn delay={0.4} className="text-center relative">
                <div className="w-20 h-20 mx-auto border-2 border-brand-gold rounded-full flex items-center justify-center mb-6">
                  <span className="font-heading text-4xl text-brand-gold">4</span>
                </div>
                <h4 className="font-heading text-2xl mb-4 text-white">White-Label Delivery</h4>
                <p className="text-gray-400 font-light leading-relaxed">We ship the finished product in unbranded packaging directly to your studio or client.</p>
             </FadeIn>
          </div>

          <div className="mt-24 text-center">
             <FadeIn delay={0.5}>
               <Button asChild size="lg" className="bg-brand-gold text-brand-charcoal hover:bg-[#cda434] rounded-full px-12 py-8 tracking-widest uppercase font-bold text-sm shadow-2xl transition-transform hover:-translate-y-1 border border-brand-gold/30">
                  <Link href="https://wa.me/919177888499" target="_blank">Contact Our B2B Team</Link>
               </Button>
             </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
