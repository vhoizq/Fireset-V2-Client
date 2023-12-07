import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

export type tokenObject = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  id_token: string;
  scop: string;
};

export type robloxUserInfo = {
  id: string;
  username: string;
  avatar: string;
};

export const getTokens = async (code: string): Promise<tokenObject | null> => {
  try {
    const params = new URLSearchParams();
    console.log(code);
    params.append("client_id", "1053864556503519312");
    params.append("client_secret", "NEmVqf0Bf8Im1SJFTC90r9XQsWoFXex8");
    params.append("grant_type", "authorization_code");
    params.append("code", `${code}`);
    params.append("redirect_uri", "http://localhost:3000/api/auth/redirect");

    let response = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      body: params,
    });

    if (response.status === 200) {
      const data = (await response.json()) as any;
      if (data.access_token) {
        return data as tokenObject;
      } else {
        console.error("Access token not found in response:", data);
        throw new Error("Access token not found");
      }
    } else {
      console.error("Non-200 status code received:", response.status);
      throw new Error(`Non-200 status code received: ${response.status}`);
    }
  } catch (error) {
    console.error("Error during token exchange:", error);
    return null;
  }
};

export const refreshTokens = async (
  refresh: string
): Promise<tokenObject | null> => {
  try {
    const form = new URLSearchParams();
    form.append("refresh_token", refresh);
    form.append("client_id", process.env.ROBLOX_APP as string);
    form.append("client_secret", process.env.ROBLOX_SECRET as string);
    form.append("grant_type", "refresh_token");

    let response = await fetch("https://apis.roblox.com/oauth/v1/token", {
      body: form,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.status === 200) {
      const data = (await response.json()) as any;
      if (data.access_token) {
        return data as tokenObject;
      } else {
        throw Error();
      }
    } else {
      throw Error();
    }
  } catch (error) {
    return null;
  }
};

export const getRobloxContext = async (
  token: string
): Promise<robloxUserInfo | null> => {
  try {
    console.log(token);
    let response = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${token}`,
       
      },
    });

    if (response.status === 200) {
      const data = (await response.json()) as any;
      if (data.sub) {
        return data as robloxUserInfo;
      } else {
        throw Error();
      }
    } else {
      throw Error();
    }
  } catch (error) {
    return null;
  }
};
