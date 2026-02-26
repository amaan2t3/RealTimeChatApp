 import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { messagesService } from '../services/messages';

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async ({ userId1, userId2 }) => {
    const messages = await messagesService.getMessages(userId1, userId2);
    return messages;
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ senderId, receiverId, message, fileId }) => {
    const newMessage = await messagesService.sendMessage(
      senderId,
      receiverId,
      message,
      fileId
    );
    return newMessage;
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    selectedUser: null,
    users: [],
    onlineUsers: [],
    loading: false,
    error: null,
    typingUsers: [],
  },
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setTypingUsers: (state, action) => {
      state.typingUsers = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload || [];
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.messages = [];
      })
      .addCase(sendMessage.pending, (state) => {
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        if (action.payload) {
          state.messages.push(action.payload);
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const {
  setSelectedUser,
  addMessage,
  setUsers,
  setOnlineUsers,
  setTypingUsers,
  clearMessages,
} = chatSlice.actions;

export default chatSlice.reducer;