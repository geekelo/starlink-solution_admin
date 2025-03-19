import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


export const createAxiosInstance = () => {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage

  return axios.create({
    baseURL: API_BASE_URL , // Replace with your actual API base URL
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
};
