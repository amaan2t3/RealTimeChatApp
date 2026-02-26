 import React, { useState } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
import toast from 'react-hot-toast';
import FileUpload from './FileUpload';
 

const MessageInput = ({ onSendMessage, onTyping, currentUser, selectedUser }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleSend = async (fileId = null, fileType = null, fileName = null) => {
    if (!currentUser || !currentUser.$id) {
      toast?.error?.('You must be logged in to send messages');
      return;
    }

    if (!selectedUser || !selectedUser.$id) {
      toast?.error?.('Select a user to send message');
      return;
    }

    if (message.trim() || fileId) {
      await onSendMessage({
        senderId: currentUser.$id,
        receiverId: selectedUser.$id,
        message: message.trim(),
        fileId,
        fileType,
        fileName,
      });
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTyping = () => {
    if (onTyping) {
      onTyping(true);
      
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      
      setTypingTimeout(
        setTimeout(() => {
          onTyping(false);
        }, 1000)
      );
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  // const handleFileSelect = async (file) => {
  //   setShowFileUpload(false);
  //   // File upload is handled in FileUpload component
  // };

  return (
    <div className="border-t bg-white p-4">
      {showFileUpload && (
        <FileUpload
          onUploadComplete={(fileId, fileType, fileName) => 
            handleSend(fileId, fileType, fileName)
          }
          onClose={() => setShowFileUpload(false)}
        />
      )}
      
      <div className="flex items-end space-x-2">
        <div className="flex-1 bg-gray-100 rounded-lg">
          <textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              handleTyping();
            }}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="w-full bg-transparent px-4 py-2 focus:outline-none resize-none"
            rows="1"
            style={{ maxHeight: '120px' }}
          />
          
          <div className="flex items-center justify-between px-2 pb-1">
            <div className="flex space-x-1">
              <button
                onClick={() => setShowFileUpload(true)}
                className="p-1 hover:bg-gray-200 rounded"
                title="Attach file"
              >
                <Paperclip size={18} className="text-gray-500" />
              </button>
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-1 hover:bg-gray-200 rounded"
                title="Add emoji"
              >
                <Smile size={18} className="text-gray-500" />
              </button>
            </div>
            
            {showEmojiPicker && (
              <div className="absolute bottom-16 left-4">
                <EmojiPicker onSelect={handleEmojiSelect} />
              </div>
            )}
          </div>
        </div>
        
        <button
          onClick={handleSend}
          disabled={!message.trim() && !showFileUpload}
          className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;