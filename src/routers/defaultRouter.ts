import { Router } from "express";
import { performanceRouter } from "./performanceRouter/performanceRouter.js";
import { cmsRouter } from "./cmsRouter/cmsRouter.js";

export const defaultRouter: Router = Router();

defaultRouter.use("/", performanceRouter);
defaultRouter.use("/pageData", cmsRouter);
