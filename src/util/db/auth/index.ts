import { getRobloxContext, refreshTokens, robloxUserInfo } from "@/util/roblox/auth.server";

interface User {
    username: string;
    sessionToken: string;
    userId: string;
    isActive: boolean;
    isBeta: boolean;
    email: string;
  }

import { NextRequest } from "next/server";
import { prisma } from "..";
import { decryptCookie } from "@/util/crypto.server";

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bodxfxgmzdsaxyeqxgbm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvZHhmeGdtemRzYXh5ZXF4Z2JtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4OTA5MTIwOSwiZXhwIjoyMDA0NjY3MjA5fQ.wZg90UpLqy6BDL9mO7D1_c4DU05gC2rcmTLgX5dPxL0';

const supabase = createClient(supabaseUrl, supabaseKey);

export const verifyAuth = async (
    req: NextRequest,
    noBeta?: true
): Promise<User | false> => {
    try {
        const clientCookie = req.cookies.get("fireset-client-id");
       
        if (clientCookie) {
            console.log("Got Data")
            const { data: user, error: userError } = await supabase
                .from("User")
                .select("*")
                .eq("sessionToken", clientCookie.value)
                .single();

          
            if (user) {
                return user;
            } else {
                return false;
            }

        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}