import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    return new Response(
        JSON.stringify({
            success: true,
            message: "Successfully connected to Gateway",
            errors: []
        }),
        { status: 200 }
    )
}