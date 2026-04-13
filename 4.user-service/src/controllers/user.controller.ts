import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
    static async getById(req: Request, res: Response) {
        const user = await UserService.getById(
            req.params.id,
            req.user!.userId,
            req.user!.role
        );

        res.status(200).json(user);
    }

    static async getAll(req: Request, res: Response) {
        const users = await UserService.getAll(req.user!.role);
        res.status(200).json(users);
    }

    static async block(req: Request, res: Response) {
        const user = await UserService.block(
            req.params.id,
            req.user!.userId,
            req.user!.role
        );

        res.status(200).json({
            message: "User blocked successfully",
            user,
        });
    }
}