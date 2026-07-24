import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, ChevronLeft, ChevronRight } from "lucide-react";
import DeleteAlbumButton from "./DeleteAlbumButton";

export default async function AdminAlbumsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams?.page || "1", 10);
  const pageSize = 10;

  const [products, totalCount] = await Promise.all([
    prisma.albumProduct.findMany({
      include: { collection: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.albumProduct.count(),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Album Products</h1>
          <p className="text-gray-500">Manage the physical album product catalogue.</p>
        </div>
        <Link 
          href="/admin/albums/new" 
          className="bg-brand-charcoal text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-black transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col min-h-[60vh]">
        <table className="w-full text-left border-collapse flex-1">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-4 font-semibold text-sm text-gray-600">Image</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Name</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Collection</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Status</th>
              <th className="p-4 font-semibold text-sm text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="relative w-16 h-12 bg-gray-100 rounded overflow-hidden">
                      {product.mainImage ? (
                        <Image src={product.mainImage} alt={product.name} fill className="object-cover" />
                      ) : (
                        <span className="text-[10px] text-gray-400 absolute inset-0 flex items-center justify-center">No Img</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4 text-gray-500">{product.collection.name}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${product.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/admin/albums/${product.id}`} className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                        <Edit className="w-4 h-4" /> Edit
                      </Link>
                      <DeleteAlbumButton id={product.id} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  No products found. Add your first album product to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="bg-gray-50 px-6 py-4 border-t flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">{(page - 1) * pageSize + 1}</span> to <span className="font-medium">{Math.min(page * pageSize, totalCount)}</span> of <span className="font-medium">{totalCount}</span> results
            </p>
            <div className="flex items-center gap-2">
              <Link
                href={page > 1 ? `/admin/albums?page=${page - 1}` : "#"}
                className={`flex items-center gap-1 px-3 py-1.5 border rounded text-sm ${
                  page <= 1 ? "text-gray-400 border-gray-200 pointer-events-none" : "text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </Link>
              <div className="text-sm font-medium text-gray-700 px-2">
                Page {page} of {totalPages}
              </div>
              <Link
                href={page < totalPages ? `/admin/albums?page=${page + 1}` : "#"}
                className={`flex items-center gap-1 px-3 py-1.5 border rounded text-sm ${
                  page >= totalPages ? "text-gray-400 border-gray-200 pointer-events-none" : "text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                Next <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
