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
import { usePathname, useRouter } from "next/navigation";

interface AdminAuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: AdminUser) => void;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined,
);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const initAuth = async () => {
      const token = authApi.getToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const userData = await authApi.verifyToken();
        setUser(userData);
      } catch (err) {
        console.error("Token verification failed:", err);
        authApi.logout();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = (token: string, newUser: AdminUser) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("admin_token", token);
    }
    setUser(newUser);
    router.refresh();
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
    router.push("/");
    router.refresh();
  };

  // Route protection logic could be here or in a separate guard component
  // For strict protection, we can check pathname here.
  useEffect(() => {
    if (!isLoading && !user && pathname?.startsWith("/admin")) {
      // Hard redirect if trying to access admin without auth
      // Excluding login page if it exists (but we use a modal)
      router.replace("/");
    }
  }, [user, isLoading, pathname, router]);

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
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
