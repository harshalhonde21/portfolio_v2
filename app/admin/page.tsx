"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CyberLoader } from "@/components/ui/CyberLoader";

export default function AdminIndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/dashboard");
  }, [router]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <CyberLoader text="REDIRECTING_TO_DASHBOARD" />
    </div>
  );
}
