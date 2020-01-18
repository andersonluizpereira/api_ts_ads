import * as mongoose from "mongoose";
import {isEmail} from "validator";

const ImageSchema = new mongoose.Schema({
  thumbnail: { type: String },
  email: { 
          type: String,
            validate: {
            validator: isEmail
          }
      }
},
{toJSON:{
    virtuals: true,
}}
);
ImageSchema.virtual('thumbnail_url').get(function(){
  return `http://${process.env.host}:${process.env.port}/files/${this.thumbnail}`
})
export default ImageSchema;