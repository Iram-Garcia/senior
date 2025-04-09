import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ImageInfo {
  name: string;
  url: string;
}

export const apiService = {
  // Health check
  checkHealth: async () => {
    const response = await api.get('/health');
    return response.data;
  },

  // Get list of images
  getImages: async (): Promise<string[]> => {
    const response = await api.get('/images/list');
    return response.data;
  },

  // Get image URL
  getImageUrl: (imageName: string): string => {
    return `${API_BASE_URL}/images/${imageName}`;
  },

  // Serial connection management
  connectSerial: async (port: string = 'COM3', baudrate: number = 115200) => {
    const response = await api.post('/serial/connect', { port, baudrate });
    return response.data;
  },

  disconnectSerial: async () => {
    const response = await api.post('/serial/disconnect');
    return response.data;
  },
}; 