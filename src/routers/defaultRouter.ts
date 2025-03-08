import { Router } from "express";
import { performanceRouter } from "./performanceRouter/performanceRouter.js";

export const defaultRouter: Router = Router();

defaultRouter.use("/", performanceRouter);
