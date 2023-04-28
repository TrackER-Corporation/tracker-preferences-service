import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { preference?: mongoDB.Collection } = {}

export async function connectToDatabase() {
  dotenv.config();

  try {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING!);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const preferenceCollection: mongoDB.Collection = db.collection(process.env.COLLECTION!);

    collections.preference = preferenceCollection;

    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${preferenceCollection.collectionName}`);
  } catch (error) {
    console.error(error);
  }
}