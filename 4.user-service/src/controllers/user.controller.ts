import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
    static async getById(req: Request, res: Response) {
        try {
            const user = await UserService.getById(
                req.params.id,
                req.user!.userId,
                req.user!.role
            );

            res.status(200).json(user);
        } catch (error) {
            if (error instanceof Error && error.message === "Access denied") {
                res.status(403).json({ message: error.message });
                return;
            }

            if (error instanceof Error && error.message === "User not found") {
                res.status(404).json({ message: error.message });
                return;
            }

            res.status(500).json({ message: "Internal server error" });
        }
    }
}