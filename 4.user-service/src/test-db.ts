import { pool } from "./lib/db";
import { env } from "./config/env";
console.log(env.DATABASE_URL);

async function main() {
    const result = await pool.query('SELECT id, email, role, "isActive" FROM "User"');
    console.log("DB connected. Rows:", result.rows);
}

main()
    .catch((error) => {
        console.error("DB connection error:", error);
    })
    .finally(async () => {
        await pool.end();
    });