import React from 'react';
import { format } from 'date-fns';
import { File, Image, Download } from 'lucide-react';
import { storageService } from '../../services/storage';

const MessageBubble = ({ message, isOwnMessage, senderName }) => {
  const messageClass = isOwnMessage
    ? 'bg-blue-500 text-white ml-auto'
    : 'bg-white text-gray-800';

  const containerClass = isOwnMessage ? 'justify-end' : 'justify-start';

  const renderFileContent = () => {
    if (!message.fileId) return null;

    const isImage = message.fileType?.startsWith('image/');
    const fileUrl = storageService.getFileView(message.fileId);
    const downloadUrl = storageService.getFileDownload(message.fileId);

    if (isImage) {
      return (
        <div className="mt-2">
          <img
            src={fileUrl}
            alt="Shared image"
            className="max-w-xs rounded-lg cursor-pointer"
            onClick={() => window.open(fileUrl, '_blank')}
          />
        </div>
      );
    }

    return (
      <div className="mt-2 flex items-center space-x-2 bg-gray-100 p-2 rounded">
        <File size={20} />
        <span className="text-sm truncate">{message.fileName || 'File'}</span>
        <a
          href={downloadUrl}
          download
          className="text-blue-500 hover:text-blue-700"
        >
          <Download size={16} />
        </a>
      </div>
    );
  };

  return (
    <div className={`flex ${containerClass} mb-4`}>
      <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${messageClass} rounded-lg px-4 py-2 shadow`}>
        {!isOwnMessage && (
          <p className="text-xs text-gray-600 mb-1">{senderName}</p>
        )}
        {message.message && <p className="text-sm">{message.message}</p>}
        {renderFileContent()}
        <p className="text-xs text-gray-300 mt-1">
          {format(new Date(message.createdAt), 'hh:mm a')}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;