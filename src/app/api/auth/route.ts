import dotenv from "dotenv";

const ROBLOX_APPID = "2682885889385043103"

const HOST = "https://fireset.xyz"

export const GET = () => {
    return new Response(
        JSON.stringify({
            data: `https://apis.roblox.com/oauth/v1/authorize?client_id=2682885889385043103&redirect_uri=https://fireset.xyz/auth/redirect&scope=openid+profile&response_type=Code&prompts=login+consent&nonce=12345&state=6789`
        }),
        { status: 200 }
    )
}