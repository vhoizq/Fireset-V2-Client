"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { MoonLoader } from "react-spinners";
import { createClient } from "@supabase/supabase-js";

import { toast } from "react-hot-toast";

const supabaseUrl = "https://vfppfrtyvxpuyzwrqxtq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmcHBmcnR5dnhwdXl6d3JxeHRxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzMyMzQ2MCwiZXhwIjoyMDA4ODk5NDYwfQ.fc3Cmi29xECvvEXmGZW6PPfVLRppnH-MINVuGFJF6bA";

const supabase = createClient(supabaseUrl, supabaseKey);


export default function RedirectPage() {
  const router = useRouter();
  const params = useSearchParams();
  useEffect(() => {
    console.log("Success");
    async function signInWithDiscord() {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
      })
    }

    signInWithDiscord()

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
