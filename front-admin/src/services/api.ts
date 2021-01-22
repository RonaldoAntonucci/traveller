import axios from 'axios';
import apiUrl from '../constants/apiUrl';

const api = axios.create({
  baseURL: apiUrl,
});

export default api;
