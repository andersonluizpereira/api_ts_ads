import * as mongoose from "mongoose";
import {isEmail} from "validator";

const NewsSchema = new mongoose.Schema({
  hat: { type: String },
  title: { type: String },
  text: { type: String },
  author: { type: String },
  img: { type: String },
  publishDate: { type: Date },
  link: { type: String },
  active: { type: Boolean },
  email: { 
          type: String,
          validate: {
            validator: isEmail
          }
      }
});

export default NewsSchema;