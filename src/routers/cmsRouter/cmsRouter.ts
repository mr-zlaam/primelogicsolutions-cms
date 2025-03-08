import { Router } from "express";
import createDataController from "../../controllers/cmsController/create/createDataController.js";

export const cmsRouter: Router = Router();
cmsRouter.route("/createMenuItem").post(createDataController.createMenuItem);
