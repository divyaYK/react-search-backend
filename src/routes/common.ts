import { Application, Request, Response } from "express";

export class CommonRoutes {
  public route(app: Application) {
    app.all("*", (req: Request, res: Response) => {
      res.status(200).send({ message: "Welcome!" });
    });
  }
}
