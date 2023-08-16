"use client";

import useSWR from "swr";

import { Sidebar } from "@/components/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./auth";
import { useEffect } from "react";

interface User {
  username: string;
  sessionToken: string;
  userId: string;
  isActive: boolean;
  isBeta: boolean;
  email: string;
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const auth = useAuth();

  const { data, error, isLoading } = useSWR("/api/context", fetch);
  if (error) {
    console.log("Got Error");
    router.replace("/auth/login");
  }

  useEffect(() => {
    console.log("yes");
    if (data) {
      console.log("Got Information");
      const tryJson = async () => {
        try {
          const body = await data.json();
          console.log(body.data);
          if (body && body.data && auth.setUser) {
            auth.setUser(body.data as User);
          } else if (body && body.error) {
            router.replace("/auth/login");
          }
        } catch (error) {}
      };

      tryJson();
    }
  }, [isLoading, data]);

  return (
    <div>
      {pathname.includes("groups") || pathname.includes("apps") ? (
        <>{children}</>
      ) : (
        <>{children}</>
      )}
    </div>
  );
}
