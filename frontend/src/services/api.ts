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

export interface VehicleData {
  imageName: string;
  statusText: string;
  statusColor: 'green' | 'red';
  plate: string;
  studentId: string;
  email: string;
  name: string;
}

export const apiService = {
  checkHealth: async () => {
    const response = await api.get('/health');
    return response.data;
  },
  getImages: async (): Promise<string[]> => {
    const response = await api.get('/images/list');
    return response.data;
  },
  getImageUrl: (imageName: string): string => {
    return `${API_BASE_URL}/images/${imageName}`;
  },
  connectSerial: async (port: string = 'COM3', baudrate: number = 115200) => {
    const response = await api.post('/serial/connect', { port, baudrate });
    return response.data;
  },
  disconnectSerial: async () => {
    const response = await api.post('/serial/disconnect');
    return response.data;
  },
  // Added methods with mock data fallback
  getPreviousVehicle: async (): Promise<VehicleData> => {
    try {
      const response = await api.get('/vehicles/previous');
      return response.data;
    } catch (err) {
      console.error('Error fetching previous vehicle:', err);
      // Return mock data if the API call fails
      return {
        imageName: 'mock_previous_vehicle.jpg',
        statusText: 'No previous vehicle',
        statusColor: 'green',
        plate: 'N/A',
        studentId: 'N/A',
        email: 'N/A',
        name: 'No Data',
      };
    }
  },
  getCurrentVehicle: async (): Promise<VehicleData> => {
    try {
      const response = await api.get('/vehicles/current');
      return response.data;
    } catch (err) {
      console.error('Error fetching current vehicle:', err);
      // Return mock data if the API call fails
      return {
        imageName: 'mock_current_vehicle.jpg',
        statusText: 'No current vehicle',
        statusColor: 'red',
        plate: 'N/A',
        studentId: 'N/A',
        email: 'N/A',
        name: 'No Data',
      };
    }
  },
};