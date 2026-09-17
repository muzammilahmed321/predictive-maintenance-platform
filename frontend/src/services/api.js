import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getMachines = async () => {
  const response = await api.get('/machines');
  return response.data;
};

export const getMachineById = async (machineId) => {
  const response = await api.get(`/machines/${machineId}`);
  return response.data;
};

export const getAnalytics = async () => {
  const response = await api.get('/analytics');
  return response.data;
};

export const predictFailure = async (inputData) => {
  const response = await api.post('/predict', inputData);
  return response.data;
};

export default api;