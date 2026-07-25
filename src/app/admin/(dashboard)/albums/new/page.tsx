import AlbumForm from "../AlbumForm";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function NewAlbumProductPage() {
  const [collections, occasions] = await Promise.all([
    prisma.albumCollection.findMany({ where: { isActive: true }, orderBy: { displayOrder: 'asc' } }),
    prisma.albumOccasion.findMany({ where: { isActive: true }, orderBy: { name: 'asc' } })
  ]);
  
  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-8">
        <Link href="/admin/albums" className="text-gray-500 hover:text-gray-800 flex items-center gap-2 mb-4 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
        <h1 className="text-2xl font-bold">Add New Product</h1>
        <p className="text-gray-500">Create a new physical album product for the catalogue.</p>
      </div>

      <AlbumForm collections={collections} occasions={occasions} />
    </div>
  );
}
