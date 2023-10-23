import { NextRequest } from "next/server";
import { verifyAuth } from "@/util/db/auth";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";

const supabaseUrl = "https://vfppfrtyvxpuyzwrqxtq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmcHBmcnR5dnhwdXl6d3JxeHRxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzMyMzQ2MCwiZXhwIjoyMDA4ODk5NDYwfQ.fc3Cmi29xECvvEXmGZW6PPfVLRppnH-MINVuGFJF6bA";

const supabase = createClient(supabaseUrl, supabaseKey);

async function validateBotToken(token: any) {
  try {
    const response = await axios.get("https://discord.com/api/v10/users/@me", {
      headers: {
        Authorization: `Bot ${token}`,
      },
    });

    return response.data; // Returns true if the token is valid for a bot
  } catch (error) {
    return false; // Invalid token or other error occurred
  }
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
      const isValidToken = await validateBotToken(newRequest.clientToken);

      const newUser = {
        botName: `${newRequest.clientUsername}`,
        botToken: `${newRequest.clientToken}`,
        botOwner: `${auth.userId}`,
        botConfigs: {
          guildId: `${newRequest.syncedGuild}`,
          isEnterprise: false,
          colorScheme: `${newRequest.clientColor}`,
          stripeId: "",
          errMessage: "",
        },
        botModules: [
          {
            name: "Moderation",
            modRoles: [],
            safeRoles: [],
            adminRoles: [],
            modChannel: "",
          },
          {
            name: "Roblox",
            modRoles: [],
            safeRoles: [],
            adminRoles: [],
            modChannel: "",
          },
        ],
        botStatuses: [
          {
            statusText: "fireset.xyz",
            statusType: "LISTENING",
            statusId: "FIRESET_AUTO_STATUS",
          },
        ],
        clientInfo: {
          clientId: `${isValidToken.id}`,
          botAvatar: `${isValidToken.avatar}`,
        },
      };
      const { data: createdData, error: insertionError } = await supabase
        .from("DiscordBots")
        .insert(newUser);

      if (insertionError) {
        console.error("Error inserting user:", insertionError);
      }

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
