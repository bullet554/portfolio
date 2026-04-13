import { pool } from "../lib/db";
import { HttpError } from "../utils/http-error";

export class UserService {
    static async getById(requestedUserId: string, currentUserId: string, role: string) {
        if (role !== "admin" && requestedUserId !== currentUserId) {
            throw new HttpError(403, "Access denied");
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
            throw new HttpError(404, "User not found");
        }

        return user;
    }

    static async getAll(role: string) {
        if (role !== "admin") {
            throw new HttpError(403, "Access denied");
        }

        const result = await pool.query(
            `
            SELECT id, "fullName", "birthDate", email, role, "isActive", "createdAt", "updatedAt"
            FROM "User"
            ORDER BY "createdAt" DESC
            `
        );

        return result.rows;
    }

    static async block(requestedUserId: string, currentUserId: string, role: string) {
        if (role !== "admin" && requestedUserId !== currentUserId) {
            throw new HttpError(403, "Access denied");
        }

        const existingUser = await pool.query(
            `
            SELECT id
            FROM "User"
            WHERE id = $1
            `,
            [requestedUserId]
        );

        if (existingUser.rows.length === 0) {
            throw new HttpError(404, "User not found");
        }

        const result = await pool.query(
            `
            UPDATE "User"
            SET "isActive" = false, "updatedAt" = now()
            WHERE id = $1
            RETURNING id, "fullName", email, role, "isActive", "updatedAt"
            `,
            [requestedUserId]
        );

        return result.rows[0];
    }
}