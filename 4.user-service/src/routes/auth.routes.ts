import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "../validators/auth.schemas";
import { asyncHandler } from "../utils/async-handler";

const router = Router();

router.post("/register", validate(registerSchema), asyncHandler(AuthController.register));
router.post("/login", validate(loginSchema), asyncHandler(AuthController.login));

export default router;