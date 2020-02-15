import * as mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { 
    type: String,
    trim: true,
    lowercase: true, 
    unique: true,
    required: true
  },
  password: { type: String },
  photo: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  active: { type: Boolean, default: false }
});

export default UserSchema;