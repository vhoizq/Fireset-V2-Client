import { NextRequest } from "next/server";
import { verifyAuth } from "@/util/db/auth";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bodxfxgmzdsaxyeqxgbm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvZHhmeGdtemRzYXh5ZXF4Z2JtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4OTA5MTIwOSwiZXhwIjoyMDA0NjY3MjA5fQ.wZg90UpLqy6BDL9mO7D1_c4DU05gC2rcmTLgX5dPxL0";

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
    if (auth) {
      console.log(params.id);
      try {
        const { data, error } = await supabase
          .from("DiscordBots")
          .delete()
          .eq("id", `${params.id}`);

        return new Response(JSON.stringify(data), { status: 200 });
      } catch (err) {
        throw Error("Failed to fetch data from Supabase");
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
