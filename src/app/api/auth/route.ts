import dotenv from "dotenv";

export const GET = () => {
    return new Response(
        JSON.stringify({
            data: `https://discord.com/api/oauth2/authorize?client_id=1053864556503519312&redirect_uri=https://fireset.xyz/auth/redirect&response_type=code&scope=identify%20connections%20email%20guilds`
        }),
        { status: 200 }
    )
}