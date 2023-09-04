"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { MoonLoader } from "react-spinners";
import { toast } from "react-hot-toast";

export default function RedirectPage() {
  const router = useRouter();
  const params = useSearchParams();
  useEffect(() => {
    console.log("Success")
    fetch(`https://fireset.xyz/api/auth/redirect?${params}`)
      .then(async (response) => {
        let body;
        try {
          body = await response.json();
        } catch (error) {
          console.log(error);
        }

        if (response.status === 200) {
          console.log(response)
          router.replace("/client/thanks");
        } else if (body) {
          toast.error(body.error);
        } else {
          toast.error(`${params.toString()}`);
        }
      })
      .catch((error) => {
        console.log("ERRORED")
        setTimeout(() => {
          router.replace("/client/thanks");
        }, 4000);

        toast.error("Unable to complete authentications");
      });
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen bg-white">
      <MoonLoader
        size={48}
        className={"flex mx-auto my-auto"}
        color={"#607cfa"}
      />
    </div>
  );
}
