import type { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard, Image as ImageIcon, MessageSquare, Settings } from "lucide-react";
import LogoutButton from "@/components/admin/LogoutButton";

export const metadata: Metadata = {
  title: "Admin Panel | Aakruti Digipress",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-brand-grey overflow-hidden font-body">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-navy text-white flex flex-col shadow-xl z-20">
        <div className="p-6 border-b border-white/10">
          <Link href="/admin" className="text-xl font-bold tracking-tight">
            Aakruti<span className="text-brand-cyan">Admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 text-brand-cyan transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/admin/albums" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/80 hover:text-white transition-colors">
            <ImageIcon className="w-5 h-5" />
            <span className="font-medium">Albums</span>
          </Link>
          <Link href="/admin/enquiries" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/80 hover:text-white transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">Enquiries</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/80 hover:text-white transition-colors mt-auto">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </Link>
          <LogoutButton />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-brand-grey">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10 shrink-0">
          <h2 className="font-heading text-xl font-medium text-brand-navy">Dashboard</h2>
          <Link href="/admin/settings" className="flex items-center gap-4 hover:opacity-80 transition-opacity cursor-pointer">
            <div className="text-sm font-medium text-brand-charcoal">Admin User</div>
            <div className="w-8 h-8 bg-brand-cyan text-white rounded-full flex items-center justify-center font-bold shadow-sm">A</div>
          </Link>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
