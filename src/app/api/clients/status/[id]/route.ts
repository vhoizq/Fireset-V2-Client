import { NextRequest } from "next/server";
import { verifyAuth } from "@/util/db/auth";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bodxfxgmzdsaxyeqxgbm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvZHhmeGdtemRzYXh5ZXF4Z2JtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4OTA5MTIwOSwiZXhwIjoyMDA0NjY3MjA5fQ.wZg90UpLqy6BDL9mO7D1_c4DU05gC2rcmTLgX5dPxL0";

const supabase = createClient(supabaseUrl, supabaseKey);

interface BotStatus {
  statusText: string;
  statusId: String;
  statusType: string;
}

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
    if (auth && req.body) {
      const newRequest = await req.json();
      const { data, error } = await supabase
        .from("DiscordBots")
        .select("*")
        .eq("id", `${params.id}`);

      if (error) {
        return new Response(
          JSON.stringify({
            error: `${error}`,
          }),
          { status: 500 }
        );
      }


      let currentStatuses: BotStatus[] = [];

      data[0].botStatuses.map((b: BotStatus) =>
        currentStatuses.push({
          statusText: b.statusText,
          statusType: b.statusType,
          statusId: b.statusId,
        })
      );

      currentStatuses.push({
        statusText: newRequest.statusText,
        statusType: newRequest.statusType,
        statusId: newRequest.statusId,
      });

      const { data: newData, error: newError } = await supabase
        .from("DiscordBots")
        .update({ botStatuses: currentStatuses })
        .eq("id", `${params.id}`);

      return new Response(
        JSON.stringify({
          success: `Success`,
        }),
        { status: 200 }
      );
    } else {
      throw Error("Invalid authorization token provided");
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: `${error}`,
      }),
      { status: 500 }
    );
  }
};
