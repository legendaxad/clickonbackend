import { Router } from "express";
import { AuthController } from "../../controllers/auth.controller.js";
import { authMiddleware } from "../../middleware/authmiddleware.js";

export const authRouter = Router();
authRouter.post("/sign-up", AuthController.signUp);
authRouter.post("/signin", AuthController.signIn);
authRouter.get("/me", authMiddleware, AuthController.me);
