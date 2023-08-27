"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { MoonLoader } from "react-spinners";
import { toast } from "react-hot-toast";

export default function RedirectPage() {
  const router = useRouter();
  const params = useSearchParams();
  useEffect(() => {
    fetch(`http://localhost:3000/api/auth/redirect?${params}`)
      .then(async (response) => {
        let body;
        try {
          body = await response.json();
        } catch (error) {
          console.log(error);
        }

        if (response.status === 200) {
          router.replace("/client");
        } else if (body) {
          toast.error(body.error);
        } else {
          toast.error(`${params.toString()}`);
        }
      })
      .catch((error) => {
        setTimeout(() => {
          router.replace("/");
        }, 4000);

        toast.error("Unable to complete authentications");
      });
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen bg-blue-100">
      <MoonLoader
        size={48}
        className={"flex mx-auto my-auto"}
        color={"#6366f1"}
      />
    </div>
  );
}
