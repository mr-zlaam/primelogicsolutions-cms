import reshttp from "reshttp";
import { asyncHandler } from "../utils/asyncHandlerUtils.js";
import logger from "../utils/loggerUtils.js";
import type { IPAYLOAD } from "../utils/tokenGeneratorUtils.js";
import type { Request, Response, NextFunction } from "express";
import tokenGeneratorUtils from "../utils/tokenGeneratorUtils.js";
import { db } from "../databases/database.js";
import { throwError } from "../utils/throwErrorUtils.js";
export interface _Request extends Request {
  userFromToken?: IPAYLOAD;
}
export default {
  checkToken: asyncHandler(async (req: _Request, _: Response, next: NextFunction) => {
    const accessToken = req.header("Authorization");
    if (!accessToken) {
      logger.info("No access token found");
      throw { status: reshttp.unauthorizedCode, message: reshttp.unauthorizedMessage };
    }
    const parsedToken = accessToken?.split("Bearer ")[1] || "";
    if (!parsedToken) {
      logger.error("Invalid access token. It seems Bearer is not attached with the Token or maybe check the spelling of Bearer", { parsedToken });
      throw { status: reshttp.unauthorizedCode, message: reshttp.unauthorizedMessage };
    }
    const [error, decoded] = tokenGeneratorUtils.verifyToken<IPAYLOAD>(parsedToken);
    if (error) {
      logger.error("Error while verifying token");
      throw { status: reshttp.unauthorizedCode, message: reshttp.unauthorizedMessage };
    }
    if (!decoded?.id) {
      logger.warn("Invalid token. Not userid found in accessToken");
      throw { status: reshttp.unauthorizedCode, message: reshttp.unauthorizedMessage };
    }

    req.userFromToken = decoded;
    const user = await db.user.findUnique({ where: { id: decoded.id } });
    if (!user) throwError(reshttp.badRequestCode, "unauthenticated user");
    return next();
  }),
  checkIfUserIsAdmin: (req: _Request, _: Response, next: NextFunction) => {
    if (req.userFromToken?.role !== "ADMIN") {
      logger.info("Since User is not  Admin He/She can't perform this operation");
      throw { status: reshttp.forbiddenCode, message: reshttp.forbiddenMessage };
    }
    return next();
  },
  checkIfUserIsModorAdmin: (req: _Request, _: Response, next: NextFunction) => {
    if (req.userFromToken?.role !== "ADMIN" && req.userFromToken?.role !== "MOD") {
      logger.info("Since User is not  Admin He/She can't perform this operation");
      throw { status: reshttp.forbiddenCode, message: reshttp.forbiddenMessage };
    }
    return next();
  }
};
