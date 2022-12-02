import { CommonRoutes } from "./../routes/common";
// import * as fs from "fs";
// import * as readline from "readline";
// import { transform } from "camaro";
// import { template } from "modules/schema";
import * as express from "express";
import * as bodyParser from "body-parser";
import { AppRoutes } from "../routes/routes";
import * as mongoose from "mongoose";
import env from "env";

// const xml = readline.createInterface({
//   input: fs.createReadStream("./20221123_Public01.xml"),
//   output: process.stdout,
//   terminal: false,
// });
// const writeFile = fs.createWriteStream("./output.json");
// writeFile.on("error", function (err) {
//   console.error(err);
// });

// function transformToTemplate() {
//   writeFile.write("[");
//   xml.on("line", (line) => {
//     if (line.trim().length > 0) {
//       const fullXML = `<?xml version="1.0"?><Transfer error="none" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="BulkExtract.xsd">${line}</Transfer>`;
//       transform(fullXML, template).then((result) => {
//         if (result.length !== 0) {
//           writeFile.write(`${JSON.stringify(result[0])}`);
//         }
//       });
//     }
//   });
// }

// transformToTemplate();

class App {
  public app: express.Application;
  public mongoUrl: string = "mongodb://localhost/" + env.getDBName();

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
  }
  private connectMongoDB(): void {
    mongoose.connect(this.mongoUrl);
  }
}

export default new App().app;
