import ImageService from "../services/imageService";
import * as HttpStatus from "http-status";

import Helper from "../infra/helper";

class ImageController {
  
  get(req, res) {
    ImageService.get()
      .then(image => Helper.sendResponse(res, HttpStatus.OK, image))
      .catch(error => console.error.bind(console, `Error ${error}`));
  }

  getById(req, res) {
    const _id = req.params.id;

    ImageService.getById(_id)
      .then(image => Helper.sendResponse(res, HttpStatus.OK, image))
      .catch(error => console.error.bind(console, `Error ${error}`));
  }

  getByIdEmail(req, res) {
    ImageService.getByIdEmail(req.params.id, req.params.email)
      .then(image => Helper.sendResponse(res, HttpStatus.OK, image))
      .catch(error => console.error.bind(console, `Error ${error}`));
  }

  create(req, res) {
    let vm = req.body;

    ImageService.create(vm)
      .then(image =>
        Helper.sendResponse(
          res,
          HttpStatus.OK,
          "Image cadastrada com sucesso!"
        )
      )
      .catch(error => console.error.bind(console, `Error ${error}`));
  }

  update(req, res) {
    const _id = req.params.id;
    let image = req.body;

    ImageService.update(_id, image)
      .then(image =>
        Helper.sendResponse(
          res,
          HttpStatus.OK,
          "Image foi atualiza com sucesso!"
        )
      )
      .catch(error => console.error.bind(console, `Error ${error}`));
  }

  delete(req, res) {
    const _id = req.params.id;

    ImageService.delete(_id)
      .then(() =>
        Helper.sendResponse(res, HttpStatus.OK, "Image deletada com sucesso!")
      )
      .catch(error => console.error.bind(console, `Error ${error}`));
  }
}

export default new ImageController();
