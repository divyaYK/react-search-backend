import { Request, Response } from "express";
import { HttpResponses } from "../modules/model";
import { IAbr } from "../modules/types";
import ABRService from "../service/abr";

export class AbrController {
  private abr_service: ABRService = new ABRService();
  public create_record(req: Request, res: Response) {
    const abrParams: IAbr = {
      ...req.body,
    };

    this.abr_service.createRecord(abrParams, (err: any, record: any) => {
      if (err) {
        res.status(HttpResponses.internalServerError.statusCode).json({
          status: "Internal Server Error",
          error: { ...err },
          message: HttpResponses.internalServerError.message,
        });
      } else {
        res.status(HttpResponses.created.statusCode).json({
          status: "Record created successfully",
          data: record,
          message: HttpResponses.created.message,
        });
      }
    });
  }
}
