import { z } from "zod";

// SECTIONTYPE enum validation
export const SectionTypeEnum = z.enum(["IMAGE", "PARAGRAPH", "HEADING", "VIDEO", "LINK"]);

// Menu Item validation schemas
export const CreateMenuItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subTitle: z.string().optional(),
  description: z.string().optional(),
  href: z.string().min(1, "Href is required"),
  image: z.string().optional(),
  parentId: z.number().int().positive().optional()
});

export const UpdateMenuItemSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  subTitle: z.string().optional(),
  description: z.string().optional(),
  href: z.string().min(1, "Href is required").optional(),
  image: z.string().optional(),
  parentId: z.number().int().positive().optional()
});

// Page Data (Section) validation schemas
export const CreatePageDataSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subTitle: z.string().optional(),
  sectionType: SectionTypeEnum,
  description: z.string().min(1, "Description is required"),
  icon: z.string().optional(),
  image1: z.string().optional(),
  image2: z.string().optional(),
  image3: z.string().optional(),
  image4: z.string().optional(),
  image5: z.string().optional(),
  description0: z.string().optional(),
  description1: z.string().optional(),
  description2: z.string().optional(),
  description3: z.string().optional(),
  description4: z.string().optional(),
  description5: z.string().optional(),
  description6: z.string().optional(),
  parentSectionId: z.number().int().positive().optional(),
  menuItemId: z.number().int().positive().optional()
});

export const UpdatePageDataSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  subTitle: z.string().optional(),
  sectionType: SectionTypeEnum.optional(),
  description: z.string().min(1, "Description is required").optional(),
  icon: z.string().optional(),
  image1: z.string().optional(),
  image2: z.string().optional(),
  image3: z.string().optional(),
  image4: z.string().optional(),
  image5: z.string().optional(),
  description0: z.string().optional(),
  description1: z.string().optional(),
  description2: z.string().optional(),
  description3: z.string().optional(),
  description4: z.string().optional(),
  description5: z.string().optional(),
  description6: z.string().optional(),
  parentSectionId: z.number().int().positive().optional(),
  menuItemId: z.number().int().positive().optional()
});
