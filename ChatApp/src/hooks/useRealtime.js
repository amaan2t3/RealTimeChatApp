import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../store/chatSlice';
import { messagesService } from '../services/messages';
import toast from 'react-hot-toast';

export const useRealtime = (currentUser, selectedUser) => {
  const dispatch = useDispatch();
  const unsubscribeRef = useRef(null);

  useEffect(() => {
    if (!currentUser || !selectedUser) return;

    const handleRealtimeEvent = (response) => {
      const message = response.payload;
      
      // Only add message if it's relevant to current conversation
      if (
        (message.senderId === currentUser.$id && message.receiverId === selectedUser.$id) ||
        (message.senderId === selectedUser.$id && message.receiverId === currentUser.$id)
      ) {
        dispatch(addMessage(message));
        
        // Show notification if message is from other user
        if (message.senderId !== currentUser.$id) {
          toast.success(`New message from ${selectedUser.name}`);
        }
      }
    };

    // Subscribe to real-time messages
    unsubscribeRef.current = messagesService.subscribeToMessages(handleRealtimeEvent);

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [currentUser, selectedUser, dispatch]);

  return unsubscribeRef.current;
};