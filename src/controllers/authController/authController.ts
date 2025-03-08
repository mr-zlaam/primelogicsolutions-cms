import type { User } from "@prisma/client";
import { asyncHandler } from "../../utils/asyncHandlerUtils.js";
import { db } from "../../databases/database.js";
import { setTokensAndCookies } from "../../utils/payloadGeneratorsUtils.js";
import { httpResponse } from "../../utils/apiResponseUtils.js";
import reshttp from "reshttp";
import { passwordHasher, verifyPassword } from "../../utils/passwordHasherUtils.js";
import { throwError } from "../../utils/throwErrorUtils.js";
import variables from "../../constants/variables.js";

export default {
  login: asyncHandler(async (req, res) => {
    const userBody = req.body as User;
    if (!userBody.username || !userBody.password) throwError(reshttp.badRequestCode, reshttp.badGatewayMessage);
    const user = await db.user.findUnique({ where: { username: userBody.username } });
    if (user) {
      const isPasswordCorrect = await verifyPassword(userBody.password, user.password, res);
      if (!isPasswordCorrect) throwError(reshttp.badRequestCode, reshttp.badRequestMessage);
      const { accessToken } = setTokensAndCookies(user, res);
      httpResponse(req, res, reshttp.okCode, `${user.username} logged in successfully`, { accessToken });
    }
    throwError(reshttp.badRequestCode, "Please createn an account first");
  }),
  createMod: asyncHandler(async (req, res) => {
    const userBody = req.body as User;
    const hashedPassword = (await passwordHasher(userBody.password, res)) as string;
    const createdUser = await db.user.create({ data: { ...userBody, password: hashedPassword, role: "MOD" } });
    const { accessToken } = setTokensAndCookies(createdUser, res);
    httpResponse(req, res, reshttp.okCode, `${createdUser.username} created accountn successfully`, { accessToken });
  }),
  createAdmin: asyncHandler(async (req, res) => {
    const userBody = req.body as User;
    const user = await db.user.findFirst({ where: { OR: [{ username: userBody.username }, { email: userBody.email }] } });
    if (user) throwError(reshttp.conflictCode, reshttp.conflictMessage);
    const canUserHaveAccount = variables.EMAILS.WHITE_LIST_EMAILS.includes(userBody.email);
    if (!canUserHaveAccount) throwError(reshttp.forbiddenCode, "User can't create any account");
    const hashedPassword = (await passwordHasher(userBody.password, res)) as string;
    const createdUser = await db.user.create({ data: { ...userBody, password: hashedPassword, role: "ADMIN" } });
    await db.isAdminCreated.create({ data: { status: true } });
    const { accessToken } = setTokensAndCookies(createdUser, res);
    httpResponse(req, res, reshttp.okCode, `${createdUser.username} created accountn successfully`, { accessToken });
  }),
  isAdminCreated: asyncHandler(async (req, res) => {
    const admin = await db.isAdminCreated.findMany({ where: { status: true } });
    if (admin.length === 0) {
      httpResponse(req, res, 418, "admin is not created yet");
    } else {
      httpResponse(req, res, 418, "admin is already created");
    }
  })
};
