import mongoose from "mongoose";
import { CONSTS } from "./constants";

export class DbConnection {
  public static async initConnection() {
    process.env.DB_CONN_STR = `mongodb://${CONSTS.MONGODB_HOST}:${CONSTS.MONGODB_PORT}/${CONSTS.MONGODB_DATABASE_NAME}`;
    await DbConnection.connect(process.env.DB_CONN_STR);
  }

  public static async connect(connStr: string) {
    return mongoose
      .connect(connStr, {
        user: CONSTS.MONGODB_USER,
        pass: CONSTS.MONGODB_PASSWORD,
      })
      .then(() => {
        console.log(`Successfully connected to ${connStr}`);
      })
      .catch((error) => {
        console.error("Error connecting to database: ", error);
        return process.exit(1);
      });
  }

  public static setAutoReconnect() {
    mongoose.connection.on("disconnected", () =>
      DbConnection.connect(process.env.DB_CONN_STR!),
    );
  }

  public static async disconnect() {
    await mongoose.connection.close();
  }
}
