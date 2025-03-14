import reshttp from "reshttp";
import { asyncHandler } from "../../../utils/asyncHandlerUtils.js";
import type { UpdateMenuItemRequest, UpdatePageDataRequest } from "../../../utils/menuItemUtils.js";
import { throwError } from "../../../utils/throwErrorUtils.js";
import { db } from "../../../databases/database.js";
import { httpResponse } from "../../../utils/apiResponseUtils.js";
import { generateSlug } from "../../../utils/slugStringGeneratorUtils.js";

export default {
  updateMenuItem: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const menuItemData = req.body as UpdateMenuItemRequest;

    // Validate ID
    if (!id || isNaN(Number(id))) {
      throwError(reshttp.badRequestCode, "Valid menu item ID is required");
    }

    const menuItemId = parseInt(id);

    // Validate menu item exists
    const existingMenuItem = await db.menuItem.findUnique({
      where: { id: menuItemId }
    });

    if (!existingMenuItem) {
      throwError(reshttp.notFoundCode, `Menu item with ID ${id} not found`);
    }
    const checkIfMenuItemExists = await db.menuItem.findFirst({
      where: { OR: [{ title: menuItemData.title }, { href: menuItemData.href }] }
    });
    if (checkIfMenuItemExists) {
      throwError(reshttp.badRequestCode, "Menu item already exists");
    }

    // If changing parent, validate new parent exists
    if (menuItemData.parentId) {
      // Prevent circular references
      if (menuItemData.parentId === menuItemId) {
        throwError(reshttp.badRequestCode, "Menu item cannot be its own parent");
      }

      const parentItem = await db.menuItem.findUnique({
        where: { id: menuItemData.parentId }
      });

      if (!parentItem) {
        throwError(reshttp.notFoundCode, `Parent menu item with ID ${menuItemData.parentId} not found`);
      }
    }

    // Update the menu item
    const updatedMenuItem = await db.menuItem.update({
      where: { id: menuItemId },
      data: { ...menuItemData, href: `/${generateSlug(menuItemData.title as string)}` },
      include: {
        children: true,
        pageData: true
      }
    });

    httpResponse(req, res, reshttp.okCode, "Menu item updated successfully", { menuItem: updatedMenuItem });
  }),

  // Update page data by ID
  updatePageData: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const pageDataInput = req.body as UpdatePageDataRequest;

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

    // If changing parent section, validate it exists
    if (pageDataInput.parentSectionId) {
      // Prevent circular references
      if (pageDataInput.parentSectionId === pageDataId) {
        throwError(reshttp.badRequestCode, "Section cannot be its own parent");
      }

      const parentSection = await db.pageData.findUnique({
        where: { id: pageDataInput.parentSectionId }
      });

      if (!parentSection) {
        throwError(reshttp.notFoundCode, `Parent section with ID ${pageDataInput.parentSectionId} not found`);
      }
    }

    // If changing menu item, validate it exists
    if (pageDataInput.menuItemId) {
      const menuItem = await db.menuItem.findUnique({
        where: { id: pageDataInput.menuItemId }
      });

      if (!menuItem) {
        throwError(reshttp.notFoundCode, `Menu item with ID ${pageDataInput.menuItemId} not found`);
      }
    }

    // Update the page data
    const updatedPageData = await db.pageData.update({
      where: { id: pageDataId },
      data: pageDataInput,
      include: {
        sectionChildren: true
      }
    });

    httpResponse(req, res, reshttp.okCode, "Page data updated successfully", { pageData: updatedPageData });
  })
};
