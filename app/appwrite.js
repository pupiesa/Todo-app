import { Client, Account , Databases } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67bab98d00327ed1af1b");

export const databases = new Databases(client)

export const account = new Account(client);
export { ID } from "appwrite";
