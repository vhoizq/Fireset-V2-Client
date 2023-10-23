import { NextRequest } from "next/server";
import { verifyAuth } from "@/util/db/auth";
import { createClient } from "@supabase/supabase-js";
import { Client } from "discord.js";

interface BotStatus {
  statusText: string;
  statusId: string;
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

    const newRequest = await req.json();

    console.log("Bot is starting...");

    const client = new Client({
      intents: [],
    });

  
    client.login(newRequest.botToken);

    console.log(client);

    return new Response(JSON.stringify({ data: `${client.user?.username}` }), {
      status: 200,
    });
  } catch (error) {
    console.error("Server error:", error);
    return new Response(JSON.stringify({ data: "Server error", error }), {
      status: 500,
    });
  }
};
