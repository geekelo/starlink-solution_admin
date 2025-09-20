import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

console.log('[Axios Config] API_BASE_URL:', API_BASE_URL);


export const createAxiosInstance = () => {
  const token = localStorage.getItem('candra'); // Retrieve token from localStorage

  return axios.create({
    baseURL: API_BASE_URL , // Replace with your actual API base URL
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
};
