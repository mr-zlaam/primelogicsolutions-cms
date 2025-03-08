import type { Response } from "express";
import { type IPAYLOAD } from "./tokenGeneratorUtils.js";
import type { User } from "@prisma/client";
export declare const payloadGenerator: ({ ...rest }: IPAYLOAD) => IPAYLOAD;
export declare function setTokensAndCookies(
  user: User,
  res: Response,
  setAccessToken?: boolean
): {
  accessToken: string | undefined;
  payLoad: IPAYLOAD;
};
