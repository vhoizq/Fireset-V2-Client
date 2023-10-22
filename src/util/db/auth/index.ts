import { User } from "@/util/db/schemas/schema";

import { NextRequest } from "next/server";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vfppfrtyvxpuyzwrqxtq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmcHBmcnR5dnhwdXl6d3JxeHRxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzMyMzQ2MCwiZXhwIjoyMDA4ODk5NDYwfQ.fc3Cmi29xECvvEXmGZW6PPfVLRppnH-MINVuGFJF6bA";

const supabase = createClient(supabaseUrl, supabaseKey);

export const verifyAuth = async (
  req: NextRequest,
  noBeta?: true
): Promise<User | false> => {
  try {
    const clientCookie = req.cookies.get("fireset-client-id");

    if (clientCookie) {
      console.log("Got Data");
      const { data: user, error: userError } = await supabase
        .from("User")
        .select("*")
        .eq("sessionToken", clientCookie.value)
        .single();

      if (user) {
        return user;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
