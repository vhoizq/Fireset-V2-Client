"use client";

import useSWR from "swr";

import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../../auth";
import { useEffect } from "react";

interface User {
  username: string;
  sessionToken: string;
  userId: string;
  isActive: boolean;
  isBeta: boolean;
  isStaff: boolean;
  email: string;
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const router = useRouter();
  const auth = useAuth();

  
  const { data, error, isLoading } = useSWR(`/api/clients/perms/${path.split("/")[3]}`, fetch);
  if (error) {
    console.log("Got Error");
    router.replace("/");
  }

  useEffect(() => {
    if (data) {
      const tryJson = async () => {
        try {
          const body = await data.json();
          if(body.error) {
            router.replace("/client");
          } 
        } catch (error) {}
      };
      tryJson();
    }
  }, [isLoading, data]);

  return (
    <div>
     
        <>{children}</>

    </div>
  );
}
