import mongoose from "mongoose";
import config from "./config.js";

const URI = config.mongo_uri;

//config
mongoose.set("strictQuery", true);

//methods
/**
 * Establish connection with database with uri as enviroment variable DATABASE_URI
 * @throws {Error} - If cannot connects with database throws an error.
 */
async function configDB() {
  await mongoose
    .connect(URI)
    .then((res) => {
      console.log("Conectado a DB");
    })
    .catch((err) => {
      throw new Error(`La conexion fallo, ERROR: ${err.message}`);
    });
}

//exports
export default configDB;
