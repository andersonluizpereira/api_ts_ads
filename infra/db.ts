import * as mongoose from "mongoose";
import * as path from 'path';
const env: string = process.env.NODE_ENV || 'development';
let config = require(path.resolve(`${__dirname}./../config/config.json`))[env];

class Database {
  createConnection() {
    mongoose.connect(config.url);
  }
}

export default Database;
