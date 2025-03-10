// src/types/menuItem.types.ts
import type { MenuItem, PageData } from "@prisma/client";

export interface MenuItemCreateDto extends Omit<MenuItem, "id" | "createdAt" | "updatedAt"> {
  parentId: number | null;
  children?: MenuItemCreateDto[];
}

export interface MenuItemUpdateDto extends Partial<Omit<MenuItem, "id" | "createdAt" | "updatedAt">> {
  parentId?: number | null;
}

export interface MenuItemWithChildren extends MenuItem {
  children: MenuItemWithChildren[];
  pageData: PageData[];
}
