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

      const { data, error } = await supabase
        .from("DiscordBots")
        .select("*")
        .eq("id", `${params.id}`);

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        if (data[0].botOwner === auth.userId) {
          return new Response(
            JSON.stringify({
              msg: "Success",
            }),
            { status: 200 }
          );
        } else {
          return new Response(
            JSON.stringify({
              error: "Unauthorized",
            }),
            { status: 500 }
          );
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
