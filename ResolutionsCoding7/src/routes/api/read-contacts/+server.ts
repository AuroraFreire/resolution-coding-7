import {json} from "@sveltejs/kit";
import db from "$lib/server/db";

export async function GET() {
    const statement = db.prepare("SELECT name, address, phone FROM contacts");
    const rows = statement.all();
    return json({contacts: rows}, {status: 200});
}