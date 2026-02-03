"use client";

import { useEffect, useState } from "react";
import { useAdminAuth } from "@/components/providers/AdminAuthProvider";
import { contactApi } from "@/lib/api/contact";
import { Contact } from "@/types/api";
import { authApi } from "@/lib/api/auth";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Loader2, RefreshCw, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { CyberLoader } from "@/components/ui/CyberLoader";
import { useToast } from "@/components/providers/ToastProvider";

export default function AdminDashboard() {
  const {
    user,
    logout,
    isAuthenticated,
    isLoading: authLoading,
  } = useAdminAuth();
  const { error: toastError, success: toastSuccess } = useToast();

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const token = authApi.getToken();
      if (!token) return;

      const response = await contactApi.getAll(token, page);
      if (response.success && response.data) {
        setContacts(response.data);
        setTotalPages(response.pagination.pages);
        setTotalItems(response.pagination.total);
        // Optional: toastSuccess("DATA_STREAM_UPDATED");
      }
    } catch (err) {
      console.error("Failed to fetch contacts", err);
      toastError("CONNECTION_FAILURE: UNABLE TO RETRIEVE DATA");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchContacts();
    }
  }, [isAuthenticated, page]);

  if (authLoading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <CyberLoader text="ESTABLISHING SECURE CONNECTION" size="lg" />
      </div>
    );
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 cyber-grid">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-end border-b border-neon-cyan/30 pb-4">
          <div>
            <p className="text-xs text-neon-cyan/70 font-mono mb-1">
              SECURE_CHANNEL_ESTABLISHED
            </p>
            <Heading as="h1" className="text-3xl neon-text">
              [Admin_Console]
            </Heading>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-xs text-neon-purple font-mono">
                OPERATOR: {user?.name || "UNKNOWN"}
              </p>
              <p className="text-[10px] text-muted-foreground font-mono">
                ID: {user?._id}
              </p>
            </div>
            <Button
              onClick={fetchContacts}
              variant="ghost"
              size="md"
              className="border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10"
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            </Button>
            <Button
              onClick={logout}
              variant="ghost"
              className="border-danger/50 text-danger hover:bg-danger/10"
            >
              <LogOut size={18} className="mr-2" /> DISCONNECT
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-black/40 border border-neon-cyan/20 p-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
              <Loader2 size={40} className="text-neon-cyan" />
            </div>
            <p className="text-xs text-muted-foreground uppercase">
              Total Inquiries
            </p>
            <p className="text-2xl font-mono text-neon-cyan">{totalItems}</p>
          </div>
          {/* Add more stats widgets here if backend supports them */}
          <div className="bg-black/40 border border-neon-purple/20 p-4 relative overflow-hidden">
            <p className="text-xs text-muted-foreground uppercase">
              System Status
            </p>
            <p className="text-2xl font-mono text-neon-purple">ONLINE</p>
          </div>
        </div>

        {/* Data Table */}
        <div className="relative border border-neon-cyan/20 bg-black/60 backdrop-blur-sm min-h-[400px]">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neon-cyan"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neon-cyan"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neon-cyan"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neon-cyan"></div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-sm">
              <thead>
                <tr className="border-b border-neon-cyan/20 text-neon-cyan/70 bg-neon-cyan/5">
                  <th className="p-4 uppercase text-xs tracking-wider">
                    Timestamp
                  </th>
                  <th className="p-4 uppercase text-xs tracking-wider">
                    Source
                  </th>
                  <th className="p-4 uppercase text-xs tracking-wider">
                    Subject
                  </th>
                  <th className="p-4 uppercase text-xs tracking-wider">
                    Message
                  </th>
                  <th className="p-4 uppercase text-xs tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neon-cyan/10">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center">
                      <div className="flex justify-center">
                        <CyberLoader text="SCANNING_DATABASE" size="md" />
                      </div>
                    </td>
                  </tr>
                ) : contacts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-12 text-center text-muted-foreground"
                    >
                      No transmission data found.
                    </td>
                  </tr>
                ) : (
                  contacts.map((contact, i) => (
                    <motion.tr
                      key={contact._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="hover:bg-neon-cyan/5 transition-colors group"
                    >
                      <td className="p-4 text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(contact.createdAt).toLocaleDateString()}{" "}
                        <span className="text-neon-cyan/50">
                          {new Date(contact.createdAt).toLocaleTimeString()}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-neon-cyan">
                          {contact.name}
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          {contact.email}
                        </div>
                      </td>
                      <td className="p-4 text-white/80">{contact.subject}</td>
                      <td className="p-4 text-muted-foreground max-w-xs truncate group-hover:whitespace-normal group-hover:break-words group-hover:max-w-none transition-all">
                        {contact.message}
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-neon-green/10 text-neon-green border border-neon-green/20">
                          RECEIVED
                        </span>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {!loading && totalPages > 1 && (
            <div className="p-4 flex justify-between items-center border-t border-neon-cyan/20">
              <Button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                variant="ghost"
                size="sm"
                className="text-xs"
              >
                &lt; PREV
              </Button>
              <span className="text-xs text-muted-foreground">
                PAGE {page} OF {totalPages}
              </span>
              <Button
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                variant="ghost"
                size="sm"
                className="text-xs"
              >
                NEXT &gt;
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
