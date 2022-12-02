import { Application, Request, Response } from "express";

export class AppRoutes {
  public route(app: Application) {
    app.get("/api/test", (req: Request, res: Response) => {
      res.status(200).json({ message: "Running well" });
    });
  }
}
