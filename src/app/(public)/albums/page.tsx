import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const revalidate = 60;

export default async function AlbumsCataloguePage({ searchParams }: { searchParams: Promise<{ collection?: string, occasion?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const collectionParam = resolvedSearchParams.collection;
  const occasionParam = resolvedSearchParams.occasion;
  
  const collections = await prisma.albumCollection.findMany({ where: { isActive: true }, orderBy: { displayOrder: 'asc' } });
  
  const whereClause: any = { status: 'Published' };
  
  if (collectionParam) {
    whereClause.collection = { slug: collectionParam };
  }
  
  if (occasionParam) {
    whereClause.occasions = { some: { occasion: { slug: occasionParam } } };
  }

  const products = await prisma.albumProduct.findMany({
    where: whereClause,
    include: { 
      collection: true,
      occasions: { include: { occasion: true } }
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header Section */}
      <section className="pt-32 pb-16 px-4 max-w-7xl mx-auto text-center">
         <span className="text-brand-cyan text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Our Album Collections</span>
         <h1 className="font-heading text-4xl md:text-6xl text-brand-charcoal mb-6">Albums Crafted for Every Story</h1>
         <p className="text-lg md:text-xl text-gray-500 font-light max-w-3xl mx-auto leading-relaxed">
           Explore premium album covers, materials, formats and presentation sets crafted for weddings, celebrations and professional photography studios.
         </p>
      </section>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation / Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <Link 
            href="/albums" 
            className={`px-5 py-2 rounded-full border text-xs font-bold tracking-wider uppercase transition-colors ${!collectionParam ? 'bg-brand-charcoal text-white border-brand-charcoal' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400'}`}
          >
            All Albums
          </Link>
          {collections.map((col) => (
            <Link 
              key={col.id}
              href={`/albums?collection=${col.slug}`} 
              className={`px-5 py-2 rounded-full border text-xs font-bold tracking-wider uppercase transition-colors ${collectionParam === col.slug ? 'bg-brand-charcoal text-white border-brand-charcoal' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400'}`}
            >
              {col.name.replace('Aakruti ', '')}
            </Link>
          ))}
        </div>

        {/* Portfolio Grid - Exact Canvera Style Cards */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {products.map((product) => (
              <Link key={product.id} href={`/albums/${product.slug}`} className="group block h-full">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col overflow-hidden">
                  
                  {/* Image Section */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50 border-b border-gray-50">
                    {product.mainImage ? (
                      <Image 
                        src={product.mainImage} 
                        alt={product.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-300">No Image</div>
                    )}
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-8 flex flex-col flex-grow">
                    <span className="text-brand-cyan text-[10px] font-bold uppercase tracking-widest mb-3">
                      {product.collection.name}
                    </span>
                    
                    <h3 className="font-heading text-2xl text-gray-900 font-bold mb-3 leading-tight group-hover:text-brand-cyan transition-colors">
                      {product.name}
                    </h3>
                    
                    {product.shortDescription && (
                      <p className="text-sm text-gray-500 mb-6 line-clamp-2">
                        {product.shortDescription}
                      </p>
                    )}
                    
                    {/* Tags/Pills */}
                    <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                      {product.occasions.slice(0, 3).map((po) => (
                        <span key={po.occasion.id} className="bg-gray-50 text-gray-600 rounded-full px-3 py-1 text-[11px] font-semibold border border-gray-200 uppercase tracking-wider">
                          {po.occasion.name}
                        </span>
                      ))}
                      {product.occasions.length > 3 && (
                        <span className="bg-gray-50 text-gray-400 rounded-full px-3 py-1 text-[11px] font-semibold border border-gray-200">
                          +{product.occasions.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-heading text-3xl text-brand-charcoal mb-4">No albums found</h3>
            <p className="text-gray-500">We couldn't find any products in this collection.</p>
          </div>
        )}
      </div>
    </div>
  );
}
