import { Client, Account, Databases, Storage, ID, Query } from 'appwrite';
import conf from '../conf/conf'

const client = new Client()
  .setEndpoint(conf.appwriteURL)
  .setProject(conf.appwriteProjectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID, Query };

export const DATABASE_ID = conf.appwriteDatabaseId;
export const MESSAGES_COLLECTION_ID = conf.appwriteTableId;
export const STORAGE_BUCKET_ID = conf.appwriteBucketId;

export default client;