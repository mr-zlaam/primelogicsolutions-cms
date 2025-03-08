import reshttp from "reshttp";
import { httpResponse } from "../../utils/apiResponseUtils.js";
import QuickerUtils from "../../utils/quickerUtils.js";
import type { Request, Response } from "express";
class PerformanceController {
  static getPerformance = (req: Request, res: Response) => {
    try {
      const healthData = {
        applicationHealth: QuickerUtils.getApplicationHealth(),
        systemHealth: QuickerUtils.getSystemHealth()
      };
      httpResponse(req, res, reshttp.okCode, reshttp.okMessage, healthData);
    } catch (error) {
      if (error instanceof Error) {
        throw {
          status: reshttp.internalServerErrorCode,
          message: error.message || reshttp.internalServerErrorMessage
        };
      }
    }
  };
}

export default PerformanceController;
