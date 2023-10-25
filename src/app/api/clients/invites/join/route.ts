import { NextApiHandler } from "next";
import { NextRequest } from "next/server";
import { verifyAuth } from "@/util/db/auth";
import { createClient } from "@supabase/supabase-js";
import { getUserRank } from "@/util/roblox/group.server";

const supabaseUrl = "https://vfppfrtyvxpuyzwrqxtq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmcHBmcnR5dnhwdXl6d3JxeHRxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzMyMzQ2MCwiZXhwIjoyMDA4ODk5NDYwfQ.fc3Cmi29xECvvEXmGZW6PPfVLRppnH-MINVuGFJF6bA";

const supabase = createClient(supabaseUrl, supabaseKey);

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;

    const auth = await verifyAuth(req);
    if (auth) {
      const group = await supabase
        .from("group")
        .select("*")
        .eq("groupId", searchParams.get("groupId"))
        .limit(1)
        .single();

      const groupUser = await supabase
        .from("groupUser")
        .select("*")
        .eq("userId", auth.userId)
        .filter("groupId", "eq", searchParams.get("groupId"))
        .limit(1)
        .single();

      if (!groupUser.error) {
        console.log(groupUser);
        return new Response("You are already in this workspace.", {
          status: 400,
        });
      }

      const inviteCode = await supabase
        .from("groupInvites")
        .select("*")
        .eq("inviteCode", searchParams.get("inviteCode"))
        .limit(1)
        .single();

      if (!inviteCode) {
        return new Response("This workspace does not have any valid invites.", {
          status: 400,
        });
      }
      const role = await getUserRank(
        inviteCode.data.groupId as string,
        auth.userId as string
      );
      try {
        const guh = await supabase.from("groupUser").insert({
          userId: auth.userId as string,
          groupId: inviteCode.data.groupId as number,
          role: role,
        });
        console.log(guh);
        return new Response("OK", { status: 200 });
      } catch (err) {
        console.log(err);
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
