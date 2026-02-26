 import React from 'react';

const UserListItem = ({ user, isSelected, isOnline, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center space-x-3 p-3 cursor-pointer hover:bg-gray-50 transition-colors
        ${isSelected ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}
    >
      <div className="relative">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold">
          {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
        </div>
        {isOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate">{user?.name || 'Unknown'}</p>
        <p className="text-sm text-gray-500 truncate">{user?.email || ''}</p>
      </div>
    </div>
  );
};

export default UserListItem;