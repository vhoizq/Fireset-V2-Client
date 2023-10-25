import dotenv from "dotenv";

const ROBLOX_APPID = "6559552435031738282";

const HOST = "http://localhost:3000";

export const GET = () => {
  return new Response(
    JSON.stringify({
      data: `https://apis.roblox.com/oauth/v1/authorize?client_id=${ROBLOX_APPID}&redirect_uri=${HOST}/auth/redirect&scope=openid+profile&response_type=Code&prompts=login+consent&nonce=12345&state=6789`,
    }),
    { status: 200 }
  );
};
