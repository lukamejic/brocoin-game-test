import mongoose, { connect } from "mongoose";

import { Config } from "./../config/Config";

export function connectionHandling(config: Config) {
  let connection: typeof mongoose;

  async function openConnection(): Promise<typeof mongoose> {
    if(config.MONGODB_USERNAME){
      const connectionString = `mongodb+srv://${config.MONGODB_USERNAME}:${config.MONGODB_PASSWORD}@${config.MONGODB_AT}`;
      return (connection = await connect(connectionString));
    }
    else{
      const connectionString = config.MONGODB_AT;
      return (connection = await connect(connectionString));
    }
  }

  async function closeConnection() {
    return await connection.disconnect();
  }

  return {
    openConnection,
    closeConnection
  };
}
