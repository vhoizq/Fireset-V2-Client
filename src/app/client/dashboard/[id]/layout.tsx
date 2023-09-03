"use client";

import useSWR from "swr";

import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../../auth";
import { useEffect, useState } from "react"; // Import useState

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
  
  const [startTime, setStartTime] = useState<number | null>(null); // Track start time

  const { data, error, isLoading } = useSWR(
    `/api/clients/perms/${path.split("/")[3]}`,
    fetch
  );

  if (error) {
    console.log("Got Error");
    router.replace("/");
  }

  useEffect(() => {
    if (isLoading) {
      // Set the start time when the request is initiated
      setStartTime(Date.now());
    } else if (data) {
      const tryJson = async () => {
        try {
          const body = await data.json();
          if (body.error) {
            router.replace("/client");
          } else if (startTime !== null) {
            // Calculate and log the elapsed time
            const endTime = Date.now();
            const elapsedTime = endTime - startTime;
            console.log(`Fetching and processing took ${elapsedTime} ms`);
          }
        } catch (error) {}
      };
      tryJson();
    }
  }, [isLoading, data, startTime, router]);

  return <div>{!isLoading ? <>{children}</> : null}</div>;
}
