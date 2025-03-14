import type { ISECTION, MenuItemType } from "../types/types.js";
export type SECTIONTYPE = "IMAGE" | "PARAGRAPH" | "HEADING" | "VIDEO" | "LINK";
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
export declare const getIncludeOptions: (depth?: number) =>
  | {
      children?: undefined;
      pageData?: undefined;
    }
  | {
      children: {
        include:
          | {
              children: {
                include:
                  | {
                      children: {
                        include:
                          | {
                              pageData: boolean;
                            }
                          | {
                              pageData?: undefined;
                            };
                        pageData: boolean;
                      };
                      pageData: boolean;
                    }
                  | {
                      children?: undefined;
                      pageData?: undefined;
                    };
              };
              pageData: boolean;
            }
          | {
              children?: undefined;
              pageData?: undefined;
            };
      };
      pageData: {
        include: {
          sectionChildren: boolean;
        };
      };
    };
