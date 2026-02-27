import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser, setUsers } from '../../store/chatSlice';
import UserListItem from './UserListItem';
import { LogOut, Users } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/auth';
import toast from 'react-hot-toast';

const UserList = () => {
  const dispatch = useDispatch();
  const { user, logout } = useAuth();
  const { users, selectedUser, onlineUsers } = useSelector((state) => state.chat);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, [user]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const fetchedUsers = await authService.getAllUsers();
      dispatch(setUsers(fetchedUsers));
    } catch (error) {
      console.error('Failed to load users', error);
      toast.error('Failed to load users');
      dispatch(setUsers([]));
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelect = (selectedUser) => {
    dispatch(setSelectedUser(selectedUser));
  };

  return (
    <div className="w-80 bg-white border-r flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users size={20} className="text-blue-500" />
            <h2 className="text-lg font-semibold">Chats</h2>
          </div>
          <button
            onClick={logout}
            className="p-2 hover:bg-gray-100 rounded-full"
            title="Logout"
          >
            <LogOut size={18} className="text-gray-600" />
          </button>
        </div>

        {/* Current user info */}
        <div className="mt-3 flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium">{user?.name}</p>
            <p className="text-sm text-green-500">Online</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          (users && users.length > 0) ? (
            users.map((u) => (
              <UserListItem
                key={u.$id}
                user={u}
                isSelected={selectedUser?.$id === u.$id}
                isOnline={Array.isArray(onlineUsers) && onlineUsers.includes(u.$id)}
                onClick={() => handleUserSelect(u)}
              />
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">No users available</div>
          )
        )}
      </div>
    </div>
  );
};

export default UserList;