import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle } from "lucide-react";

export const revalidate = 60;

export default async function AlbumProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await prisma.albumProduct.findUnique({
    where: { slug: resolvedParams.slug },
    include: {
      collection: true,
      occasions: { include: { occasion: true } },
      images: { orderBy: { displayOrder: 'asc' } }
    }
  });

  if (!product || product.status !== 'Published') {
    notFound();
  }

  const allImages = [];
  if (product.mainImage) allImages.push({ url: product.mainImage, type: 'cover' });
  product.images.forEach(img => allImages.push({ url: img.imagePath, type: img.imageType }));

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-24">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back */}
        <Link href="/albums" className="inline-flex items-center text-gray-500 hover:text-brand-cyan text-sm font-bold uppercase tracking-wider mb-10 transition-colors">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to Collections
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Gallery Column */}
          <div className="space-y-6 sticky top-24">
            <div className="relative aspect-[4/3] w-full bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
              {allImages.length > 0 ? (
                <Image 
                  src={allImages[0].url} 
                  alt={product.name} 
                  fill 
                  className="object-cover" 
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">No Image Available</div>
              )}
            </div>
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {allImages.slice(1).map((img, i) => (
                  <div key={i} className="relative aspect-square bg-white rounded-xl overflow-hidden border border-gray-200 cursor-pointer hover:border-brand-cyan transition-colors">
                    <Image src={img.url} alt={`${product.name} detail ${i+1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="flex flex-col">
            <span className="text-brand-cyan text-xs font-bold uppercase tracking-widest mb-4">
              {product.collection.name}
            </span>
            
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 leading-tight">
              {product.name}
            </h1>

            {/* Occasion Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {product.occasions.map(po => (
                <span key={po.occasion.id} className="bg-gray-100 text-gray-600 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider border border-gray-200">
                  {po.occasion.name}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className="prose prose-lg text-gray-600 mb-10">
              <p className="text-xl font-light leading-relaxed">
                {product.shortDescription || 'Experience premium craftsmanship with our elegant album collection.'}
              </p>
              {product.description && (
                <p className="mt-4">{product.description}</p>
              )}
            </div>

            {/* Product Specifications Grid */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-10 shadow-sm">
              <h3 className="font-heading text-2xl text-gray-900 mb-6 border-b border-gray-100 pb-4">Specifications</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                
                <div>
                  <dt className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Cover Material</dt>
                  <dd className="text-base text-gray-800 font-medium">{product.coverMaterial || 'Premium Selected Material'}</dd>
                </div>
                
                <div>
                  <dt className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Album Style</dt>
                  <dd className="text-base text-gray-800 font-medium">{product.albumStyle || 'Lay-Flat & Flush-Mount'}</dd>
                </div>

                {product.availableSizes && (
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Available Sizes</dt>
                    <dd className="text-base text-gray-800 font-medium">{product.availableSizes}</dd>
                  </div>
                )}
                
                {product.availableColours && (
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Colours</dt>
                    <dd className="text-base text-gray-800 font-medium">{product.availableColours}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <Button asChild size="lg" className="flex-1 bg-brand-charcoal text-white hover:bg-gray-800 rounded-full py-6 text-sm font-bold uppercase tracking-widest shadow-xl transition-all hover:-translate-y-1">
                <Link href={`https://wa.me/919177888499?text=Hi, I am interested in ordering the ${product.name} from the ${product.collection.name} collection.`} target="_blank">
                  Enquire About This Album
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="flex-1 border-2 border-brand-cyan text-brand-cyan hover:bg-brand-cyan hover:text-white rounded-full py-6 text-sm font-bold uppercase tracking-widest transition-all">
                <Link href="https://wa.me/919177888499" target="_blank" className="flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 mr-2" /> Chat on WhatsApp
                </Link>
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
