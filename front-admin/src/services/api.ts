import axios, { AxiosRequestConfig } from 'axios';
import apiUrl from '../constants/apiUrl';
import { getToken } from '../store/auth';

const api = axios.create({
  baseURL: apiUrl,
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = getToken();

  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
