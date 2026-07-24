"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createAlbumProduct, updateAlbumProduct } from "@/actions/albumActions";

export default function AlbumForm({ initialData, collections }: { initialData?: any, collections: any[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialData?.mainImage || "");
  const [uploading, setUploading] = useState(false);

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
        <label className="text-sm font-semibold">Status</label>
        <select 
          name="status" 
          defaultValue={initialData?.status || "Published"} 
          className="w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          style={{ height: "36px" }}
        >
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
        </select>
      </div>

      <div className="space-y-4">
        <label className="text-sm font-semibold block">Main Product Image (4:3 aspect ratio recommended) *</label>
        <Input type="hidden" name="mainImage" value={imageUrl} />
        
        {imageUrl && (
          <div className="relative w-64 h-48 rounded-lg overflow-hidden border border-gray-200">
            <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
        
        <div className="flex items-center gap-4">
          <Input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            disabled={uploading}
            className="w-auto"
          />
          {uploading && <span className="text-sm text-gray-500">Uploading...</span>}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <Button type="submit" disabled={isSubmitting || uploading} className="w-full md:w-auto px-8 bg-brand-charcoal text-white hover:bg-black">
          {isSubmitting ? "Saving..." : (initialData ? "Update Product" : "Create Product")}
        </Button>
      </div>
    </form>
  );
}
