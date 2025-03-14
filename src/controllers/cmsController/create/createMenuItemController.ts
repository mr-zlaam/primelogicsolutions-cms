import reshttp from "reshttp";
import { asyncHandler } from "../../../utils/asyncHandlerUtils.js";
import type { CreatePageDataRequest } from "../../../utils/menuItemUtils.js";
import type { CreateMenuItemRequest } from "../../../utils/menuItemUtils.js";
import { throwError } from "../../../utils/throwErrorUtils.js";
import { db } from "../../../databases/database.js";
import { httpResponse } from "../../../utils/apiResponseUtils.js";

export default {
  // Create a menu item at any level
  createMenuItem: asyncHandler(async (req, res) => {
    const menuItemData = req.body as CreateMenuItemRequest;

    // Validate required fields
    if (!menuItemData.title) {
      throwError(reshttp.badRequestCode, "Title is required");
    }

    // If parentId is provided, validate parent exists
    if (menuItemData.parentId) {
      const parentItem = await db.menuItem.findUnique({
        where: { id: menuItemData.parentId }
      });

      if (!parentItem) {
        throwError(reshttp.notFoundCode, `Parent menu item with ID ${menuItemData.parentId} not found`);
      }
    }

    // Create the menu item
    const menuItem = await db.menuItem.create({
      data: menuItemData
    });

    httpResponse(req, res, reshttp.createdCode, "Menu item created successfully", { menuItem });
  }),

  // Get a single menu item with nested children

  // Create page data (section) for a menu item
  createPageData: asyncHandler(async (req, res) => {
    const pageDataInput = req.body as CreatePageDataRequest;

    // Validate required fields
    if (!pageDataInput.title || !pageDataInput.description || !pageDataInput.sectionType) {
      throwError(reshttp.badRequestCode, "Title, description and sectionType are required");
    }

    // If menuItemId is provided, validate menu item exists
    if (pageDataInput.menuItemId) {
      const menuItem = await db.menuItem.findUnique({
        where: { id: pageDataInput.menuItemId }
      });

      if (!menuItem) {
        throwError(reshttp.notFoundCode, `Menu item with ID ${pageDataInput.menuItemId} not found`);
      }
    }

    // If parentSectionId is provided, validate parent section exists
    if (pageDataInput.parentSectionId) {
      const parentSection = await db.pageData.findUnique({
        where: { id: pageDataInput.parentSectionId }
      });

      if (!parentSection) {
        throwError(reshttp.notFoundCode, `Parent section with ID ${pageDataInput.parentSectionId} not found`);
      }
    }

    // Create the page data
    const pageData = await db.pageData.create({
      data: pageDataInput
    });

    httpResponse(req, res, reshttp.createdCode, "Page data created successfully", { pageData });
  })
};
