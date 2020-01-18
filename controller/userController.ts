import userService from "../services/userService";
import * as HttpStatus from "http-status";

import Helper from "../infra/helper";

class UserController {
  
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
