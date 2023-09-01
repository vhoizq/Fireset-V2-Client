import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/util/db/auth";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";

const supabaseUrl = "https://vfppfrtyvxpuyzwrqxtq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmcHBmcnR5dnhwdXl6d3JxeHRxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzMyMzQ2MCwiZXhwIjoyMDA4ODk5NDYwfQ.fc3Cmi29xECvvEXmGZW6PPfVLRppnH-MINVuGFJF6bA";

const supabase = createClient(supabaseUrl, supabaseKey);

const hasManageGuildPermission = (permissions: string) => {
  const numericPermissions = parseInt(permissions, 10);
  const MANAGE_GUILD = 0x00000020; // Numeric value of MANAGE_GUILD permission

  return (numericPermissions & MANAGE_GUILD) === MANAGE_GUILD;
};

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
      const clientCookie = req.cookies.get("fireset-client-id");
      const response = await axios.get(
        "https://discord.com/api/v10/users/@me/guilds",
        {
          headers: {
            Authorization: `Bearer ${clientCookie?.value}`,
          },
        }
      );

      const { data, error } = await supabase
        .from("DiscordBots")
        .select("*")
        .eq("id", `${params.id}`);

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        if (data && data.length > 0) {
          const bot = data[0]; // Assuming you want to work with the first bot
          const botToken = bot.botToken;

          try {
           

            const userGuilds = response.data;
            const targetGuild = userGuilds.find(
              (guild: any) => guild.id === bot.botConfigs.guildId
            );

            if (
              targetGuild &&
              hasManageGuildPermission(targetGuild.permissions)
            ) {
              console.log(
                "User has MANAGE_GUILD permission in the specified guild."
              );
              return new Response(JSON.stringify(data), { status: 200 });
            } else {
              console.log(
                "User does not have MANAGE_GUILD permission in the specified guild."
              );
              const response = new Response(
                JSON.stringify({ error: "Unauthorized" }),
                {
                  status: 200,
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              return response;
            }
          } catch (error) {
            console.error("Error fetching user guilds:", error);
            const response = new Response(
              JSON.stringify({ error: "Unauthorized" }),
              {
                status: 500,
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            return response;
          }
        }
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
