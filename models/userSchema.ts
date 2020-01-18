import * as mongoose from "mongoose";
import {isEmail} from "validator";

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { 
    type: String, 
    unique: true,
    required: true,
    validate: {
      validator: isEmail
    }
  },
  password: { type: String },
  photo: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  active: { type: Boolean }
});

export default UserSchema;