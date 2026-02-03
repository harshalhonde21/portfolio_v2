"use client";

import { useAdminAuth } from "@/components/providers/AdminAuthProvider";
import { Heading } from "@/components/ui/Heading";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { contactApi } from "@/lib/api/contact";
import { authApi } from "@/lib/api/auth";

export default function DashboardPage() {
  const { user } = useAdminAuth();
  const [stats, setStats] = useState({ totalInquiries: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const token = authApi.getToken();
      if (!token) return;
      try {
        // fetching page 1 to get total items from pagination
        const response = await contactApi.getAll(token, 1, 1);
        if (response.success && response.pagination) {
          setStats({ totalInquiries: response.pagination.total });
        }
      } catch (error) {
        console.error("Failed to load stats", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end border-b border-neon-cyan/30 pb-4">
        <div>
          <p className="text-xs text-neon-cyan/70 font-mono mb-1">
            SECURE_CHANNEL_ESTABLISHED
          </p>
          <Heading as="h1" className="text-3xl neon-text">
            [Admin_Dashboard]
          </Heading>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-xs text-neon-purple font-mono">
            OPERATOR: {user?.name || "UNKNOWN"}
          </p>
          <p className="text-[10px] text-muted-foreground font-mono">
            ID: {user?._id}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Inquiries Widget */}
        <div className="bg-black/40 border border-neon-cyan/20 p-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
            <Loader2 size={40} className="text-neon-cyan" />
          </div>
          <p className="text-xs text-muted-foreground uppercase">
            Total Inquiries
          </p>
          <p className="text-2xl font-mono text-neon-cyan">
            {stats.totalInquiries}
          </p>
        </div>

        {/* System Status Widget */}
        <div className="bg-black/40 border border-neon-purple/20 p-4 relative overflow-hidden">
          <p className="text-xs text-muted-foreground uppercase">
            System Status
          </p>
          <p className="text-2xl font-mono text-neon-purple">ONLINE</p>
        </div>

        {/* Placeholder Widget 1 */}
        <div className="bg-black/40 border border-white/10 p-4 relative overflow-hidden">
          <p className="text-xs text-muted-foreground uppercase">
            Security Level
          </p>
          <p className="text-2xl font-mono text-white/70">MAXIMUM</p>
        </div>

        {/* Placeholder Widget 2 */}
        <div className="bg-black/40 border border-white/10 p-4 relative overflow-hidden">
          <p className="text-xs text-muted-foreground uppercase">Uptime</p>
          <p className="text-2xl font-mono text-white/70">99.9%</p>
        </div>
      </div>

      <div className="bg-black/20 border border-white/5 p-6 rounded-sm">
        <h3 className="text-lg text-neon-cyan font-mono mb-4">SYSTEM_LOGS</h3>
        <div className="font-mono text-xs text-muted-foreground space-y-2">
          <p>
            <span className="text-neon-green">[SUCCESS]</span> Admin session
            initialized.
          </p>
          <p>
            <span className="text-neon-purple">[INFO]</span> Dashboard component
            loaded successfully.
          </p>
          <p>
            <span className="text-neon-cyan">[network]</span> Stable connection
            established.
          </p>
        </div>
      </div>
    </div>
  );
}
