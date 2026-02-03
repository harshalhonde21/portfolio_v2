"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, MessageSquare, Home, LogOut } from "lucide-react";
import { useAdminAuth } from "@/components/providers/AdminAuthProvider";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { CyberLoader } from "@/components/ui/CyberLoader";

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAdminAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    // Simulate a small delay for the "loading" effect requested
    await new Promise((resolve) => setTimeout(resolve, 1000));
    logout();
  };

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Inquiries",
      href: "/admin/inquiries",
      icon: MessageSquare,
    },
  ];

  if (isLoggingOut) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
        <CyberLoader text="TERMINATING_SESSION" size="lg" />
      </div>
    );
  }

  return (
    <aside className="w-64 bg-black border-r border-neon-cyan/20 flex-col h-screen fixed left-0 top-0 pt-24 pb-6 z-40 hidden md:flex">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan opacity-50" />

      <div className="px-6 mb-8">
        <h2 className="text-xl font-bold text-neon-cyan tracking-widest uppercase">
          [Admin_Core]
        </h2>
        <p className="text-[10px] text-muted-foreground font-mono mt-1">
          SYS_VER_2.0
        </p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-sm font-mono text-sm transition-all duration-300 group relative overflow-hidden ${
                  isActive
                    ? "text-black bg-neon-cyan/90 font-bold"
                    : "text-muted-foreground hover:text-neon-cyan hover:bg-neon-cyan/10"
                }`}
              >
                <item.icon
                  size={18}
                  className={isActive ? "animate-pulse" : ""}
                />
                <span>{item.label}</span>

                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-y-0 left-0 w-1 bg-white"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 space-y-2 mt-auto">
        <Link href="/">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-neon-purple hover:bg-neon-purple/10 border border-transparent hover:border-neon-purple/30 mb-2"
          >
            <Home size={18} className="mr-3" />
            BACK_TO_ROOT
          </Button>
        </Link>

        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-danger hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/30"
        >
          <LogOut size={18} className="mr-3" />
          DISCONNECT
        </Button>
      </div>
    </aside>
  );
}
