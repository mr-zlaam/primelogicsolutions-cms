import type { MenuItem } from "@prisma/client";
import type { MenuItemCreateDto, MenuItemWithChildren } from "../types/menuItems.js";
export declare const checkMenuItemExists: (title: string, parentId?: number | null) => Promise<void>;
export declare const verifyParentExists: (parentId: number) => Promise<MenuItem | null>;
export declare const buildMenuItemHref: (title: string, parentHref?: string) => string;
export declare const createMenuItemWithChildren: (itemData: MenuItemCreateDto, parentId?: number | null, parentHref?: string) => Promise<MenuItem>;
export declare const getCompleteMenuStructure: (menuItemId: number) => Promise<MenuItemWithChildren>;
