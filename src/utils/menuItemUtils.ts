import type { ISECTION, MenuItemType } from "../types/types.js";

// Type definitions matching your frontend types
export type SECTIONTYPE = "IMAGE" | "PARAGRAPH" | "HEADING" | "VIDEO" | "LINK";

// Request types for validation
export type CreateMenuItemRequest = Omit<MenuItemType, "id" | "children" | "pageData"> & {
  parentId?: number;
};

export type UpdateMenuItemRequest = Partial<Omit<MenuItemType, "id" | "children" | "pageData">> & {
  parentId?: number;
};

export type CreatePageDataRequest = Omit<ISECTION, "id" | "sectionChildren"> & {
  parentSectionId?: number;
  menuItemId?: number;
};

export type UpdatePageDataRequest = Partial<Omit<ISECTION, "id" | "sectionChildren">> & {
  parentSectionId?: number;
  menuItemId?: number;
};

// Helper function to include nested relations based on depth
export const getIncludeOptions = (depth: number = 3) => {
  if (depth <= 0) return {};

  return {
    children: {
      include:
        depth > 1
          ? {
              children: {
                include:
                  depth > 2
                    ? {
                        children: {
                          include:
                            depth > 3
                              ? {
                                  pageData: true
                                }
                              : {},
                          pageData: true
                        },
                        pageData: true
                      }
                    : {}
              },
              pageData: true
            }
          : {}
    },
    pageData: {
      include: {
        sectionChildren: true
      }
    }
  };
};
