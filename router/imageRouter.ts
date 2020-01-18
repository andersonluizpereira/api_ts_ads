import * as express from "express";
import ImageController from "../controller/imageController";
import uploads from "../infra/uploads";
const imageRouter = express.Router();

imageRouter.route("/api/v1/image").get(ImageController.get);
imageRouter.route("/api/v1/image/:id").get(ImageController.getById);
imageRouter.route("/api/v1/image/:id/:email").get(ImageController.getByIdEmail);
imageRouter.route("/api/v1/image/:email").post(uploads.single("thumbnail"),ImageController.create);
imageRouter.route("/api/v1/image/:id").put(ImageController.update);
imageRouter.route("/api/v1/image/:id").delete(ImageController.delete);

export default imageRouter;