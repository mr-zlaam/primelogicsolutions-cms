// src/utils/menuItemUtils.ts
import type { MenuItem } from "@prisma/client";
import { db } from "../databases/database.js";
import reshttp from "reshttp";
import { generateSlug } from "./slugStringGeneratorUtils.js";
import type { MenuItemCreateDto, MenuItemWithChildren } from "../types/menuItems.js";
import { throwError } from "./throwErrorUtils.js";

/**
 * Checks if a menu item with the given title already exists under the specified parent
 */
export const checkMenuItemExists = async (title: string, parentId: number | null = null): Promise<void> => {
  const menuItem = await db.menuItem.findFirst({
    where: {
      title,
      parentId
    }
  });

  if (menuItem) {
    throwError(reshttp.conflictCode, `Menu item "${title}" already exists${parentId ? " under this parent" : ""}`);
  }
};

/**
 * Verifies a parent menu item exists
 */
export const verifyParentExists = async (parentId: number): Promise<MenuItem | null> => {
  if (!parentId) return null;

  const parent = await db.menuItem.findUnique({
    where: { id: parentId }
  });

  if (!parent) {
    throwError(reshttp.notFoundCode, `Parent menu item with ID ${parentId} not found`);
  }

  return parent;
};

/**
 * Builds a proper href for a menu item
 */
export const buildMenuItemHref = (title: string, parentHref: string = ""): string => {
  const slug = generateSlug(title);
  return parentHref ? `${parentHref}/${slug}` : `/${slug}`;
};

/**
 * Creates a menu item and its children recursively
 */
export const createMenuItemWithChildren = async (
  itemData: MenuItemCreateDto,
  parentId: number | null = null,
  parentHref: string = ""
): Promise<MenuItem> => {
  // Extract children
  const { children, ...menuItemData } = itemData;

  // Build href
  const href = buildMenuItemHref(itemData.title, parentHref);

  // Create the menu item
  const createdItem = await db.menuItem.create({
    data: {
      ...menuItemData,
      href,
      parentId
    }
  });

  // Create children recursively if they exist
  if (children && children.length > 0) {
    for (const child of children) {
      await createMenuItemWithChildren(child, createdItem.id, href);
    }
  }

  return createdItem;
};

/**
 * Gets the complete menu structure with children
 */
export const getCompleteMenuStructure = async (menuItemId: number): Promise<MenuItemWithChildren> => {
  const menuItem = await db.menuItem.findUnique({
    where: { id: menuItemId },
    include: {
      children: {
        include: {
          children: {
            include: {
              children: true,
              pageData: true
            }
          },
          pageData: true
        }
      },
      pageData: true
    }
  });

  if (!menuItem) {
    throwError(reshttp.notFoundCode, `Menu item with ID ${menuItemId} not found`);
  }

  return menuItem as MenuItemWithChildren;
};
