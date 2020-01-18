import * as express from "express";
import UserController from "../controller/userController";

const userRouter = express.Router();

userRouter.route("/api/v1/user/:id").put(UserController.update);
userRouter.route("/api/v1/user/:id").delete(UserController.delete);

export default userRouter;