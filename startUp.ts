import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";

import Database from "./infra/db";

import Auth from "./infra/auth";

import uploads from "./infra/uploads";
import newsRouter from "./router/newsRouter";
import userRouter from "./router/userRouter";

class StartUp {
  public app: express.Application;
  private _db: Database;
  private bodyParser;

  constructor() {
    this.app = express();

    this._db = new Database();
    this._db.createConnection();

    this.middler();
    this.routes();
  }

  enableCors() {
    const options: cors.CorsOptions = {
      methods: "GET,OPTIONS,PUT,POST,DELETE",
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Enconding'],
      origin: "*"
    };

    this.app.use(cors(options));
  }

  middler() {
    this.enableCors();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  routes() {
    this.app.route("/").get((req, res) => {
      res.send({ versao: "0.0.1" });
    });

    this.app.route("/uploads").post(uploads.single("file"), (req, res) => {
      try {
        res.send("Arquivo enviado com sucesso");
      } catch (error) {
        console.log(error);
      }
    });
    this.app.use(Auth.validate);
    //news
    this.app.use("/", newsRouter);
    this.app.use("/", userRouter);
  }
}

export default new StartUp();
