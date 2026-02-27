// VITE_APPWRITE_URL=https://fra.cloud.appwrite.io/v1

// VITE_APPWRITE_PROJECT_ID=699d70360026a37c77e9

// VITE_APPWRITE_DATABASE_ID=ChatDB

// VITE_APPWRITE_MESSAGES_TABLE_ID=chattabledb

// VITE_APPWRITE_STORAGE_BUCKET_ID=699d733e000694a1325f

const conf = {
    appwriteURL: String(import.meta.env.VITE_APPWRITE_URL || ''),          // Appwrite server URL
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID || ''),  // Project ID
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID || ''), // Database ID
    appwriteTableId: String(import.meta.env.VITE_APPWRITE_MESSAGES_TABLE_ID || ''),       // Table/Collection ID
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_STORAGE_BUCKET_ID || ''),     // Bucket ID
    appwriteUsersCollectionId: String(import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID || ''), // Users Collection ID
};

export default conf;
