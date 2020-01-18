import NewsService from "../services/newsService";
import * as HttpStatus from "http-status";
import Helper from "../infra/helper";
import * as path from 'path';
const env: string = process.env.NODE_ENV || 'development';
let config = require(path.resolve(`${__dirname}./../config/config.json`))[env];
import * as redis from "redis";
import * as ExportFiles from "../infra/exportFiles"


class NewsController {

  async exportToCsv(req, res) {
    let client = redis.createClient(config.redis_port,config.redis_url)
    try {
      let response = await NewsService.get();
      let fileName = await ExportFiles.default.tocsv(response);
      client.set("exports", JSON.stringify(response))
      Helper.sendResponse(res, HttpStatus.OK, req.get('host') + "/exports/" + fileName);
    } catch (error) {
      console.error(error);
    }
  }
  
  async get(req, res) {
    let client = redis.createClient(config.redis_port,config.redis_url)
    client.get("news", await function(err, reply) {
      if (reply) {
        Helper.sendResponse(res, HttpStatus.OK, JSON.parse(reply))        
      } else {
         NewsService.get()
        .then(news => { 
          client.set("news", JSON.stringify(news))
          Helper.sendResponse(res, HttpStatus.OK, news) })
        .catch(error => console.error.bind(console, `Error ${error}`));
      }
    });
  }

  async getById(req, res) {
    const _id = req.params.id;
    await NewsService.getById(_id)
      .then(news => Helper.sendResponse(res, HttpStatus.OK, news))
      .catch(error => console.error.bind(console, `Error ${error}`));
  }

  async getByIdEmail(req, res) {
    await NewsService.getByIdEmail(req.params.id, req.params.email)
      .then(news => Helper.sendResponse(res, HttpStatus.OK, news))
      .catch(error => console.error.bind(console, `Error ${error}`));
  }

  async create(req, res) {
    let vm = req.body;
    await NewsService.create(vm)
      .then(news =>
        Helper.sendResponse(
          res,
          HttpStatus.OK,
          "Noticia cadastrada com sucesso!"
        )
      )
      .catch(error => console.error.bind(console, `Error ${error}`));
  }

  async update(req, res) {
    const _id = req.params.id;
    let news = req.body;
    await NewsService.update(_id, news)
      .then(news =>
        Helper.sendResponse(
          res,
          HttpStatus.OK,
          "Notícia foi atualiza com sucesso!"
        )
      )
      .catch(error => console.error.bind(console, `Error ${error}`));
  }

  async delete(req, res) {
    const _id = req.params.id;
    await NewsService.delete(_id)
      .then(() =>
        Helper.sendResponse(res, HttpStatus.OK, "Noticia deletada com sucesso!")
      )
      .catch(error => console.error.bind(console, `Error ${error}`));
  }
}

export default new NewsController();
