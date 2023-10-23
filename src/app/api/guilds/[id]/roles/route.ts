import { NextRequest } from "next/server";
import { verifyAuth } from "@/util/db/auth";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";

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
    const { data, error } = await supabase
      .from("DiscordBots")
      .select("*")
      .eq("id", `${params.id}`);

    if (data) {
     
      const guildId = data[0].botConfigs.guildId;
      const response = await axios.get(
        `https://discord.com/api/v10/guilds/${guildId}/roles`,
        {
          headers: {
            Authorization: `Bot ${data[0].botToken}`, // Replace with your bot token
          },
        }
      );
      return new Response(JSON.stringify(response.data), { status: 200 });
    }
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 200 });
  }
};
