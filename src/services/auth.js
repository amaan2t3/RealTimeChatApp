import { account, databases, DATABASE_ID, ID, Query } from './appwrite';
import conf from '../conf/conf';

export const authService = {
  // Register new user
  async register(email, password, name) {
    try {
      const user = await account.create(ID.unique(), email, password, name);
      if (user) {
        // Check if there's an active session before logging in
        try {
          await account.get();
          // Session exists, delete it first
          await account.deleteSession('current');
        } catch {
          // No active session, proceed
        }
        await this.login(email, password);

        // Sync user to database collection for listing
        if (conf.appwriteUsersCollectionId) {
          try {
            await databases.createDocument(
              DATABASE_ID,
              conf.appwriteUsersCollectionId,
              user.$id, // Use the user's ID from Appwrite Account
              {
                name: name,
                email: email,
                userId: user.$id
              }
            );
          } catch (dbError) {
            console.error("Failed to sync user to database:", dbError);
            // We don't throw here to allow registration to succeed even if sync fails
          }
        }
      }
      return user;
    } catch (error) {
      console.log("user register error:", error);
      throw error;
    }
  },

  // Login user
  async login(email, password) {
    try {
      // Check if there's an active session
      try {
        await account.get();
        // Session exists, delete it first
        await account.deleteSession('current');
      } catch {
        // No active session, proceed
      }
      return await account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("user login error:", error);
      throw error;
    }
  },

  // Logout user
  async logout() {
    try {
      return await account.deleteSession('current');
    } catch (error) {
      console.log("user login error:", error);
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      return await account.get();
    } catch (error) {
      console.log("user login error:", error);

      return null;
    }
  },

  // Get all users (you'll need to create a users collection or use Appwrite Users API)
  async getAllUsers() {
    // Note: This requires Appwrite Users API which needs admin access
    // For demo purposes, we'll store users in a separate collection or use a workaround
    // This is a simplified version
    try {
      const currentUser = await this.getCurrentUser();
      if (!currentUser) return [];

      if (conf.appwriteUsersCollectionId) {
        try {
          console.log("Fetching users from:", DATABASE_ID, conf.appwriteUsersCollectionId);
          const res = await databases.listRows(
            {
              databaseId: conf.appwriteDatabaseId,
              collectionId: conf.appwriteUsersCollectionId
            },
            [Query.notEqual('userId', currentUser.$id)]
          );
          console.log("Users fetched:", res.documents);
          return res.documents || [];
        } catch (err) {
          console.error("Failed to fetch all users:", err);
          return [];
        }
      }
      return [];
    } catch (error) {
      console.log("user login error:", error);
    }
  }
};