import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { FadeIn } from "@/components/ui/FadeIn";

export const revalidate = 60;

export default async function OccasionsPage() {
  const occasions = await prisma.albumOccasion.findMany({
    orderBy: { name: 'asc' }
  });

  // Map categories to some placeholder images and descriptions for the luxury layout
  const occasionData: Record<string, { image: string, desc: string }> = {
    'wedding': { image: '/assets/hero_telugu_wedding.png', desc: 'Preserve every ritual, from the Jeelakarra Bellam to the final farewell, in exquisite lay-flat spreads.' },
    'engagement': { image: '/assets/premium_wedding_album.png', desc: 'Beautiful beginnings in print. Capture the promise of a lifetime.' },
    'first-birthday': { image: '/assets/layflat_album.png', desc: 'The little expressions you will treasure forever, printed with premium craftsmanship.' },
    'shashtipoorthi': { image: '/assets/premium_wedding_album.png', desc: 'Celebrating sixty years of togetherness, family and blessings.' },
  };

  return (
    <div className="bg-brand-ivory min-h-screen overflow-hidden">
      {/* Banner Hero Section */}
      <section className="relative h-[40vh] md:h-[60vh] w-full flex items-center justify-center overflow-hidden mb-24">
        <Image src="/assets/b-3.png" alt="Occasions Banner" fill className="absolute inset-0 object-cover" unoptimized={true} />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-brand-gold text-xs uppercase tracking-[0.2em] font-bold block mb-4">Our Categories</span>
          <h1 className="font-heading text-5xl md:text-7xl text-white mb-6 leading-none">
            Every Celebration,<br/><span className="italic font-light">Elegantly Preserved.</span>
          </h1>
          <p className="text-xl text-white/90 font-light max-w-2xl mx-auto">
            From the grandest Telugu weddings to intimate family milestones, discover our curated collections.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 pb-24">

        <div className="space-y-32">
          {occasions.map((occ, index) => {
            const data = occasionData[occ.slug] || { image: '/assets/layflat_album.png', desc: 'Beautifully printed albums to celebrate your special moments.' };
            
            const overrideImages = ['/assets/akh4.png', '/assets/akh3.png', '/assets/akh2.png', '/assets/fam.png', '/assets/fb.png', '/assets/othr.png', '/assets/sast.png'];
            const finalImage = index < 7 ? overrideImages[index] : data.image;
            
            const isEven = index % 2 === 0;

            return (
              <div key={occ.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}>
                <div className="w-full lg:w-1/2 relative h-[300px] lg:h-[350px] group overflow-hidden bg-brand-charcoal rounded-2xl shadow-2xl border-8 border-white">
                  <Image 
                    src={finalImage} 
                    alt={occ.name} 
                    fill 
                    className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-[2s] ease-out" 
                  />
                </div>
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <FadeIn delay={0.2}>
                    <span className="text-brand-gold text-xs uppercase tracking-[0.2em] font-bold block mb-4">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h2 className="font-heading text-4xl md:text-5xl text-brand-charcoal mb-6">{occ.name}</h2>
                    <p className="text-gray-600 text-lg leading-relaxed font-light mb-10">
                      {data.desc}
                    </p>
                    <Link href={`/albums?occasion=${occ.slug}`} className="inline-flex items-center text-brand-charcoal text-xs uppercase tracking-[0.2em] font-bold group border-b border-brand-charcoal pb-1">
                      View {occ.name} Albums <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </FadeIn>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
