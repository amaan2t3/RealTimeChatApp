 import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, File, Image } from 'lucide-react';
import { storageService } from '../../services/storage';
import toast from 'react-hot-toast';

const FileUpload = ({ onUploadComplete, onClose }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }

    setUploading(true);
    try {
      const fileId = await storageService.uploadFile(file);
      onUploadComplete(fileId, file.type, file.name);
      toast.success('File uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload file');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  }, [onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 10485760, // 10MB
    accept: {
      'image/*': [],
      'application/pdf': [],
      'application/msword': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
      'text/plain': [],
    },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Upload File</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {preview ? (
          <div className="mb-4">
            <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded" />
          </div>
        ) : (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto mb-4 text-gray-400" size={48} />
            {isDragActive ? (
              <p className="text-blue-500">Drop the file here...</p>
            ) : (
              <div>
                <p className="text-gray-600 mb-2">Drag & drop a file here, or click to select</p>
                <p className="text-sm text-gray-400">Maximum file size: 10MB</p>
              </div>
            )}
          </div>
        )}

        {uploading && (
          <div className="mt-4">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-gray-600">Uploading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;