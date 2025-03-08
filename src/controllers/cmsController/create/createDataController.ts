import type { MenuItem } from "@prisma/client";
import { asyncHandler } from "../../../utils/asyncHandlerUtils.js";
import { db } from "../../../databases/database.js";
import reshttp from "reshttp";
import logger from "../../../utils/loggerUtils.js";
import { httpResponse } from "../../../utils/apiResponseUtils.js";

export default {
  createMenuItem: asyncHandler(async (req, res) => {
    const menuBody = req.body as MenuItem;
    // ** Check If menuItem is already exixsts
    // ** TODO:VALIDATION YET TO BE HANDLEd
    const menuItem = await db.menuItem.findFirst({ where: { title: menuBody.title, href: menuBody.href } });
    if (!menuItem) {
      logger.info("Menu Item is already exists with same values");
      throw { status: reshttp.conflictCode, message: reshttp.conflictMessage };
    }
    const createdMenuItems = await db.menuItem.create({ data: { ...menuBody } });
    httpResponse(req, res, reshttp.createdCode, reshttp.createdMessage, { ...createdMenuItems, message: "Menu items created successfully" });
  })
};
