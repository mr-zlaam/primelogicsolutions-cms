import type { ICOOKIEOPTIONS } from "../types/types.js";
import type cors from "cors";
declare const _default: {
  COMPANY_NAME: string;
  DEFAULT_ENDPOINT: string;
  EMAILS: {
    WHITE_LIST_EMAILS: string[];
  };
  COOKIEOPTIONS: {
    ACESSTOKENCOOKIEOPTIONS: ICOOKIEOPTIONS;
    REFRESHTOKENCOOKIEOPTIONS: ICOOKIEOPTIONS;
  };
  USER_SELECT: {
    SELECT: {
      userID: boolean;
      username: boolean;
      fullName: boolean;
      email: boolean;
      role: boolean;
      isVerified: boolean;
      tokenVersion: boolean;
      createdAt: boolean;
    };
  };
};
export default _default;
export declare const corsOptions: cors.CorsOptions;
