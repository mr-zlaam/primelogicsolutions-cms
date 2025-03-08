import { z } from "zod";

export const cmsValidation = z.object({
  title: z.string({ message: "title should be string" }).min(3, "title required atleast 3 characters"),
  description: z.string({ message: "description is required" }).min(20, "description required atleast 20 characters").optional(),
  href: z.string({ message: "href should be a string" }).min(1, "href required atleast 3 characters").optional(),
  image: z
    .string({ message: "image should be a string" })
    .url("image should be in url format")
    .min(1, "href required atleast 3 characters")
    .optional()
});
