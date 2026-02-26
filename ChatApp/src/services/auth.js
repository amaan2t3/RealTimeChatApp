import { account, ID } from './appwrite';

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
        } catch (err) {
          // No active session, proceed
        }
        await this.login(email, password);
      }
      return user;
    } catch (error) {
      console.log("user register error:",error);
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
      } catch (err) {
        // No active session, proceed
      }
      return await account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("user login error:",error);
      throw error;
    }
  },

  // Logout user
  async logout() {
    try {
      return await account.deleteSession('current');
    } catch (error) {
      console.log("user login error:",error);
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      return await account.get();
    } catch (error) {
              console.log("user login error:",error);

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
      // You would typically query a users collection here
      // For now, returning mock data
      return [];
    } catch (error) {
      console.log("user login error:",error);
    }
  }
};