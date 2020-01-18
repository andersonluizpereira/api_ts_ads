import userService from "../services/userService";
import * as HttpStatus from "http-status";

import Helper from "../infra/helper";

class UserController {
  
  async update(req, res) {
    const _id = req.params.id;
    let user = req.body;
    await userService.update(_id, user)
      .then(user =>
        Helper.sendResponse(
          res,
          HttpStatus.OK,
          "Usuário foi atualizado com sucesso!"
        )
      )
      .catch(error => console.error.bind(console, `Error ${error}`));
  }

  async delete(req, res) {
    const _id = req.params.id;
    await userService.delete(_id)
      .then(() =>
        Helper.sendResponse(res, HttpStatus.OK, "Usuario deletada com sucesso!")
      )
      .catch(error => console.error.bind(console, `Error ${error}`));
  }
}

export default new UserController();
