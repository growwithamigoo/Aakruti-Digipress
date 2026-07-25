"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createAlbumProduct, updateAlbumProduct } from "@/actions/albumActions";

export default function AlbumForm({ 
  initialData, 
  collections,
  occasions = [] 
}: { 
  initialData?: any, 
  collections: any[],
  occasions?: any[]
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialData?.mainImage || "");
  const [uploading, setUploading] = useState(false);
  const [provider, setProvider] = useState<string | null>(null);

  const initialOccasionIds = initialData?.occasions?.map((o: any) => o.occasionId || o.occasion?.id) || [];
  const [selectedOccasionIds, setSelectedOccasionIds] = useState<string[]>(initialOccasionIds);

  const handleOccasionToggle = (id: string) => {
    setSelectedOccasionIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setImageUrl(data.url);
        setProvider(data.provider || null);
      } else {
        alert(data.message || "Failed to upload image");
      }
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const action = initialData ? updateAlbumProduct.bind(null, initialData.id) : createAlbumProduct;

  return (
    <form action={action} onSubmit={() => setIsSubmitting(true)} className="space-y-8 bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold">Product Name *</label>
          <Input name="title" defaultValue={initialData?.name} required placeholder="e.g. Premium Acrylic Window Album" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Collection *</label>
          <select 
            name="collectionId" 
            defaultValue={initialData?.collectionId} 
            required 
            className="w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            style={{ height: "36px" }}
          >
            <option value="">Select a collection</option>
            {collections.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold">Short Description</label>
        <Textarea name="shortDescription" defaultValue={initialData?.shortDescription} placeholder="A brief one-sentence description for the catalogue card." />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold">Detailed Description</label>
        <Textarea name="description" defaultValue={initialData?.description} rows={4} placeholder="Full description for the product detail page." />
      </div>

      {/* Occasions / Album Category Buttons Selection */}
      <div className="space-y-3 p-5 bg-gray-50 rounded-xl border border-gray-100">
        <label className="text-sm font-semibold text-gray-900 block">
          Occasions & Categories (Pills displayed on card)
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Select one or more occasions (e.g. Wedding, Corporate, Pre-Wedding, Portrait) to display pill buttons at the bottom of the product card.
        </p>

        <div className="flex flex-wrap gap-2">
          {occasions.map((occ) => {
            const isChecked = selectedOccasionIds.includes(occ.id);
            return (
              <label 
                key={occ.id}
                className={`cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border ${
                  isChecked 
                    ? 'bg-brand-charcoal text-white border-brand-charcoal shadow-sm' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                }`}
              >
                <input 
                  type="checkbox"
                  name="option_dummy"
                  checked={isChecked}
                  onChange={() => handleOccasionToggle(occ.id)}
                  className="sr-only"
                />
                {isChecked && <span className="text-xs">✓</span>}
                {occ.name}
              </label>
            );
          })}
        </div>

        {/* Hidden inputs to send occasionIds in FormData */}
        {selectedOccasionIds.map((id) => (
          <input key={id} type="hidden" name="occasionIds" value={id} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold">Cover Material</label>
          <Input name="coverMaterial" defaultValue={initialData?.coverMaterial} placeholder="e.g. Genuine Italian Leather" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Album Style</label>
          <Input name="albumStyle" defaultValue={initialData?.albumStyle} placeholder="e.g. Flush-Mount / Lay-Flat" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold">Available Sizes</label>
          <Input name="availableSizes" defaultValue={initialData?.availableSizes} placeholder="e.g. 12x12, 12x15, 12x18" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Available Colours</label>
          <Input name="availableColours" defaultValue={initialData?.availableColours} placeholder="e.g. Maroon, Navy, Black, Tan" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold">Status (Live Visibility)</label>
        <select 
          name="status" 
          defaultValue={initialData?.status || "Published"} 
          className="w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          style={{ height: "36px" }}
        >
          <option value="Published">Published (Visible on Live Website)</option>
          <option value="Draft">Draft (Client Review / Admin Only)</option>
        </select>
      </div>

      {/* Cloudinary & Image Upload Section */}
      <div className="space-y-4 p-6 bg-gray-50 rounded-xl border border-gray-100">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-900 block">
            Main Product Image (Cloudinary Storage) *
          </label>
          {provider === "cloudinary" || imageUrl.includes("cloudinary.com") ? (
            <span className="text-[11px] font-bold bg-green-100 text-green-700 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Cloudinary Live
            </span>
          ) : imageUrl ? (
            <span className="text-[11px] font-bold bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Local Storage
            </span>
          ) : null}
        </div>

        <Input type="hidden" name="mainImage" value={imageUrl} />
        
        {imageUrl && (
          <div className="relative w-64 h-48 rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white">
            <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="text-xs text-gray-500 mb-1 block font-medium">Upload Image File</label>
            <div className="flex items-center gap-3">
              <Input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                disabled={uploading}
                className="w-full bg-white"
              />
              {uploading && <span className="text-xs text-brand-cyan font-bold animate-pulse">Uploading...</span>}
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block font-medium">Or Paste Direct Image / Cloudinary URL</label>
            <Input 
              type="text" 
              placeholder="https://res.cloudinary.com/... or image link" 
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="bg-white"
            />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <Button type="submit" disabled={isSubmitting || uploading} className="w-full md:w-auto px-8 bg-brand-charcoal text-white hover:bg-black">
          {isSubmitting ? "Saving & Updating Live..." : (initialData ? "Update Live Album Product" : "Create & Publish Live Album")}
        </Button>
      </div>
    </form>
  );
}
