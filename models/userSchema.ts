import * as mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  photo: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  active: { type: Boolean }
});

export default UserSchema;