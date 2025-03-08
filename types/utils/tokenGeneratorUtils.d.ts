import type { Response } from "express";
export interface IPAYLOAD {
  id: string;
  username: string;
  role: "ADMIN" | "MOD";
  isBlocked: boolean;
}
declare const _default: {
  generateAccessToken: (payload: IPAYLOAD, res: Response) => string | Response;
  generateLocationToken: (payload: object, res: Response) => string | Response;
  verifyToken: <T>(token: string, secret?: string) => [Error | null, T | null];
};
export default _default;
