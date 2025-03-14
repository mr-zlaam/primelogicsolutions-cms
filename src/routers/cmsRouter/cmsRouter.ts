import { Router } from "express";
import createDataController from "../../controllers/cmsController/create/createMenuItemController.js";
import { validateDataMiddleware } from "../../middleware/validateMiddleware.js";
import { CreateMenuItemSchema } from "../../validations/cmsValidation/cmsValidation.js";
import authMiddleware from "../../middleware/authMiddleware.js";

export const cmsRouter: Router = Router();
cmsRouter
  .route("/createMenuItem")
  .post(
    validateDataMiddleware(CreateMenuItemSchema),
    authMiddleware.checkToken,
    authMiddleware.checkIfUserIsModorAdmin,
    createDataController.createMenuItem
  );
cmsRouter.route("/getMenuItem/:id").get(validateDataMiddleware(CreateMenuItemSchema), createDataController.createMenuItem);

cmsRouter
  .route("/getAllMenuItems")
  .get(
    validateDataMiddleware(CreateMenuItemSchema),
    authMiddleware.checkToken,
    authMiddleware.checkIfUserIsModorAdmin,
    createDataController.createMenuItem
  );
