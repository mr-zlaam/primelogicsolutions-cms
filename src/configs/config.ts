import process from "node:process";
import DotenvFlow from "dotenv-flow";
type TENV = "development" | "production" | "test";
DotenvFlow.config();
const config = {
  PORT: process.env.PORT || 8001,
  ENV: process.env.NODE_ENV as TENV,
  JWT_SECRET: process.env.SECRET_KEY as string,
  WHITE_LIST_EMAILS: process.env.LOGGED_IN_USERS as string
};
export const { PORT, ENV, JWT_SECRET, WHITE_LIST_EMAILS } = config;
