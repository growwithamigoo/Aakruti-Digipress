"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  url: string;
  type?: string | null;
  label?: string;
}

export default function ProductImageGallery({ 
  images, 
  productName 
}: { 
  images: GalleryImage[];
  productName: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[4/3] w-full bg-gray-100 rounded-3xl flex items-center justify-center text-gray-400">
        No Image Available
      </div>
    );
  }

  const currentImage = images[selectedIndex] || images[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handlePrev = () => {
    setSelectedIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display with Hover Zoom */}
      <div 
        className="relative aspect-[4/3] w-full bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm cursor-zoom-in group"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setIsLightboxOpen(true)}
      >
        <Image 
          src={currentImage.url} 
          alt={`${productName} - View ${selectedIndex + 1}`} 
          fill 
          className="object-cover transition-opacity duration-300" 
          priority
        />

        {/* E-commerce Magnifying Glass Lens Effect */}
        {isZoomed && (
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-200 z-10"
            style={{
              backgroundImage: `url('${currentImage.url}')`,
              backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
              backgroundSize: '250%',
            }}
          />
        )}

        {/* View Type Badge */}
        {currentImage.type && (
          <div className="absolute top-4 left-4 z-20 bg-black/70 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {currentImage.type.replace('_', ' ')}
          </div>
        )}

        {/* Zoom Hint Icon */}
        <div className="absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur-md text-gray-800 p-2.5 rounded-full shadow-md opacity-80 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="w-5 h-5 text-gray-700" />
        </div>
      </div>

      {/* Thumbnails Carousel / Selector */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, i) => {
            const isSelected = i === selectedIndex;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedIndex(i)}
                className={`relative aspect-square bg-white rounded-2xl overflow-hidden border-2 transition-all ${
                  isSelected 
                    ? 'border-brand-cyan shadow-md ring-2 ring-brand-cyan/20 scale-105' 
                    : 'border-gray-200 hover:border-gray-400 opacity-80 hover:opacity-100'
                }`}
              >
                <Image 
                  src={img.url} 
                  alt={`${productName} thumbnail ${i + 1}`} 
                  fill 
                  className="object-cover" 
                />
                {img.type && (
                  <span className="absolute bottom-1 left-1 right-1 text-[9px] font-bold bg-black/60 text-white rounded px-1 text-center truncate uppercase">
                    {img.type.replace('_', ' ')}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Full-Screen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <button 
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-3 rounded-full bg-white/10 transition-colors z-50"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button 
                type="button"
                onClick={handlePrev}
                className="absolute left-6 text-white/80 hover:text-white p-3 rounded-full bg-white/10 transition-colors z-50"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button 
                type="button"
                onClick={handleNext}
                className="absolute right-6 text-white/80 hover:text-white p-3 rounded-full bg-white/10 transition-colors z-50"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center">
            <img 
              src={currentImage.url} 
              alt={productName} 
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl" 
            />
            <p className="text-white/80 text-sm mt-4 font-medium tracking-wide">
              {productName} — View {selectedIndex + 1} of {images.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
