import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

export const getTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createTask = async (task) => {
  try {
    await axios.post(API_URL, task);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const updateTask = async (id, task) => {
  try {
    await axios.put(`${API_URL}/${id}`, task);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    handleAxiosError(error);
  }
};

// Error handling function
const handleAxiosError = (error) => {
  if (error.response) {
    // The request was made, and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('Response error:', error.response.data);
    console.error('Response status:', error.response.status);
    console.error('Response headers:', error.response.headers);
  } else if (error.request) {
    // The request was made, but no response was received
    console.error('Request error:', error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error', error.message);
  }
  console.error('Error config:', error.config);
};
