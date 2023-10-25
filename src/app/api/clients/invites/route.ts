import { NextRequest } from "next/server";
import { verifyAuth } from "@/util/db/auth";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vfppfrtyvxpuyzwrqxtq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmcHBmcnR5dnhwdXl6d3JxeHRxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzMyMzQ2MCwiZXhwIjoyMDA4ODk5NDYwfQ.fc3Cmi29xECvvEXmGZW6PPfVLRppnH-MINVuGFJF6bA";

const supabase = createClient(supabaseUrl, supabaseKey);

export const GET = async (req: NextRequest) => {
  try {
    const auth = await verifyAuth(req);
    if (auth) {
      const groupUser = await supabase
        .from("groupUser")
        .select("*")
        .eq("userId", auth.userId)
        .eq("groupId", "4334990")
        .limit(1)
        .single();
      const group = await supabase
        .from("group")
        .select("*")
        .eq("groupId", "4334990")
        .limit(1)
        .single();
      try {
        
      } catch (err) {
        
      }
    } else {
      throw Error("Invalid authorization token provided");
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: (error as Error).message,
      }),
      { status: 500 }
    );
  }
};
