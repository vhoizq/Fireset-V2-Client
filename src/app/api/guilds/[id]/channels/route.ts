import { NextRequest } from "next/server";
import { verifyAuth } from "@/util/db/auth";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";

const supabaseUrl = "https://bodxfxgmzdsaxyeqxgbm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvZHhmeGdtemRzYXh5ZXF4Z2JtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4OTA5MTIwOSwiZXhwIjoyMDA0NjY3MjA5fQ.wZg90UpLqy6BDL9mO7D1_c4DU05gC2rcmTLgX5dPxL0";

const supabase = createClient(supabaseUrl, supabaseKey);

interface DiscordChannel {
  id: string;
  type: number;
  // Add other properties here as needed
}

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
    const { data, error } = await supabase
      .from("DiscordBots")
      .select("*")
      .eq("id", `${params.id}`);

    if (data) {
      const guildId = data[0].botConfigs.guildId;
      const response = await axios.get<DiscordChannel[]>(
        `https://discord.com/api/v10/guilds/${guildId}/channels`,
        {
          headers: {
            Authorization: `Bot ${data[0].botToken}`,
          },
        }
      );

      // Filter out category channels (type: 4)
      const channels = response.data.filter(channel => channel.type !== 4);

      return new Response(JSON.stringify(channels), { status: 200 });
    }
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 200 });
  }
};
