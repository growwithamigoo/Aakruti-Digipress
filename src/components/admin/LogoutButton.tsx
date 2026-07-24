"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors text-left w-full"
    >
      <LogOut className="w-5 h-5" />
      <span className="font-medium">Sign Out</span>
    </button>
  );
}
