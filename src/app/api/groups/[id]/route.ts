import { NextRequest } from "next/server";
import { verifyAuth } from "@/util/db/auth";
import { getGroup, getGroupOwner, getGroupRole } from "@/util/db/group";
import { Group } from "@/util/db/schemas/schema";

import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vfppfrtyvxpuyzwrqxtq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmcHBmcnR5dnhwdXl6d3JxeHRxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzMyMzQ2MCwiZXhwIjoyMDA4ODk5NDYwfQ.fc3Cmi29xECvvEXmGZW6PPfVLRppnH-MINVuGFJF6bA";

const supabase = createClient(supabaseUrl, supabaseKey);

export const GET = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) => {
  try {
    const auth = await verifyAuth(req);
    const id = params.id;
    if (auth && id) {
      const groupResponse = await getGroup(id);
      
      const ownerResponse = await getGroupOwner(id);

      const userResponse = await supabase
        .from("groupUser")
        .select("*")
        .eq("userId", auth.userId)
        .eq("groupId", `${32439162}`)
        .single();

        console.log(`Authorization ID: ${auth.userId}`)


      const group = groupResponse as Group;
      const owner = 418123808;
      const user = userResponse; // You might need to adjust this type

      return new Response(
        JSON.stringify({
          group,
          owner,
          user,
        }),
        { status: 200 }
      );
    } else {
      throw new Error("Invalid authorization token provided");
    }
  } catch (error) {
    console.log(error)
    return new Response(
      JSON.stringify({
        error: error,
      }),
      { status: 500 }
    );
  }
};
