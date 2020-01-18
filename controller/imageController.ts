import ImageService from "../services/imageService";
import * as HttpStatus from "http-status";

import Helper from "../infra/helper";
import * as path from 'path';
const env: string = process.env.NODE_ENV || 'development';
let config = require(path.resolve(`${__dirname}./../config/config.json`))[env];
import * as redis from "redis";

class ImageController {
  
  async get(req, res) {
    let client = redis.createClient(config.redis_port,config.redis_url)

    client.get("image", await function(err, reply) {
      if (reply) {
        Helper.sendResponse(res, HttpStatus.OK, JSON.parse(reply))        
      } else {
        ImageService.get()
        .then(image => { 
          client.set("image", JSON.stringify(image))
          Helper.sendResponse(res, HttpStatus.OK, image) })
        .catch(error => console.error.bind(console, `Error ${error}`));
      }
    });
  }

  async getById(req, res) {
    const _id = req.params.id;

    await ImageService.getById(_id)
      .then(image => Helper.sendResponse(res, HttpStatus.OK, image))
      .catch(error => console.error.bind(console, `Error ${error}`));
  }

  async getByIdEmail(req, res) {
    await ImageService.getByIdEmail(req.params.id, req.params.email)
      .then(image => Helper.sendResponse(res, HttpStatus.OK, image))
      .catch(error => console.error.bind(console, `Error ${error}`));
  }

  async create(req, res) {
    let vm = req.body;

    await ImageService.create(vm)
      .then(image =>
        Helper.sendResponse(
          res,
          HttpStatus.OK,
          "Image cadastrada com sucesso!"
        )
      )
      .catch(error => console.error.bind(console, `Error ${error}`));
  }

  async update(req, res) {
    const _id = req.params.id;
    let image = req.body;

    await ImageService.update(_id, image)
      .then(image =>
        Helper.sendResponse(
          res,
          HttpStatus.OK,
          "Image foi atualiza com sucesso!"
        )
      )
      .catch(error => console.error.bind(console, `Error ${error}`));
  }

  async delete(req, res) {
    const _id = req.params.id;

    await ImageService.delete(_id)
      .then(() =>
        Helper.sendResponse(res, HttpStatus.OK, "Image deletada com sucesso!")
      )
      .catch(error => console.error.bind(console, `Error ${error}`));
  }
}

export default new ImageController();
