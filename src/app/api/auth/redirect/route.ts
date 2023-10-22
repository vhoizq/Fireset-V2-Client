import { encryptCookie } from "@/util/crypto.server";
import { prisma } from "@/util/db";
import axios from "axios";
import { getRobloxContext, getTokens } from "@/util/roblox/auth.server";

import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vfppfrtyvxpuyzwrqxtq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmcHBmcnR5dnhwdXl6d3JxeHRxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzMyMzQ2MCwiZXhwIjoyMDA4ODk5NDYwfQ.fc3Cmi29xECvvEXmGZW6PPfVLRppnH-MINVuGFJF6bA";

const supabase = createClient(supabaseUrl, supabaseKey);

function generateRandomString(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const params = req.nextUrl.searchParams;
    const code = params.get("code");
    const session = generateRandomString(32);

    if (code) {
      let tokens = await getTokens(code);
      if (!tokens) {
        throw Error("Unable to fetch tokens: expired auth code");
      }

      let userInfo = await getRobloxContext(tokens.access_token);
      if (!userInfo) {
        throw Error("Unable to load user data: insufficient permissions");
      }

      try {
        let sessionKey = `NONE`;
        const { data: userData, error } = await supabase
          .from("User")
          .select("*")
          .eq("userId", userInfo.sub);

        const session = userData?.[0]?.sessionToken || randomBytes(128).toString("hex");
        const encrypted = await encryptCookie(session);

        if (userData && userData.length === 0) {
          const newUser = {
            sessionToken: session,
            userId: userInfo.sub,
            username: userInfo.name,
            isActive: true,
            isBeta: false,
            // Other user data
          };

          const { data: createdData, error: insertionError } = await supabase
            .from("User")
            .insert(newUser);

          if (insertionError) {
            console.error("Error inserting user:", insertionError);
          }
        }

        return new Response(
          JSON.stringify({
            data: "Success!",
          }),
          {
            status: 200,
            headers: {
              "Set-Cookie": `fireset-client-id=${
                session
              }; Max-Age=${60 * 60 * 24}; Path=/, fireset-user-id=${
                session
              }; Max-Age=${60 * 60 * 24}; Path=/`,
            },
          }
        );
      } catch (error) {
        console.log(error);
        console.log("Failed to create account: user already exists");
        return new Response(
          JSON.stringify({
            error: (error as Error).message,
          }),
          { status: 400 }
        );
      }
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
