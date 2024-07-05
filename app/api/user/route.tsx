import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";


interface Request {
    json(): Promise<any>;
}

interface User {
    email: string;
}

interface InsertResponse {
    data: any;
}

interface ErrorResponse {
    error: string;
}

export async function POST(req: Request): Promise<NextResponse> {
    const supabase = createRouteHandlerClient({ cookies });
    const { data } = await supabase.auth.getSession();
    const { session } = data;

    if (session) {
        const body: User = await req.json();

        if (!body.email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        try {
            // This call will fail if you haven't created a table named "users" in your database
            const { data }: InsertResponse = await supabase
                .from("users")
                .insert({ email: body.email })
                .select();

            return NextResponse.json({ data }, { status: 200 });
        } catch (e) {
            console.error(e);
            return NextResponse.json(
                { error: "Something went wrong" },
                { status: 500 }
            );
        }
    } else {
        // Not Signed in
        return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }
}
