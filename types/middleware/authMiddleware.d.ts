import type { IPAYLOAD } from "../utils/tokenGeneratorUtils.js";
import type { Request, Response, NextFunction } from "express";
export interface _Request extends Request {
  userFromToken?: IPAYLOAD;
}
declare const _default: {
  checkToken: (req: Request, res: Response, next: NextFunction) => void;
  checkIfUserIsAdmin: (req: _Request, _: Response, next: NextFunction) => void;
  checkIfUserIsModorAdmin: (req: _Request, _: Response, next: NextFunction) => void;
};
export default _default;
