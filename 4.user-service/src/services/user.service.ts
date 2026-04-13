import { pool } from "../lib/db";

export class UserService {
    static async getById(requestedUserId: string, currentUserId: string, role: string) {
        if (role !== "admin" && requestedUserId !== currentUserId) {
            throw new Error("Access denied");
        }

        const result = await pool.query(
            `
      SELECT id, "fullName", "birthDate", email, role, "isActive", "createdAt", "updatedAt"
      FROM "User"
      WHERE id = $1
      `,
            [requestedUserId]
        );

        const user = result.rows[0];

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }
}