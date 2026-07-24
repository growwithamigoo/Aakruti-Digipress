import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const revalidate = 60;

export default async function PortfolioPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const categoryParam = resolvedSearchParams.category;
  
  const categories = await prisma.portfolioCategory.findMany();
  
  const whereClause = {
    isPublished: true,
    ...(categoryParam ? { category: { slug: categoryParam as string } } : {}),
  };

  const projects = await prisma.portfolioProject.findMany({
    where: whereClause,
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-brand-ivory min-h-screen">
      {/* Banner Hero Section */}
      <section className="relative h-[50vh] md:h-[70vh] w-full flex items-center justify-center overflow-hidden">
        <Image src="/assets/albumb.png" alt="Printed Portfolio Banner" fill className="absolute inset-0 object-cover" unoptimized={true} />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-12">
           <span className="text-brand-gold text-xs uppercase tracking-[0.2em] font-bold block mb-4">Printed Projects</span>
           <h1 className="font-heading text-5xl md:text-7xl text-white mb-6">Printed Portfolio</h1>
           <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed">View our recently printed customer albums and completed projects.</p>
        </div>
      </section>

      <div className="py-24 container mx-auto px-4 md:px-8">

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Link 
            href="/portfolio" 
            className={`px-6 py-2 rounded-full border text-sm uppercase tracking-wider font-bold transition-colors ${!categoryParam ? 'bg-brand-charcoal text-white border-brand-charcoal' : 'border-gray-300 text-gray-600 hover:border-brand-charcoal'}`}
          >
            All Projects
          </Link>
          {categories.map((cat) => (
            <Link 
              key={cat.id}
              href={`/portfolio?category=${cat.slug}`} 
              className={`px-6 py-2 rounded-full border text-sm uppercase tracking-wider font-bold transition-colors ${categoryParam === cat.slug ? 'bg-brand-charcoal text-white border-brand-charcoal' : 'border-gray-300 text-gray-600 hover:border-brand-charcoal'}`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Portfolio Grid */}
        {projects.length > 0 ? (
          <div className="flex flex-wrap justify-between gap-y-16">
            {projects.map((project) => (
              <Link key={project.id} href={`/portfolio/${project.slug}`} className="group block w-full lg:w-[calc(50%-2rem)]">
                <div className="relative overflow-hidden bg-brand-charcoal aspect-[4/3] rounded-3xl shadow-2xl border-4 border-white mb-6 group">
                  {project.coverImage ? (
                    <Image src={project.coverImage} alt={project.title} fill className="object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-[1.5s] ease-out" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">No Image</div>
                  )}
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                     <span className="text-brand-gold text-xs uppercase tracking-[0.2em] font-bold mb-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">{project.category.name}</span>
                     <h3 className="font-heading text-4xl md:text-5xl text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{project.title}</h3>
                     <div className="flex items-center text-white/80 text-sm tracking-widest uppercase font-bold transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200 mt-4">
                        View Project <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                     </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 border-t border-b border-black/5">
            <h3 className="font-heading text-3xl text-brand-charcoal mb-4">No projects found</h3>
            <p className="text-gray-500">We couldn't find any projects in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
