import * as jwt from "jsonwebtoken";
import Configs from "./configs";
import { JWT_SECRET } from '../utils/utils';

class Auth {
  validate(req, res, next) {
    var token = req.headers["x-access-token"];

    if (token) {
      jwt.verify(token, JWT_SECRET, function(err, decoded) {
        if (err) {
          return res.status(403).send({
            success: false,
            message: "403 - Token Inválido"
          });
        } else {
          next();
        }
      });
    } else {
      return res.status(401).send({
        success: false,
        message: "401 - unauthorized"
      });
    }
  }
}

export default new Auth();
