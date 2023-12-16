import { Sequelize } from "sequelize";
import { errors } from "../utils/errorDictionary.js";
import { config } from "./config.js";

export class Database {
  static instanceDatabase;

  static getInstanceDatabase(database = Sequelize) {
    if (!this.instanceDatabase) {
      this.instanceDatabase = new database(config.mongo_uri);
    }

    return this.instanceDatabase;
  }

  static async databaseConnection() {
    try {
      await this.getInstanceDatabase().authenticate();
      //await this.getInstanceDatabase().sync({alter:true});
      console.log("Conectado a la base de datos satisfactoriamente");
    } catch (error) {
      throw new errors.DATABASE_CONNECTION_FAILED(error.message);
    }
  }
}
