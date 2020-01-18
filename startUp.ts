import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";

import Database from "./infra/db";

import Auth from "./infra/auth";

import uploads from "./infra/uploads";
import newsRouter from "./router/newsRouter";
import userRouter from "./router/userRouter";
import { generatedToken } from './utils/utils';
import userService from "./services/userService";
import Helper from "./infra/helper";
import * as HttpStatus from "http-status";

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

    this.app.route("/api/generatedtoken").post((req, res) => {
      try {
        userService.login(req.body)
          .then(user => res.send(generatedToken(req.body.email,req.body.name)))
          .catch(error => console.error.bind(console, `Error ${error}`));
      } catch (error) {
        console.log(error);
      }
    });

    this.app.route("/api/v1/user").post((req, res) => {
      try {
        userService.create(req.body)
          .then(user =>

              res.json({
                status: HttpStatus.OK,
                message: "Usuário cadastrado com sucesso!",
                data: req.body
              })
          )
          .catch(error => console.error.bind(console, `Error ${error}`));
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
