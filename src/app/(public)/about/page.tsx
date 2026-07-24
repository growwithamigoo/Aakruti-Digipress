import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";

export default function AboutPage() {
  return (
    <div className="bg-brand-ivory min-h-screen">
      {/* Banner Hero Section */}
      <section className="relative h-[50vh] md:h-[70vh] w-full flex items-center justify-center overflow-hidden">
        <Image src="/assets/b-2.png" alt="About Us Banner" fill className="absolute inset-0 object-cover" unoptimized={true} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-12">
           <span className="text-brand-gold text-xs uppercase tracking-[0.2em] font-bold block mb-4">Since 2007</span>
           <h1 className="font-heading text-5xl md:text-7xl text-white mb-6">Our Story</h1>
           <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed">Rooted in Vijayawada, preserving memories for generations across South India.</p>
        </div>
      </section>

      {/* The Legacy Section */}
      <section className="py-16 md:py-24 container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center max-w-7xl mx-auto">
          <div className="w-full lg:w-1/2 space-y-8">
            <FadeIn>
              <span className="text-brand-gold text-xs uppercase tracking-[0.2em] font-bold block mb-4">The Foundation</span>
              <h2 className="font-heading text-4xl md:text-6xl text-brand-charcoal leading-tight mb-8">A Legacy of <br/><span className="italic text-brand-gold">Uncompromising Quality</span></h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-light">
                <p>
                  Established in 2007, Aakruti Digipress was founded with a singular mission: to provide professional photographers with print quality that matches their artistic vision. 
                </p>
                <p>
                  What started as a boutique printing press has grown into one of Andhra Pradesh's most trusted names in luxury album manufacturing. We understand that a wedding album is not just a book; it is a family heirloom that will be passed down through generations.
                </p>
                <p>
                  That is why every single product that leaves our facility undergoes rigorous visual and structural checks to ensure absolute perfection in color accuracy, binding strength, and material finish.
                </p>
              </div>
            </FadeIn>
          </div>
          <div className="w-full lg:w-1/2 relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-8 border-white group">
            <Image src="/assets/indian_wedding.png" alt="Aakruti Legacy" fill className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-[2s]" />
          </div>
        </div>
      </section>

      {/* The Facility Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col-reverse lg:flex-row gap-16 lg:gap-24 items-center">
            <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
               <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-gray-100">
                  <Image src="/assets/akh4.png" alt="Printing Machinery" fill className="object-cover" />
               </div>
               <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-gray-100 mt-8">
                  <Image src="/assets/akh3.png" alt="Binding Process" fill className="object-cover" />
               </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <FadeIn>
                <span className="text-brand-gold text-xs uppercase tracking-[0.2em] font-bold block mb-4">Our Infrastructure</span>
                <h2 className="font-heading text-4xl md:text-5xl text-brand-charcoal leading-tight mb-8">State-of-the-Art <br/><span className="italic text-brand-gold">Production Facility</span></h2>
                <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-light">
                  <p>
                    Our Vijayawada facility is equipped with industry-leading 6-color digital offset presses and automated binding machinery. This allows us to handle high-volume orders without ever compromising on the meticulous detail required for luxury albums.
                  </p>
                  <p>
                    From climate-controlled paper storage to our dust-free finishing rooms, every aspect of our infrastructure is designed to create the perfect environment for fine art printing.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-24 md:py-32 bg-brand-charcoal text-white relative">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-heading text-4xl md:text-6xl text-white mb-6">Our Core <span className="italic text-brand-gold">Values</span></h2>
            <p className="text-gray-400 text-lg font-light leading-relaxed">The principles that guide every print, fold, and binding in our facility.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
             <FadeIn delay={0.1} className="text-center md:text-left">
                <span className="text-brand-gold font-heading text-6xl opacity-50 block mb-6">01</span>
                <h3 className="font-heading text-3xl mb-4">Artisan Craftsmanship</h3>
                <p className="text-gray-400 leading-relaxed font-light">We combine state-of-the-art 6-color printing technology with traditional hand-binding techniques to create albums of unmatched durability and beauty.</p>
             </FadeIn>
             <FadeIn delay={0.2} className="text-center md:text-left">
                <span className="text-brand-gold font-heading text-6xl opacity-50 block mb-6">02</span>
                <h3 className="font-heading text-3xl mb-4">Color Integrity</h3>
                <p className="text-gray-400 leading-relaxed font-light">We respect the photographer's vision. Our rigorous color calibration ensures that the rich skin tones and vibrant colors of your raw files are accurately reproduced.</p>
             </FadeIn>
             <FadeIn delay={0.3} className="text-center md:text-left">
                <span className="text-brand-gold font-heading text-6xl opacity-50 block mb-6">03</span>
                <h3 className="font-heading text-3xl mb-4">Timeless Materials</h3>
                <p className="text-gray-400 leading-relaxed font-light">From imported Italian leathers to archival silver halide papers, we source only the finest materials that are guaranteed to stand the test of time.</p>
             </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
