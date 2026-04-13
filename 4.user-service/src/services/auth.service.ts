import bcrypt from "bcrypt";
import { pool } from "../lib/db";
import { signToken } from "../utils/jwt";

interface RegisterData {
    fullName: string;
    birthDate: string;
    email: string;
    password: string;
}

interface LoginData {
    email: string;
    password: string;
}

export class AuthService {
    static async register(data: RegisterData) {
        const existingUser = await pool.query(
            `SELECT id FROM "User" WHERE email = $1`,
            [data.email]
        );

        if (existingUser.rows.length > 0) {
            throw new Error("Email already exists");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const result = await pool.query(
            `
      INSERT INTO "User" ("fullName", "birthDate", email, password, role, "isActive")
      VALUES ($1, $2, $3, $4, 'user', true)
      RETURNING id, "fullName", "birthDate", email, role, "isActive", "createdAt", "updatedAt"
      `,
            [data.fullName, data.birthDate, data.email, hashedPassword]
        );

        return result.rows[0];
    }

    static async login(data: LoginData) {
        const result = await pool.query(
            `
      SELECT id, email, password, role, "isActive"
      FROM "User"
      WHERE email = $1
      `,
            [data.email]
        );

        const user = result.rows[0];

        if (!user) {
            throw new Error("Invalid email or password");
        }

        if (!user.isActive) {
            throw new Error("User is blocked");
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);

        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }

        const token = signToken({
            userId: user.id,
            role: user.role,
        });

        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                isActive: user.isActive,
            },
        };
    }
}