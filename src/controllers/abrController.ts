import { Request, Response } from "express";
import { HttpResponses } from "../modules/model";
import { IAbr, IGetParams } from "../modules/types";
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

  public get_records(req: Request, res: Response) {
    const getParams: IGetParams = {
      ...req.body,
    };

    this.abr_service.getAllRecords(getParams, (err: any, records: IAbr[]) => {
      if (err) {
        res.status(HttpResponses.internalServerError.statusCode).json({
          status: "Internal Server Error",
          error: { ...err },
          message: HttpResponses.internalServerError.message,
        });
      } else {
        if (records.length === 0) {
          res.status(HttpResponses.noContent.statusCode).json({
            status: "No such Records exist",
            data: [],
            message: HttpResponses.noContent.message,
          });
        } else {
          res.status(HttpResponses.ok.statusCode).json({
            status: "Records found",
            data: records,
            message: HttpResponses.ok.message,
          });
        }
      }
    });
  }
}
