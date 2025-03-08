import { Router } from "express";
import authController from "../../controllers/authController/authController.js";
import authMiddleware from "../../middleware/authMiddleware.js";
import { validateDataMiddleware } from "../../middleware/validateMiddleware.js";
import { userSchema } from "../../validations/authValidation/authValidation.js";

export const authRouter: Router = Router();
authRouter.route("/createAdmin").post(validateDataMiddleware(userSchema), authController.createAdmin);
authRouter
  .route("/createMod")
  .post(authMiddleware.checkToken, authMiddleware.checkIfUserIsAdmin, validateDataMiddleware(userSchema), authController.createMod);
authRouter.route("/login").post(authController.login);
