import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserList from '../components/Sidebar/UserList';
import ChatWindow from '../components/Chat/ChatWindow';
import MessageInput from '../components/Chat/MessageInput';
import { useAuth } from '../hooks/useAuth';
import { useRealtime } from '../hooks/useRealtime';
import { fetchMessages, sendMessage, clearMessages } from '../store/chatSlice';
//import { messagesService } from '../services/messages';
import toast from 'react-hot-toast';

const Chat = () => {
  const dispatch = useDispatch();
  const { messages, selectedUser } = useSelector((state) => state.chat);
  const { user } = useAuth();
  useRealtime(user, selectedUser);

  // Fetch messages when selected user changes
  useEffect(() => {
    if (user && selectedUser) {
      dispatch(fetchMessages({ userId1: user.$id, userId2: selectedUser.$id }));
    } else {
      dispatch(clearMessages());
    }
  }, [user, selectedUser, dispatch]);

  const handleSendMessage = async (messageData) => {
    try {
      await dispatch(sendMessage(messageData)).unwrap();
    } catch (error) {
      toast.error('Failed to send message', error);
    }
  };

  const handleTyping = (isTyping) => {
    // Implement typing indicator logic here
    // You would typically emit this through a real-time channel
    console.log('Typing:', isTyping);
  };

  return (
    <div className="h-screen flex">
      <UserList />

      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <div className="bg-white border-b px-6 py-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  {selectedUser.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="font-semibold">{selectedUser.name}</h2>
                  <p className="text-sm text-gray-500">{selectedUser.email}</p>
                </div>
              </div>
            </div>

            <ChatWindow messages={messages} currentUser={user} />

            <MessageInput
              onSendMessage={handleSendMessage}
              onTyping={handleTyping}
              currentUser={user}
              selectedUser={selectedUser}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h3 className="text-xl text-gray-500 mb-2">Welcome to ChatApp!</h3>
              <p className="text-gray-400">Select a user from the sidebar to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;