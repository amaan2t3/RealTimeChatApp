import { databases, ID, Query, DATABASE_ID, MESSAGES_COLLECTION_ID } from './appwrite';

export const messagesService = {
  // Send a new message
  async sendMessage(senderId, receiverId, message, fileId = null) {
    try {
      // Validate collection ID
      if (!MESSAGES_COLLECTION_ID || MESSAGES_COLLECTION_ID === 'undefined') {
        console.error('MESSAGES_COLLECTION_ID is not configured properly');
        throw new Error('Collection ID not configured');
      }

      const messageData = {
        senderId,
        receiverId,
        message,
        createdAt: new Date().toISOString(),
      };

      if (fileId) {
        messageData.fileId = fileId;
      }

      return await databases.createDocument(
        DATABASE_ID,
        MESSAGES_COLLECTION_ID,
        ID.unique(),
        messageData
      );
    } catch (error) {
      console.log("Error sending message:", error);
      throw error;
    }
  },

  // Get messages between two users
  async getMessages(userId1, userId2) {
    try {
      // Validate collection ID
      if (!MESSAGES_COLLECTION_ID || MESSAGES_COLLECTION_ID === 'undefined') {
        console.error('MESSAGES_COLLECTION_ID is not configured properly');
        return [];
      }

      const queries = [
        Query.or([
          Query.and([
            Query.equal('senderId', userId1),
            Query.equal('receiverId', userId2)
          ]),
          Query.and([
            Query.equal('senderId', userId2),
            Query.equal('receiverId', userId1)
          ])
        ]),
        Query.orderAsc('createdAt')
      ];

      const response = await databases.listDocuments(
        DATABASE_ID,
        MESSAGES_COLLECTION_ID,
        queries
      );

      return response.documents || [];
    } catch (error) {
      console.log("Error fetching messages:",error);
      return [];
    }
  },

  // Subscribe to real-time messages
  subscribeToMessages(callback) {
    // This will be implemented in the useRealtime hook
    return databases.client.subscribe(
      `databases.${DATABASE_ID}.collections.${MESSAGES_COLLECTION_ID}.documents`,
      callback
    );
  }
};