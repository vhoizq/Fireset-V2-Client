import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";
import { verifyAuth } from "@/util/db/auth";
import { getGroupRole } from "@/util/db/group";

const supabaseUrl = "https://vfppfrtyvxpuyzwrqxtq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmcHBmcnR5dnhwdXl6d3JxeHRxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzMyMzQ2MCwiZXhwIjoyMDA4ODk5NDYwfQ.fc3Cmi29xECvvEXmGZW6PPfVLRppnH-MINVuGFJF6bA";

const supabase = createClient(supabaseUrl, supabaseKey);

const GROUP_MESSAGES_TABLE = "groupMessages";

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
    if (auth) {
      const id = params.id;
      const skip = req.nextUrl.searchParams.get("skip");

      const query = supabase
        .from(GROUP_MESSAGES_TABLE)
        .select("*")
        .eq("groupId", id);

      if (skip) {
        query.range(Number(skip), Number(skip) + 9);
      }

      const { data: messages, error } = await query;

      if (error) {
        throw error;
      }

      return new Response(
        JSON.stringify({
          messages,
        }),
        { status: 200 }
      );
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

export const POST = async (
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
      const body = await req.json();
      const role = await getGroupRole(id, auth.id);
      if (
        role.role.admin ||
        role.role.developer ||
        role.role.humanResources ||
        role.role.publicRelations
      ) {
        if (body.title && body.body && body.body.length <= 1000) {
          const { data: newMessage, error: messageError } = await supabase
            .from(GROUP_MESSAGES_TABLE)
            .insert([
              {
                title: body.title,
                body: body.body,
                link: body.link ? body.link : null,
                authorId: auth.id,
                groupId: id,
              },
            ]);

          if (messageError) {
            throw messageError;
          }

          // Implement message count logic and deletion if needed

          return new Response(
            JSON.stringify({
              data: "Success!",
            }),
            { status: 200 }
          );
        } else {
          throw Error("Both `title` and `body` are required");
        }
      } else {
        throw Error("You cannot post messages for this group");
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
