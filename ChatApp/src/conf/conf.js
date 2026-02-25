
const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_ENDPOINT),/// APPWRITE SERVER URL
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID), //// PROJECT ID
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID), //// DATABASE ID
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_TABLE_ID),  /// TABLE / COLLECTION ID
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_STORAGE_BUCKET_ID), /// BUCKET ID
}
// there was a name issue with the import.meta.env.VITE_APPWRITE_URL, it was later fixed in debugging video

export default conf
