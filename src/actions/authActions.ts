"use server";

import { prisma } from "@/lib/prisma";
import { compare, hash } from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function changePasswordAction(prevState: any, formData: FormData) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return { success: false, error: "Unauthorized. Please log in again." };
    }

    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return { success: false, error: "All fields are required." };
    }

    if (newPassword.length < 6) {
      return { success: false, error: "New password must be at least 6 characters long." };
    }

    if (newPassword !== confirmPassword) {
      return { success: false, error: "New passwords do not match." };
    }

    const admin = await prisma.admin.findUnique({
      where: { email: session.user.email },
    });

    if (!admin) {
      return { success: false, error: "Admin account not found." };
    }

    const isCurrentPasswordValid = await compare(currentPassword, admin.password_hash);
    if (!isCurrentPasswordValid) {
      return { success: false, error: "Current password is incorrect." };
    }

    const newPasswordHash = await hash(newPassword, 10);

    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        password_hash: newPasswordHash,
      },
    });

    return { success: true, message: "Password updated successfully!" };
  } catch (error: any) {
    console.error("Error changing password:", error);
    return { success: false, error: "Failed to update password. Please try again." };
  }
}
