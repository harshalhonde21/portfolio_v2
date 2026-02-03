"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useAdminAuth } from "@/components/providers/AdminAuthProvider";

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAdminAuth();

  return (
    <div className="min-h-screen bg-black text-white flex">
      <AdminSidebar />

      <main className="flex-1 md:ml-64 relative min-h-screen">
        {/* Background Grid - Global to admin pages */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

        <div className="relative z-10 pt-24 px-6 md:px-12 pb-12">
          {children}
        </div>
      </main>
    </div>
  );
}
