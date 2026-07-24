"use client";

import { Trash2 } from "lucide-react";
import { deleteAlbumProduct } from "@/actions/albumActions";

export default function DeleteAlbumButton({ id }: { id: string }) {
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteAlbumProduct(id);
    }
  };

  return (
    <button onClick={handleDelete} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
