import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
    static async register(req: Request, res: Response) {
        try {
            const user = await AuthService.register(req.body);

            res.status(201).json({
                message: "User registered successfully",
                user,
            });
        } catch (error) {
            if (error instanceof Error && error.message === "Email already exists") {
                res.status(409).json({ message: error.message });
                return;
            }

            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const result = await AuthService.login(req.body);

            res.status(200).json({
                message: "Login successful",
                ...result,
            });
        } catch (error) {
            if (
                error instanceof Error &&
                error.message === "Invalid email or password"
            ) {
                res.status(401).json({ message: error.message });
                return;
            }

            if (error instanceof Error && error.message === "User is blocked") {
                res.status(403).json({ message: error.message });
                return;
            }

            res.status(500).json({ message: "Internal server error" });
        }
    }
}