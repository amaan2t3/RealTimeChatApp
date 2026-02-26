import { storage, ID, STORAGE_BUCKET_ID } from './appwrite';

export const storageService = {
  // Upload file
  async uploadFile(file) {
    try {
      const response = await storage.createFile(
        STORAGE_BUCKET_ID,
        ID.unique(),
        file
      );
      return response.$id;
    } catch (error) {
        console.log("upload file error:" ,error);
        
    }
  },

  // Get file preview URL
  getFilePreview(fileId) {
    return storage.getFilePreview(STORAGE_BUCKET_ID, fileId);
  },

  // Get file download URL
  getFileDownload(fileId) {
    return storage.getFileDownload(STORAGE_BUCKET_ID, fileId);
  },

  // Get file view URL
  getFileView(fileId) {
    return storage.getFileView(STORAGE_BUCKET_ID, fileId);
  },

  // Delete file
  async deleteFile(fileId) {
    try {
      return await storage.deleteFile(STORAGE_BUCKET_ID, fileId);
    } catch (error) {
        console.log("upload file error:" ,error);
    }
  }
};