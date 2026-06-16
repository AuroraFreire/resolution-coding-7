import { json } from "@sveltejs/kit";
import db from "$lib/server/db";

export async function GET() {
    const { data, error } = await db
        .from("contacts")
        .select("name,address,phone");

    if (error) {
        return json(
            { error: error.message },
            { status: 500 }
        );
    }

    return json(
        { contacts: data },
        { status: 200 }
    );
}