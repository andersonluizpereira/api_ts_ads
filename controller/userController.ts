import userService from "../services/userService";
import * as HttpStatus from "http-status";

import Helper from "../infra/helper";

class UserController {
  
  login(req, res) {
    let vm = req.body;

    userService.login(vm)
      .then(user => Helper.sendResponse(res, HttpStatus.OK, user))
      .catch(error => console.error.bind(console, `Error ${error}`));
  }

  create(req, res) {
    let vm = req.body;
    userService.create(vm)
      .then(user =>
        Helper.sendResponse(
          res,
          HttpStatus.OK,
          "Usuario cadastrado com sucesso!"
        )
      )
      .catch(error => console.error.bind(console, `Error ${error}`));
  }

  update(req, res) {
    const _id = req.params.id;
    let user = req.body;

    userService.update(_id, user)
      .then(user =>
        Helper.sendResponse(
          res,
          HttpStatus.OK,
          "Usuário foi atualizado com sucesso!"
        )
      )
      .catch(error => console.error.bind(console, `Error ${error}`));
  }

  delete(req, res) {
    const _id = req.params.id;

    userService.delete(_id)
      .then(() =>
        Helper.sendResponse(res, HttpStatus.OK, "Usuario deletada com sucesso!")
      )
      .catch(error => console.error.bind(console, `Error ${error}`));
  }
}

export default new UserController();
