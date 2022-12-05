import { CommonRoutes } from "./../routes/common";
import * as express from "express";
import * as bodyParser from "body-parser";
import { AppRoutes } from "../routes/routes";
import * as mongoose from "mongoose";
import env from "../env";
import * as dotenv from "dotenv";
import * as cors from "cors";

dotenv.config();

class App {
  public app: express.Application;
  public mongoUrl: string = `mongodb+srv://divyaYK:${
    process.env.MONGODB
  }@cluster0.0vpw0ia.mongodb.net/${env.getDBName()}?retryWrites=true&w=majority`;

  private appRoutes: AppRoutes = new AppRoutes();
  private commonRoutes: CommonRoutes = new CommonRoutes();
  constructor() {
    this.app = express();
    this.config();
    this.connectMongoDB();
    this.appRoutes.route(this.app);
    this.commonRoutes.route(this.app);
  }
  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());
  }
  private connectMongoDB(): void {
    mongoose.connect(this.mongoUrl);
  }
}

export default new App().app;
