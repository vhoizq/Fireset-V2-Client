"use client";

import useSWR from "swr";

import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../../auth";
import { useEffect } from "react";
import axios from "axios";

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
  const pathname = usePathname();
  const path = usePathname();
  const router = useRouter();
  const auth = useAuth();

  async function fetchPerms() {
    const response = await axios.get(
      `/api/clients/perms/${path.split("/")[3]}`
    );
    const data = await response;
    return data;
  }

  // Use SWR with the fetched data
  const { data: userPerms, error: ok } = useSWR(
    `/api/clients/perms/${path.split("/")[3]}`,
    fetchPerms
  );

  const { data, error, isLoading } = useSWR("/api/context", fetch);
  if (error) {
    console.log("Got Error");
    router.replace("/");
  }

  if (userPerms && !userPerms.data[0]) {
    return router.replace("/client");
  }

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
