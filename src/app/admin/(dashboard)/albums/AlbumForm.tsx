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
  
  // Image state variables
  const [mainImage, setMainImage] = useState(initialData?.mainImage || "");
  
  const getInitialGalleryImg = (type: string) => {
    const found = initialData?.images?.find((img: any) => img.imageType === type);
    return found ? found.imagePath : "";
  };

  const [insideSpread, setInsideSpread] = useState(getInitialGalleryImg("inside_spread"));
  const [boxView, setBoxView] = useState(getInitialGalleryImg("box_case"));
  const [spineView, setSpineView] = useState(getInitialGalleryImg("spine_details"));

  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const initialOccasionIds = initialData?.occasions?.map((o: any) => o.occasionId || o.occasion?.id) || [];
  const [selectedOccasionIds, setSelectedOccasionIds] = useState<string[]>(initialOccasionIds);

  const handleOccasionToggle = (id: string) => {
    setSelectedOccasionIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const uploadFileToCloudinary = async (file: File, setter: (url: string) => void, fieldName: string) => {
    setUploadingField(fieldName);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setter(data.url);
      } else {
        alert(data.message || "Failed to upload image");
      }
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to upload image");
    } finally {
      setUploadingField(null);
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

      {/* Multi-View Album Image Gallery Upload Section */}
      <div className="space-y-6 p-6 bg-gray-50 rounded-xl border border-gray-100">
        <div>
          <h3 className="text-base font-bold text-gray-900">Album Product Image Gallery (Cloudinary Multi-View)</h3>
          <p className="text-xs text-gray-500 mt-1">Upload multiple photos showing different views of the album for customers to inspect with hover-zoom.</p>
        </div>

        {/* 1. Main Cover Image (Mandatory) */}
        <div className="space-y-3 bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-gray-800">1. Main Cover View Image (Required *)</label>
            <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              Mandatory *
            </span>
          </div>
          <Input type="hidden" name="mainImage" value={mainImage} />
          
          {mainImage && (
            <div className="relative w-48 h-36 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
              <img src={mainImage} alt="Main Cover Preview" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div>
              <Input 
                type="file" 
                accept="image/*" 
                onChange={(e) => e.target.files?.[0] && uploadFileToCloudinary(e.target.files[0], setMainImage, "main")} 
                disabled={uploadingField === "main"}
              />
              {uploadingField === "main" && <span className="text-xs text-brand-cyan font-bold animate-pulse mt-1 block">Uploading to Cloudinary...</span>}
            </div>
            <Input 
              type="text" 
              placeholder="Or paste Cloudinary / direct image URL" 
              value={mainImage}
              onChange={(e) => setMainImage(e.target.value)}
            />
          </div>
        </div>

        {/* 2. Inside Spread View Image (Optional) */}
        <div className="space-y-3 bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-gray-800">2. Inside Open Spread / Lay-Flat View (Optional)</label>
            <span className="text-[10px] bg-gray-100 text-gray-600 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              Optional
            </span>
          </div>
          <Input type="hidden" name="gallery_inside_spread" value={insideSpread} />
          
          {insideSpread && (
            <div className="relative w-48 h-36 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
              <img src={insideSpread} alt="Inside Spread Preview" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div>
              <Input 
                type="file" 
                accept="image/*" 
                onChange={(e) => e.target.files?.[0] && uploadFileToCloudinary(e.target.files[0], setInsideSpread, "inside")} 
                disabled={uploadingField === "inside"}
              />
              {uploadingField === "inside" && <span className="text-xs text-brand-cyan font-bold animate-pulse mt-1 block">Uploading to Cloudinary...</span>}
            </div>
            <Input 
              type="text" 
              placeholder="Or paste Cloudinary / direct image URL (Optional)" 
              value={insideSpread}
              onChange={(e) => setInsideSpread(e.target.value)}
            />
          </div>
        </div>

        {/* 3. Presentation Box / Case View Image (Optional) */}
        <div className="space-y-3 bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-gray-800">3. Presentation Box / Case View (Optional)</label>
            <span className="text-[10px] bg-gray-100 text-gray-600 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              Optional
            </span>
          </div>
          <Input type="hidden" name="gallery_box" value={boxView} />
          
          {boxView && (
            <div className="relative w-48 h-36 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
              <img src={boxView} alt="Box View Preview" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div>
              <Input 
                type="file" 
                accept="image/*" 
                onChange={(e) => e.target.files?.[0] && uploadFileToCloudinary(e.target.files[0], setBoxView, "box")} 
                disabled={uploadingField === "box"}
              />
              {uploadingField === "box" && <span className="text-xs text-brand-cyan font-bold animate-pulse mt-1 block">Uploading to Cloudinary...</span>}
            </div>
            <Input 
              type="text" 
              placeholder="Or paste Cloudinary / direct image URL (Optional)" 
              value={boxView}
              onChange={(e) => setBoxView(e.target.value)}
            />
          </div>
        </div>

        {/* 4. Spine & Material Detail View Image (Optional) */}
        <div className="space-y-3 bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-gray-800">4. Spine & Cover Material Detail View (Optional)</label>
            <span className="text-[10px] bg-gray-100 text-gray-600 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              Optional
            </span>
          </div>
          <Input type="hidden" name="gallery_spine" value={spineView} />
          
          {spineView && (
            <div className="relative w-48 h-36 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
              <img src={spineView} alt="Spine Detail Preview" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div>
              <Input 
                type="file" 
                accept="image/*" 
                onChange={(e) => e.target.files?.[0] && uploadFileToCloudinary(e.target.files[0], setSpineView, "spine")} 
                disabled={uploadingField === "spine"}
              />
              {uploadingField === "spine" && <span className="text-xs text-brand-cyan font-bold animate-pulse mt-1 block">Uploading to Cloudinary...</span>}
            </div>
            <Input 
              type="text" 
              placeholder="Or paste Cloudinary / direct image URL (Optional)" 
              value={spineView}
              onChange={(e) => setSpineView(e.target.value)}
            />
          </div>
        </div>

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

      <div className="pt-4 border-t border-gray-100">
        <Button type="submit" disabled={isSubmitting || Boolean(uploadingField)} className="w-full md:w-auto px-8 bg-brand-charcoal text-white hover:bg-black">
          {isSubmitting ? "Saving & Updating Live..." : (initialData ? "Update Live Album Product" : "Create & Publish Live Album")}
        </Button>
      </div>
    </form>
  );
}
