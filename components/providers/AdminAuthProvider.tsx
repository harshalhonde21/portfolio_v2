"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { AdminUser, AuthResponse } from "@/types/api";
import { authApi } from "@/lib/api/auth";
import { useToast } from "@/components/providers/ToastProvider";
import { usePathname, useRouter } from "next/navigation";

interface AdminAuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, userData: AdminUser) => void;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined,
);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { info, success } = useToast();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = authApi.getToken();
        if (token) {
          const response = await authApi.verifyToken();
          if (response.user) {
            setUser(response.user);
            setIsAuthenticated(true);
          } else {
            // Token invalid
            authApi.logout();
            setUser(null);
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        console.error("Auth check failed", error);
        authApi.logout();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = (token: string, userData: AdminUser) => {
    localStorage.setItem("admin_token", token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
    setIsAuthenticated(false);
    info("SESSION TERMINATED. DISCONNECTED.");
    router.push("/");
  };

  // Route protection logic could be here or in a separate guard component
  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathname.startsWith("/admin")) {
      router.push("/");
    }
  }, [isLoading, isAuthenticated, pathname, router]);

  return (
    <AdminAuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
