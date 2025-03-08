import { z } from "zod";
export declare const cmsValidation: z.ZodObject<
  {
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    href: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
  },
  "strip",
  z.ZodTypeAny,
  {
    title: string;
    description?: string | undefined;
    href?: string | undefined;
    image?: string | undefined;
  },
  {
    title: string;
    description?: string | undefined;
    href?: string | undefined;
    image?: string | undefined;
  }
>;
