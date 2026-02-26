
const env = import.meta.env || {};

const conf = {
    // support alternate env names when users set different keys
    appwriteUrl: String(env.VITE_APPWRITE_ENDPOINT || env.VITE_APPWRITE_URL || ''), // APPWRITE SERVER URL
    appwriteProjectId: String(env.VITE_APPWRITE_PROJECT_ID || ''), // PROJECT ID
    appwriteDatabaseId: String(env.VITE_APPWRITE_DATABASE_ID || ''), // DATABASE ID
    // Collection id may be named VITE_APPWRITE_COLLECTION_ID or VITE_APPWRITE_TABLE_ID
    appwriteCollectionId: String(env.VITE_APPWRITE_COLLECTION_ID || env.VITE_APPWRITE_TABLE_ID || ''), // MESSAGES COLLECTION ID
    // Optional users collection id for listing users
    appwriteUsersCollectionId: String(env.VITE_APPWRITE_USERS_COLLECTION_ID || env.VITE_APPWRITE_USERS_COLLECTION || ''),
    appwriteBucketId: String(env.VITE_APPWRITE_STORAGE_BUCKET_ID || ''), // BUCKET ID
};

if (!conf.appwriteCollectionId) {
    // helpful console hint during development
    // eslint-disable-next-line no-console
    console.warn('Appwrite messages collection ID is not configured. Set VITE_APPWRITE_COLLECTION_ID or VITE_APPWRITE_TABLE_ID in .env');
}

export default conf;
