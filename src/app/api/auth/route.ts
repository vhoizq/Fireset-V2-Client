import dotenv from "dotenv";

export const GET = () => {
    return new Response(
        JSON.stringify({
            data: `https://discord.com/api/oauth2/authorize?client_id=1053864556503519312&redirect_uri=https%3A%2F%2Ffireset.xyz%2Fapi%2Fauth%2Fredirect&response_type=code&scope=identify%20connections%20email%20guilds`
        }),
        { status: 200 }
    )
}