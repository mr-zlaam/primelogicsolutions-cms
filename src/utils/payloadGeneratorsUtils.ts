import type { Response } from "express";
import TokenGeneratorUtils, { type IPAYLOAD } from "./tokenGeneratorUtils.js";
import type { User } from "@prisma/client";
import variables from "../constants/variables.js";
export const payloadGenerator = ({ ...rest }: IPAYLOAD): IPAYLOAD => {
  return { ...rest };
};

export function setTokensAndCookies(user: User, res: Response, setAccessToken = true) {
  const payLoad = payloadGenerator({
    id: user.id,
    isBlocked: user.isBlocked,
    username: user.username,
    role: user.role
  });
  let accessToken: string | undefined = undefined;
  if (setAccessToken) {
    accessToken = TokenGeneratorUtils.generateAccessToken(payLoad, res) as string;
    res.cookie("accessToken", accessToken, variables.COOKIEOPTIONS.ACESSTOKENCOOKIEOPTIONS);
  }

  return {
    accessToken: setAccessToken ? accessToken : undefined,
    payLoad
  };
}
