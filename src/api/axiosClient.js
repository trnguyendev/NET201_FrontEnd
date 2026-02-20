import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://localhost:7012/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor cho Request: Trước khi gửi đi thì nhét Token vào
axiosClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosClient;
