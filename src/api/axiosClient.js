import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://localhost:7012/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Thêm Interceptor Request: Tự động nhét Token vào Header trước khi gửi đi
axiosClient.interceptors.request.use(
  config => {
    // THAY ĐỔI TÊN BIẾN 'token' BÊN DƯỚI NẾU AuthContext CỦA BẠN LƯU TÊN KHÁC
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

// Thêm Interceptor Response: Tự động bóc tách dữ liệu trả về
axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  error => {
    // Log lỗi để dễ debug
    console.error('API Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;
