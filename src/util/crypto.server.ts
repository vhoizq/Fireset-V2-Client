import dotenv from "dotenv";
import { randomBytes, createCipheriv, createDecipheriv } from "crypto";

dotenv.config();



export const encryptCookie = async (
    cookie: string
): Promise<{ secret: string, iv: string }> => {
    try {
        const iv = randomBytes(16);
        const secret = Buffer.from(process.env.COOKIE_KEY!, "hex"); // Convert the key to a Buffer
        const cipher = createCipheriv(
            "aes-256-cbc",
            secret,
            iv
        );

        let encrypted = cipher.update(cookie, "utf-8", "hex");
        encrypted += cipher.final("hex");

        return {
            secret: encrypted,
            iv: iv.toString("hex")
        };
    } catch (error) {
        console.log(error);
        throw new Error("Encryption failed");
    }
};

export const decryptCookie = async (
    cookie: string,
    iv: string
): Promise<string> => {
    try {
        const secret = Buffer.from(process.env.COOKIE_KEY!, "hex"); // Convert the key to a Buffer
        const decipher = createDecipheriv(
            "aes-256-cbc",
            secret,
            Buffer.from(iv, "hex")
        );

        let decrypted = decipher.update(cookie, "hex", "utf-8");
        decrypted += decipher.final("utf-8");
        return decrypted;
    } catch (error) {
        throw new Error("Decryption failed");
    }
};
