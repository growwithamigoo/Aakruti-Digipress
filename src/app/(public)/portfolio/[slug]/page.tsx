import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const revalidate = 60;

export default async function PortfolioProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = await prisma.portfolioProject.findUnique({
    where: { slug: resolvedParams.slug },
    include: {
      category: true,
      images: {
        orderBy: { orderIndex: 'asc' }
      }
    }
  });

  if (!project) {
    notFound();
  }

  // Define category specific matter
  const categoryMatter = {
    'wedding': {
      paper: 'Archival Silver Halide',
      binding: 'Seamless Lay-flat Spreads',
      cover: 'Italian Leather or Acrylic'
    },
    'engagement': {
      paper: 'Premium Fine Art Matte',
      binding: 'Seamless Lay-flat Spreads',
      cover: 'Crystal Acrylic'
    },
    'first-birthday': {
      paper: 'Lustre Pro Photographic',
      binding: 'Seamless Lay-flat Spreads',
      cover: 'Custom Hardcover'
    },
    'default': {
      paper: 'Premium Photographic',
      binding: 'Seamless Lay-flat Spreads',
      cover: 'Premium Hardcover'
    }
  };

  const matter = categoryMatter[project.category.slug as keyof typeof categoryMatter] || categoryMatter['default'];

  return (
    <div className="bg-brand-ivory min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex items-end pb-24">
        <div className="absolute inset-0 z-0 bg-brand-charcoal">
          {project.coverImage ? (
             <Image src={project.coverImage} alt={project.title} fill className="object-cover opacity-70" priority />
          ) : (
             <div className="absolute inset-0 bg-brand-navy" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ivory via-transparent to-black/30" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 md:px-8">
          <Link href="/portfolio" className="inline-flex items-center text-white text-sm uppercase tracking-widest font-bold mb-8 hover:text-brand-gold transition-colors drop-shadow-md">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Portfolio
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <span className="text-brand-gold uppercase tracking-[0.2em] text-sm font-bold mb-4 block drop-shadow-md">{project.category.name} {project.eventYear ? `· ${project.eventYear}` : ''}</span>
              <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-brand-charcoal mb-4 leading-none">{project.title}</h1>
            </div>
            <Button asChild size="lg" className="bg-brand-gold text-brand-charcoal hover:bg-[#cda434] hover:text-black rounded-full px-8 py-6 tracking-widest uppercase font-bold text-xs w-full md:w-auto shrink-0 shadow-lg border border-brand-gold/50 transition-all hover:-translate-y-1">
               <Link href={`https://wa.me/919177888499?text=I'm interested in an album similar to: ${project.title}`} target="_blank">Enquire About This Style</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Story / Description */}
      {project.description && (
        <section className="pt-24 pb-16 container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light">{project.description}</p>
        </section>
      )}

      {/* Album Matter / Specifications */}
      <section className="py-16 mb-24 bg-brand-charcoal text-white relative">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                 <h4 className="text-brand-gold text-xs uppercase tracking-[0.2em] mb-4 font-bold">Paper Type</h4>
                 <p className="font-heading text-3xl">{matter.paper}</p>
              </div>
              <div>
                 <h4 className="text-brand-gold text-xs uppercase tracking-[0.2em] mb-4 font-bold">Binding Style</h4>
                 <p className="font-heading text-3xl">{matter.binding}</p>
              </div>
              <div>
                 <h4 className="text-brand-gold text-xs uppercase tracking-[0.2em] mb-4 font-bold">Cover Material</h4>
                 <p className="font-heading text-3xl">{matter.cover}</p>
              </div>
           </div>
        </div>
      </section>

      {/* Editorial Gallery */}
      <section className="pb-32 container mx-auto px-4 md:px-8">
        {project.images.length > 0 ? (
          <div className="columns-1 md:columns-2 gap-8 space-y-8">
            {project.images.map((img) => (
               <div key={img.id} className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <img 
                    src={img.url} 
                    alt={img.altText || project.title} 
                    loading="lazy"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  />
               </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-gray-500 italic mb-12 text-center text-lg">Previewing sample layouts for {project.category.name} projects.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto w-full">
               <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl border-8 border-white group">
                  <Image src="/assets/homeimg.png" alt="Sample Spread 1" fill className="object-cover group-hover:scale-105 transition-transform duration-[1.5s]" />
               </div>
               <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl border-8 border-white group">
                  <Image src="/assets/imageb.png" alt="Sample Spread 2" fill className="object-cover group-hover:scale-105 transition-transform duration-[1.5s]" />
               </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
