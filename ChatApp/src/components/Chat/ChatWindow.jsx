import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import MessageBubble from './MessageBubble';
import { format } from 'date-fns';

const ChatWindow = ({ messages, currentUser }) => {
  const messagesEndRef = useRef(null);
  const { selectedUser } = useSelector((state) => state.chat);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select a user to start chatting</p>
      </div>
    );
  }

  const groupMessagesByDate = () => {
    const groups = {};
    // Handle undefined or null messages
    if (!messages || !Array.isArray(messages)) {
      return groups;
    }
    messages.forEach((message) => {
      const date = format(new Date(message.createdAt), 'MMMM ,d, yyyy');
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    return groups;
  };

  const messageGroups = groupMessagesByDate();

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      {Object.entries(messageGroups).map(([date, msgs]) => (
        <div key={date}>
          <div className="text-center my-4">
            <span className="bg-gray-300 text-gray-700 px-3 py-1 rounded-full text-sm">
              {date}
            </span>
          </div>
          {msgs.map((message, index) => (
            <MessageBubble
              key={message.$id || index}
              message={message}
              isOwnMessage={message.senderId === currentUser.$id}
              senderName={message.senderId === currentUser.$id ? 'You' : selectedUser.name}
            />
          ))}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWindow;