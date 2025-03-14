import { Router } from "express";
import createDataController from "../../controllers/cmsController/create/createMenuItemController.js";
import { validateDataMiddleware } from "../../middleware/validateMiddleware.js";
import {
  CreateMenuItemSchema,
  CreatePageDataSchema,
  UpdateMenuItemSchema,
  UpdatePageDataSchema
} from "../../validations/cmsValidation/cmsValidation.js";
import authMiddleware from "../../middleware/authMiddleware.js";
import getMenuItemsController from "../../controllers/cmsController/get/getMenuItemsController.js";
import updateMenuItemController from "../../controllers/cmsController/update/updateMenuItemController.js";
import deleteMenuItemController from "../../controllers/cmsController/delete/deleteMenuItemController.js";

export const cmsRouter: Router = Router();
cmsRouter
  .route("/createMenuItem")
  .post(
    validateDataMiddleware(CreateMenuItemSchema),
    authMiddleware.checkToken,
    authMiddleware.checkIfUserIsModorAdmin,
    createDataController.createMenuItem
  );

cmsRouter
  .route("/createPageData")
  .post(
    validateDataMiddleware(CreatePageDataSchema),
    authMiddleware.checkToken,
    authMiddleware.checkIfUserIsModorAdmin,
    createDataController.createPageData
  );

cmsRouter.route("/getSingleMenuItem/:id").get(validateDataMiddleware(CreateMenuItemSchema), getMenuItemsController.getSingleMenuItem);

cmsRouter.route("/getAllMenuItems").get(getMenuItemsController.getAllMenuItems);

cmsRouter.route("/getPageData/:id").get(getMenuItemsController.getPageData);

cmsRouter
  .route("/updateMenuItem/:id")
  .get(
    validateDataMiddleware(UpdateMenuItemSchema),
    authMiddleware.checkToken,
    authMiddleware.checkIfUserIsModorAdmin,
    updateMenuItemController.updateMenuItem
  );

cmsRouter
  .route("/updatePageData/:id")
  .get(
    validateDataMiddleware(UpdatePageDataSchema),
    authMiddleware.checkToken,
    authMiddleware.checkIfUserIsModorAdmin,
    updateMenuItemController.updatePageData
  );

cmsRouter
  .route("/deleteMenuItem/:id")
  .delete(authMiddleware.checkToken, authMiddleware.checkIfUserIsModorAdmin, deleteMenuItemController.deleteMenuItem);
cmsRouter
  .route("/deletePageData/:id")
  .delete(authMiddleware.checkToken, authMiddleware.checkIfUserIsModorAdmin, deleteMenuItemController.deletePageData);
