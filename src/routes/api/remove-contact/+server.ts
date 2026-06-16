import { json } from "@sveltejs/kit";
import db from "$lib/server/db";

export async function POST({ request }) {
    const { name, address, phone } = await request.json();

    const { error } = await db
        .from("contacts")
        .delete()
        .eq("name", name)
        .eq("address", address)
        .eq("phone", phone);

    if (error) {
        return json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }

    return json({ success: true }, { status: 200 });
}