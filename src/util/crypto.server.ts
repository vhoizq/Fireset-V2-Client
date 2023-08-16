import dotenv from "dotenv";
import { randomBytes, createCipheriv, createDecipheriv } from "crypto";

dotenv.config();

export const encryptCookie = async (
    cookie: string
): Promise<{ encryptedData: string, iv: string }> => {
    try {
        const iv = randomBytes(16);
        const secret = process.env.COOKIE_KEY;
        console.log(secret)

        if (!secret) {
            throw new Error("COOKIE_KEY not defined in environment");
        }

        const cipher = createCipheriv("aes-256-cbc", Buffer.from(secret, "hex"), iv);

        let encrypted = cipher.update(cookie, "utf-8", "hex");
       

        return {
            encryptedData: encrypted,
            iv: iv.toString("hex"),
        };
    } catch (error) {
        console.error("Encryption error:", error);
        throw new Error("Encryption failed");
    }
};

export const decryptCookie = async (
    encryptedData: string,
    iv: string
): Promise<string> => {
    try {
        const secret = process.env.COOKIE_KEY;

        if (!secret) {
            throw new Error("COOKIE_KEY not defined in environment");
        }

        const decipher = createDecipheriv("aes-256-cbc", Buffer.from(secret, "hex"), Buffer.from(iv, "hex"));

        let decrypted = decipher.update(encryptedData, "hex", "utf-8");
        
        
        return decrypted;
    } catch (error) {
        console.error("Decryption error:", error);
        throw new Error("Decryption failed");
    }
};
