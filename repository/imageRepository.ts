import * as mongoose from "mongoose";
import ImageSchema from "../models/imageSchema";

export default mongoose.model("image", ImageSchema);
