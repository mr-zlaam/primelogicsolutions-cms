import { z } from "zod";
export declare const SectionTypeEnum: z.ZodEnum<["IMAGE", "PARAGRAPH", "HEADING", "VIDEO", "LINK"]>;
export declare const CreateMenuItemSchema: z.ZodObject<
  {
    title: z.ZodString;
    subTitle: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    parentId: z.ZodOptional<z.ZodNumber>;
  },
  "strip",
  z.ZodTypeAny,
  {
    title: string;
    subTitle?: string | undefined;
    description?: string | undefined;
    image?: string | undefined;
    parentId?: number | undefined;
  },
  {
    title: string;
    subTitle?: string | undefined;
    description?: string | undefined;
    image?: string | undefined;
    parentId?: number | undefined;
  }
>;
export declare const UpdateMenuItemSchema: z.ZodObject<
  {
    title: z.ZodOptional<z.ZodString>;
    subTitle: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    parentId: z.ZodOptional<z.ZodNumber>;
  },
  "strip",
  z.ZodTypeAny,
  {
    title?: string | undefined;
    subTitle?: string | undefined;
    description?: string | undefined;
    image?: string | undefined;
    parentId?: number | undefined;
  },
  {
    title?: string | undefined;
    subTitle?: string | undefined;
    description?: string | undefined;
    image?: string | undefined;
    parentId?: number | undefined;
  }
>;
export declare const CreatePageDataSchema: z.ZodObject<
  {
    title: z.ZodString;
    subTitle: z.ZodOptional<z.ZodString>;
    sectionType: z.ZodEnum<["IMAGE", "PARAGRAPH", "HEADING", "VIDEO", "LINK"]>;
    description: z.ZodString;
    icon: z.ZodOptional<z.ZodString>;
    image1: z.ZodOptional<z.ZodString>;
    image2: z.ZodOptional<z.ZodString>;
    image3: z.ZodOptional<z.ZodString>;
    image4: z.ZodOptional<z.ZodString>;
    image5: z.ZodOptional<z.ZodString>;
    description0: z.ZodOptional<z.ZodString>;
    description1: z.ZodOptional<z.ZodString>;
    description2: z.ZodOptional<z.ZodString>;
    description3: z.ZodOptional<z.ZodString>;
    description4: z.ZodOptional<z.ZodString>;
    description5: z.ZodOptional<z.ZodString>;
    description6: z.ZodOptional<z.ZodString>;
    parentSectionId: z.ZodOptional<z.ZodNumber>;
    menuItemId: z.ZodOptional<z.ZodNumber>;
  },
  "strip",
  z.ZodTypeAny,
  {
    title: string;
    description: string;
    sectionType: "IMAGE" | "PARAGRAPH" | "HEADING" | "VIDEO" | "LINK";
    subTitle?: string | undefined;
    icon?: string | undefined;
    image1?: string | undefined;
    image2?: string | undefined;
    image3?: string | undefined;
    image4?: string | undefined;
    image5?: string | undefined;
    description0?: string | undefined;
    description1?: string | undefined;
    description2?: string | undefined;
    description3?: string | undefined;
    description4?: string | undefined;
    description5?: string | undefined;
    description6?: string | undefined;
    parentSectionId?: number | undefined;
    menuItemId?: number | undefined;
  },
  {
    title: string;
    description: string;
    sectionType: "IMAGE" | "PARAGRAPH" | "HEADING" | "VIDEO" | "LINK";
    subTitle?: string | undefined;
    icon?: string | undefined;
    image1?: string | undefined;
    image2?: string | undefined;
    image3?: string | undefined;
    image4?: string | undefined;
    image5?: string | undefined;
    description0?: string | undefined;
    description1?: string | undefined;
    description2?: string | undefined;
    description3?: string | undefined;
    description4?: string | undefined;
    description5?: string | undefined;
    description6?: string | undefined;
    parentSectionId?: number | undefined;
    menuItemId?: number | undefined;
  }
>;
export declare const UpdatePageDataSchema: z.ZodObject<
  {
    title: z.ZodOptional<z.ZodString>;
    subTitle: z.ZodOptional<z.ZodString>;
    sectionType: z.ZodOptional<z.ZodEnum<["IMAGE", "PARAGRAPH", "HEADING", "VIDEO", "LINK"]>>;
    description: z.ZodOptional<z.ZodString>;
    icon: z.ZodOptional<z.ZodString>;
    image1: z.ZodOptional<z.ZodString>;
    image2: z.ZodOptional<z.ZodString>;
    image3: z.ZodOptional<z.ZodString>;
    image4: z.ZodOptional<z.ZodString>;
    image5: z.ZodOptional<z.ZodString>;
    description0: z.ZodOptional<z.ZodString>;
    description1: z.ZodOptional<z.ZodString>;
    description2: z.ZodOptional<z.ZodString>;
    description3: z.ZodOptional<z.ZodString>;
    description4: z.ZodOptional<z.ZodString>;
    description5: z.ZodOptional<z.ZodString>;
    description6: z.ZodOptional<z.ZodString>;
    parentSectionId: z.ZodOptional<z.ZodNumber>;
    menuItemId: z.ZodOptional<z.ZodNumber>;
  },
  "strip",
  z.ZodTypeAny,
  {
    title?: string | undefined;
    subTitle?: string | undefined;
    description?: string | undefined;
    sectionType?: "IMAGE" | "PARAGRAPH" | "HEADING" | "VIDEO" | "LINK" | undefined;
    icon?: string | undefined;
    image1?: string | undefined;
    image2?: string | undefined;
    image3?: string | undefined;
    image4?: string | undefined;
    image5?: string | undefined;
    description0?: string | undefined;
    description1?: string | undefined;
    description2?: string | undefined;
    description3?: string | undefined;
    description4?: string | undefined;
    description5?: string | undefined;
    description6?: string | undefined;
    parentSectionId?: number | undefined;
    menuItemId?: number | undefined;
  },
  {
    title?: string | undefined;
    subTitle?: string | undefined;
    description?: string | undefined;
    sectionType?: "IMAGE" | "PARAGRAPH" | "HEADING" | "VIDEO" | "LINK" | undefined;
    icon?: string | undefined;
    image1?: string | undefined;
    image2?: string | undefined;
    image3?: string | undefined;
    image4?: string | undefined;
    image5?: string | undefined;
    description0?: string | undefined;
    description1?: string | undefined;
    description2?: string | undefined;
    description3?: string | undefined;
    description4?: string | undefined;
    description5?: string | undefined;
    description6?: string | undefined;
    parentSectionId?: number | undefined;
    menuItemId?: number | undefined;
  }
>;
