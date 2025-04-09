import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export const ImageViewer = () => {
  const [images, setImages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const imageList = await apiService.getImages();
      setImages(imageList);
      setError(null);
    } catch (err) {
      setError('Failed to load images');
      console.error(err);
    }
  };

  const handleConnect = async () => {
    try {
      await apiService.connectSerial();
      setIsConnected(true);
      setError(null);
    } catch (err) {
      setError('Failed to connect to serial port');
      console.error(err);
    }
  };

  const handleDisconnect = async () => {
    try {
      await apiService.disconnectSerial();
      setIsConnected(false);
      setError(null);
    } catch (err) {
      setError('Failed to disconnect from serial port');
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Image Viewer</h1>
        <div className="flex gap-4 mb-4">
          <button
            onClick={handleConnect}
            disabled={isConnected}
            className={`px-4 py-2 rounded ${
              isConnected
                ? 'bg-gray-400'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Connect Serial
          </button>
          <button
            onClick={handleDisconnect}
            disabled={!isConnected}
            className={`px-4 py-2 rounded ${
              !isConnected
                ? 'bg-gray-400'
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            Disconnect Serial
          </button>
          <button
            onClick={loadImages}
            className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white"
          >
            Refresh Images
          </button>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((imageName) => (
          <div
            key={imageName}
            className="border rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={apiService.getImageUrl(imageName)}
              alt={imageName}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <p className="text-sm text-gray-600">{imageName}</p>
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No images available. Connect to serial port to start receiving images.
        </div>
      )}
    </div>
  );
}; 