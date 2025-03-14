import reshttp from "reshttp";
import { asyncHandler } from "../../../utils/asyncHandlerUtils.js";
import { db } from "../../../databases/database.js";
import { throwError } from "../../../utils/throwErrorUtils.js";
import { httpResponse } from "../../../utils/apiResponseUtils.js";

export default {
  deleteMenuItem: asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      throwError(reshttp.badRequestCode, "Valid menu item ID is required");
    }

    const menuItemId = parseInt(id);

    const existingMenuItem = await db.menuItem.findUnique({
      where: { id: menuItemId }
    });

    if (!existingMenuItem) {
      throwError(reshttp.notFoundCode, `Menu item with ID ${id} not found`);
    }

    // Delete the menu item (cascading delete will handle children)
    await db.menuItem.delete({
      where: { id: menuItemId }
    });

    httpResponse(req, res, reshttp.okCode, "Menu item and all its children deleted successfully", null);
  }),

  // Delete page data by ID (with cascading delete)
  deletePageData: asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Validate ID
    if (!id || isNaN(Number(id))) {
      throwError(reshttp.badRequestCode, "Valid page data ID is required");
    }

    const pageDataId = parseInt(id);

    // Validate page data exists
    const existingPageData = await db.pageData.findUnique({
      where: { id: pageDataId }
    });

    if (!existingPageData) {
      throwError(reshttp.notFoundCode, `Page data with ID ${id} not found`);
    }

    // Delete the page data (cascading delete will handle children)
    await db.pageData.delete({
      where: { id: pageDataId }
    });

    httpResponse(req, res, reshttp.okCode, "Page data and all its children deleted successfully", null);
  })
};
