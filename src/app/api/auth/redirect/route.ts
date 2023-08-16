import { encryptCookie } from "@/util/crypto.server";
import { prisma } from "@/util/db";
import axios from "axios";
import { getRobloxContext, getTokens } from "@/util/roblox/auth.server";

import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bodxfxgmzdsaxyeqxgbm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvZHhmeGdtemRzYXh5ZXF4Z2JtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4OTA5MTIwOSwiZXhwIjoyMDA0NjY3MjA5fQ.wZg90UpLqy6BDL9mO7D1_c4DU05gC2rcmTLgX5dPxL0';

const supabase = createClient(supabaseUrl, supabaseKey);

export const GET = async (
    req: NextRequest,
    res: NextResponse
) => {
    try {
        const params = req.nextUrl.searchParams;
        console.log(req.nextUrl)
        const code = params.get("code");
        
        const tokenURL = 'https://discord.com/api/oauth2/token';

        if (code) {
            console.log(`Code: ${code}`)
            const response = await axios.post(
                tokenURL,
                `client_id=1053864556503519312&client_secret=P3kVSLym5OD7QXs9EPjyJORs9-rREHRy&grant_type=authorization_code&code=${code}&redirect_uri=https://fireset.xyz/auth/redirect&scope=identify%20email%20gdm.join%20guilds`
            );

            const accessToken = response.data.access_token;

            const userResponse = await axios.get('https://discord.com/api/v10/users/@me', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            const user = userResponse.data;

            const { data: userData, error } = await supabase
                .from('User')
                .select('*')
                .eq('userId', user.id);


            try {

                if (!error) {
                    if (userData.length === 0) {
                        const newUser = {
                            sessionToken: accessToken,
                            userId: user.id,
                            username: user.username,
                            email: user.email,
                            isActive: true,
                            isBeta: false,
                            // Other user data
                        };
                        const { data: createdData, error: insertionError } = await supabase
                            .from('User')
                            .insert(newUser);

                        if (insertionError) {
                            console.error('Error inserting user:', insertionError);
                        }
                    }


                    return new Response(
                        JSON.stringify({
                            data: "Success!"
                        }),
                        {
                            status: 200,
                            headers: {
                                "Set-Cookie": `fireset-client-id=${accessToken}; Max-Age=${60 * 60 * 24}; Path=/`
                            }
                        }
                    );
                }

            } catch (error) {
                console.log(error)
                console.log("Failed to create account: user already exists");
                return new Response(
                    JSON.stringify({
                        error: (error as Error).message
                    }),
                    { status: 400 }
                )
            }

        } else {
            throw Error("No authorization code provided");
        }
    } catch (error) {
        return new Response(
            JSON.stringify({
                error: (error as Error).message
            }),
            { status: 500 }
        )
    }
}