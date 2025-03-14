import reshttp from "reshttp";
import { asyncHandler } from "../../../utils/asyncHandlerUtils.js";
import { throwError } from "../../../utils/throwErrorUtils.js";
import { db } from "../../../databases/database.js";
import { getIncludeOptions } from "../../../utils/menuItemUtils.js";
import { httpResponse } from "../../../utils/apiResponseUtils.js";

export default {
  // Get a single menu item with nested children
  getSingleMenuItem: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const depth = req.query.depth ? parseInt(req.query.depth as string) : 3;

    // Validate ID
    if (!id || isNaN(Number(id))) {
      throwError(reshttp.badRequestCode, "Valid menu item ID is required");
    }

    const menuItemId = parseInt(id);

    // Fetch the menu item with nested children based on depth
    const menuItem = await db.menuItem.findUnique({
      where: { id: menuItemId },
      include: getIncludeOptions(depth)
    });

    if (!menuItem) {
      throwError(reshttp.notFoundCode, `Menu item with ID ${id} not found`);
    }

    httpResponse(req, res, reshttp.okCode, "Menu item retrieved successfully", { menuItem });
  }),

  // Get all top-level menu items with optional nesting
  getAllMenuItems: asyncHandler(async (req, res) => {
    const depth = req.query.depth ? parseInt(req.query.depth as string) : 3;

    // Fetch only top-level menu items (those without a parent)
    const menuItems = await db.menuItem.findMany({
      where: { parentId: null },
      include: getIncludeOptions(depth),
      orderBy: { id: "asc" }
    });

    httpResponse(req, res, reshttp.okCode, "Menu items retrieved successfully", { menuItems });
  }),

  // Get page data by ID with nested sections
  getPageData: asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Validate ID
    if (!id || isNaN(Number(id))) {
      throwError(reshttp.badRequestCode, "Valid page data ID is required");
    }

    const pageDataId = parseInt(id);

    // Fetch the page data with nested sections
    const pageData = await db.pageData.findUnique({
      where: { id: pageDataId },
      include: {
        sectionChildren: true
      }
    });

    if (!pageData) {
      throwError(reshttp.notFoundCode, `Page data with ID ${id} not found`);
    }

    httpResponse(req, res, reshttp.okCode, "Page data retrieved successfully", { pageData });
  })
};
