import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { asyncHandler } from "../utils/async-handler";

const router = Router();

router.use(authMiddleware);

router.get("/", asyncHandler(UserController.getAll));
router.get("/:id", asyncHandler(UserController.getById));
router.patch("/:id/block", asyncHandler(UserController.block));

export default router;