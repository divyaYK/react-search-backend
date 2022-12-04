import { AbrController } from "../controllers/abrController";
import { Application, Request, Response } from "express";

export class AppRoutes {
  private abr_controller: AbrController = new AbrController();
  public route(app: Application) {
    app.post("/api/abr", (req: Request, res: Response) => {
      this.abr_controller.create_record(req, res);
    });
  }
}
