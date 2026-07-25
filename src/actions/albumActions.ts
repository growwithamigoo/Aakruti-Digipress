"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createAlbumProduct(formData: FormData) {
  const title = formData.get("title") as string;
  const collectionId = formData.get("collectionId") as string;
  const shortDescription = formData.get("shortDescription") as string;
  const description = formData.get("description") as string;
  const coverMaterial = formData.get("coverMaterial") as string;
  const albumStyle = formData.get("albumStyle") as string;
  const availableSizes = formData.get("availableSizes") as string;
  const availableColours = formData.get("availableColours") as string;
  const mainImage = formData.get("mainImage") as string;
  const status = formData.get("status") as string;
  const occasionIds = formData.getAll("occasionIds") as string[];

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  await prisma.albumProduct.create({
    data: {
      name: title,
      slug,
      shortDescription,
      description,
      coverMaterial,
      albumStyle,
      availableSizes,
      availableColours,
      mainImage,
      status,
      collection: {
        connect: { id: collectionId }
      },
      occasions: {
        create: occasionIds.map((occasionId) => ({
          occasion: { connect: { id: occasionId } }
        }))
      }
    }
  });

  revalidatePath("/albums");
  revalidatePath("/admin/albums");
  redirect("/admin/albums");
}

export async function updateAlbumProduct(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const collectionId = formData.get("collectionId") as string;
  const shortDescription = formData.get("shortDescription") as string;
  const description = formData.get("description") as string;
  const coverMaterial = formData.get("coverMaterial") as string;
  const albumStyle = formData.get("albumStyle") as string;
  const availableSizes = formData.get("availableSizes") as string;
  const availableColours = formData.get("availableColours") as string;
  const mainImage = formData.get("mainImage") as string;
  const status = formData.get("status") as string;
  const occasionIds = formData.getAll("occasionIds") as string[];

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  // Delete existing occasions relation
  await prisma.albumProductOccasion.deleteMany({
    where: { albumProductId: id }
  });

  await prisma.albumProduct.update({
    where: { id },
    data: {
      name: title,
      slug,
      shortDescription,
      description,
      coverMaterial,
      albumStyle,
      availableSizes,
      availableColours,
      mainImage,
      status,
      collection: {
        connect: { id: collectionId }
      },
      occasions: {
        create: occasionIds.map((occasionId) => ({
          occasion: { connect: { id: occasionId } }
        }))
      }
    }
  });

  revalidatePath("/albums");
  revalidatePath("/admin/albums");
  redirect("/admin/albums");
}

export async function deleteAlbumProduct(id: string) {
  await prisma.albumProduct.delete({
    where: { id }
  });

  revalidatePath("/albums");
  revalidatePath("/admin/albums");
}
