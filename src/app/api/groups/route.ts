import { NextRequest } from "next/server";
import { verifyAuth } from "@/util/db/auth";
import { getUserRank } from "@/util/roblox/group.server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vfppfrtyvxpuyzwrqxtq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmcHBmcnR5dnhwdXl6d3JxeHRxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzMyMzQ2MCwiZXhwIjoyMDA4ODk5NDYwfQ.fc3Cmi29xECvvEXmGZW6PPfVLRppnH-MINVuGFJF6bA";

const supabase = createClient(supabaseUrl, supabaseKey);

export const GET = async (req: NextRequest) => {
  try {
    const auth = await verifyAuth(req);
    if (auth) {
      const { data: response, error } = await supabase
        .from("groupUser")
        .select("group(*)")
        .eq("userId", auth.userId);

      if (error) {
        throw error;
      }

      return new Response(JSON.stringify(response), { status: 200 });
    } else {
      throw Error("Invalid authorization token provided");
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
    });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const auth = await verifyAuth(req);
    const data = await req.json();
    if (auth && data) {
      if (data.groupId && data.name) {
        const { data: groups, error: groupError } = await supabase
          .from("groupUser")
          .select("groupId")
          .eq("userId", auth.userId)
          .eq("role", 255);

        if (groupError) {
          throw groupError;
        }

        if (groups.length < 2) {
          const rank = await getUserRank(data.groupId, auth.userId);
          if (rank > 0) {
            const { data: createdGroup, error: createError } = await supabase
              .from("group")
              .upsert([
                {
                  name: data.name,
                  groupId: data.groupId.toString(),
                  color: data.description,
               
                },
              ]);

            if (createError) {
              throw createError;
            }

            const { data: response, error: userGroupError } = await supabase
              .from("groupUser")
              .select("group(*)")
              .eq("userId", auth.userId);

            if (userGroupError) {
              throw userGroupError;
            }

            return new Response(JSON.stringify(response), { status: 200 });
          } else {
            throw Error("You must be a member of this group");
          }
        } else {
          throw Error("You may only create two Fireset groups at this time.");
        }
      } else {
        throw Error("Both `groupId` and `name` are required");
      }
    } else {
      throw Error("Invalid authorization token provided");
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
    });
  }
};
