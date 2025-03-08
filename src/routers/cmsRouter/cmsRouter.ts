import { Router } from "express";
import createDataController from "../../controllers/cmsController/create/createDataController.js";
import { validateDataMiddleware } from "../../middleware/validateMiddleware.js";
import { cmsValidation } from "../../validations/cmsValidation/cmsValidation.js";
import authMiddleware from "../../middleware/authMiddleware.js";

export const cmsRouter: Router = Router();
cmsRouter
  .route("/createMenuItem")
  .post(
    validateDataMiddleware(cmsValidation),
    authMiddleware.checkToken,
    authMiddleware.checkIfUserIsModorAdmin,
    createDataController.createMenuItem
  );
