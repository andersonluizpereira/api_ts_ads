import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import uploads from "./infra/uploads";
import imageService from "./services/imageService";
import * as path from "path";
import * as compression from "compression";


import Database from "./infra/db";

import Auth from "./infra/auth";

import newsRouter from "./router/newsRouter";
import userRouter from "./router/userRouter";
import imageRouter from "./router/imageRouter";
import { generatedToken } from './utils/utils';
import userService from "./services/userService";
import Helper from "./infra/helper";
import * as HttpStatus from "http-status";
import ConfigEnvironment from "./config/configEnvironment"

class StartUp {
  public app: express.Application;
  private _db: Database;
  private bodyParser;

  constructor() {
    this.app = express();

    this._db = new Database();
    this._db.createConnection();
    this.app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
    this.app.use('/exports', express.static(process.cwd() + '/exports'))
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
    this.app.use(compression());
  }

   routes() {
    this.app.route("/").get((req, res) => {
      res.send({ versao: "0.0.1" });
    });

    this.app.route("/api/generatedtoken").post(async (req, res) => {
      try {
        await userService.login(req.body)
          .then(user => res.send(generatedToken(req.body.email,req.body.name)))
          .catch(error => console.error.bind(console, `Error ${error}`));
      } catch (error) {
        console.log(error);
      }
    });

    this.app.route("/api/v1/user").post(async (req, res) => {  
        try {
          const userSearchIsValid = await userService.hasValidEmail(req.body);
          if(!userSearchIsValid) return res.json({
            status: HttpStatus.BAD_REQUEST,
            message: "Usuário possuí email inválido!",
            data: req.body
          })
          const userSearch = await userService.search(req.body);
          
          if (userSearch.length !==0) return res.json({
            status: HttpStatus.OK,
            message: "Usuário já possuí cadastro!",
            data: req.body
          })
            await userService.create(req.body)
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
    this.app.route("/uploads/:email").post(uploads.single("thumbnail"),async (req, res) => {
      try {
        let url = `http://${ConfigEnvironment.ipAddress}:3050`
        console.log(url)

        let images = {
          thumbnail: `${url}/files/${req.file.originalname}-${path.extname(req.file.originalname)}`,
          email: req.params.email
        }
        await imageService.create(images);
        res.send("Arquivo enviado com sucesso");
      } catch (error) {
        console.log(error);
      }
    });
    //news
    this.app.use("/", newsRouter);
    this.app.use("/", userRouter);
    this.app.use("/", imageRouter);
  }
}

export default new StartUp();
